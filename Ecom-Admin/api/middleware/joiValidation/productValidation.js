/* eslint-disable no-empty */
/* eslint-disable indent */
const Joi = require('joi');
const { message: { ERROR } } = require('../../utils/const');

const createProductValidation = (req, res, next) => {
    try {
        const schema = Joi.object({
            status: Joi.string().valid('Available' || 'Unavailable'),
            title: Joi.string().required(),
            price: Joi.number().required(),
            description: Joi.string().required,
        });
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            res.json({
                error: ERROR,
                message: error.message,
            });
        } else {
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

module.export = { createProductValidation };
