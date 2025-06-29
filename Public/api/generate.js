import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests are supported.");
  }

  const { prompt } = req.body;

  try {
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const text = result.response.text(); // ✅ Fixed line

    res.status(200).json({ text });
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Gemini failed to respond." });
  }
}
