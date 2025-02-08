import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "@/app/(tabs)/index"; // Ensure correct path
import Workout from "@/app/(tabs)/Workout"; // Ensure correct path
import CreateWorkoutScreen from "@/app/(tabs)/CreateWorkout"; // Ensure correct path
import CalorieTracker from "@/app/(tabs)/CalorieTracker"; // Ensure correct path
import Metrics from "@/app/(tabs)/Metrics"; // added Metrics tab import

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for Workout (includes CreateWorkoutScreen)
function WorkoutStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WorkoutHome" component={Workout} />
      <Stack.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: "absolute" },
          default: {},
        }),
      }}
    >
      {/* Home Tab */}
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      {/* Workout Tab (Stack Navigation for Workout & CreateWorkout) */}
      <Tab.Screen
        name="Workout"
        component={WorkoutStack}
        options={{
          title: "Workout",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="dumbbell" color={color} />
          ),
        }}
      />

      {/* Calorie Tracker Tab */}
      <Tab.Screen
        name="Calorie"
        component={CalorieTracker}
        options={{
          title: "Calorie Tracker",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              size={28}
              name="food-apple-outline"
              color={color}
            />
          ),
        }}
      />

      {/* Metrics Tab */}
      <Tab.Screen
        name="Metrics"
        component={Metrics}
        options={{
          title: "Metrics",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="chart-line" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
