import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import BarcodeScannerComponent from '@/components/ui/BarcodeScanner';
import { useColorScheme } from '@/hooks/useColorScheme';

const colors = {
  backgroundLight: '#EDF2F4',
  backgroundDark: '#2B2D42',
  primaryLight: '#2B2D42',
  primaryDark: '#EDF2F4',
  accentLight: '#EF233C',
  accentDark: '#D90429',
};

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
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? colors.backgroundDark
            : colors.backgroundLight,
        },
      ]}
    >
      {showScanner ? (
        <BarcodeScannerComponent />
      ) : (
        <>
          <Text
            style={[
              styles.title,
              { color: isDark ? colors.primaryDark : colors.primaryLight },
            ]}
          >
            Calorie Tracker
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                color: isDark ? colors.primaryDark : colors.primaryLight,
                borderColor: isDark ? colors.primaryDark : colors.primaryLight,
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
          <Text
            style={[
              styles.total,
              { color: isDark ? colors.primaryDark : colors.primaryLight },
            ]}
          >
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
