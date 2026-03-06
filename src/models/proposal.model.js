const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  budgetLimit: { type: Number, required: true },
  suggestedMix: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    quantity: Number,
    price: Number
  }],
  totalCost: Number,
  impactSummary: String,
  salesPitch: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Proposal', proposalSchema);