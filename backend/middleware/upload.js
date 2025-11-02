const multer = require("multer");
const path = require("path");
const fs = require("fs");

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      const dest = path.join(__dirname, "..", "uploads", "images");
      ensureDir(dest);
      cb(null, dest);
    } else if (
      file.mimetype === "audio/mpeg" ||
      file.mimetype === "audio/mp3" ||
      file.mimetype.startsWith("audio/")
    ) {
      const dest = path.join(__dirname, "..", "uploads", "audio");
      ensureDir(dest);
      cb(null, dest);
    } else {
      const dest = path.join(__dirname, "..", "uploads", "others");
      ensureDir(dest);
      cb(null, dest);
    }
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("audio/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { 
    fileSize: 100 * 1024 * 1024, // 100 MB limit
    fieldSize: 100 * 1024 * 1024, // 100 MB for fields
  },
});

module.exports = upload;
