const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.addUser);
router.delete("/:id", userController.deleteUser);
router.patch("/:id", userController.updateUser);

module.exports = router;
