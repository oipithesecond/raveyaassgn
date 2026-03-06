const { OpenAI } = require('openai');
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const generateProposalAI = async (clientBrief, budget, availableProducts) => {
  const systemPrompt = `
    You are a B2B Sustainability Consultant. Your task is to select a product mix from the provided list that fits within the budget and solves the client's problem.
    
    Return a strict JSON object:
    {
      "selectedItems": [{"name": "string", "quantity": number, "reason": "string"}],
      "impactSummary": "A human-readable summary of sustainability benefits (plastic saved, etc.)",
      "salesPitch": "A professional 2-3 sentence pitch for the client."
    }
  `;

  const userPrompt = `
    Client Brief: ${clientBrief}
    Budget Limit: ₹${budget}
    Available Products: ${JSON.stringify(availableProducts.map(p => ({ name: p.title, price: 500, id: p._id })))} 
    (Note: Using a dummy price of 500 for demo logic; in production, use actual DB prices).
  `;

  const response = await openai.chat.completions.create({
    model: "arcee-ai/trinity-large-preview:free", 
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" } 
  });

  return JSON.parse(response.choices[0].message.content);
};

module.exports = { generateProposalAI };