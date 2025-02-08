import React, { useEffect, useState } from "react";

// Import Gemini API client
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Use API key from environment variables
const apiKey = "AIzaSyBv1fp-WZCt5Jy2Bxr20SyQRrchjTzbWOk";

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

// Add and export this helper function:
export async function fetchMealSuggestions(progressData: {
    calorieProgress: number;
    proteinConsumed: number;
    proteinGoal: number;
    carbsConsumed: number;
    carbsGoal: number;
    fatsConsumed: number;
    fatsGoal: number;
  }) {
    console.log("GEMINI API Key:", apiKey);

    try {
      const { GoogleGenerativeAI } = require("@google/generative-ai");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `Based on the following data:
  Total calorie progress: ${progressData.calorieProgress.toFixed(1)}%;
  Protein: ${progressData.proteinConsumed}g/${progressData.proteinGoal}g;
  Carbohydrates: ${progressData.carbsConsumed}g/${progressData.carbsGoal}g;
  Fats: ${progressData.fatsConsumed}g/${progressData.fatsGoal}g;
  Please suggest two meal options and one snack option with calorie counts.
  Return a JSON object in this format:
  {"meals": [{"name": "Meal1", "calories": 300}, {"name": "Meal2", "calories": 350}], "snack": {"name": "Snack", "calories": 150}}`;
      const result = await model.generateContent(prompt);
      return JSON.parse(result.response.text());
    } catch (error) {
      console.error("fetchMealSuggestions error:", error);
      return null;
    }
  }