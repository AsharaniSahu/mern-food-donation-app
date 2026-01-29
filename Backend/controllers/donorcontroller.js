const Donation = require('../schema/donor');
const User = require('../schema/user');
const { v4: uuidv4 } = require('uuid');
const { Types } = require('mongoose');

const addDonation = async (req, res) => {
  try {
    const { user } = req;
    if (!user) throw new Error('Not authenticated');

    // Find user by their UUID to get their ObjectId (_id)
    const userDoc = await User.findOne({ user_id: user.user_id });
    if (!userDoc) throw new Error('User not found');

    const photoURL = req.file ? `/uploads/${req.file.filename}` : '';

    const donation = new Donation({
      ...req.body,
      donorId: userDoc._id, // Use the User's ObjectId
      donationId: uuidv4(),
      photoURL,
      status: 'pending',
      dateMade: new Date(req.body.dateMade)
    });

    await donation.save();
    
    res.status(201).json({
      success: true,
      donation: {
        ...donation.toObject(),
        // Include the original userId for frontend compatibility
        userId: user.user_id
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// New function to get donations with user details
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donorId', 'name email user_id') // Include user_id in population
      .lean(); // Convert to plain JS object
    
    // Transform to maintain frontend compatibility
    const transformed = donations.map(d => ({
      ...d,
      donorId: d.donorId?.user_id || d.donorId // Return UUID if populated
    }));

    res.json({ success: true, donations: transformed });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { addDonation, getDonations };