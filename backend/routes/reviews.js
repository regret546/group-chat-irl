const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const reviewCtrl = require("../controllers/reviewController");

// Error handling middleware for Multer errors
const handleUploadError = (err, req, res, next) => {
  console.error('Upload error:', err);
  
  if (err instanceof multer.MulterError) {
    console.error('Multer error code:', err.code);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(413).json({ 
        message: 'File too large. Maximum file size is 100MB.' 
      });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        message: 'Unexpected file field. Expected: reviewerPic.' 
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
router.get("/:id", reviewCtrl.getReview);

// Protected creation (admin)
router.post("/", auth, upload.single("reviewerPic"), handleUploadError, reviewCtrl.createReview);

// Update
router.put("/:id", auth, upload.single("reviewerPic"), handleUploadError, reviewCtrl.updateReview);

// Delete
router.delete("/:id", auth, reviewCtrl.deleteReview);

module.exports = router;
