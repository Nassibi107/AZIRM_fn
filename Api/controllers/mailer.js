// emailService.js
const nodemailer = require('nodemailer');
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;




const transporter = nodemailer.createTransport({
  host: "azirm.ca", 
  port: 465, 
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (to, subject, text , qrCodePath) => {
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,  
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
