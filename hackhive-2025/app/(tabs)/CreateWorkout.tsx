import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { WorkoutStackParamList } from "./WorkoutStack"; // Import navigation type
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useNavigation } from "@react-navigation/native";

type CreateWorkoutScreenProps = {
  navigation: StackNavigationProp<WorkoutStackParamList, "CreateWorkout">;
  route: RouteProp<WorkoutStackParamList, "CreateWorkout">;
};

export default function CreateWorkoutScreen({
  navigation,
}: CreateWorkoutScreenProps) {
  const [workoutName, setWorkoutName] = useState("");
  const [duration, setDuration] = useState("");
  const [exercises, setExercises] = useState("");

  const handleSave = () => {
    // Save the workout routine (you can replace this with API calls or storage logic)
    console.log("Workout Saved:", { workoutName, duration, exercises });
    navigation.goBack(); // Navigate back to WorkoutScreen
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Create New Workout
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Workout Name"
        value={workoutName}
        onChangeText={setWorkoutName}
        placeholderTextColor="#8D99AE"
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (in minutes)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        placeholderTextColor="#8D99AE"
      />
      <TextInput
        style={styles.input}
        placeholder="Exercises (comma-separated)"
        value={exercises}
        onChangeText={setExercises}
        placeholderTextColor="#8D99AE"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <ThemedText style={styles.buttonText}>Save Workout</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#EDF2F4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#2B2D42",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#8D99AE",
    color: "#2B2D42",
  },
  button: {
    backgroundColor: "#EF233C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#8D99AE",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#EDF2F4",
    fontSize: 16,
    fontWeight: "bold",
  },
});
