import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import BarcodeScannerComponent from '@/components/ui/BarcodeScanner';

const CalorieTrackerScreen = () => {
  const [calories, setCalories] = useState('');
  const [totalCalories, setTotalCalories] = useState(0);
  const [showScanner, setShowScanner] = useState(false); // State to toggle scanner

  const addCalories = () => {
    const calorieValue = parseInt(calories);
    if (!isNaN(calorieValue)) {
      setTotalCalories(totalCalories + calorieValue);
      setCalories('');
    }
  };

  return (
    <View style={styles.container}>
      {showScanner ? (
        <BarcodeScannerComponent />
      ) : (
        <>
          <Text style={styles.title}>Calorie Tracker</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter calories"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />
          <Button title="Add Calories" onPress={addCalories} />
          <Text style={styles.total}>Total Calories: {totalCalories}</Text>
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
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  total: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default CalorieTrackerScreen;
