const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { addDonation } = require('../controllers/donorcontroller');
const { getDonationbasedoncategoryselected } = require('../controllers/donationController');
const authMiddleware = require('../middlewares/auth');
const Donation = require('../schema/donor'); // ✅ Add this line





const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
router.post('/donate', authMiddleware, upload.single('photo'), addDonation);
// In your route file (donorRoutes.js)
router.get('/recommendations', async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    
    if (status && status !== 'All') {
      query.status = status.toLowerCase();
    }

    const donations = await Donation.find(query).limit(20);
    console.log('Found donations:', donations.length); // Add this log
    
    res.status(200).json({ 
      success: true,
      donations 
    });
  } catch (err) {
    console.error('Error in /recommendations:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server error' 
    });
  }
});

// Assuming you have Express and your DonationRequest model
const DonationRequest = require('../schema/donor');

// PATCH route to update donation status
router.patch('/accept/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedDonation = await DonationRequest.findByIdAndUpdate(
      id,
      { status:'completed' },  // default to completed if nothing passed
      { new: true }
    );

    if (!updatedDonation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    res.status(200).json({
      message: 'Donation status updated successfully',
      donation: updatedDonation
    });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;