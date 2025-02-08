import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Workout from "./Workout";
import CreateWorkoutScreen from "./CreateWorkout";

export type WorkoutStackParamList = {
  WorkoutHome: undefined;
  CreateWorkout: undefined;
};

const Stack = createStackNavigator<WorkoutStackParamList>();

export default function WorkoutStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkoutHome" component={Workout} />
      <Stack.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
    </Stack.Navigator>
  );
}
