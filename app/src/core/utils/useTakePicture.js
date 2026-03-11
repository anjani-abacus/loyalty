import { useEffect, useState } from 'react';
import { Alert, Linking } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { Camera } from 'react-native-vision-camera';

const useTakePicture = () => {

  const takePicture = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();

    if (cameraPermission != 'granted' || cameraPermission === 'denied') {
      const newCameraPermission = await Camera.requestCameraPermission();
      if (newCameraPermission == 'granted') {
        const { assets } = await launchCamera({ mediaType: 'photo', includeBase64: true, quality: 0.3 });
        return { base64: 'data:image/jpeg;base64,' + assets[0]?.base64, uri: assets[0]?.uri };
      } else {
        Alert.alert('Camera Permission Denied !', 'This app needs camera permission to function properly. Please grant camera permission in the settings.', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Open Settings',
            onPress: () => {
              Linking.openSettings();
            },
          },

        ]);
      }
    } else {
      try {
        const { assets } = await launchCamera({ mediaType: 'photo', includeBase64: true, quality: 0.3 });
        return { base64: 'data:image/jpeg;base64,' + assets[0]?.base64, uri: assets[0]?.uri };
      } catch {
        // section to handle negative scenarios...
      }
    }
  };
  return takePicture;
};

export default useTakePicture;
