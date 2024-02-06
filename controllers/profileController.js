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
      const profile = await Profile.findOne({ _id: userId });
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

  getPaginationProfiles: async (req, res) => {
    const page = req.query.page;
    const limit = 9;
    const filters = req.query.filters || {};

    console.log("Filters: ", filters);
    try {
      let query = {};
      if (Object.keys(filters).length > 0) {
        if (filters.nationality) query.nationality = filters.nationality;
        if (filters.gender) query.gender = filters.gender;
        if (filters.languages) query.languages = { $in: filters.languages };
        if (filters.age && filters.age.min && filters.age.max) {
          const currentDate = new Date();
          const minBirthdate = new Date(
            currentDate.getFullYear() - filters.age.max,
            currentDate.getMonth(),
            currentDate.getDate()
          );
          const maxBirthdate = new Date(
            currentDate.getFullYear() - filters.age.min,
            currentDate.getMonth(),
            currentDate.getDate()
          );

          query.dob = {
            $gte: minBirthdate,
            $lte: maxBirthdate,
          };
        }
      }
      console.log("Query: ", query);
      const profiles = await Profile.find(query)
        .skip((page - 1) * limit)
        .limit(limit);
      res.json(profiles);
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Unable to find profiles");
    }
  },
};

module.exports = profileController;
