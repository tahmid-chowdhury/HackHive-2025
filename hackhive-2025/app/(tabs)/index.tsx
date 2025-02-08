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
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{ color: isDark ? colors.primaryDark : colors.primaryLight }}
        >
          {greetingText}!
        </ThemedText>
        <HelloWave />
      </ThemedView>

      {/* User's Current Stats */}
      <ThemedView
        style={[
          styles.statsContainer,
          { backgroundColor: isDark ? colors.accentDark : colors.accentLight },
        ]}
      >
        <ThemedText type="title" style={{ color: "#EDF2F4" }}>
          Today's Stats
        </ThemedText>
        <ThemedText style={{ color: "#EDF2F4" }}>
          Calorie Goal: 2000 kcal
        </ThemedText>
        <ThemedText style={{ color: "#EDF2F4" }}>
          Exercise Routine: 30-min HIIT
        </ThemedText>
        <ThemedText style={{ color: "#EDF2F4" }}>
          Step Goal: 10000 steps
        </ThemedText>
      </ThemedView>

      {/* Recommendation Row */}
      <ThemedView style={styles.recommendationRow}>
        {/* Next Recommended Workout */}
        <ThemedView
          style={[
            styles.recommendationContainer,
            { backgroundColor: colors.secondary, borderColor: colors.accentDark },
          ]}
        >
          <ThemedText
            type="subtitle"
            style={{ color: isDark ? colors.primaryDark : colors.primaryLight }}
          >
            Next Recommended Workout
          </ThemedText>
          <ThemedText
            style={{ color: isDark ? colors.primaryDark : colors.primaryLight }}
          >
            30-min HIIT Session (Full Body)
          </ThemedText>
        </ThemedView>

        {/* Next Recommended Meal */}
        <ThemedView
          style={[
            styles.recommendationContainer,
            { backgroundColor: colors.secondary, borderColor: colors.accentDark },
          ]}
        >
          <ThemedText
            type="subtitle"
            style={{ color: isDark ? colors.primaryDark : colors.primaryLight }}
          >
            Next Recommended Meal
          </ThemedText>
          <ThemedText
            style={{ color: isDark ? colors.primaryDark : colors.primaryLight }}
          >
            Grilled Chicken Salad with Quinoa
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
    padding: 20,
    borderTopWidth: 1,
    marginHorizontal: 8, // increased horizontal spacing
    borderRadius: 10,    // rounded corners
  },
});
