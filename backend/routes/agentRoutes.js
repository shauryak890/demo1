const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');
const auth = require('../middleware/auth');

// Get agent dashboard data
router.get('/:agentId/dashboard', auth, async (req, res) => {
  const { agentId } = req.params;

  try {
    // Find the agent by ID
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found.' });
    }

    // Format dashboard data
    const dashboardData = {
      totalClients: agent.clients?.length || 0,
      totalInvestments: agent.monthlyPayout || 0,
      monthlyCommission: agent.monthlyPayout || 0,
      recentActivities: agent.clients.map(client => ({
        date: client.createdAt || new Date(),
        description: `New client added: ${client.name}`
      })).slice(-5) // Get last 5 activities
    };

    res.json(dashboardData);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching agent data.' });
  }
});

// Submit a new lead
router.post('/:agentId/submit-lead', auth, async (req, res) => {
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

module.exports = router;