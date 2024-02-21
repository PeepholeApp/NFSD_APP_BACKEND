const express = require("express");
const activityController = require("../controllers/activityController");
const { checkAdminOrPremium } = require("../middleware/roles");
const router = express.Router();

router.get("/", activityController.getAllActivities);
router.get("/:id", activityController.getActivityById);
router.post("/", checkAdminOrPremium, activityController.addActivity);
router.delete("/:id", checkAdminOrPremium, activityController.deleteActivity);
router.put("/:id", checkAdminOrPremium, activityController.updateActivity);
router.delete("/:activityId/participants/:userId", checkAdminOrPremium, activityController.removeParticipantFromActivity);

module.exports = router;
