const { transporter } = require("../utils/nodemailer");

const Contact = {
  sendEmail: async (req, res) => {
    const { fullName, email, message } = req.body;

    console.log("body", req.body);

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Hi! ${fullName} wants to contact you`,
      html: message,
    });

    res.status(200).send(req.body);
  },
};
module.exports = Contact;
