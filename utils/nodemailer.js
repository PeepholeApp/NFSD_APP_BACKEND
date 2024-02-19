const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "", //colocar su usuario//
    pass: "", //colocar su usuario//
  },
});

module.exports = { transporter };
