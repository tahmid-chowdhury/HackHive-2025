import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useNavigation } from "@react-navigation/native";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

import { fetchWorkoutRoutine } from "@/components/GeminiAPI"; // Import function

const { width } = Dimensions.get("window");

const colors = {
  backgroundLight: "#EDF2F4",
  backgroundDark: "#2B2D42",
  primaryLight: "#2B2D42",
  primaryDark: "#EDF2F4",
  accentLight: "#EF233C",
  accentDark: "#D90429",
  secondary: "#8D99AE",
};

const questions = [
  "What is your age?",
  "What is your height (cm)?",
  "What is your weight (kg)?",
  "How many days per week do you want to work out?",
  "What is your preferred workout duration (Minutes)?",
];

const numericQuestions = new Set(questions);

export default function Workout() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [workoutRoutine, setWorkoutRoutine] = useState(null);
  const [loading, setLoading] = useState(false);

  const translateX = useSharedValue(0);

  const handleNext = async () => {
    if (input.trim() === "") {
      setErrorMessage("Please enter a value");
      return;
    }

    if (numericQuestions.has(questions[currentQuestionIndex]) && isNaN(input)) {
      setErrorMessage("Please enter a valid numeric value");
      return;
    }

    setResponses((prev) => ({
      ...prev,
      [questions[currentQuestionIndex]]: input,
    }));
    setInput("");
    setErrorMessage("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Final Responses: ", responses);
      setLoading(true); // Show loading indicator
      try {
        const routine = await fetchWorkoutRoutine(responses);
        setWorkoutRoutine(routine); // Save routine to state
      } catch (error) {
        console.error("Error fetching workout routine:", error);
        setErrorMessage("Failed to generate workout routine. Try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setErrorMessage("");
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      {workoutRoutine ? (
        <ScrollView style={styles.resultsContainer}>
          <ThemedText type="title" style={styles.title}>
            Your Personalized Workout
          </ThemedText>
          {workoutRoutine.routine.map((exercise, index) => (
            <View key={index} style={styles.exerciseContainer}>
              <Text style={styles.exerciseName}>{exercise.exercise}</Text>
              <Text style={styles.setsReps}>
                {exercise.sets} Sets × {exercise.reps} Reps
              </Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <>
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${
                    ((currentQuestionIndex + 1) / questions.length) * 100
                  }%`,
                },
              ]}
            />
          </View>

          <PanGestureHandler
            onGestureEvent={(event) => {
              if (event.nativeEvent.translationX < -50) {
                handleNext();
                translateX.value = withSpring(-width, {}, () => {
                  translateX.value = 0;
                });
              }
            }}
          >
            <Animated.View style={[styles.questionContainer, animatedStyle]}>
              <ThemedText
                type="title"
                style={[
                  styles.title,
                  { color: isDark ? colors.primaryDark : colors.primaryLight },
                ]}
              >
                Create Your Workout Plan
              </ThemedText>

              <ThemedText style={styles.questionText}>
                {questions[currentQuestionIndex]}
              </ThemedText>

              <TextInput
                style={styles.input}
                placeholder="Type your answer here..."
                value={input}
                onChangeText={setInput}
                keyboardType={
                  numericQuestions.has(questions[currentQuestionIndex])
                    ? "numeric"
                    : "default"
                }
                placeholderTextColor="#8D99AE"
              />

              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}

              {loading ? (
                <ActivityIndicator size="large" color={colors.accentLight} />
              ) : (
                <View style={styles.buttonContainer}>
                  {currentQuestionIndex > 0 && (
                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={handleBack}
                    >
                      <ThemedText style={styles.buttonText}>Back</ThemedText>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <ThemedText style={styles.buttonText}>Next</ThemedText>
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
              >
                <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </>
      )}
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultsContainer: {
    flex: 1,
    width: "100%",
    padding: 20,
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
  progressBarContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#EF233C",
  },
  questionContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8D99AE",
    color: "#2B2D42",
    width: "80%",
    textAlign: "center",
    marginBottom: 15,
  },
});
