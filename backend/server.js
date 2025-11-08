require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth");
const episodeRoutes = require("./routes/episodes");
const reviewRoutes = require("./routes/reviews");
const messageRoutes = require("./routes/messages");

const app = express();
app.use(cors());

// Increase body parser limits for large file uploads
// Note: These settings don't affect multer file uploads (handled separately)
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Add request logging for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Content-Type: ${req.headers['content-type']}`);
  next();
});

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/episodes", episodeRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });
