const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
require("dotenv").config();

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      return res.json(user);
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Not find any user");
    }
  },

  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findOne({ _id: userId });
      return res.json(user);
    } catch (error) {
      res.status(404).send("User not find");
    }
  },

  addUser: async (req, res) => {
    const encryptedPassword = await bcrypt.hash(req.body.password, saltRounds);
    User.create({
      email: req.body.email,
      password: encryptedPassword,
    })
      .then((userDoc) => res.status(200).send(userDoc))
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          default:
            res.status(400).send("User cannot be added", error);
        }
      });
  },

  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).send("User cannot be deleted");
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body
      );
      res.json(user);
    } catch (error) {
      res.status(404).send("User cannot be update");
    }
  },

  checkUser: async (req, res) => {
    const { email, password } = req.body;

    const [userFound] = await User.find({ email: email });
    if (!userFound) return res.status(401).json({ msg: "User not found" });

    if (await bcrypt.compare(password, userFound.password)) {
      const token = jwt.sign({ email: userFound.email }, process.env.SECRET, {
        expiresIn: 3600,
      });
      return res.status(200).json({ msg: "Userlogged", token });
    }
    return res.status(404).json({ msg: "Password does not match" });
  },

  verifyToken: (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) res.status(404).json({ msg: "Missing token!!!!" });
    try {
      jwt.verify(token, process.env.SECRET);
      return next();
    } catch (error) {
      return res.status(404).json({ msg: "Token not valid or expired" });
    }
  },
};

module.exports = userController;
