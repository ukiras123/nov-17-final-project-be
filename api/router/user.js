const express = require('express');
const { message: { SUCCESS } } = require('../utils/const');
const {
  registerUser, verifyUser, loginUser, getAdminInfo, logOutUser,
} = require('../controller/userController');
const { adminRegistrationValidation, accountVerificationValidation, loginValidation } = require('../middleware/joiValidation');
const { auth, refreshAuth } = require('../middleware/authMiddleware');
const { deleteSession } = require('../model/session/SessionModel');
const { updateAdmin } = require('../model/user/UserModel');

const userRouter = express.Router();

// admin registration
userRouter.post('/registration', adminRegistrationValidation, registerUser);
userRouter.post('/account-verification', accountVerificationValidation, verifyUser);

// get access token using refresh token
userRouter.get('/get-accessjwt', refreshAuth);

// Login
userRouter.post('/login', loginValidation, loginUser);

// Get Admin detail using token
userRouter.get('/', auth, getAdminInfo);

// logout
userRouter.post('/logout', logOutUser);

// Reset Password
userRouter.post('/reset-password', (req, res) => {
  res.json({
    status: SUCCESS,
    message: 'Reset Password Success',
  });
});

module.exports = {
  userRouter,
};
