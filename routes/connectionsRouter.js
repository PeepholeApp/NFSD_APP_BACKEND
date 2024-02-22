const express = require("express");
const connectionsController = require("../controllers/connectionsController");
const router = express.Router();
const { verifyToken } = require("../controllers/userController");

router.post("/:profileId", verifyToken, connectionsController.addConection);
router.get("/:profileId", verifyToken, connectionsController.getConnection);

module.exports = router;
