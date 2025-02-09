import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import axios from 'axios';

interface BarcodeScannerProps {
  onProductScanned: (product: Product) => void;
  onBack: () => void;
}

interface Product {
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onProductScanned,
  onBack,
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const scannedRef = useRef(false);

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

      if (foodItem) {
        const product: Product = {
          name: foodItem.food_name || 'Unknown Product',
          calories: foodItem.nf_calories || 0,
          protein: foodItem.nf_protein || 0,
          carbohydrates: foodItem.nf_total_carbohydrate || 0,
          fat: foodItem.nf_total_fat || 0,
        };

        onProductScanned(product);

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
    height: '70%',
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
});

export default BarcodeScanner;
