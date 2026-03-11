import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  Linking,
  AppState,
  Pressable,
  Modal,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCameraFormat,
} from 'react-native-vision-camera';

import RNFS from 'react-native-fs';
import { ActivityIndicator, IconButton, Title } from 'react-native-paper';
import useActiveTheme from '../Theme/useActiveTheme';
import Toast from 'react-native-toast-message';

import { launchImageLibrary } from 'react-native-image-picker';

import { useIsFocused } from '@react-navigation/native';
import AppBoldText from '../BoldText/AppBoldText';

export const AppCamera = ({
  modalVisible,
  setModalVisible,
  isMultiple,
  onlyCamera,
  setImages,
  images,
}) => {

  const activeTheme = useActiveTheme();
  const camera = useRef(null);
  const { hasPermission, requestPermission } = useCameraPermission();

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [cameraPosition, setCameraPosition] = useState('back'); // Track active camera
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isPhotoHdr, setIsPhotoHdr] = useState(false);
  const [imageArray, setImageArray] = useState([]);
  const [permission, setPermission] = useState(false);
  const [isActive, setisActive] = useState(true);
  const isFocused = useIsFocused();

  device = useCameraDevice(cameraPosition);

  const toggleCamera = () => {
    setCameraPosition(prev => (prev === 'back' ? 'front' : 'back'));
  };

  useEffect(() => {
    AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && isFocused == true) {
        setisActive(true);
      } else {
        setisActive(false);
      }
    });
    requestPermission()
      .then(r => setPermission(r))
      .catch(err => {
        Toast.show({ type: 'error', text1: err.message, visibilityTime: 6000 });
        setPermission(false);
        Linking.openSettings();
      });
      // .finally(()=>{
      //   setViewLoader(false)
      // });
  }, [hasPermission, isFocused]);

  const takePicture = async () => {
    setButtonDisabled(true);
    setButtonLoading(true);
    if (camera != null) {
      const photo = await camera.current.takePhoto();
      const base64Image = await RNFS.readFile(photo.path, 'base64');
      let imagearry = [];
      imagearry.push({
        base64: 'data:image/jpeg;base64,' + base64Image,
        uri: photo.path,
      });

      const updatedImages = [...images, ...imagearry];
      const reverseUpdateImages = updatedImages.reverse();
      setImages(reverseUpdateImages);
      setModalVisible(false);
      // navigation.pop();
      setButtonDisabled(false);
      setButtonLoading(false);
    } else {
      setButtonDisabled(false);
      setButtonLoading(false);
    }
  };

  const styles = StyleSheet.create({
    takePictureButton: {
      width: 96,
      height: 96,
      borderRadius: 80,
      borderWidth: 10,
      borderColor: 'rgba(128, 128, 128, 0.5)',
      backgroundColor: activeTheme.White,
    },
    modalView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0)',
    },
    modalContent: {
      width: screenWidth,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 10,
    },
    galleryContainer: {
      width: '35%',
      alignItems: 'flex-end',
    },
    backButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 2,
    },

    upperContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    container: {
      justifyContent: 'space-between',
      width: '100%',
      height: '100%',
    },
  });
  const handleCameraError = error => {
    Toast.show({ type: 'error', text1: JSON.stringify(error.code), visibilityTime: 6000 });
  };

  const selectImagesFromLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: isMultiple ? 0 : 1,
        includeBase64: true,
        quality: 0.6,
      },
      handleImageSelection,
    );
  };
  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
  };
  const handleImageSelection = response => {
    if (response.didCancel) {

    } else if (response.error) {

    } else if (response.assets) {
      // Process selected images
      const selectedImages = response.assets.map(asset => ({
        base64: 'data:image/jpeg;base64,' + asset.base64,
        uri: asset.uri,
      }));

      // Update state with new images
      const updatedImages = isMultiple
        ? [...images, ...selectedImages]
        : selectedImages;
      const reverseUpdateImages = updatedImages.reverse();

      setImages(reverseUpdateImages);

      // Dispatch to Redux
    } else {
      // Handle single image selection without assets array
      const newImage = {
        uri: response.uri,
        base64: 'data:image/jpeg;base64,' + response.base64,
      };

      const updatedImages = isMultiple ? [...images, newImage] : [newImage];
      setImages(updatedImages);

      // Dispatch to Redux
      setImages(updatedImages);
    }
    setModalVisible(false);

    // navigation.pop();
  };
  const format = useCameraFormat(device, [
    { photoHdr: isPhotoHdr },
    { videoHdr: true },
  ]);



  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      animated={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFillObject}
            device={device}
            isActive={true}
            photo={true}
            torch={isTorchOn ? 'on' : 'off'}
            zoom={device?.neutralZoom}
            enableZoomGesture
            onError={handleCameraError}
            format={format}
            photoHdr={format?.supportsPhotoHdr}
          />

          <View style={styles.container}>
            <View style={styles.upperContainer}>
              <View>
                <IconButton
                  onPress={() => setModalVisible(false)}
                  icon={'arrow-left'}
                  style={{ backgroundColor: activeTheme.Light }}
                  size={28}
                />
              </View>
              <View
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  borderRadius: 26,
                }}>
                <IconButton
                  onPress={toggleCamera}
                  icon={'camera-flip'}
                  iconColor={activeTheme.Light}
                  size={28}
                />

                <IconButton
                  onPress={() => setIsTorchOn(!isTorchOn)}
                  icon={isTorchOn == true ? 'flash' : 'flash-off'}
                  iconColor={activeTheme.Light}
                  size={28}
                />
                <IconButton
                  onPress={() => setIsPhotoHdr(!isPhotoHdr)}
                  icon={isPhotoHdr ? 'hdr' : 'hdr-off'}
                  iconColor={activeTheme.Light}
                  size={28}
                />
              </View>
            </View>
            <View
              style={[
                onlyCamera == false
                  ? styles.bottomContainer
                  : { alignItems: 'center' },
              ]}>
              {onlyCamera == false && (
                <View style={styles.galleryContainer}>
                  <View style={{ alignItems: 'center' }}>
                    <IconButton
                      onPress={selectImagesFromLibrary}
                      icon={'image'}
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      }}
                      iconColor={activeTheme.Light}
                      size={35}
                    />
                    <AppBoldText>
                      <Text style={{ color: activeTheme.White }}>Gallery</Text>
                    </AppBoldText>
                  </View>
                </View>
              )}
              {buttonLoading ? (
                <View>
                  <ActivityIndicator size={96} color={activeTheme.White} />
                </View>
              ) : (
                <Pressable
                  onPress={() => takePicture()}
                  disabled={buttonDisabled}
                  style={styles.takePictureButton}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// scan Qr Code



const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  permissionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6200EA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {

    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  overlayText: {
    fontSize: 18,

    color: '#fff',
    padding: 10,
    top: 20,
    borderRadius: 5,
  },
});
