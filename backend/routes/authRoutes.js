// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Agent = require('../models/Agent'); // Import the Agent model
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth'); // Add this line to import auth middleware

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // If user is an agent, get the agent details
    let agentData = null;
    if (user.role === 'agent') {
      agentData = await Agent.findOne({ userId: user._id });
      if (!agentData) {
        return res.status(500).json({ error: 'Agent data not found' });
      }
    }

    // Create token payload
    const payload = {
      id: user._id,
      role: user.role,
      email: user.email,
      agentId: agentData?._id
    };

    // Sign token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Send response
    res.json({
      token,
      id: user._id,
      role: user.role,
      email: user.email,
      agentId: agentData?._id
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Validate role
    if (role !== 'user' && role !== 'agent') {
      return res.status(400).json({ error: 'Invalid role.' });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    // Save the user first to get the user ID
    await newUser.save();

    // If the user is an agent, create an agent document
    if (role === 'agent') {
      const newAgent = new Agent({
        userId: newUser._id,
        email: email,
        name: name,
        role: 'agent'
      });

      await newAgent.save();
    }

    res.json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ error: 'An error occurred during signup.' });
  }
});

// Become agent route
router.post('/become-agent', auth, async (req, res) => {
  try {
    // Find user and update role
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'agent') {
      return res.status(400).json({ message: 'User is already an agent' });
    }

    user.role = 'agent';
    await user.save();

    // Create new agent document
    const newAgent = new Agent({
      userId: user._id,
      email: user.email,
      name: user.name,
      role: 'agent'
    });
    await newAgent.save();

    // Generate new token with updated role
    const token = jwt.sign(
      { id: user._id, role: 'agent', email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      message: 'Successfully became an agent'
    });
  } catch (error) {
    console.error('Error becoming agent:', error);
    res.status(500).json({ message: 'Error updating user role' });
  }
});

module.exports = router;