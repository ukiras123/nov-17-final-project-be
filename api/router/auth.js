const express = require('express');
const { message: { SUCCESS } } = require('../utils/const');
const { registerUser } = require('../controller/authController');
const { adminRegistrationValidation } = require('../middleware/joiValidation');

const authRouter = express.Router();

// Login
authRouter.post('/login', (req, res, next) => {
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
authRouter.get('/logout', (req, res, next) => {
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
authRouter.post('/admin-registration', adminRegistrationValidation, registerUser);

// Reset Password
authRouter.post('/reset-password', (req, res) => {
  res.json({
    status: SUCCESS,
    message: 'Reset Password Success',
  });
});

module.exports = {
  authRouter,
};
