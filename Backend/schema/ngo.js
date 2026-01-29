const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  ngoId: { 
    type: String, 
    required: false, // Changed to optional
    unique: true 
  },
  ngoname: { 
    type: String, 
    required: [true, 'NGO name is required'],
    trim: true,
    minlength: 2
  },
  contactperson: { 
    type: String, 
    required: [true, 'Contact person is required'],
    trim: true 
  },
  phoneno: { 
    type: String, 
    required: [true, 'Phone number is required'],
    validate: {
      validator: v => /^[0-9]{10}$/.test(v),
      message: 'Phone must be 10 digits (e.g., 9876543210)'
    }
  },
  ngoaddress: { 
    type: String, 
    required: [true, 'Address is required'],
    trim: true,
    minlength: 5
  }
}, { 
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Ensure validations run on updates
ngoSchema.set('validateBeforeSave', true);

module.exports = mongoose.model('NGO', ngoSchema);