const express = require("express");
const resetPasswordController = require("../controllers/resetPasswordController");

const router = express.Router();

router.post("/reset-password", resetPasswordController.sendResetEmail);

module.exports = router;
