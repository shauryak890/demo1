// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const Agent = require('./models/Agent'); // Import the Agent model

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Use auth routes
app.use('/auth', authRoutes);

// Route to fetch agent dashboard data
app.get('/agent/:agentId/dashboard', async (req, res) => {
  const { agentId } = req.params;

  try {
    // Find the agent by ID
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found.' });
    }

    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching agent data.' });
  }
});

// Route to submit a new lead
app.post('/agent/:agentId/submit-lead', async (req, res) => {
  const { agentId } = req.params;
  const { name, email, phone } = req.body;

  try {
    // Find the agent by ID
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found.' });
    }

    // Add the new lead to the agent's clients
    agent.clients.push({ name, email, phone });
    agent.leadsGenerated += 1;
    agent.monthlyPayout += 500; // Example: Increase payout by ₹500 per lead

    // Save the updated agent
    await agent.save();

    res.json({ message: 'Lead submitted successfully.', agent });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while submitting the lead.' });
  }
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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));