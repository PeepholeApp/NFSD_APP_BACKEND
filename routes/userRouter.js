const express = require("express");
const { verifyToken } = require("../controllers/userController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getAllUsers); //trae todo los usuarios
router.get("/:id", userController.getUserById);
router.post("/", verifyToken, userController.addUser); //registrar
router.delete("/:id", verifyToken, userController.deleteUser);
router.patch("/:id", verifyToken, userController.updateUser);

module.exports = router;
