const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
      res.status(404).send("User cannot be added");
    }
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

    const [userFound] = await UserModel.find({ email: email });
    if (userFound) return res.status(404).json({ msg: "User not found" });

    if (await bcrypt.compare(password, userFound.password)) {
      return res.status(200).json({ msg: "User not found" });
    }

    return res.status(404).json({ msg: "Password does not match" });
  },
};

module.exports = userController;
