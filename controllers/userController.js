const User = require("../models/User");

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
    try {
      const user = new User(req.body);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(404).send("User can´t be added");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await User.findOneAndDelete(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).send("User can´t be deleted");
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
      res.status(404).send("User can´t be update");
    }
  },
};

module.exports = userController;
