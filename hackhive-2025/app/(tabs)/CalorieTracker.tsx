import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import BarcodeScannerComponent from '@/components/ui/BarcodeScanner';
import { useColorScheme } from '@/hooks/useColorScheme';

const CalorieTrackerScreen = () => {
  const [calories, setCalories] = useState('');
  const [totalCalories, setTotalCalories] = useState(0);
  const [showScanner, setShowScanner] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const addCalories = () => {
    const calorieValue = parseInt(calories);
    if (!isNaN(calorieValue)) {
      setTotalCalories(totalCalories + calorieValue);
      setCalories('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#000000' : '#ffffff' }]}>
      {showScanner ? (
        <BarcodeScannerComponent />
      ) : (
        <>
          <Text style={[styles.title, { color: isDark ? '#ffffff' : '#000000' }]}>
            Calorie Tracker
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                color: isDark ? '#ffffff' : '#000000',
                borderColor: isDark ? '#ffffff' : '#000000',
                backgroundColor: isDark ? '#333333' : '#ffffff',
              },
            ]}
            placeholder="Enter calories"
            placeholderTextColor={isDark ? '#cccccc' : '#888888'}
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />
          <Button title="Add Calories" onPress={addCalories} />
          <Text style={[styles.total, { color: isDark ? '#ffffff' : '#000000' }]}>
            Total Calories: {totalCalories}
          </Text>
        </>
      )}
      <Button
        title={showScanner ? 'Back to Calorie Tracker' : 'Open Barcode Scanner'}
        onPress={() => setShowScanner(!showScanner)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // backgroundColor overridden via inline style based on color scheme
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    // color overridden via inline style
  },
  input: {
    height: 40,
    borderWidth: 2,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    // borderColor, backgroundColor, text color overridden via inline style
  },
  total: {
    marginTop: 20,
    fontSize: 18,
    // color overridden via inline style
  },
});

export default CalorieTrackerScreen;
