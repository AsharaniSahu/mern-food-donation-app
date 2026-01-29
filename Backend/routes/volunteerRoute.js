const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteercontroller');

router.post('/signup', volunteerController.signupVolunteer);

module.exports = router;