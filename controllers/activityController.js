const Activity = require("../models/Activity");

const activityController = {
  getAllActivities: async (req, res) => {
    try {
      const activity = await Activity.find().populate("participants", "name");
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
  deleteActivity: async (req, res) => {
    try {
      const activityToDelete = await Activity.findOneAndDelete({
        _id: req.params.id,
      });
      res.json(activityToDelete);
    } catch (error) {
      res.status(404).send("Activity cannot be deleted");
    }
  },
  updateActivity: async (req, res) => {
    try {
      const activityToUpdate = await Activity.findOneAndUpdate(
        { _id: req.params.id },
        req.body
      );
      res.json(activityToUpdate);
    } catch (error) {
      res.status(404).send("Activity cannot be updated");
    }
  },
};

module.exports = activityController;
