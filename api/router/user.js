const express = require('express');
const { message: { SUCCESS } } = require('../utils/const');
const { registerUser, verifyUser } = require('../controller/userController');
const { adminRegistrationValidation, accountVerificationValidation } = require('../middleware/joiValidation');

const userRouter = express.Router();

// Login
userRouter.post('/login', (req, res, next) => {
  try {
    res.json({
      status: SUCCESS,
      message: 'Logout Success',
    });
  } catch (e) {
    next(e);
  }
});

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

// admin registration
userRouter.post('/registration', adminRegistrationValidation, registerUser);

userRouter.post('/account-verification', accountVerificationValidation, verifyUser);

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
