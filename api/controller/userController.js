/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');
const { message: { SUCCESS, ERROR }, message, FE_URL } = require('../utils/const');
const { hashPassword, comparePassword } = require('../service/bcrypt');
const { createAdmin, updateAdmin, getUser } = require('../model/user/UserModel');
const {
  sendAccountActivationEmail, sendAccountActivatedNotificationEmail, sendOTPEmail, passwordChangeSuccessNotification,
} = require('../service/nodemailer');
const { createAccessJWT, createRefreshJWT } = require('../service/jwt');
const { deleteSession, createSession, deleteSessionByFilter } = require('../model/session/SessionModel');
const { generateOTPCode } = require('../utils');

const registerUser = async (req, res, next) => {
  try {
    const { password, email, fName } = req.body;
    req.body.password = hashPassword(password);

    // 1. Add verification code to user and then save
    const verificationCode = uuidv4();
    req.body.verificationCode = verificationCode;
    await createAdmin(req.body);
    console.log('-----Here----');
    const link = `${FE_URL}/admin-verification?c=${verificationCode}&e=${encodeURIComponent(email)}`;
    await sendAccountActivationEmail({ link, fName, email });
    res.json({
      status: SUCCESS,
      message: 'Pease check your email and follow instruction to activate your account',
    });
    // 2. Send an email so they can verify their email
    // We have to open frontend
    console.log('=====> Now sending emsil');
  } catch (e) {
    next(e);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { e, c } = req.body;
    const response = await updateAdmin({
      email: e,
      verificationCode: c,
    }, {
      isVerified: true,
      verificationCode: '',
      status: 'active',
    });
    if (response?._id) {
      // send act verification email
      const { fName } = await getUser({ email: e });
      await sendAccountActivatedNotificationEmail({ email: e, link: `${FE_URL}/login`, fName });
      res.json({
        status: SUCCESS,
        message: 'You account is verified successfully, you can login now',
      });
    } else {
      res.status(403).json({
        status: message.ERROR,
        message: 'You link is expired or invalid!',
      });
    }
  } catch (e) {
    next(e);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await getUser({ email });
    // check if a user is active/inactive
    if (user?.status === 'inactive') {
      return res.status(403).json({
        status: message.ERROR,
        message: 'User Account deactivated',
      });
    }
    if (user?._id) {
      const isPassValid = comparePassword(password, user?.password);
      if (isPassValid) {
        // generate JWT Tokens and send it back
        const accessJWT = await createAccessJWT({ email });
        const refreshJWT = await createRefreshJWT({ email });
        return res.json({
          status: SUCCESS,
          message: 'Login Success',
          token: {
            accessJWT,
            refreshJWT,
          },
        });
      }
    }
    res.status(403).json({
      status: message.ERROR,
      message: 'Invalid Login Detail',
    });
  } catch (e) {
    next(e);
  }
};

const getAdminInfo = (req, res, next) => {
  try {
    res.json({
      status: SUCCESS,
      user: req.userInfo,
    });
  } catch (e) {
    next(e);
  }
};

const logOutUser = async (req, res, next) => {
  try {
    const { accessJWT, refreshJWT } = req.body;
    console.log('accessJWT', accessJWT);
    console.log('refreshJWT', accessJWT);
    // remove accessJWT from session model
    await deleteSession(accessJWT);
    // remove refreshJWT from user model
    await updateAdmin({ refreshJWT }, {
      refreshJWT: '',
    });
    res.json({
      status: SUCCESS,
      message: 'Logout Success',
    });
  } catch (e) {
    next(e);
  }
};

const generateOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    // Check for email
    // Generate Random code and save in DB
    // Session -> email + accessToken ()
    // Send am email with that code
    if (email) {
      const user = await getUser({ email });
      if (user) {
        const otp = generateOTPCode();
        const result = await createSession({
          associate: email,
          accessToken: otp,
        });
        if (result) {
          console.log('Sending email......');
          // send an email
          await sendOTPEmail(
            { otp, email, fName: user.fName },
          );
          return res.json({
            status: SUCCESS,
            message: 'OTP Sent',
          });
        }
      }
    }
    return res.status(500).json({
      status: ERROR,
      message: 'Something went wrong',
    });
  } catch (e) {
    console.log('Next--->', next);
    next(e);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;
    if (email && password && otp) {
      const result = await deleteSessionByFilter({
        associate: email,
        accessToken: otp,
      });
      if (result?._id) {
        const hashPass = hashPassword(password);
        const updatedUser = await updateAdmin({
          email,
        }, {
          password: hashPass,
        });
        if (updatedUser) {
          // Send an email saysing, password change succ
          await passwordChangeSuccessNotification({ email });
          return res.json({
            status: SUCCESS,
            message: 'Password reset Success',
          });
        }
      }
    }
    res.status(500).json({
      status: ERROR,
      message: 'Something went wrong',
    });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  registerUser,
  verifyUser,
  loginUser,
  getAdminInfo,
  logOutUser,
  generateOTP,
  resetPassword,
};
