const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  leadsGenerated: {
    type: Number,
    default: 0,
  },
  monthlyPayout: {
    type: Number,
    default: 0,
  },
  clients: [
    {
      name: String,
      email: String,
      phone: String,
    },
  ],
});

const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;