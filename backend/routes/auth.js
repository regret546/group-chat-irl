const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Optional register route for initial admin creation (protect or disable after use)
router.post("/register", authController.register);

// Login returns JWT
router.post("/login", authController.login);

// Reset password - requires authentication
router.post("/reset-password", auth, authController.resetPassword);

module.exports = router;
