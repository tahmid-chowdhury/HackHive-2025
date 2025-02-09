import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";

const colors = {
  backgroundLight: "#EDF2F4",
  backgroundDark: "#2B2D42",
  primaryLight: "#2B2D42",
  primaryDark: "#EDF2F4",
  accentLight: "#EF233C",
  accentDark: "#D90429",
  secondary: "#8D99AE",
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  // Dynamic greeting based on time of day
  const currentHour = new Date().getHours();
  let greetingText = "Good morning";
  if (currentHour >= 12 && currentHour < 18) {
    greetingText = "Good afternoon";
  } else if (currentHour >= 18) {
    greetingText = "Good evening";
  }

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight },
      ]}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Title and Greeting */}

        <ThemedText type="title" style={styles.sectionTitle}>
        {greetingText}!
        </ThemedText>

        {/* Daily Goal Overview */}
        <View style={[styles.metricSection, styles.greyContainer]}>
          <ThemedText type="subtitle">Today's Goals</ThemedText>
          <ThemedView style={styles.progressCircle}>
            <ThemedText type="title" style={{ color: isDark ? colors.accentDark : colors.accentLight }}>
              65%
            </ThemedText>
            <ThemedText>Complete</ThemedText>
          </ThemedView>
        </View>

        {/* User's Current Stats */}
        <View style={[styles.metricSection, { backgroundColor: isDark ? colors.accentDark : colors.accentLight }]}>
          <ThemedText type="subtitle" style={{ color: "#ffffff" }}>Today's Stats</ThemedText>
          <ThemedText style={{ color: "#ffffff" }}>Calorie Goal: 2000 cal</ThemedText>
          <ThemedText style={{ color: "#ffffff" }}>Exercise Routine: 30-min HIIT</ThemedText>
        </View>

        {/* Weekly Summary */}
        <View style={[styles.metricSection, styles.greyContainer]}>
          <ThemedText type="subtitle">This Week</ThemedText>
          <ThemedText>Workouts: 3/5</ThemedText>
          <ThemedText>Calories: On Track</ThemedText>
        </View>

        {/* Recommendations */}
        <ThemedText type="subtitle" style={styles.sectionTitle}>Recommendations</ThemedText>
        <View style={styles.recommendationRow}>
          <View style={[styles.recommendationContainer, styles.greyContainer]}>
            <ThemedText type="subtitle">Next Workout</ThemedText>
            <ThemedText>30-min HIIT Session</ThemedText>
          </View>

          <View style={[styles.recommendationContainer, styles.greyContainer]}>
            <ThemedText type="subtitle">Next Meal</ThemedText>
            <ThemedText>Grilled Chicken Salad</ThemedText>
          </View>
        </View>
      </ScrollView>
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
  metricSection: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  greyContainer: {
    backgroundColor: "#8d99ae",
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#EF233C",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  recommendationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  recommendationContainer: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
