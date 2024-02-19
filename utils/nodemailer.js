const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "maribelsoledadalarcon@gmail.com", //colocar su usuario//
    pass: "oces jpcc qupk xhjq", //colocar su usuario//
  },
});

module.exports = { transporter };
