import { StyleSheet } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { useColorScheme } from "@/hooks/useColorScheme";

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
    <ThemedView style={styles.container}>
      {/* Title and Greeting */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{greetingText}!</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* User's Current Stats */}
      <ThemedView
        style={[
          styles.statsContainer,
          { backgroundColor: isDark ? "#333333" : "#f0f0f0" },
        ]}
      >
        <ThemedText
          type="title"
          style={{ color: isDark ? "#ffffff" : "#000000" }}
        >
          Today's Stats
        </ThemedText>
        <ThemedText style={{ color: isDark ? "#dddddd" : "#000000" }}>
          Calorie Goal: 2000 kcal
        </ThemedText>
        <ThemedText style={{ color: isDark ? "#dddddd" : "#000000" }}>
          Exercise Routine: 30-min HIIT
        </ThemedText>
        <ThemedText style={{ color: isDark ? "#dddddd" : "#000000" }}>
          Step Goal: 10000 steps
        </ThemedText>
      </ThemedView>

      {/* Next Recommended Workout */}
      <ThemedView
        style={[
          styles.recommendationContainer,
          { borderColor: isDark ? "#555555" : "#ccc" },
        ]}
      >
        <ThemedText
          type="subtitle"
          style={{ color: isDark ? "#ffffff" : "#000000" }}
        >
          Next Recommended Workout
        </ThemedText>
        <ThemedText style={{ color: isDark ? "#dddddd" : "#000000" }}>
          30-min HIIT Session (Full Body)
        </ThemedText>
      </ThemedView>

      {/* Next Recommended Meal */}
      <ThemedView
        style={[
          styles.recommendationContainer,
          { borderColor: isDark ? "#555555" : "#ccc" },
        ]}
      >
        <ThemedText
          type="subtitle"
          style={{ color: isDark ? "#ffffff" : "#000000" }}
        >
          Next Recommended Meal
        </ThemedText>
        <ThemedText style={{ color: isDark ? "#dddddd" : "#000000" }}>
          Grilled Chicken Salad with Quinoa
        </ThemedText>
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
    // backgroundColor overridden via inline style
  },
  recommendationContainer: {
    padding: 20,
    borderTopWidth: 1,
    marginVertical: 10,
    // borderColor overridden via inline style
  },
});
