const User = require("../models/User");
const Profile = require("../models/Profile");
const { transporter } = require("../utils/nodemailer");

const Connections = {
  addConection: async (req, res) => {
    const profileId = req.params.profileId;
    const sender = req.user; //usuario que esta logueado
    const senderUser = await User.findOne({ email: sender.email });
    const senderProfile = await Profile.findOne({ user: senderUser._id });

    const recipientProfile = await Profile.findOne({ _id: profileId });
    const recipientUser = await User.findOne({ _id: recipientProfile.user });
    console.log("sender email to", recipientUser, senderUser, recipientProfile);

    await transporter.sendMail({
      from: sender.email,
      to: recipientUser.email,
      subject: `Hi! ${senderProfile.name} wants to contact you`,
      html: "Hello",
    });

    res.status(200).send();
  },
};
module.exports = Connections;
