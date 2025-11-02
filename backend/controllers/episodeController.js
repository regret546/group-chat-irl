const path = require("path");
const { parseFile } = require("music-metadata");
const Episode = require("../models/Episode");

function secondsToHms(d) {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor(d % 60);
  return (
    (h > 0 ? `${h}:` : "") +
    String(m).padStart(2, "0") +
    ":" +
    String(s).padStart(2, "0")
  );
}

exports.createEpisode = async (req, res) => {
  try {
    // files: thumbnail and audio (multer will put them in req.files)
    const files = req.files || {};
    let thumbnailPath, audioPath;
    if (files.thumbnail && files.thumbnail[0]) {
      thumbnailPath = `/uploads/images/${files.thumbnail[0].filename}`;
    }
    if (files.audio && files.audio[0]) {
      audioPath = `/uploads/audio/${files.audio[0].filename}`;
    }
    const { title, description } = req.body;
    if (!title || !audioPath)
      return res.status(400).json({ message: "Title and audio are required" });

    // get duration
    let durationSeconds = null;
    let durationHuman = null;
    if (audioPath) {
      const fileOnDisk = path.join(__dirname, "..", audioPath);
      try {
        const meta = await parseFile(
          path.join(
            __dirname,
            "..",
            "uploads",
            "audio",
            files.audio[0].filename
          )
        );
        durationSeconds = Math.floor(meta.format.duration || 0);
        durationHuman = secondsToHms(durationSeconds);
      } catch (err) {
        // ignore metadata errors; admin can still proceed
        console.warn("metadata error", err.message);
      }
    }

    const ep = await Episode.create({
      title,
      description,
      thumbnailUrl: thumbnailPath,
      audioUrl: audioPath,
      durationSeconds,
      durationHuman,
    });

    res.status(201).json(ep);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getEpisodes = async (req, res) => {
  const episodes = await Episode.find().sort({ uploadDate: -1 });
  res.json(episodes);
};

exports.getEpisode = async (req, res) => {
  const ep = await Episode.findById(req.params.id);
  if (!ep) return res.status(404).json({ message: "Not found" });
  res.json(ep);
};

exports.deleteEpisode = async (req, res) => {
  const ep = await Episode.findByIdAndDelete(req.params.id);
  if (!ep) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};

// additional update function can be added similarly
