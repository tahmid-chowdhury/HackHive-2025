import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import axios from 'axios';

const BarcodeScanner: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarcodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return; // Prevent multiple scans

    setScanned(true);
    setScanning(false); // Stop scanning when a barcode is scanned

    try {
      // Make an API call to Nutritionix to get product data
      const apiKey = '4dc0bac9120fe3b0cb52e5e57d2f9dc3'; // Replace with your Nutritionix API key
      const appId = '321af49c'; // Replace with your Nutritionix App ID
      const response = await axios.get(
        `https://trackapi.nutritionix.com/v2/search/item?upc=${data}`,
        {
          headers: {
            'x-app-id': appId,
            'x-app-key': apiKey,
          },
        }
      );

      const foodItem = response.data.foods[0]; // Get the first food item

      if (foodItem) {
        const productName = foodItem.food_name || 'Unknown Product';
        const calories = foodItem.nf_calories || 'N/A';
        const protein = foodItem.nf_protein || 'N/A';
        const carbohydrates = foodItem.nf_total_carbohydrate || 'N/A';
        const fat = foodItem.nf_total_fat || 'N/A';

        const message = `Product: ${productName}\nCalories: ${calories} kcal\nProtein: ${protein} g\nCarbohydrates: ${carbohydrates} g\nFat: ${fat} g`;

        // Show alert and reset scanned state immediately
        Alert.alert('Product Information', message, [
          { text: 'OK', onPress: () => resetScanner() }, // Reset scanned state
        ]);
      } else {
        // If no product found, show a single alert
        Alert.alert(
          'Product Not Found',
          'No product data available for this barcode.',
          [
            { text: 'OK', onPress: () => resetScanner() }, // Reset scanned state
          ]
        );
      }
    } catch (error) {
      // Handle error properly
      const errorMessage =
        axios.isAxiosError(error) && error.response
          ? error.response.data.message || 'Failed to fetch product data.'
          : 'An unexpected error occurred.';

      console.error('Error fetching product data:', errorMessage);
      Alert.alert('Error', errorMessage, [
        { text: 'OK', onPress: () => resetScanner() }, // Reset scanned state
      ]);
    }
  };

  const resetScanner = () => {
    setScanned(false); // Reset scanned state
    setScanning(true); // Restart scanning
  };

  const toggleScanning = () => {
    if (scanning) {
      setScanning(false);
      setScanned(false);
    } else {
      setScanning(true);
      setScanned(false);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={
          scanning && !scanned ? handleBarcodeScanned : undefined
        }
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={toggleScanning}
          disabled={scanning && scanned}
        >
          <Text style={styles.buttonText}>
            {scanning
              ? 'Cancel Scanning'
              : scanned
              ? 'Scan Again'
              : 'Press to Scan'}
          </Text>
        </TouchableOpacity>
      </View>
      {scanning && <Text style={styles.scanningText}>Scanning...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    aspectRatio: 16 / 9,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#EF233C',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  scanningText: {
    position: 'absolute',
    bottom: 100,
    fontSize: 18,
    color: '#EF233C',
    fontWeight: 'bold',
  },
});

export default BarcodeScanner;
