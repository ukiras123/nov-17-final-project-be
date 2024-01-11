const express = require("express");
const {
  createPaymentMethodController,
  getPaymentMethodController,
} = require("../controller/paymentMethodController");

const paymentMethodRouter = express.Router();

paymentMethodRouter.post("/", createPaymentMethodController);
paymentMethodRouter.get("/", getPaymentMethodController);

module.exports = {
  paymentMethodRouter,
};
