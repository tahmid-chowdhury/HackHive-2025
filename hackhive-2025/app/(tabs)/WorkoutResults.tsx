import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function WorkoutResults() {
  const route = useRoute();
  const { routine } = route.params; // Get AI-generated routine

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Personalized Workout</Text>
      {routine.map((exercise, index) => (
        <View key={index} style={styles.exerciseContainer}>
          <Text style={styles.exerciseName}>{exercise.exercise}</Text>
          <Text style={styles.setsReps}>
            {exercise.sets} Sets × {exercise.reps} Reps
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseContainer: {
    backgroundColor: "#8D99AE",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  setsReps: {
    fontSize: 16,
    color: "#EDF2F4",
  },
});
