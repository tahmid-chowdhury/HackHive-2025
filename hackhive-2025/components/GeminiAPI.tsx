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

// Remove or replace the original fetchMealSuggestions function

export async function fetchMealSuggestion(
  progressData: {
    totalCaloriesConsumed: number;
    totalCaloriesGoal: number;
    proteinConsumed: number;
    proteinGoal: number;
    carbsConsumed: number;
    carbsGoal: number;
    fatsConsumed: number;
    fatsGoal: number;
  },
  mealIndex: number
) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Based on the following data:
Total calorie progress: ${progressData.totalCaloriesConsumed}/${progressData.totalCaloriesGoal};
Protein: ${progressData.proteinConsumed}g/${progressData.proteinGoal}g;
Carbohydrates: ${progressData.carbsConsumed}g/${progressData.carbsGoal}g;
Fats: ${progressData.fatsConsumed}g/${progressData.fatsGoal}g;
Please suggest one meal option with calories and macro nutrients.
Please do not give me any explanations, simply return a JSON in the format:
{"meal": {"name": "MealName", "calories": 000, "protein": 00, "carbs": 00, "fats": 00}}`;
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    const parsed = JSON.parse(
      responseText.replace(/```json\n?|```/g, "").trim()
    );
    return parsed?.meal || null;
  } catch (error) {
    console.error("fetchMealSuggestion error:", error);
    return null;
  }
}

export async function fetchSnackSuggestion(progressData: {
  totalCaloriesConsumed: number;
  totalCaloriesGoal: number;
  proteinConsumed: number;
  proteinGoal: number;
  carbsConsumed: number;
  carbsGoal: number;
  fatsConsumed: number;
  fatsGoal: number;
}) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Based on the following data:
Total calorie progress: ${progressData.totalCaloriesConsumed}/${progressData.totalCaloriesGoal};
Protein: ${progressData.proteinConsumed}g/${progressData.proteinGoal}g;
Carbohydrates: ${progressData.carbsConsumed}g/${progressData.carbsGoal}g;
Fats: ${progressData.fatsConsumed}g/${progressData.fatsGoal}g;
Please suggest one snack option with calories and macro nutrients.
Please do not give me any explanations, simply return a JSON in the format:
{"snack": {"name": "SnackName", "calories": 000, "protein": 00, "carbs": 00, "fats": 00}}`;
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    const parsed = JSON.parse(
      responseText.replace(/```json\n?|```/g, "").trim()
    );
    return parsed?.snack || null;
  } catch (error) {
    console.error("fetchSnackSuggestion error:", error);
    return null;
  }
}

export async function fetchWorkoutRoutine(userData: {
  age: number;
  height: number;
  weight: number;
  workoutDays: number;
  duration: number;
  carbsGoal: number;
  fatsConsumed: number;
  fatsGoal: number;
}) {
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Construct a prompt using user responses
    const prompt = `Based on the following user details, generate a personalized workout routine:
    Age: ${userData.age} years old
    Height: ${userData.height} cm
    Weight: ${userData.weight} kg
    Workout Frequency: ${userData.workoutDays} days per week
    Preferred Workout Duration: ${userData.duration} minutes
    Provide a structured workout plan with exercises, sets, and reps unless of course the exercise does not require either sets or reps.
    Please do not give me any explanations, simply return a JSON in the format:
    {
      "workout": {
        "routine": [
          {"exercise": "Exercise Name", "sets": 3, "reps": 12},
          {"exercise": "Exercise Name", "sets": 3, "reps": 10}
        ]
      }
    }`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Parse JSON output from Gemini
    const parsed = JSON.parse(
      responseText.replace(/```json\n?|```/g, "").trim()
    );
    return parsed?.workout || null;
  } catch (error) {
    console.error("fetchWorkoutRoutine error:", error);
    return null;
  }
}
