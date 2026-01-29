require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('fs');
const fs = require('fs');


const app = express();

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Error:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 3600000
  }
}));

// Routes
const authRoutes = require('./routes/Auth');
const donateRoutes = require('./routes/DonateRoute');
const ngoRoutes = require('./routes/ngoRoutes');
const volunteerRoutes = require('./routes/volunteerRoute');
const managementRoutes = require('./routes/managementRoutes');




app.use('/api/Auth', authRoutes);
app.use('/api/DR', donateRoutes);
app.use('/api/ngo', ngoRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/management', managementRoutes);


// Static files
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    db: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
