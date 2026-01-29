const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../schema/user');
const { v4: uuidv4 } = require('uuid');

const { getRecommendations } = require('../controllers/donationController');

// ===========================
// JWT Configuration
// ===========================
const JWT_SECRET = '123'; // Should be in environment variables
const JWT_EXPIRES_IN = '1h'; // Token expires in 1 hour

// ===========================
// LOGIN ROUTE (with Session/JWT)
// ===========================






router.post('/login', async (req, res) => {
    const { e_mail, password } = req.body;

    try {
        const user = await User.findOne({ e_mail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create session
        req.session.user = {
            user_id: user.user_id,
            e_mail: user.e_mail,
            role: user.role,
            authenticated: true
        };

        // Create JWT token
        const token = jwt.sign(
            {
                user_id: user.user_id,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        return res.status(200).json({ 
            role: user.role, 
            user_id: user.user_id,
            token: token  // Send token to client
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// ===========================
// SIGNUP ROUTE
// ===========================
router.post('/signup', async (req, res) => {
    const {
        e_mail,
        password,
        role,
        phone_no,
        user_name,
        address,
    } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ e_mail });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            user_id: uuidv4(),
            e_mail,
            password: hashedPassword,
            role,
            phone_no,
            user_name,
            address,
            created_at: new Date().toISOString()
        });

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ message: 'Server error during signup' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        return res.status(200).json({ message: 'Logged out successfully' });
    });
});

module.exports = router;