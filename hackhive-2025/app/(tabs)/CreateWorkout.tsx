import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
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

const numericQuestions = new Set([
  "What is your age?",
  "What is your height (cm)?",
  "What is your weight (kg)?",
  "How many days per week do you want to work out?",
  "What is your preferred workout duration (Minutes)?",
]);

export default function Workout() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [responses, setResponses] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const translateX = useSharedValue(0);

  const handleNext = () => {
    if (input.trim() === "") {
      setErrorMessage("Please enter a value");
      return;
    }

    if (numericQuestions.has(questions[currentQuestionIndex]) && isNaN(input)) {
      setErrorMessage("Please enter a valid numeric value");
      return;
    }

    setResponses({ ...responses, [questions[currentQuestionIndex]]: input });
    setInput("");
    setErrorMessage("");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Final Responses: ", responses);
      navigation.goBack();
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
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
          <ThemedView style={styles.header}>
            <ThemedText
              type="title"
              style={[
                styles.title,
                { color: isDark ? colors.primaryDark : colors.primaryLight },
              ]}
            >
              Create Your Workout Plan
            </ThemedText>
          </ThemedView>

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

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <ThemedText style={styles.buttonText}>Next</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
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
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
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
