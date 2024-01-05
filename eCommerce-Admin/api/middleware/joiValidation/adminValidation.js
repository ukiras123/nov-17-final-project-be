const Joi = require('joi');
const { message: { ERROR } } = require('../../utils/const');

const adminRegistrationValidation = (req, res, next) => {
  try {
    console.log('adminRegistrationValidation');

    const schema = Joi.object({
      fName: Joi.string().min(3).max(20).required(),
      lName: Joi.string().min(3).max(20).required(),
      phone: Joi.number().required(),
      email: Joi.string().email().required(),
      role: Joi.string().required(),
      //   It has to be min 6 digit long, at least one special char, one number, one capital
      password: Joi.string().required()
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
        .message('Password must be at least 6 characters long and contain at least one uppercase letter, one digit, and one special character.'),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.json({
        status: ERROR,
        message: error.message,
      });
    } else {
      console.log('Validation passed');
      next();
    }
  } catch (e) {
    next(e);
  }
};

const accountVerificationValidation = (req, res, next) => {
  try {
    console.log('adminRegistrationValidation');

    const schema = Joi.object({
      e: Joi.string().required(),
      c: Joi.string().required(),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.json({
        status: ERROR,
        message: error.message,
      });
    } else {
      console.log('Validation passed');
      next();
    }
  } catch (e) {
    next(e);
  }
};

const loginValidation = (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.json({
        status: ERROR,
        message: error.message,
      });
    } else {
      console.log('Validation passed');
      next();
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  adminRegistrationValidation,
  accountVerificationValidation,
  loginValidation,
};
