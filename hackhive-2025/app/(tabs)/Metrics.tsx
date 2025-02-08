import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";

// Simple progress bar component
const ProgressBar = ({ progress, color }: { progress: number; color: string }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: color }]} />
  </View>
);

export default function Metrics() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Sample data
  const totalCaloriesConsumed = 1500;
  const totalCaloriesGoal = 2000;
  const calorieProgress = (totalCaloriesConsumed / totalCaloriesGoal) * 100;

  const proteinConsumed = 60;
  const proteinGoal = 100;
  const proteinProgress = (proteinConsumed / proteinGoal) * 100;

  const carbsConsumed = 150;
  const carbsGoal = 250;
  const carbsProgress = (carbsConsumed / carbsGoal) * 100;

  const fatsConsumed = 40;
  const fatsGoal = 70;
  const fatsProgress = (fatsConsumed / fatsGoal) * 100;

  // Recommended meals and snack options
  const recommendedMeals = [
    { name: "Grilled Chicken Salad", calories: 350 },
    { name: "Veggie Wrap", calories: 300 },
  ];
  const recommendedSnack = { name: "Greek Yogurt", calories: 150 };

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
          {totalCaloriesConsumed} / {totalCaloriesGoal} cal
        </ThemedText>
      </View>

      {/* Macro Breakdown Container */}
      <View style={[styles.metricSection, styles.greyContainer]}>
        <ThemedText type="subtitle">Macro Breakdown</ThemedText>
        <ThemedText>Protein</ThemedText>
        <ProgressBar progress={proteinProgress} color={progressColor} />
        <ThemedText style={styles.detailText}>
          {proteinConsumed}g / {proteinGoal}g
        </ThemedText>

        <ThemedText>Carbohydrates</ThemedText>
        <ProgressBar progress={carbsProgress} color={progressColor} />
        <ThemedText style={styles.detailText}>
          {carbsConsumed}g / {carbsGoal}g
        </ThemedText>

        <ThemedText>Fats</ThemedText>
        <ProgressBar progress={fatsProgress} color={progressColor} />
        <ThemedText style={styles.detailText}>
          {fatsConsumed}g / {fatsGoal}g
        </ThemedText>
      </View>

      {/* Recommended Options Container */}
      <View style={[styles.metricSection, styles.greyContainer]}>
        <ThemedText type="subtitle">Recommended Options</ThemedText>
        {recommendedMeals.map((meal, idx) => (
          <View key={idx} style={styles.mealOption}>
            <View style={styles.mealInfo}>
              <ThemedText>{meal.name}</ThemedText>
              <ThemedText style={styles.detailText}>{meal.calories} cal</ThemedText>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.actionButton} onPress={() => { /* refresh logic */ }}>
                <ThemedText style={styles.buttonText}>Refresh</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={() => { /* add logic */ }}>
                <ThemedText style={styles.buttonText}>Add</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={styles.mealOption}>
          <View style={styles.mealInfo}>
            <ThemedText>Snack: {recommendedSnack.name}</ThemedText>
            <ThemedText style={styles.detailText}>{recommendedSnack.calories} cal</ThemedText>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() => { /* refresh logic */ }}>
              <ThemedText style={styles.buttonText}>Refresh</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => { /* add logic */ }}>
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
