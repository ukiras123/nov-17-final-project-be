const express = require('express');
const { message: { SUCCESS } } = require('../utils/const');
const { registerUser, verifyUser, loginUser } = require('../controller/userController');
const { adminRegistrationValidation, accountVerificationValidation, loginValidation } = require('../middleware/joiValidation');

const userRouter = express.Router();

// admin registration
userRouter.post('/registration', adminRegistrationValidation, registerUser);
userRouter.post('/account-verification', accountVerificationValidation, verifyUser);

// Login
userRouter.post('/login', loginValidation, loginUser);

// logout
userRouter.get('/logout', (req, res, next) => {
  try {
    res.json({
      status: SUCCESS,
      message: 'Logout Success',
    });
  } catch (e) {
    next(e);
  }
});

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
