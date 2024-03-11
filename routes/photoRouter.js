const express = require("express");
const photoController = require("../controllers/photoController");
const router = express.Router();
const upload = require("../middleware/multer");

router.post("/", upload.array("file"), photoController.addPhoto);

module.exports = router;
