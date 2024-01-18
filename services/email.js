const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL_LOGIN, EMAIL_PASSWORD } = process.env;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL_LOGIN,
    pass: EMAIL_PASSWORD,
  },
});

const SendMail = async ({ to, subject = "Fitness App", html }) => {
  try {
    await transporter.sendMail({
      from: EMAIL_LOGIN,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = SendMail;
