const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  reviewerName: { type: String, required: true },
  reviewerPicUrl: { type: String }, // /uploads/images/...
  reviewText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewSchema);
