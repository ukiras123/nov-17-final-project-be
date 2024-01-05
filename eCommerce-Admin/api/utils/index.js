/* eslint-disable no-plusplus */
const generateOTPCode = () => {
  let otp = '';
  for (let i = 0; i < 5; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

module.exports = {
  generateOTPCode,
};
