const mongoose = require('mongoose');

const managementSchema = new mongoose.Schema({
  donorId: { type: String, required: true, unique: true },
  donorName: { type: String, required: true },
  donationId: { type: String, required: true },
  duration: { type: String, required: true },
  quantity: { type: Number, default: null },
  foodType: { type: String, required: true },
  nameOfFood: { type: String, required: true },
  status: {
    type: String},
  donatedAt: { type: Date, required: true },
  photo: { type: String, default: "default.jpg" },
  phoneNo: { type: String, required: true },
});

module.exports = mongoose.model('Management', managementSchema);
