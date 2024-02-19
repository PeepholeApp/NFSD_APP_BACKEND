const express = require("express");
const activityController = require("../controllers/activityController");
const router = express.Router();

router.get("/", activityController.getAllActivities);
router.get("/:id", activityController.getActivityById);
router.post("/", activityController.addActivity);
router.delete("/:id", activityController.deleteActivity);
router.put("/:id", activityController.updateActivity);

module.exports = router;
