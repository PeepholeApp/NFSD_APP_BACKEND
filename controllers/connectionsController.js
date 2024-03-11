const User = require("../models/User");
const Profile = require("../models/Profile");
const { transporter } = require("../utils/nodemailer");
const ConnectionRequest = require("../models/ConnectionRequest");
const { json } = require("express");
const { getMessaging } = require("firebase-admin/messaging");

const admin = require("firebase-admin");
const serviceAccount = require("../service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const Connections = {
  addConection: async (req, res) => {
    const profileId = req.params.profileId;
    const sender = req.user; //usuario que esta logueado
    const senderUser = await User.findOne({ email: sender.email });
    const senderProfile = await Profile.findOne({ user: senderUser._id });

    const recipientProfile = await Profile.findOne({ _id: profileId });
    const recipientUser = await User.findOne({ _id: recipientProfile.user });

    const subject = "New connection request";

    const message = {
      notification: {
        title: "Peephole",
        body: subject,
      },
      webpush: {
        fcmOptions: {
          link: "https://nfsd-app-frontend.onrender.com/home",
        },
      },
      token: recipientUser.pushToken,
    };

    getMessaging()
      .send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });

    const newConnection = await ConnectionRequest.create({
      sender: senderUser._id,
      receiver: recipientUser._id,
    });

    await transporter.sendMail({
      from: sender.email,
      to: recipientUser.email,
      subject,
      html: `
      <div style="width: 100%; background-color: #f3f9ff; padding: 5rem 0">
        <div style="max-width: 700px; background-color: white; margin: 0 auto">
              <div style="width: 100%; background-color: #654ea3; padding: 20px 0">
                  <img
                      src="https://res.cloudinary.com/depi6sft8/image/upload/v1707348591/svj5m1zy8daiftfqarof.png"
                      style="width: 100%; height: 70px; object-fit: contain"
                  />
              </div>
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
              <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
                  Peephole
                </p>,
              <div style="font-size: .8rem; margin: 0 30px">
                  <p>Hi! ${senderProfile.name} with  Email: ${sender.email} wants to contact you</p>
              </div>
            </div>
        </div>
      </div>
    `,
    });

    res.status(200).send();
  },

  getConnection: async (req, res) => {
    const profileId = req.params.profileId;
    const sender = req.user; //usuario que esta logueado
    const senderUser = await User.findOne({ email: sender.email });

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
