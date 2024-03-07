const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/all", profileController.getAllProfiles);
router.get("/user/:id", profileController.getProfileByUserId);
router.get("/search/:name", profileController.getProfileByName);
router.get("/", profileController.getPaginationProfiles);
router.post("/", profileController.addProfile);
router.put("/:id", profileController.updateProfile);
router.delete("/:id", profileController.deleteProfile);

module.exports = router;
