const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/userController");
const profileController = require("../controllers/profileController");

router.get("/get", profileController.getProfiles);
router.post("/", profileController.addProfile);
router.get("/", profileController.getPaginationProfiles);
router.get("/all", profileController.getAllProfiles);
router.get("/user/:id", profileController.getProfileByUserId);
router.get("/search/:name", profileController.getProfileByName);
router.put("/:id", verifyToken, profileController.updateProfile);
router.delete("/:id", verifyToken, profileController.deleteProfile);
router.get("/search/:email", profileController.getProfileByEmail);
router.get("/", profileController.getPaginationProfiles);
router.post("/", profileController.addProfile);
router.put("/:id", profileController.updateProfile);
router.delete("/:id", profileController.deleteProfile);

module.exports = router;
