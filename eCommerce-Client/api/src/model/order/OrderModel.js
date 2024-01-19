const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "pending",
      enum: ["pending", "shipped", "delivered"],
    },
    clientDetails: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    cartInformation: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    shippingAddress: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    // paymentMethod: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "payment-method",
    //   required: true,
    // },
  },
  { timestamps: true }
);

const order = new mongoose.model("order", orderSchema);

const createOrder = (obj) => order.create(obj);
const getOrderById = (id) => order.findById(id);
const updateOrder = (id, updateObj) => order.findByIdAndUpdate(id, updateObj);
const deleteOrder = (id) => order.findByIdAndDelete(id);

module.exports = {
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
