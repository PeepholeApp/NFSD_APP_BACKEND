const express = require("express");
const resetPasswordController = require("../controllers/resetPasswordController");

const router = express.Router();

router.post("/send-link", resetPasswordController.sendLink);
router.post("/verify-token", resetPasswordController.verifyToken);
router.post("/reset-password", resetPasswordController.resetPassword);

module.exports = router;
