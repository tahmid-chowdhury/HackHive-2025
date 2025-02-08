import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

const BarcodeScanner: React.FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false); // New state to track scanning status

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
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
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
    setScanning(false); // Stop scanning when a barcode is scanned

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

  const toggleScanning = () => {
    if (scanning) {
      // If currently scanning, stop scanning
      setScanning(false);
      setScanned(false); // Reset scanned state
    } else {
      // Start scanning
      setScanning(true);
      setScanned(false); // Reset scanned state
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={
          scanning && !scanned ? handleBarcodeScanned : undefined
        } // Only scan if scanning is true and not already scanned
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={toggleScanning}
          disabled={scanning && scanned} // Disable button while scanning and after a scan
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
  button: {
    backgroundColor: '#EF233C', // Set button color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Text color for the button
    fontSize: 16,
  },
  scanningText: {
    position: 'absolute',
    bottom: 100, // Position above the button
    fontSize: 18,
    color: '#EF233 C', // Color for the scanning text
    fontWeight: 'bold',
  },
});
export default BarcodeScanner;
