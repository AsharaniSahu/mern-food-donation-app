const NGO = require('../schema/ngo');

exports.createOrUpdateNGO = async (req, res) => {
  try {
    // 1. Log incoming request
    console.log('\n=== INCOMING REQUEST ===');
    console.log('Headers:', req.headers);
    console.log('Body:', JSON.stringify(req.body, null, 2));

    const { ngoname, contactperson, phoneno, ngoaddress } = req.body;

   

    // 5. Log new creation
    console.log('\n=== CREATING NEW RECORD ===');
    const newNGO = new NGO({
      ngoId: `NGO-${Date.now()}`,
      ngoname,
      contactperson,
      phoneno,
       // Normalized
      ngoaddress
    });

    await newNGO.save();
    console.log('Created new NGO:', newNGO);
    return res.status(201).json({ message: "Profile created", ngo: newNGO });

  } catch (error) {
    // 6. Detailed error logging
    console.error('\n=== ERROR DETAILS ===');
    console.log('Error name:', error.name);
    console.log('Error code:', error.code);
    console.log('Error message:', error.message);
    
    if (error.code === 11000) {
      console.log('Duplicate key info:', error.keyValue);
      return res.status(409).json({
        error: "Email exists",
        existingEmail: error.keyValue.email,
        solution: "Try updating instead of creating new"
      });
    }
    // ... rest of error handling
  }
};
// Get all verified donations assigned to the NGO
exports.getAssignedDonations = async (req, res) => {
  try {
    const ngoId = req.user._id; // Assuming NGO is logged in
    
    const donations = await Management.find({
      status: 'verified',
      assignedTo: ngoId
    }).sort({ createdAt: -1 });

    res.json(donations);

  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ error: "Server error" });
  }
};

// Handle NGO's accept/decline response
exports.respondToDonation = async (req, res) => {
  try {
    const { donationId, action } = req.body;
    const ngoId = req.user._id;

    const donation = await Management.findOne({
      donationId,
      assignedTo: ngoId,
      status: 'verified' // Only allow response to verified donations
    });

    if (!donation) {
      return res.status(404).json({ error: "Donation not found or not assigned to you" });
    }

    if (action === 'accept') {
      donation.status = 'claimed';
      donation.claimedAt = new Date();
    } else if (action === 'decline') {
      donation.assignedTo = null; // Make available for other NGOs
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }

    await donation.save();
    res.json({ 
      message: `Donation ${action === 'accept' ? 'claimed' : 'declined'}`,
      donation
    });

    // After accept/decline
io.emit('donation-updated', {
  donationId: donation.donationId,
  status: donation.status,
  ngoId: donation.assignedTo
});

  } catch (error) {
    console.error('Response error:', error);
    res.status(500).json({ error: "Server error" });
  }
};