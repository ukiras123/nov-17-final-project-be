const { message: { SUCCESS } } = require('../utils/const');
const AuthModel = require('../model/auth/AuthModel');
const { hashPassword } = require('../helper/bcrypt');

const registerUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = hashPassword(password);

    console.log(req.body);
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
