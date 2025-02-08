import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { fetchMealSuggestion, fetchSnackSuggestion } from "@/components/GeminiAPI";

// Simple progress bar component
const ProgressBar = ({ progress, color }: { progress: number; color: string }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: color }]} />
  </View>
);

export default function Metrics() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Update initial progress state to start at 0
  const [progress, setProgress] = useState({
    totalCaloriesConsumed: 0,
    totalCaloriesGoal: 2000,
    proteinConsumed: 0,
    proteinGoal: 100,
    carbsConsumed: 0,
    carbsGoal: 250,
    fatsConsumed: 0,
    fatsGoal: 70,
  });

  // Calculate percentages
  const calorieProgress = (progress.totalCaloriesConsumed / progress.totalCaloriesGoal) * 100;
  const proteinProgress = (progress.proteinConsumed / progress.proteinGoal) * 100;
  const carbsProgress = (progress.carbsConsumed / progress.carbsGoal) * 100;
  const fatsProgress = (progress.fatsConsumed / progress.fatsGoal) * 100;

  // Add meal function
  const addMeal = (item: { calories: number; protein: number; carbs: number; fats: number }) => {
    setProgress(prev => ({
      ...prev,
      totalCaloriesConsumed: prev.totalCaloriesConsumed + item.calories,
      proteinConsumed: prev.proteinConsumed + item.protein,
      carbsConsumed: prev.carbsConsumed + item.carbs,
      fatsConsumed: prev.fatsConsumed + item.fats,
    }));
  };

  const [suggestions, setSuggestions] = useState({
    meals: [
      { name: "Grilled Chicken Salad", calories: 350, protein: 35, carbs: 15, fats: 12 },
      { name: "Veggie Wrap", calories: 300, protein: 12, carbs: 45, fats: 8 },
    ],
    snack: { name: "Greek Yogurt", calories: 150, protein: 15, carbs: 8, fats: 5 },
  });

  async function refreshSuggestion(type: "meal" | "snack", mealIndex?: number) {
    const progressData = {
      totalCaloriesConsumed: progress.totalCaloriesConsumed,
      totalCaloriesGoal: progress.totalCaloriesGoal,
      proteinConsumed: progress.proteinConsumed,
      proteinGoal: progress.proteinGoal,
      carbsConsumed: progress.carbsConsumed,
      carbsGoal: progress.carbsGoal,
      fatsConsumed: progress.fatsConsumed,
      fatsGoal: progress.fatsGoal,
    };

    if (type === "meal" && mealIndex !== undefined) {
      const result = await fetchMealSuggestion(progressData, mealIndex);
      if (result) {
        setSuggestions((prev) => ({
          ...prev,
          meals: prev.meals.map((meal, idx) => 
            idx === mealIndex ? result : meal
          ),
        }));
      }
    } else if (type === "snack") {
      const result = await fetchSnackSuggestion(progressData);
      if (result) {
        setSuggestions((prev) => ({
          ...prev,
          snack: result,
        }));
      }
    }
  }

  const lightBarColor = "#EF233C";
  const darkBarColor = "#D90429";
  const progressColor = isDark ? darkBarColor : lightBarColor;

  return (
    <ThemedView style={[styles.container, { backgroundColor: isDark ? "#2B2D42" : "#EDF2F4" }]}>
      <ThemedText type="title" style={styles.sectionTitle}>
        Metrics
      </ThemedText>

      {/* Total Calorie Progress Container */}
      <View style={[styles.metricSection, { backgroundColor: isDark ? "#D90429" : "#EF233C" }]}>
        <ThemedText type="subtitle">Total Calorie Progress</ThemedText>
        <ProgressBar progress={calorieProgress} color={"#fff"} />
        <ThemedText style={styles.detailText}>
          {progress.totalCaloriesConsumed} / {progress.totalCaloriesGoal} cal
        </ThemedText>
      </View>

      {/* Macro Breakdown Container */}
      <View style={[styles.metricSection, styles.greyContainer]}>
        <ThemedText type="subtitle">Macro Breakdown</ThemedText>
        <ThemedText>Protein</ThemedText>
        <ProgressBar progress={proteinProgress} color={progressColor} />
        <ThemedText style={styles.detailText}>
          {progress.proteinConsumed}g / {progress.proteinGoal}g
        </ThemedText>

        <ThemedText>Carbohydrates</ThemedText>
        <ProgressBar progress={carbsProgress} color={progressColor} />
        <ThemedText style={styles.detailText}>
          {progress.carbsConsumed}g / {progress.carbsGoal}g
        </ThemedText>

        <ThemedText>Fats</ThemedText>
        <ProgressBar progress={fatsProgress} color={progressColor} />
        <ThemedText style={styles.detailText}>
          {progress.fatsConsumed}g / {progress.fatsGoal}g
        </ThemedText>
      </View>

      {/* Recommended Options Container */}
      <View style={[styles.metricSection, styles.greyContainer]}>
        <ThemedText type="subtitle">Recommended Options</ThemedText>
        {suggestions.meals.map((meal, idx) => (
          <View key={idx} style={styles.mealOption}>
            <View style={styles.mealInfo}>
              <ThemedText>{meal.name}</ThemedText>
              <ThemedText style={styles.detailText}>
                {meal.calories} cal | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fats}g
              </ThemedText>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => refreshSuggestion("meal", idx)}
              >
                <ThemedText style={styles.buttonText}>Refresh</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.actionButton} 
                onPress={() => addMeal(meal)}
              >
                <ThemedText style={styles.buttonText}>Add</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={styles.mealOption}>
          <View style={styles.mealInfo}>
            <ThemedText>Snack: {suggestions.snack.name}</ThemedText>
            <ThemedText style={styles.detailText}>
              {suggestions.snack.calories} cal | P: {suggestions.snack.protein}g | C: {suggestions.snack.carbs}g | F: {suggestions.snack.fats}g
            </ThemedText>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => refreshSuggestion("snack")}
            >
              <ThemedText style={styles.buttonText}>Refresh</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => addMeal(suggestions.snack)}
            >
              <ThemedText style={styles.buttonText}>Add</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  sectionTitle: {
    marginBottom: 10,
    textAlign: "center",
  },
  detailText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  progressBarContainer: {
    height: 10,
    width: "100%",
    backgroundColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 5,
  },
  progressBar: {
    height: "100%",
    borderRadius: 5,
  },
  metricSection: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  // Removed dynamic styled containers; using inline styles in component instead.
  mealOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginVertical: 5,
  },
  mealInfo: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  actionButton: {
    backgroundColor: "#EF233C",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  greyContainer: {
    backgroundColor: "#8d99ae",
  },
});
