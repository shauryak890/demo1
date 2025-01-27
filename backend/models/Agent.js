const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  investmentType: {
    type: String,
    default: 'mutual_funds'
  },
  capital: Number,
  notes: String,
  approved: {
    type: Boolean,
    default: false
  },
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
  name: String,
  email: String,
  role: {
    type: String,
    default: 'agent'
  },
  clients: [clientSchema],
  monthlyPayout: {
    type: Number,
    default: 0
  }
});

// Add logging middleware
agentSchema.pre('save', function(next) {
  console.log('Pre-save middleware:', {
    agentId: this._id,
    clientsCount: this.clients?.length,
    lastClient: this.clients?.[this.clients.length - 1]
  });
  next();
});

module.exports = mongoose.model('Agent', agentSchema);