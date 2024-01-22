const Profile = require("../models/Profile");
const userController = require("./userController");

const profileController = {
  getAllProfiles: async (req, res) => {
    try {
      const profiles = await Profile.find();
      return res.json(profiles);
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Unable to find profiles");
    }
  },

  getProfileByUserId: async (req, res) => {
    try {
      const userId = req.params.id;
      const profile = await Profile.findOne({ userId });
      return res.json(profile);
    } catch (error) {
      res.status(404).send("Profile not found");
    }
  },

  addProfile: async (req, res) => {
    try {
      const newProfile = await Profile.create({
        ...req.body,
      });

      res.status(200).json(newProfile);
    } catch (error) {
      console.error(error);
      res.status(400).send("Profile cannot be added", error);
    }
  },

  deleteProfile: async (req, res) => {
    try {
      const profile = await Profile.findOneAndDelete({ userId: req.params.id });
      res.json(profile);
    } catch (error) {
      res.status(404).send("Profile cannot be deleted");
    }
  },

  updateProfile: async (req, res) => {
    try {
      const profile = await Profile.findOneAndUpdate(
        { userId: req.params.id },
        req.body,
        { new: true }
      );
      res.json(profile);
    } catch (error) {
      res.status(404).send("Profile cannot be updated");
    }
  },
};

module.exports = profileController;
