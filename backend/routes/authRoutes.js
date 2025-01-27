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
    console.log('Login request received:', {
      body: req.body,
      headers: req.headers
    });

    const { email, password } = req.body;

    // Input validation
    if (!email || typeof email !== 'string') {
      console.log('Invalid email provided');
      return res.status(400).json({ error: 'Valid email is required' });
    }

    if (!password || typeof password !== 'string') {
      console.log('Invalid password provided');
      return res.status(400).json({ error: 'Valid password is required' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    console.log('User lookup result:', user ? 'Found' : 'Not found');

    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Verify password
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password verification:', isMatch ? 'Success' : 'Failed');

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
    } catch (bcryptError) {
      console.error('Password comparison error:', bcryptError);
      return res.status(500).json({ error: 'Error verifying credentials' });
    }

    // Get agent data if applicable
    let agentData = null;
    if (user.role === 'agent') {
      agentData = await Agent.findOne({ userId: user._id });
      console.log('Agent data:', agentData ? 'Found' : 'Not found');
    }

    // Create token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        agentId: agentData?._id
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Prepare response
    const response = {
      token,
      id: user._id,
      role: user.role,
      email: user.email,
      agentId: agentData?._id
    };

    console.log('Sending successful response');
    return res.status(200).json(response);

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ 
      error: 'An error occurred during login. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    console.log('Registration request received:', {
      body: req.body,
      headers: req.headers
    });

    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Password must be at least 6 characters long'
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({
        success: false,
        error: 'User already exists with this email'
      });
    }

    // Create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'user'
    });

    await user.save();
    console.log('User created successfully:', user._id);

    // Create agent if role is agent
    if (role === 'agent') {
      const agent = new Agent({
        userId: user._id,
        name,
        email: email.toLowerCase(),
        role: 'agent'
      });
      await agent.save();
      console.log('Agent profile created:', agent._id);
    }

    res.status(201).json({
      success: true,
      message: 'Registration successful'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      error: 'Registration failed. Please try again later.'
    });
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

    // Create new agent document first to get the agent ID
    const newAgent = new Agent({
      userId: user._id,
      email: user.email,
      name: user.name,
      role: 'agent'
    });
    await newAgent.save();

    // Update user role after agent is created
    user.role = 'agent';
    await user.save();

    // Generate new token with updated role and agent ID
    const token = jwt.sign(
      { 
        id: user._id, 
        role: 'agent', 
        email: user.email,
        agentId: newAgent._id // Include the agent ID in token
      },
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