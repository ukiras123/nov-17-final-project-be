const mongoose = require("mongoose");

const paymentMethodSchema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: true,
    default: "Stripe",
  },
});

const paymentMethod = new mongoose.model("payment-method", paymentMethodSchema);

const createPaymentMethod = (obj) => paymentMethod.create(obj);
const getPaymentMethod = (id) => paymentMethod.findById(id);

module.exports = {
  createPaymentMethod,
  getPaymentMethod,
};
