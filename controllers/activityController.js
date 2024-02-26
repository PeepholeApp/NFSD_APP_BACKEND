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
  getActivityById: async (req, res) => {
    try {
      const activity = await Activity.findOne({ _id: req.params.id });
      return res.json(activity);
    } catch (error) {
      res.status(404).send("Activity not find");
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
  getPaginationActivities: async (req, res) => {
    const page = req.query.page;
    const limit = 9;
    const filters = req.query.filters || {};
    try {
      let query = {};
      if (Object.keys(filters).length > 0) {
        if (filters.category) query.category = filters.category;
      }
      const profiles = await Activity.find(query).populate(
        "participants",
        "name"
      );
      // .skip((page - 1) * limit)
      // .limit(limit);
      res.json(profiles);
    } catch (error) {
      res.status(404).send("Activity cannot be find");
    }
  },
  removeParticipantFromActivity: async (req, res) => {
    const { activityId, userId } = req.params;
    try {
      const updatedActivity = await Activity.findOneAndUpdate(
        { _id: activityId },
        { $pull: { participants: userId } },
        { new: true }
      );
      if (!updatedActivity) {
        return res.status(404).json({ error: "Activity cannot be find" });
      }
      return res.json({ message: "Participant deleted" });
    } catch (error) {
      return res.status(500).json({ error: "Error server" });
    }
  },
};

module.exports = activityController;
