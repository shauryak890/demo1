const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  investmentType: String,
  capital: Number,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const agentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  role: {
    type: String,
    default: 'agent'
  },
  clients: [clientSchema],
  leadsGenerated: {
    type: Number,
    default: 0
  },
  monthlyPayout: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Agent', agentSchema);