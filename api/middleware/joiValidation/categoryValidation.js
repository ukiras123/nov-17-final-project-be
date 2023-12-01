const Joi = require('joi');
const { message: { ERROR } } = require('../../utils/const');

const createCategoryValidation = (req, res, next) => {
  try {
    console.log('createCategoryValidation');

    const schema = Joi.object({
      title: Joi.string().required(),
      status: Joi.string().valid('inactive', 'active'),
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
  createCategoryValidation,
};
