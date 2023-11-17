const { message: { SUCCESS } } = require('../utils/const');
const AuthModel = require('../model/auth/AuthModel');

const registerUser = async (req, res, next) => {
  try {
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
