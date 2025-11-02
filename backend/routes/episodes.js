const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const epCtrl = require("../controllers/episodeController");

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

// Public read endpoints
router.get("/", epCtrl.getEpisodes);
router.get("/:id", epCtrl.getEpisode);

// Protected endpoints (admin)
router.post(
  "/",
  auth,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  handleUploadError,
  epCtrl.createEpisode
);

router.delete("/:id", auth, epCtrl.deleteEpisode);

module.exports = router;
