const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
    pass: "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
  },
});


const sendAccountActivationEmail= async({link, email, fName}) =>{
    await transporter.sendMail({
        from: '" PK👻" <pk@example.com>', // sender address
        to: email,
        subject: `Account activation required`,
        text: `Hello ${fName}, please activate account from this link ${link}  ! `, // plain text body
        html: `<p>
        Hello ${fName},

        Please click on this link to active!
        <a href="${link}">${link}</a>
  
        Thank you,
        PK
        
        </p>`, // html body
      });
} 
const sendAccountActivatedNotificationEmail= async({link, email, fName}) =>{
    await transporter.sendMail({
        from: '" PK👻" <pk@example.com>', // sender address
        to: email,
        subject: `Account activated Notification`,
        text: `Hello ${fName}, your account has been activated! Please click on the link to login ${link},  `, // plain text body
        html: `<p>
        Hello ${fName},

        Please click on this link to login!
        <a href="${link}">${link}</a>
  
        Thank you,
        PK
        
        </p>`, // html body
      });
} 
const sendOTPEmail = async ({ otp, email, fName }) => {
    await transporter.sendMail({
        from: '" PK👻" <pk@example.com>', // sender address
        to: email, // list of receivers
        subject: 'Forget Password OTP', // Subject line
        text: `Hello ${fName}, Your OTP is  ${otp}`, // plain text body
        html: `
            <p>
            Hello ${fName},
      
            Your OTP is : ${otp}
      
            Thank you,
            DentedCode
            </p>
            
            `, // html body
    });
};

const passwordChangeSuccessNotification = async ({ email }) => {
    await transporter.sendMail({
        from: '" PK👻" <pk@example.com>', // sender address
        to: email, // list of receivers
        subject: 'Password reset success', // Subject line
        text: 'Hello, Your password is changed successfully', // plain text body
        html: `
            <p>
            Hello,
      
            You password is updated successfully. If you didn't do it, contact our admin.
      
            Thank you,
            PK
            </p>
            
            `, // html body
    });
};


module.exports={
    sendAccountActivationEmail,
    sendAccountActivatedNotificationEmail,
    sendOTPEmail,
    passwordChangeSuccessNotification,
}