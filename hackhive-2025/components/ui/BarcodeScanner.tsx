import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const BarcodeScanner: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarcodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (scanned) return; // Prevent multiple scans

    setScanned(true);
    Alert.alert(
      'Scanned barcode!',
      `Type: ${type}\nData: ${data}`,
      [
        {
          text: 'OK',
          onPress: () => setScanned(false), // Reset scanned state
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />
      {scanned && (
        <View style={styles.buttonContainer}>
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        </View>
      )}
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
    width: '90%', // Set width to 90% of the screen
    height: 200, // Set a fixed height for the camera view (adjust as needed)
    borderRadius: 10, // Optional: rounded corners
    overflow: 'hidden', // Ensure the camera view respects the border radius
    aspectRatio: 16 / 9, // Maintain a 16:9 aspect ratio (or adjust as needed)
  },
  buttonContainer: {
    position: 'absolute', // Position the button absolutely
    bottom: 50, // Adjust the distance from the bottom as needed
    alignItems: 'center', // Center the button horizontally
  },
});

export default BarcodeScanner;
