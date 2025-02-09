import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Workout from "./Workout";
import CreateWorkoutScreen from "./CreateWorkout";
import WorkoutResults from "./WorkoutResults";

// Define the type for navigation parameters within the Workout stack
export type WorkoutStackParamList = {
  WorkoutHome: undefined; // No parameters expected for the Workout Home screen
  CreateWorkout: undefined; // No parameters expected for the Create Workout screen
  WorkoutResults: undefined; // No parameters expected for the Workout Results screen
};

// Create a stack navigator instance using the defined parameter types
const Stack = createStackNavigator<WorkoutStackParamList>();

export default function WorkoutStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkoutHome" component={Workout} />
      <Stack.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
      <Stack.Screen name="WorkoutResults" component={WorkoutResults} />
    </Stack.Navigator>
  );
}
