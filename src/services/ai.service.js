const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const generateCategoryMetadata = async (productData) => {
  const systemPrompt = `You are a Sustainable Commerce AI.
  Primary Categories allowed: Home & Living, Personal Care, Food & Beverage, Fashion & Accessories, Office & Stationery.
  Sustainability filters allowed: plastic-free, compostable, vegan, recycled, organic, biodegradable.
  Return strictly a JSON object matching this schema:
  {
    "primaryCategory": "string",
    "subCategory": "string",
    "seoTags": ["string", "string", "string", "string", "string"],
    "sustainabilityFilters": ["string"]
  }`;

  const userPrompt = `Title: ${productData.title}\nDescription: ${productData.description}`;

  console.log(`[AI-PROMPT] ${userPrompt}`);

  const response = await openai.chat.completions.create({
    model: "arcee-ai/trinity-large-preview:free",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" }
  });

  const rawContent = response.choices[0].message.content;
  console.log(`[AI-RESPONSE] ${rawContent}`);

  return JSON.parse(rawContent);
};

module.exports = { generateCategoryMetadata };