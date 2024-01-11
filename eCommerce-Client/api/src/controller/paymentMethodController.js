const {
  createPaymentMethod,
  getPaymentMethod,
} = require("../model/paymentMethod/PaymentMethodModel");
const {
  message: { SUCCESS, ERROR },
} = require("../utils/const");

const createPaymentMethodController = (req, res, next) => {
  try {
    const obj = { ...req.body };
    createPaymentMethod(obj);
    res.json({
      status: SUCCESS,
      message: "Your payment method has been created!",
    });
  } catch (error) {
    next(e);
  }
};

const getPaymentMethodController = (req, res, next) => {
  try {
    const { id } = req.params;
    const result = getPaymentMethod(id);
    if (!result) {
      const error = new Error("Not found!");
      error.statusCode = 404;
      return next(error);
    }
    res.json({
      status: SUCCESS,
      result,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createPaymentMethodController,
  getPaymentMethodController,
};
