const express = require("express");
const activityController = require("../controllers/activityController");
const router = express.Router();

router.get("/", activityController.getAllActivities);
router.post("/", activityController.addActivity);

module.exports = router;
