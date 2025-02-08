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
    if (scanned) return;

    setScanned(true);
    setScanning(false);

    try {
      // Make an API call to get product data
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${data}.json`
      );
      const product = response.data.product;

      if (product) {
        const productName = product.product_name || 'Unknown Product';
        const calories = product.nutriments?.energy_kcal || 'N/A';
        const message = `Product: ${productName}\nCalories: ${calories} kcal`;

        Alert.alert('Product Information', message, [
          { text: 'OK', onPress: () => setScanned(false) },
        ]);
      } else {
        Alert.alert('Error', 'Product not found.', [
          { text: 'OK', onPress: () => setScanned(false) },
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to fetch product data.', [
        { text: 'OK', onPress: () => setScanned(false) },
      ]);
    }
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
