const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  try {
    // file: reviewerPic
    let reviewerPicUrl;
    if (req.file) {
      reviewerPicUrl = `/uploads/images/${req.file.filename}`;
    }
    const { reviewerName, reviewText } = req.body;
    if (!reviewerName || !reviewText)
      return res.status(400).json({ message: "Missing fields" });

    const rv = await Review.create({
      reviewerName,
      reviewerPicUrl,
      reviewText,
    });

    res.status(201).json(rv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getReviews = async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
};

exports.deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
