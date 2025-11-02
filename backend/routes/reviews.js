const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const reviewCtrl = require("../controllers/reviewController");

// Public
router.get("/", reviewCtrl.getReviews);

// Protected creation (admin)
router.post("/", auth, upload.single("reviewerPic"), reviewCtrl.createReview);

// Delete
router.delete("/:id", auth, reviewCtrl.deleteReview);

module.exports = router;
