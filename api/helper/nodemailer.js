// @ts-nocheck
/* eslint-disable import/no-extraneous-dependencies */
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
const sendAccountActivationEmail = async ({ link, email, fName }) => {
  await transporter.sendMail({
    from: '"DentedCode" <info@dentedcode.com>', // sender address
    to: email, // list of receivers
    subject: 'Account Activation Required', // Subject line
    text: `Hello ${fName}, Please click on this link to activate your account. ${link}`, // plain text body
    html: `
        <p>
        Hello ${fName},
  
        Please click on this link to active!
        <a href="${link}">${link}</a>
  
        Thank you,
        DentedCode
        </p>
        
        `, // html body
  });
};

const sendAccountActivatedNotificationEmail = async ({ link, email, fName }) => {
  await transporter.sendMail({
    from: '"DentedCode" <info@dentedcode.com>', // sender address
    to: email, // list of receivers
    subject: 'Account Successfully Activated', // Subject line
    text: `Hello ${fName}, Your account is activated.Please click on this link to login. ${link}`, // plain text body
    html: `
          <p>
          Hello ${fName},
    
          Please click on this link to login!
          <a href="${link}">${link}</a>
    
          Thank you,
          DentedCode
          </p>
          
          `, // html body
  });
};

module.exports = {
  sendAccountActivationEmail,
  sendAccountActivatedNotificationEmail,
};
