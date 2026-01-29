const express = require('express');
const router = express.Router();
const ngocontroller = require('../controllers/ngocontroller');

// POST: Create/Update NGO Profile
router.post('/profile', ngocontroller.createOrUpdateNGO);


module.exports = router;