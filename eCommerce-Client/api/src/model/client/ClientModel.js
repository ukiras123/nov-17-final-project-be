const mongoose = require("mongoose");

const clientModel = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    isverified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
      default: "",
    },
    refreshJWT: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);

const Client = mongoose.model("client", clientModel);

const createClient = (clientObj) => Client.create(clientObj);
const getClient = (filter) => Client.findOne(filter);
const updateClient = (filter, updateObj) =>
  Client.findOneAndUpdate(filter, updateObj);

module.exports = { createClient, getClient, updateClient };
