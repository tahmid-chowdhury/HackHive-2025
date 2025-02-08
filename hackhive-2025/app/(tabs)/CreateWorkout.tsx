import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useNavigation } from "@react-navigation/native";
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

export default function Workout() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [experience, setExperience] = useState("");
  const [workoutDays, setWorkoutDays] = useState("");
  const [workoutIntensity, setWorkoutIntensity] = useState("");
  const [workoutDuration, setWorkoutDuration] = useState("");

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
          Create Your Workout Plan
        </ThemedText>
      </View>

      <ThemedText
        style={[
          styles.description,
          { color: isDark ? colors.secondary : colors.primaryLight },
        ]}
      >
        Answer some simple questions for us.
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Fitness Goal (e.g. Muscle Gain, Fat Loss)"
        value={fitnessGoal}
        onChangeText={setFitnessGoal}
      />
      <TextInput
        style={styles.input}
        placeholder="Experience Level (Beginner, Intermediate, Advanced)"
        value={experience}
        onChangeText={setExperience}
      />
      <TextInput
        style={styles.input}
        placeholder="Workout Days per Week"
        value={workoutDays}
        onChangeText={setWorkoutDays}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Workout Intensity (Low, Moderate, High)"
        value={workoutIntensity}
        onChangeText={setWorkoutIntensity}
      />
      <TextInput
        style={styles.input}
        placeholder="Preferred Workout Duration (Minutes)"
        value={workoutDuration}
        onChangeText={setWorkoutDuration}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDark ? colors.accentDark : colors.accentLight },
        ]}
        onPress={() =>
          console.log({
            age,
            gender,
            height,
            weight,
            fitnessGoal,
            experience,
            workoutDays,
            workoutIntensity,
            workoutDuration,
          })
        }
      >
        <ThemedText style={styles.buttonText}>Generate Workout Plan</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
      </TouchableOpacity>
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
    textAlign: "center",
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
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#EDF2F4",
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
