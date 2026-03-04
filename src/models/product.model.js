const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  primaryCategory: { type: String, required: true },
  subCategory: { type: String, required: true },
  seoTags: [{ type: String }],
  sustainabilityFilters: [{ type: String }],
  processedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);