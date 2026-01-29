const express = require('express');
const router = express.Router();
const { getPendingRequests, updateDonationStatus, verifiedNgo } = require('../controllers/managementController');


const {
    updateRequestStatus,
    acceptRequest,
    rejectRequest
  } = require('../controllers/managementController');

// Check if function is correctly imported
console.log('Type of getPendingRequests:', typeof getPendingRequests); // should be 'function'

router.get('/pending', getPendingRequests);
router.get('/verifiedngo', verifiedNgo);

router.put('/update-status/:id', updateDonationStatus);
router.post('/accept/:id', acceptRequest);
router.post('/reject/:id', rejectRequest);

// Route to get all donation requests

// Route to get only pending requests

// Route to update status (Accept/Reject)
router.put('/status/:id', updateRequestStatus);
module.exports = router;

// Example Express route

