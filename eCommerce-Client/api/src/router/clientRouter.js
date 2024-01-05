const express = require("express");
const { registerClient, verifyClient, loginClient, getClientInfo, logOutClient } = require("../controller/clientController");

const clientRouter = express.Router();

// client registeration 
clientRouter.post('/registration',  registerClient);
clientRouter.post('/account-verification', verifyClient);
// accesstoken 

// login
clientRouter.post('/login',  loginClient);
// get client details using access 
clientRouter.get('/',  getClientInfo);
// logout
clientRouter.post('/logout', logOutClient);
// reset passwords
clientRouter.post('/reset-password', (req, res) => {
    res.json({
      status: SUCCESS,
      message: 'Reset Password Success',
    });
  });

  module.exports= {
    clientRouter,
  }