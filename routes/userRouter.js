const express = require("express");
const { verifyToken } = require("../controllers/userController");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", verifyToken, userController.getAllUsers);
router.get("/check-email", userController.checkEmailDuplicate);
router.get("/:id", userController.getUserById);
router.get("/search/:email", userController.getUserByEmail);
router.post("/", userController.addUser);
router.post("/login", userController.checkUser);
router.delete("/:id", verifyToken, userController.deleteUser);
router.patch("/:id", verifyToken, userController.updateUser);

module.exports = router;
