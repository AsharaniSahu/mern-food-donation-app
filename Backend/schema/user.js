const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  e_mail: { type: String, required: true },
  password: { type: String, required: true }, // ← ADD THIS
  role: { type: String, required: true },
  phone_no: { type: String, required: true },
  created_at: { type: String, required: true },
  user_name: { type: String, required: true },
  address: { type: String, required: true },

  ngoStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending',
    required: function () {
      return this.role === 'ngo';
    }
  }
});

module.exports = mongoose.model('User', userSchema, 'User');