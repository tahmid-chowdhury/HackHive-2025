import React, { useEffect, useState } from "react";

// Import Gemini API client
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Use API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

export default function GeminiAPI() {
  const [responseText, setResponseText] = useState("Loading...");

  useEffect(() => {
    async function fetchContent() {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const prompt = "Explain how AI works";
        const result = await model.generateContent(prompt);
        setResponseText(result.response.text());
      } catch (error) {
        setResponseText("Failed to fetch content");
      }
    }
    fetchContent();
  }, []);

  return (
    <div>
      <h2>Gemini API Response</h2>
      <p>{responseText}</p>
    </div>
  );
}
