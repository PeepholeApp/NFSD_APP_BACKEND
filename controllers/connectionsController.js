const User = require("../models/User");
const Profile = require("../models/Profile");
const { transporter } = require("../utils/nodemailer");
const ConnectionRequest = require("../models/ConnectionRequest");
const { json } = require("express");

const Connections = {
  addConection: async (req, res) => {
    const profileId = req.params.profileId;
    const sender = req.user; //usuario que esta logueado
    const senderUser = await User.findOne({ email: sender.email });
    const senderProfile = await Profile.findOne({ user: senderUser._id });

    const recipientProfile = await Profile.findOne({ _id: profileId });
    const recipientUser = await User.findOne({ _id: recipientProfile.user });
    console.log("sender email to", recipientUser, senderUser, recipientProfile);

    const newConnection = await ConnectionRequest.create({
      sender: senderUser._id,
      receiver: recipientUser._id,
    });

    await transporter.sendMail({
      from: sender.email,
      to: recipientUser.email,
      subject: `Hi! ${senderProfile.name} wants to contact you`,
      html: "Hello",
    });

    res.status(200).send();
  },

  getConnection: async (req, res) => {
    const profileId = req.params.profileId;
    const sender = req.user; //usuario que esta logueado
    const senderUser = await User.findOne({ email: sender.email });
    const senderProfile = await Profile.findOne({ user: senderUser._id });

    const recipientProfile = await Profile.findOne({ _id: profileId });
    const recipientUser = await User.findOne({ _id: recipientProfile.user });

    const connection = await ConnectionRequest.findOne({
      sender: senderUser._id,
      receiver: recipientUser._id,
    });

    if (connection) {
      res.status(200).json(connection);
    } else {
      res.status(404).send("Connection not found");
    }
  },
};
module.exports = Connections;
