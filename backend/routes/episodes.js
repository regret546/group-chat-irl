const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const epCtrl = require("../controllers/episodeController");

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
  epCtrl.createEpisode
);

router.delete("/:id", auth, epCtrl.deleteEpisode);

module.exports = router;
