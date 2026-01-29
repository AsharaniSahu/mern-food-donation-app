const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  donorId: { 
    type: mongoose.Schema.Types.ObjectId, // Changed to ObjectId reference
    ref: 'User', // References the User model
    required: true 
  },  donationId: { type: String, required: true, unique: true },
  foodItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  dateMade: { type: Date, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  description: String,
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  photoURL: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Donation', donorSchema);