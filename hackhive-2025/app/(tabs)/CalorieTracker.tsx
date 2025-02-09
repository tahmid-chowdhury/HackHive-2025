import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import BarcodeScannerComponent from '@/components/ui/BarcodeScanner';
import { useColorScheme } from '@/hooks/useColorScheme';

// Color theme used in all tabs
const colors = {
  backgroundLight: '#EDF2F4',
  backgroundDark: '#2B2D42',
  primaryLight: '#2B2D42',
  primaryDark: '#EDF2F4',
  accentLight: '#EF233C',
  accentDark: '#D90429',
  secondary: '#8D99AE',
};
// defines the values used in the metrics, here its being used for the user to see the macros of what they scan
interface Product {
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}
// defining params for the scanner
const CalorieTrackerScreen = () => {
  const [calories, setCalories] = useState('');
  const [totalCalories, setTotalCalories] = useState(0);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedItems, setScannedItems] = useState<Product[]>([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  // user allowed to manually add calories if they dont want to get the macros for it (quick add feature)
  const addCalories = () => {
    const calorieValue = parseInt(calories);
    if (!isNaN(calorieValue)) {
      setTotalCalories(totalCalories + calorieValue);
      setCalories('');
    }
  };

  const handleProductScanned = (product: Product) => {
    setScannedItems((prevItems) => [...prevItems, product]);
    setTotalCalories((prevTotal) => prevTotal + product.calories);
  };
  // defines the UI for the Tab
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {showScanner ? (
        <>
          <BarcodeScannerComponent onProductScanned={handleProductScanned} />
          <FlatList
            data={scannedItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text
                  style={[
                    styles.itemText,
                    {
                      color: isDark ? colors.primaryDark : colors.primaryLight,
                    },
                  ]}
                >
                  {item.name}
                </Text>
                <Text
                  style={[
                    styles.itemText,
                    {
                      color: isDark ? colors.primaryDark : colors.primaryLight,
                    },
                  ]}
                >
                  {item.calories} kcal | P: {item.protein}g | C:{' '}
                  {item.carbohydrates}g | F: {item.fat}g
                </Text>
              </View>
            )}
          />
        </>
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
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor: isDark
                  ? colors.accentDark
                  : colors.accentLight,
              },
            ]}
            onPress={addCalories}
          >
            <Text style={styles.buttonText}>Add Calories</Text>
          </TouchableOpacity>
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
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isDark ? colors.accentDark : colors.accentLight },
        ]}
        onPress={() => setShowScanner(!showScanner)}
      >
        <Text style={styles.buttonText}>
          {showScanner ? 'Back to Calorie Tracker' : 'Open Barcode Scanner'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
// styles used
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    borderWidth: 2,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  total: {
    marginTop: 20,
    fontSize: 18,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});

export default CalorieTrackerScreen;
