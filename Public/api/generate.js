import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

// Initialize with your API key from environment variables
const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Get the generative model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash" // or "gemini-pro" for older models
    });

    // Generate content
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }]
    });

    // Get the response text
    const text = result.response.text();

    return res.status(200).json({ text });
  } catch (error) {
    console.error("Full Gemini API error:", error);
    return res.status(500).json({ 
      error: "Failed to generate content",
      details: error.message,
      fullError: JSON.stringify(error) // For debugging
    });
  }
}