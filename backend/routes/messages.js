const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const messageCtrl = require("../controllers/messageController");

// Public - anyone can submit a message
router.post("/", messageCtrl.createMessage);

// Protected - admin only
router.get("/", auth, messageCtrl.getMessages);
router.put("/:id/read", auth, messageCtrl.markAsRead);
router.delete("/:id", auth, messageCtrl.deleteMessage);

module.exports = router;

