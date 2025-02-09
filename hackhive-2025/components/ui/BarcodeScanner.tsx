import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNutrition } from '@/app/context/NutritionContext';
import axios from 'axios';

interface Product {
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}

// scanner constants, used to help when defining functions, and to define what the scanner should capture
const BarcodeScanner: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null); // State to hold scanned product
  const scannedRef = useRef(false);
  const { addNutrition } = useNutrition();

  // requests permission to access camera
  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View />;
  }
  // cannot use scanner unless permission is granted
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
  // logic to fetch data from an API, fetches based on the barcode scanned
  const handleBarcodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scannedRef.current) return;

    scannedRef.current = true;

    try {
      const apiKey = '4dc0bac9120fe3b0cb52e5e57d2f9dc3';
      const appId = '321af49c';
      const response = await axios.get(
        `https://trackapi.nutritionix.com/v2/search/item?upc=${data}`,
        {
          headers: {
            'x-app-id': appId,
            'x-app-key': apiKey,
          },
        }
      );

      const foodItem = response.data.foods[0];
      // creates an instance of an empy product
      if (foodItem) {
        const product: Product = {
          name: foodItem.food_name || 'Unknown Product',
          calories: foodItem.nf_calories || 0,
          protein: foodItem.nf_protein || 0,
          carbohydrates: foodItem.nf_total_carbohydrate || 0,
          fat: foodItem.nf_total_fat || 0,
        };

        // Add nutrition to the context
        addNutrition({
          calories: product.calories,
          protein: product.protein,
          carbohydrates: product.carbohydrates,
          fat: product.fat,
        });

        // Update local state to display scanned product info
        setScannedProduct(product);

        Alert.alert('Product Scanned', `${product.name} added!`, [
          {
            text: 'OK',
            onPress: () => {
              scannedRef.current = false;
            },
          },
        ]);
      } else {
        Alert.alert('Product Not Found', 'No product data available.', [
          {
            text: 'OK',
            onPress: () => {
              scannedRef.current = false;
            },
          },
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch product data.', [
        {
          text: 'OK',
          onPress: () => {
            scannedRef.current = false;
          },
        },
      ]);
    }
  };
  // UI for the barcode scanner
  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanning ? handleBarcodeScanned : undefined}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setScanning(!scanning)}
        >
          <Text style={styles.buttonText}>
            {scanning ? 'Scanning...' : 'Press to Scan'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display Scanned Product Info */}
      {scannedProduct && (
        <View style={styles.productInfoContainer}>
          <Text style={styles.productTitle}>{scannedProduct.name}</Text>
          <Text>Calories: {scannedProduct.calories}</Text>
          <Text>Protein: {scannedProduct.protein}g</Text>
          <Text>Carbs: {scannedProduct.carbohydrates}g</Text>
          <Text>Fats: {scannedProduct.fat}g</Text>
        </View>
      )}
    </View>
  );
};
// styles used
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
    height: '60%',
    borderRadius: 10,
    overflow: 'hidden',
    aspectRatio: 16 / 9,
  },
  buttonContainer: {
    marginTop: 10,
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
  productInfoContainer: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default BarcodeScanner;
