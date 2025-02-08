import { StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function WorkoutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconSymbol size={80} color="#EDF2F4" name="dumbbell" />
        <ThemedText type="title" style={styles.title}>
          Your Fitness Hub
        </ThemedText>
      </View>

      <ThemedText style={styles.description}>
        Track and personalize your fitness journey.
      </ThemedText>

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <ThemedText style={styles.buttonText}>+ Add New Workout</ThemedText>
      </TouchableOpacity>

      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>
          Recommended Routines
        </ThemedText>
        <TouchableOpacity style={styles.card}>
          <ThemedText style={styles.cardTitle}>🔥 HIIT Blast</ThemedText>
          <ThemedText style={styles.cardText}>
            Short and intense workouts
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <ThemedText style={styles.cardTitle}>💪 Strength Training</ThemedText>
          <ThemedText style={styles.cardText}>
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
    backgroundColor: "#2B2D42",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EDF2F4",
    marginTop: 10,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    color: "#8D99AE",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#EF233C",
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
    color: "#EDF2F4",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#8D99AE",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D90429",
  },
  cardText: {
    fontSize: 16,
    color: "#EDF2F4",
  },
});
