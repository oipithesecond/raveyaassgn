const aiService = require('../services/ai.service');
const Product = require('../models/product.model');
const { z } = require('zod');

const productSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1)
});

const categorizeAndStoreProduct = async (req, res) => {
  try {
    const validatedData = productSchema.parse(req.body);

    const aiResult = await aiService.generateCategoryMetadata(validatedData);

    const product = new Product({
      title: validatedData.title,
      description: validatedData.description,
      primaryCategory: aiResult.primaryCategory,
      subCategory: aiResult.subCategory,
      seoTags: aiResult.seoTags,
      sustainabilityFilters: aiResult.sustainabilityFilters
    });

    await product.save();

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { categorizeAndStoreProduct };