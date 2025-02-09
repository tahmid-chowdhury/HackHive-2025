import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import Animated, { Layout } from "react-native-reanimated";

const colors = {
  backgroundLight: "#EDF2F4",
  backgroundDark: "#2B2D42",
  primaryLight: "#2B2D42",
  primaryDark: "#EDF2F4",
  accentLight: "#EF233C",
  accentDark: "#D90429",
  secondary: "#8D99AE",
};

// 🔹 Predefined Workout Routines
const workoutRoutines = {
  hiit: [
    { exercise: "Jump Squats", sets: 3, reps: 15 },
    { exercise: "Burpees", sets: 3, reps: 10 },
    { exercise: "Mountain Climbers", sets: 3, reps: 30 },
    { exercise: "Plank to Push-up", sets: 3, reps: 12 },
  ],
  strength: [
    { exercise: "Bench Press", sets: 4, reps: 10 },
    { exercise: "Deadlifts", sets: 3, reps: 8 },
    { exercise: "Squats", sets: 4, reps: 12 },
    { exercise: "Bicep Curls", sets: 3, reps: 15 },
  ],
};

export default function Workout() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [expandedRoutines, setExpandedRoutines] = useState({
    hiit: false,
    strength: false,
  });

  const toggleRoutine = (routine) => {
    setExpandedRoutines((prev) => ({ ...prev, [routine]: !prev[routine] }));
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? colors.backgroundDark
            : colors.backgroundLight,
        },
      ]}
    >
      <View style={styles.header}>
        <IconSymbol
          size={80}
          color={isDark ? colors.primaryDark : colors.primaryLight}
          name="dumbbell"
        />
        <ThemedText
          type="title"
          style={[
            styles.title,
            { color: isDark ? colors.primaryDark : colors.primaryLight },
          ]}
        >
          Your Fitness Hub
        </ThemedText>
      </View>

      <ThemedText
        style={[
          styles.description,
          { color: isDark ? colors.secondary : colors.primaryLight },
        ]}
      >
        Track and personalize your fitness journey.
      </ThemedText>

      {/* 🔹 Add New Workout Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDark ? colors.accentDark : colors.accentLight },
        ]}
        onPress={() => navigation.navigate("CreateWorkout")}
      >
        <ThemedText style={styles.buttonText}>+ Add New Workout</ThemedText>
      </TouchableOpacity>

      {/* 🔹 View Workout Results Button */}
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDark ? colors.accentDark : colors.accentLight },
        ]}
        onPress={() => navigation.navigate("WorkoutResults")}
      >
        <ThemedText style={styles.buttonText}>
          📊 View Workout Results
        </ThemedText>
      </TouchableOpacity>

      <View style={styles.section}>
        <ThemedText
          style={[
            styles.sectionTitle,
            { color: isDark ? colors.primaryDark : colors.primaryLight },
          ]}
        >
          Recommended Routines
        </ThemedText>

        {/* 🔹 HIIT Routine Button */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.secondary }]}
          onPress={() => toggleRoutine("hiit")}
        >
          <ThemedText style={[styles.cardTitle, { color: colors.accentDark }]}>
            🔥 HIIT Blast
          </ThemedText>
          <ThemedText
            style={[
              styles.cardText,
              { color: isDark ? colors.primaryDark : colors.primaryLight },
            ]}
          >
            Short and intense workouts
          </ThemedText>
        </TouchableOpacity>

        {/* 🔹 HIIT Routine Dropdown */}
        {expandedRoutines.hiit && (
          <Animated.View
            style={styles.routineContainer}
            layout={Layout.springify()}
          >
            {workoutRoutines.hiit.map((exercise, index) => (
              <View key={index} style={styles.exerciseContainer}>
                <Text style={styles.exerciseName}>{exercise.exercise}</Text>
                <Text style={styles.setsReps}>
                  {exercise.sets} Sets × {exercise.reps} Reps
                </Text>
              </View>
            ))}
          </Animated.View>
        )}

        {/* 🔹 Strength Training Button */}
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.secondary }]}
          onPress={() => toggleRoutine("strength")}
        >
          <ThemedText style={[styles.cardTitle, { color: colors.accentDark }]}>
            💪 Strength Training
          </ThemedText>
          <ThemedText
            style={[
              styles.cardText,
              { color: isDark ? colors.primaryDark : colors.primaryLight },
            ]}
          >
            Build muscle and endurance
          </ThemedText>
        </TouchableOpacity>

        {/* 🔹 Strength Routine Dropdown */}
        {expandedRoutines.strength && (
          <Animated.View
            style={styles.routineContainer}
            layout={Layout.springify()}
          >
            {workoutRoutines.strength.map((exercise, index) => (
              <View key={index} style={styles.exerciseContainer}>
                <Text style={styles.exerciseName}>{exercise.exercise}</Text>
                <Text style={styles.setsReps}>
                  {exercise.sets} Sets × {exercise.reps} Reps
                </Text>
              </View>
            ))}
          </Animated.View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    color: "#EDF2F4",
    fontWeight: "bold",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
  },
  routineContainer: {
    marginTop: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: colors.primaryLight,
  },
  exerciseContainer: {
    backgroundColor: colors.primaryDark,
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.accentDark,
  },
  setsReps: {
    fontSize: 16,
    color: colors.primaryLight,
  },
});
