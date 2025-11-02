const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const reviewCtrl = require("../controllers/reviewController");

// Error handling middleware for Multer errors
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ 
        message: 'File too large. Maximum file size is 100MB.' 
      });
    }
    return res.status(400).json({ 
      message: `Upload error: ${err.message}` 
    });
  }
  if (err) {
    return res.status(400).json({ 
      message: err.message || 'Error processing file upload' 
    });
  }
  next();
};

// Public
router.get("/", reviewCtrl.getReviews);

// Protected creation (admin)
router.post("/", auth, upload.single("reviewerPic"), handleUploadError, reviewCtrl.createReview);

// Delete
router.delete("/:id", auth, reviewCtrl.deleteReview);

module.exports = router;
