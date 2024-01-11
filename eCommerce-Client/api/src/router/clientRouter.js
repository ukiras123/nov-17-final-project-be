const express = require("express");
const {
  registerClient,
  verifyClient,
  loginClient,
  getClientInfo,
  logOutClient,
  generateOTP,
  resetPassword,
} = require("../controller/clientController");
const { auth, refreshAuth } = require("../middleware/authMiddleware");
const clientRouter = express.Router();

// client registeration
clientRouter.post("/registration", registerClient);
clientRouter.post("/account-verification", verifyClient);
// accesstoken
clientRouter.get("/get-accessjwt", refreshAuth);
// login
clientRouter.post("/login", loginClient);
// get client details using access
clientRouter.get("/", auth, getClientInfo);
// logout
clientRouter.post("/logout", logOutClient);
// reset passwords
clientRouter.post("/request-otp", generateOTP);
clientRouter.post("/reset-password", resetPassword);

module.exports = {
  clientRouter,
};
