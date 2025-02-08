import { StyleSheet, Image } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";

export default function WorkoutScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="dumbbell"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Workout Routines</ThemedText>
      </ThemedView>
      <ThemedText>
        Plan and track your workout routines to stay on top of your fitness
        goals.
      </ThemedText>

      <Button
        title="Create New Routine"
        onPress={() => {
          /* Handle navigation to create routine */
        }}
      />

      <Collapsible title="Full Body Workout">
        <ThemedText>
          - Squats: 4 sets of 10 reps - Deadlifts: 3 sets of 8 reps - Bench
          Press: 3 sets of 10 reps - Pull-ups: 3 sets of 10 reps
        </ThemedText>
      </Collapsible>

      <Collapsible title="Upper Body Strength">
        <ThemedText>
          - Overhead Press: 3 sets of 10 reps - Bent-over Rows: 3 sets of 8 reps
          - Dips: 3 sets of 12 reps - Bicep Curls: 3 sets of 15 reps
        </ThemedText>
      </Collapsible>

      <Collapsible title="Lower Body Focus">
        <ThemedText>
          - Bulgarian Split Squats: 3 sets of 10 reps per leg - Romanian
          Deadlifts: 3 sets of 8 reps - Calf Raises: 4 sets of 15 reps - Leg
          Press: 3 sets of 12 reps
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
