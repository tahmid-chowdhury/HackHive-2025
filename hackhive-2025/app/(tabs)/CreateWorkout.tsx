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
  "What is your fitness goal?",
];

const numericQuestions = new Set(questions.slice(0, 5)); // First 5 questions require numeric input

const fitnessGoals = ["Lean & Toned", "Muscular & Strong", "Bulk & Mass"]; // Options for the last question

export default function Workout() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [workoutRoutine, setWorkoutRoutine] = useState(null);
  const [loading, setLoading] = useState(false);

  const translateX = useSharedValue(0);

  const handleNext = async () => {
    if (currentQuestionIndex === 5 && !selectedGoal) {
      setErrorMessage("Please select a fitness goal.");
      return;
    }

    if (input.trim() === "" && currentQuestionIndex < 5) {
      setErrorMessage("Please enter a value.");
      return;
    }

    if (numericQuestions.has(questions[currentQuestionIndex]) && isNaN(input)) {
      setErrorMessage("Please enter a valid numeric value.");
      return;
    }

    setResponses((prev) => ({
      ...prev,
      [questions[currentQuestionIndex]]:
        currentQuestionIndex === 5 ? selectedGoal : input,
    }));
    setInput("");
    setErrorMessage("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Final Responses: ", responses);
      setLoading(true);
      try {
        const routine = await fetchWorkoutRoutine(responses);
        setWorkoutRoutine(routine);
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
          <TouchableOpacity
            style={styles.hubButton}
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: "Workout" }] })
            }
          >
            <ThemedText style={styles.buttonText}>
              🏠 Back to Workout Hub
            </ThemedText>
          </TouchableOpacity>
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

              {currentQuestionIndex === 5 ? (
                // Radio button options for last question
                fitnessGoals.map((goal) => (
                  <TouchableOpacity
                    key={goal}
                    style={styles.radioContainer}
                    onPress={() => setSelectedGoal(goal)}
                  >
                    <View
                      style={
                        selectedGoal === goal
                          ? styles.radioSelected
                          : styles.radio
                      }
                    />
                    <Text style={styles.radioText}>{goal}</Text>
                  </TouchableOpacity>
                ))
              ) : (
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
              )}

              {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
              ) : null}

              {loading ? (
                <ActivityIndicator size="large" color={colors.accentLight} />
              ) : (
                <View style={styles.buttonContainer}>
                  {/* Back button appears only after the first question */}
                  {currentQuestionIndex > 0 ? (
                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={handleBack}
                    >
                      <ThemedText style={styles.buttonText}>Back</ThemedText>
                    </TouchableOpacity>
                  ) : (
                    <View style={{ width: "30%" }} /> // Empty space to keep "Next" aligned
                  )}

                  {/* Next button always on the right */}
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
  // Add styles for radio buttons
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#8D99AE",
    marginRight: 10,
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EF233C",
    marginRight: 10,
  },
  radioText: {
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  button: {
    backgroundColor: "#EF233C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "#8D99AE",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#8D99AE",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  hubButton: {
    backgroundColor: "#EF233C",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
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
