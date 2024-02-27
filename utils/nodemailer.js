const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER, //colocar su usuario//
    pass: process.env.EMAIL_PASSWORD, //colocar su usuario//
  },
});

module.exports = { transporter };
