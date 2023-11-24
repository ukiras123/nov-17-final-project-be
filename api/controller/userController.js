// eslint-disable-next-line import/no-extraneous-dependencies
const { v4: uuidv4 } = require('uuid');
const { message: { SUCCESS }, message, FE_URL } = require('../utils/const');
const { hashPassword } = require('../helper/bcrypt');
const { createAdmin, updateAdmin, getUser } = require('../model/user/UserModel');
const { sendAccountActivationEmail, sendAccountActivatedNotificationEmail } = require('../helper/nodemailer');

const registerUser = async (req, res, next) => {
  try {
    const { password, email, fName } = req.body;
    req.body.password = hashPassword(password);

    // 1. Add verification code to user and then save
    const verificationCode = uuidv4();
    req.body.verificationCode = verificationCode;
    await createAdmin(req.body);
    res.json({
      status: SUCCESS,
      message: 'Pease check your email and follow instruction to activate your account',
    });
    // 2. Send an email so they can verify their email
    // We have to open frontend
    const link = `${FE_URL}/admin-verification?c=${verificationCode}&e=${email}`;
    await sendAccountActivationEmail({ link, fName, email });
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
module.exports = {
  registerUser,
  verifyUser,
};
