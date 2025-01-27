const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Agent = require('../models/Agent');
const auth = require('../middleware/auth');

// Format currency helper function (since we can't import from frontend)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Get agent dashboard data
router.get('/:agentId/dashboard', auth, async (req, res) => {
  try {
    const { agentId } = req.params;
    const agent = await Agent.findById(agentId);

    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    // Verify that the logged-in user is the agent
    if (agent.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this dashboard' });
    }

    // Calculate dashboard statistics
    const totalClients = agent.clients.length;
    const totalInvestments = agent.clients.reduce((sum, client) => sum + (client.capital || 0), 0);
    const monthlyCommission = agent.monthlyPayout || 0;

    // Get recent activities
    const recentActivities = agent.clients.map(client => ({
      date: client.createdAt,
      description: `New lead: ${client.name} - ${formatCurrency(client.capital || 0)}`
    })).sort((a, b) => b.date - a.date).slice(0, 5);

    res.json({
      totalClients,
      totalInvestments,
      monthlyCommission,
      recentActivities,
      clients: agent.clients
    });

  } catch (error) {
    console.error('Dashboard fetch error:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

// Submit new lead
router.post('/:agentId/leads', auth, async (req, res) => {
  try {
    const { agentId } = req.params;
    console.log('1. Received request with agentId:', agentId);
    console.log('2. Request body:', req.body);

    // Find the agent
    const agent = await Agent.findById(agentId);
    console.log('3. Found agent:', agent ? 'Yes' : 'No');

    if (!agent) {
      return res.status(404).json({
        success: false,
        message: 'Agent not found'
      });
    }

    // Create simplified lead object
    const newLead = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      investmentType: 'mutual_funds',
      capital: Number(req.body.capital),
      notes: req.body.notes || '',
      approved: false,
      createdAt: new Date()
    };

    console.log('4. New lead object:', newLead);

    // Initialize clients array if it doesn't exist
    if (!agent.clients) {
      agent.clients = [];
      console.log('5. Initialized empty clients array');
    }

    // Add the new lead
    agent.clients.push(newLead);
    console.log('6. Added lead to clients array');

    // Save with error handling
    try {
      const savedAgent = await agent.save();
      console.log('7. Successfully saved agent');

      return res.json({
        success: true,
        message: 'Lead submitted successfully',
        data: {
          totalClients: savedAgent.clients.length,
          totalInvestments: savedAgent.clients.reduce((sum, client) => sum + (client.capital || 0), 0),
          monthlyCommission: savedAgent.monthlyPayout || 0,
          recentActivities: [{
            date: newLead.createdAt,
            description: `New lead: ${newLead.name}`
          }],
          clients: savedAgent.clients
        }
      });
    } catch (saveError) {
      console.error('Save error details:', {
        message: saveError.message,
        errors: saveError.errors,
        stack: saveError.stack
      });
      return res.status(500).json({
        success: false,
        message: 'Error saving lead',
        error: saveError.message
      });
    }
  } catch (error) {
    console.error('Lead submission error details:', {
      message: error.message,
      stack: error.stack
    });
    return res.status(500).json({
      success: false,
      message: 'Error processing lead submission',
      error: error.message
    });
  }
});

module.exports = router;