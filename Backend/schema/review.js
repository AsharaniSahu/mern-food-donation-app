const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  ngoId: { type: String, required: true },
  ngoName: { type: String, required: true },
  donationId: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: null },
  photo: { type: String, default: "default.jpg" },
});

module.exports = mongoose.model('Review', reviewSchema);
