const Proposal = require('../models/proposal.model');
const Product = require('../models/product.model');
const aiService = require('../services/proposal.service');

const createB2BProposal = async (req, res) => {
  try {
    const { clientName, clientBrief, budgetLimit } = req.body;

    // fetch products already categorized from module 1
    const products = await Product.find().limit(10); 

    // AI designs the mix and the pitch
    const aiProposal = await aiService.generateProposalAI(clientBrief, budgetLimit, products);

    // calculate actual cost (using dummy cost)
    const totalCost = aiProposal.selectedItems.reduce((sum, item) => sum + (item.quantity * 500), 0);

    const newProposal = new Proposal({
      clientName,
      budgetLimit,
      suggestedMix: aiProposal.selectedItems,
      totalCost,
      impactSummary: aiProposal.impactSummary,
      salesPitch: aiProposal.salesPitch
    });

    await newProposal.save(); 

    res.status(201).json({ success: true, data: newProposal });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createB2BProposal };