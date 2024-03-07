const express = require("express");
const resetPasswordController = require("../controllers/resetPasswordController");

const router = express.Router();

router.post("/reset-password", resetPasswordController.sendResetEmail);
router.post("/recover-password", resetPasswordController.sendResetEmail);

module.exports = router;
