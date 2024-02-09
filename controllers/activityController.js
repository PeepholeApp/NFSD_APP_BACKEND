const Activity = require("../models/Activity");

const activityController = {
  getAllActivities: async (req, res) => {
    try {
      const activity = await Activity.find();
      res.json(activity);
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Unable to find activities");
    }
  },
  addActivity: async (req, res) => {
    try {
      const newActivity = await Activity.create({
        ...req.body,
      });
      res.status(200).json(newActivity);
    } catch (error) {
      console.log("error", error);
      res.status(400).send("Unable to add activity");
    }
  },
};

module.exports = activityController;
