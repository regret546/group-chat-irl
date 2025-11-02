const mongoose = require("mongoose");

const EpisodeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    thumbnailUrl: { type: String }, // e.g. /uploads/images/...
    audioUrl: { type: String }, // e.g. /uploads/audio/...
    uploadDate: { type: Date, default: Date.now },
    durationSeconds: { type: Number }, // stored in seconds
    durationHuman: { type: String }, // optional, e.g. "12:34"
    description: { type: String }, // optional description
  },
  { timestamps: true }
);

module.exports = mongoose.model("Episode", EpisodeSchema);
