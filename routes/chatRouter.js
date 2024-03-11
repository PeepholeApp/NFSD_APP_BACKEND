const express = require("express");
const { createChat, findUserChats } = require("../controllers/chatController");
const router = express.Router();


router.post("/", createChat);
router.get("/:userId", findUserChats);

module.exports = router;
