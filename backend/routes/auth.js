const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Optional register route for initial admin creation (protect or disable after use)
router.post("/register", authController.register);

// Login returns JWT
router.post("/login", authController.login);

module.exports = router;
