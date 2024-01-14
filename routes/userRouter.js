const express = require("express");
const { verifyToken } = require("../controllers/userController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", verifyToken, userController.getAllUsers); //trae todo los usuarios
router.get("/:id", userController.getUserById);
router.post("/", userController.addUser); //registrar
router.post("/login", userController.checkUser);
router.delete("/:id", verifyToken, userController.deleteUser);
router.patch("/:id", verifyToken, userController.updateUser);

module.exports = router;
