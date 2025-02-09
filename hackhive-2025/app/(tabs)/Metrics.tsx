import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { fetchMealSuggestion, fetchSnackSuggestion } from '@/components/GeminiAPI';
import { useNutrition } from '../context/NutritionContext';

const ProgressBar = ({
  progress,
  color,
}: {
  progress: number;
  color: string;
}) => (
  <View style={styles.progressBarContainer}>
    <View
      style={[
        styles.progressBar,
        { width: `${progress}%`, backgroundColor: color },
      ]}
    />
  </View>
);

type Meal = {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
};

export default function Metrics() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { totalCalories, protein, carbs, fats, addNutrition } = useNutrition();
  const calorieProgress = totalCalories ? (totalCalories / 2000) * 100 : 0;
  const proteinProgress = protein ? (protein / 100) * 100 : 0;
  const carbsProgress = carbs ? (carbs / 250) * 100 : 0;
  const fatsProgress = fats ? (fats / 70) * 100 : 0;

  const [suggestions, setSuggestions] = useState<{
    meals: Meal[];
    snack: Meal | null;
  }>({
    meals: [],
    snack: null,
  });

  const fetchSuggestions = async () => {
    const progressData = {
      totalCaloriesConsumed: totalCalories,
      totalCaloriesGoal: 2000,
      proteinConsumed: protein,
      proteinGoal: 100,
      carbsConsumed: carbs,
      carbsGoal: 250,
      fatsConsumed: fats,
      fatsGoal: 70,
    };

    const mealSuggestion = await fetchMealSuggestion(progressData);
    const snackSuggestion = await fetchSnackSuggestion(progressData);

    setSuggestions({
      meals: mealSuggestion ? [mealSuggestion] : [],
      snack: snackSuggestion || null,
    });
  };

  useEffect(() => {
    fetchSuggestions();
  }, [totalCalories, protein, carbs, fats]);

  const addMeal = (meal: Meal | null) => {
    if (!meal) return;
    addNutrition({
      calories: meal.calories,
      protein: meal.protein,
      carbohydrates: meal.carbs,
      fat: meal.fats,
    });
  };

  const lightBarColor = '#EF233C';
  const darkBarColor = '#D90429';
  const progressColor = isDark ? darkBarColor : lightBarColor;

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: isDark ? '#2B2D42' : '#EDF2F4' },
      ]}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <ThemedText type="title" style={styles.sectionTitle}>
          Metrics
        </ThemedText>

        <View
          style={[
            styles.metricSection,
            { backgroundColor: isDark ? '#D90429' : '#EF233C' },
          ]}
        >
          <ThemedText type="subtitle">Total Calorie Progress</ThemedText>
          <ProgressBar progress={calorieProgress} color={'#fff'} />
          <ThemedText style={styles.detailText}>
            {totalCalories || 0} / 2000 cal
          </ThemedText>
        </View>

        <View style={[styles.metricSection, styles.greyContainer]}>
          <ThemedText type="subtitle">Macro Breakdown</ThemedText>
          <ThemedText>Protein</ThemedText>
          <ProgressBar progress={proteinProgress} color={progressColor} />
          <ThemedText style={styles.detailText}>
            {protein || 0}g / 100g
          </ThemedText>

          <ThemedText>Carbohydrates</ThemedText>
          <ProgressBar progress={carbsProgress} color={progressColor} />
          <ThemedText style={styles.detailText}>{carbs || 0}g / 250g</ThemedText>

          <ThemedText>Fats</ThemedText>
          <ProgressBar progress={fatsProgress} color={progressColor} />
          <ThemedText style={styles.detailText}>{fats || 0}g / 70g</ThemedText>
        </View>

        <View style={[styles.metricSection, styles.greyContainer]}>
          <ThemedText type="subtitle">Recommended Options</ThemedText>

          <TouchableOpacity
            style={styles.refreshButton}
            onPress={fetchSuggestions}
          >
            <ThemedText style={styles.buttonText}>Refresh Suggestions</ThemedText>
          </TouchableOpacity>

          {suggestions.meals.map((meal, idx) => (
            <View key={idx} style={styles.mealOption}>
              <View style={styles.mealInfo}>
                <ThemedText>{meal.name}</ThemedText>
                <ThemedText style={styles.detailText}>
                  {meal.calories} cal | P: {meal.protein}g | C: {meal.carbs}g | F:{' '}
                  {meal.fats}g
                </ThemedText>
              </View>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => addMeal(meal)}
              >
                <ThemedText style={styles.buttonText}>Add</ThemedText>
              </TouchableOpacity>
            </View>
          ))}

          {suggestions.snack && (
            <View style={styles.mealOption}>
              <View style={styles.mealInfo}>
                <ThemedText>Snack: {suggestions.snack.name}</ThemedText>
                <ThemedText style={styles.detailText}>
                  {suggestions.snack.calories} cal | P:{' '}
                  {suggestions.snack.protein}g | C: {suggestions.snack.carbs}g |
                  F: {suggestions.snack.fats}g
                </ThemedText>
              </View>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => addMeal(suggestions.snack)}
              >
                <ThemedText style={styles.buttonText}>Add</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  sectionTitle: { marginBottom: 10, textAlign: 'center' },
  detailText: { marginTop: 5, fontSize: 14, textAlign: 'center' },
  progressBarContainer: {
    height: 10,
    width: '100%',
    backgroundColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 5,
  },
  progressBar: { height: '100%', borderRadius: 5 },
  metricSection: { padding: 15, borderRadius: 10, marginVertical: 10 },
  mealOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
  },
  mealInfo: { flex: 1 },
  actionButton: {
    backgroundColor: '#EF233C',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  refreshButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 12 },
  greyContainer: { backgroundColor: '#8d99ae' },
});
