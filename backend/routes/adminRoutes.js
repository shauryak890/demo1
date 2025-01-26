const express = require('express');
const router = express.Router();
const Agent = require('../models/Agent');
const auth = require('../middleware/auth');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// Get all agents
router.get('/agents', auth, isAdmin, async (req, res) => {
  try {
    const agents = await Agent.find();
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching agents' });
  }
});

// Approve client
router.post('/approve-client', auth, isAdmin, async (req, res) => {
  try {
    const { agentId, clientId } = req.body;
    const agent = await Agent.findById(agentId);
    
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    const client = agent.clients.id(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.approved = true;
    agent.monthlyPayout += 5000; // Update commission amount to ₹5000 per approved lead
    await agent.save();

    res.json({ message: 'Client approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving client' });
  }
});

// Reject client
router.post('/reject-client', auth, isAdmin, async (req, res) => {
  try {
    const { agentId, clientId } = req.body;
    const agent = await Agent.findById(agentId);
    
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    const client = agent.clients.id(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.approved = false;
    await agent.save();

    res.json({ message: 'Client rejected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting client' });
  }
});

module.exports = router;