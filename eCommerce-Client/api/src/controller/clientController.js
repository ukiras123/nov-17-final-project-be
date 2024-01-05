const { v4: uuidv4 } = require('uuid');
const { message: { SUCCESS }, message, FE_URL } = require('../utils/const');
const { hashPassword, comparePassword } = require("../service/bcrypt");
const { createClient, updateClient, getClient } = require("../model/client/ClientModel");
const { sendAccountActivationEmail, sendAccountActivatedNotificationEmail, sendOTPEmail, passwordChangeSuccessNotification } = require('../service/nodemailer');
const { generateOTPCode } = require('../utils');
const { createSession, deleteSessionByFilter } = require('../model/session/SessionModel');

const registerClient = async(req, res, next)=> {
    try {
        console.log(`Hey I am debugging the code !`)
        const {email, password, fName}= req.body;
        console.log(email)
        req.body.password = hashPassword(password);

        const verificationCode = uuidv4();
        req.body.verificationCode = verificationCode;
        await createClient(req.body);
        res.json({
            status: SUCCESS,
            message: 'Pease check your email and follow instruction to activate your account',
        });
        const link = `${FE_URL}/client-verification?c=${verificationCode}&e=${email}`;
        await sendAccountActivationEmail({ link, fName, email });
    } catch (error) {
        next(error)
    }
}
const verifyClient = async(req, res, next)=> {
    try {
        const {e, c } = req.body;

        const response = await updateClient({
            email: e, 
            verificationCode: c, 
        },{
            isVerified: true,
            verificationCode: "",
            status: "active",
        });
        if(response?._id){
            const {fName} = await getClient({e: email})
            await sendAccountActivatedNotificationEmail({
                email: e, link: `${FE_URL}/login`, fName
            })
            res.json({
                status: SUCCESS,
                message: `Your account is verified successfully, you can login now`
            })
        }else{
            res.status(403).json({
                status: message.ERROR,
                message: 'You link is expired or invalid!',
            });
        }
    } catch (error) {
        next(error)
    }
}
const loginClient = async(req, res, next)=> {
    try {
        const {email, password} = req.body;

        const client = await getClient({email})
        if(client?.status ===  'inactive'){
            return res.status(403).json({
                status: message.ERROR,
                message: 'User Account deactivated',
            });
        }
        if(client?._id){
            const isPassValid = comparePassword(password, client?.password)
            if(isPassValid){
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
    } catch (error) {
        next(error)
    }
}
const getClientInfo = async(req, res, next)=> {
    try {
        res.json({
          status: SUCCESS,
          client: req.clientInfo,
        });
      } catch (e) {
        next(e);
      }
}
const logOutClient = async(req, res, next)=> {
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
}
const generateOTP = async(req, res, next)=> {
    try {
        const { email } = req.body;
        if (email) {
            const client = await getClient({ email });
            if (client) {
                const otp = generateOTPCode();
                const result = await createSession({
                    associate: email,
                    accessToken: otp,
                });

                if (result) {
                    await sendOTPEmail({
                        otp, email, fName: user.fName,
                    });
                }
                return res.json({
                    status: SUCCESS,
                    message: 'OTP Sent',
                });
            }
        }
        return res.status(500).json({
            status: message.ERROR,
            message: 'Something went wrong',
        });
    } catch (e) {
        next(e);
    }
}
const resetPassword = async(req, res, next)=> {
    try {
        const { email, otp, password } = req.body;
        if (email && password && otp) {
            const result = await deleteSessionByFilter({
                associate: email,
                accessToken: otp,
            });
            if (result?._id) {
                const hashPass = hashPassword(password);
                const updatedClient = await updateClient({
                    email,
                }, {
                    password: hashPass,
                });
                if (updatedClient) {
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
            status: message.ERROR,
            message: 'Something went wrong',
        });
    } catch (e) {
        next(e);
    }

}

module.exports = {
    registerClient, verifyClient, loginClient, getClientInfo, logOutClient, generateOTP, resetPassword
}