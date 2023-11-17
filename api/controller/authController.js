const { message: { SUCCESS } } = require('../utils/const');
const AuthModel = require('../model/auth/AuthModel');

const registerUser = async (req, res, next) => {
  try {
    // Check for schema validation of req.body before saving to DB
    // JOI Schema Validation
    await AuthModel.create(req.body);
    res.json({
      status: SUCCESS,
      message: 'User Created',
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registerUser,
};
