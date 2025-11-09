const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  try {
    console.log('Creating review, received file:', req.file ? req.file.filename : 'none');
    console.log('Request body:', req.body);
    
    // file: reviewerPic
    let reviewerPicUrl;
    if (req.file) {
      reviewerPicUrl = `/uploads/images/${req.file.filename}`;
      console.log('Reviewer pic URL:', reviewerPicUrl);
    }
    const { reviewerName, reviewText } = req.body;
    if (!reviewerName || !reviewText) {
      console.log('Validation failed - Missing required fields');
      return res.status(400).json({ message: "Missing fields" });
    }

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

exports.getReview = async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) return res.status(404).json({ message: "Not found" });
  res.json(review);
};

exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewerName, reviewText } = req.body;
    
    const updateData = {};
    if (reviewerName) updateData.reviewerName = reviewerName;
    if (reviewText) updateData.reviewText = reviewText;
    
    // Handle picture update
    if (req.file) {
      updateData.reviewerPicUrl = `/uploads/images/${req.file.filename}`;
    }
    
    const review = await Review.findByIdAndUpdate(id, updateData, { new: true });
    if (!review) return res.status(404).json({ message: "Review not found" });
    
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
