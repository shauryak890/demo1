// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Validate essential environment variables
if (!process.env.MONGO_URI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in environment variables');
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined in environment variables');
  process.exit(1);
}

const authRoutes = require('./routes/authRoutes');
const Agent = require('./models/Agent');
const agentRoutes = require('./routes/agentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  if (req.method !== 'GET') {
    console.log('Body:', req.body);
  }
  next();
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Test route at root
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API is working',
    timestamp: new Date().toISOString()
  });
});

// Mount auth routes first
app.use('/auth', authRoutes);

// Test route for registration endpoint
app.get('/auth/register', (req, res) => {
  res.json({
    status: 'success',
    message: 'Registration endpoint is accessible',
    method: 'POST required for registration'
  });
});

// Other routes
app.use('/agent', agentRoutes);
app.use('/admin', adminRoutes);

// 404 handler with detailed logging
app.use((req, res) => {
  const error = {
    path: req.path,
    method: req.method,
    headers: req.headers,
    body: req.body,
    timestamp: new Date().toISOString()
  };
  
  console.error('404 Error:', error);
  
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    details: error
  });
});

// Route to fetch all agents' data for the admin panel
app.get('/admin/agents', async (req, res) => {
  try {
    // Fetch all agents from the database
    const agents = await Agent.find();
    res.json(agents);
  } catch (err) {
    console.error('Error fetching agents:', err);
    res.status(500).json({ error: 'An error occurred while fetching agents data.' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Internal server error'
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test API at: http://localhost:${PORT}`);
});