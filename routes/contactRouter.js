const express = require("express");
const contactController = require("../controllers/contactController");
const router = express.Router();

router.post("/sendEmail", contactController.sendEmail);

module.exports = router;
