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

  getConnections: async (req, res) => {
    const currentUser = await User.findOne({ email: req.user.email }); //convierto el email en user para traer el idUser
    //busco todos los request que recibio
    const connectionRequests = await ConnectionRequest.find({
      receiver: currentUser._id,
      status: "pending",
    });
    //conv en user_id
    const userIds = connectionRequests.map(
      (connectionRequest) => connectionRequest.sender
    ); //traigo el id del sender-arreglo
    const profiles = await Profile.find({ user: { $in: userIds } }); //trae perfil para los Id

    res.status(200).json(profiles);
  },
  //
  updateConnection: async (req, res) => {
    const profileId = req.params.profileId;
    const receiver = req.user; //usuario que esta logueado

    const receiverUser = await User.findOne({ email: receiver.email });

    const senderProfile = await Profile.findOne({ _id: profileId });
    const senderUser = await User.findOne({ _id: senderProfile.user });

    const connection = await ConnectionRequest.findOneAndUpdate(
      {
        sender: senderUser._id,
        receiver: receiverUser._id,
        status: "pending",
      },
      {
        status: req.body.status,
      }
    );

    if (connection) {
      res.status(201).json({ ...connection, status: req.body.status });
    } else {
      res.status(404).send("Connection not found");
    }
  },
};
module.exports = Connections;
