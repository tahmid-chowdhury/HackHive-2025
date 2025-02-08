import React from "react";
import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
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

export default function WorkoutScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? colors.backgroundDark : colors.backgroundLight },
      ]}
    >
      <View style={styles.header}>
        <IconSymbol size={80} color={isDark ? colors.primaryDark : colors.primaryLight} name="dumbbell" />
        <ThemedText type="title" style={[styles.title, { color: isDark ? colors.primaryDark : colors.primaryLight }]}>
          Your Fitness Hub
        </ThemedText>
      </View>

      <ThemedText style={[styles.description, { color: isDark ? colors.secondary : colors.primaryLight }]}>
        Track and personalize your fitness journey.
      </ThemedText>

      <TouchableOpacity style={[styles.button, { backgroundColor: isDark ? colors.accentDark : colors.accentLight }]} onPress={() => {}}>
        <ThemedText style={styles.buttonText}>+ Add New Workout</ThemedText>
      </TouchableOpacity>

      <View style={styles.section}>
        <ThemedText style={[styles.sectionTitle, { color: isDark ? colors.primaryDark : colors.primaryLight }]}>
          Recommended Routines
        </ThemedText>
        <TouchableOpacity style={[styles.card, { backgroundColor: colors.secondary }]} >
          <ThemedText style={[styles.cardTitle, { color: colors.accentDark }]}>🔥 HIIT Blast</ThemedText>
          <ThemedText style={[styles.cardText, { color: isDark ? colors.primaryDark : colors.primaryLight }]}>
            Short and intense workouts
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: colors.secondary }]} >
          <ThemedText style={[styles.cardTitle, { color: colors.accentDark }]}>💪 Strength Training</ThemedText>
          <ThemedText style={[styles.cardText, { color: isDark ? colors.primaryDark : colors.primaryLight }]}>
            Build muscle and endurance
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor overridden via inline style
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
    marginBottom: 20,
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
});
