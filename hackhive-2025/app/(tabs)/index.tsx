import React from "react";
import { StyleSheet } from "react-native";
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
      {/* Title and Greeting */}

      <ThemedText type="title" style={styles.sectionTitle}>
      {greetingText}!
      </ThemedText>

      {/* Daily Goal Overview */}
      <ThemedView style={[styles.goalOverview, styles.statsContainer,
          { backgroundColor: isDark ? colors.secondary : "#ffffff"}]}>
        <ThemedText type="subtitle" style={{ color: isDark ? colors.primaryDark : colors.primaryLight }}>
          Today's Goals
        </ThemedText>
        <ThemedView style={styles.progressCircle}>
          <ThemedText type="title" style={{ color: isDark ? colors.accentDark : colors.accentLight }}>
            65%
          </ThemedText>
          <ThemedText>Complete</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* User's Current Stats */}
      <ThemedView
        style={[
          styles.statsContainer,
          { backgroundColor: isDark ? colors.accentDark : colors.accentLight },
        ]}
      >
        <ThemedText type="subtitle" style={{ color: "#ffffff" }}>
          Today's Stats
        </ThemedText>
        <ThemedText style={{ color: "#ffffff" }}>
          Calorie Goal: 2000 kcal
        </ThemedText>
        <ThemedText style={{ color: "#ffffff" }}>
          Exercise Routine: 30-min HIIT
        </ThemedText>
        <ThemedText style={{ color: "#ffffff" }}>
          Step Goal: 10000 steps
        </ThemedText>
      </ThemedView>

      {/* Weekly Summary */}
      <ThemedView style={styles.weeklySummary}>
        <ThemedText type="subtitle" style={{ color: isDark ? colors.primaryDark : colors.primaryLight }}>
          This Week
        </ThemedText>
        <ThemedView style={styles.weeklyStats}>
          <ThemedText>Workouts: 3/5</ThemedText>
          <ThemedText>Calories: On Track</ThemedText>
          <ThemedText>Steps: 45,230</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Recommendation Row */}
      <ThemedText type="subtitle" style={[styles.sectionTitle, { color: isDark ? colors.primaryDark : colors.primaryLight }]}>
        Recommendations
      </ThemedText>
      <ThemedView style={styles.recommendationRow}>
        <ThemedView style={[styles.recommendationContainer, { backgroundColor: isDark ? colors.secondary : "#ffffff" }]}>
          <ThemedText type="subtitle" style={{ color: isDark ? colors.primaryDark : colors.primaryLight }}>
            Next Workout
          </ThemedText>
          <ThemedText style={{ color: isDark ? colors.primaryDark : colors.primaryLight }}>
            30-min HIIT Session
          </ThemedText>
        </ThemedView>

        <ThemedView style={[styles.recommendationContainer, { backgroundColor: isDark ? colors.secondary : "#ffffff" }]}>
          <ThemedText type="subtitle" style={{ color: isDark ? colors.primaryDark : colors.primaryLight }}>
            Next Meal
          </ThemedText>
          <ThemedText style={{ color: isDark ? colors.primaryDark : colors.primaryLight }}>
            Grilled Chicken Salad
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  statsContainer: {
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  recommendationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  recommendationContainer: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "bold",
  },
  goalOverview: {
    alignItems: "center",
    marginVertical: 20,
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
  },
  weeklySummary: {
    marginVertical: 20,
  },
  weeklyStats: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#8D99AE",
    borderRadius: 10,
  },
  sectionTitle: {
    marginBottom: 10,
  },
});
