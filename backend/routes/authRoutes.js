// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Agent = require('../models/Agent'); // Import the Agent model
const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, agentId: user.agentId }, // Include agentId in the token payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: user.role, agentId: user.agentId });
  } catch (err) {
    console.error('Error during login:', err); // Log the error
    res.status(500).json({ error: 'An error occurred during login.', details: err.message });
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

    // Create a new user
    const newUser = new User({ name, email, password, role });

    // If the user is an agent, create an agent document
    if (role === 'agent') {
      const newAgent = new Agent({
        userId: newUser._id, // Link the agent to the user
        name,
        leadsGenerated: 0, // Default values
        monthlyPayout: 0,
        clients: [],
      });

      await newAgent.save();
      newUser.agentId = newAgent._id; // Link the user to the agent
    }

    // Save the user after setting the agentId
    await newUser.save();

    res.json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error('Error during signup:', err); // Log the full error
    res.status(500).json({ error: 'An error occurred during signup.', details: err.message });
  }
});

module.exports = router;