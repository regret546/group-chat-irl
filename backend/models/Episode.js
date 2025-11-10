const mongoose = require("mongoose");

const EpisodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnailUrl: { type: String }, // e.g. /uploads/images/...
    audioUrl: { type: String }, // e.g. /uploads/audio/...
    uploadDate: { type: Date, default: Date.now },
    durationSeconds: { type: Number }, // stored in seconds
    durationHuman: { type: String }, // optional, e.g. "12:34"
    totalTime: { type: String }, // manually entered total time (e.g. "37:58" or "1:15:30")
    description: { type: String }, // optional description
    youtubeUrl: { type: String }, // YouTube video URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Episode", EpisodeSchema);
