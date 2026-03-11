import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import RNFS from 'react-native-fs';
import {ActivityIndicator, IconButton, Title} from 'react-native-paper';
import useActiveTheme from '../Theme/useActiveTheme';
import Toast from 'react-native-toast-message';

const VisionCamera = ({
  modalVisible,
  setModalVisible,
  setImage,
  setMeterImage,
  deviceType,
  imageType,
}) => {
  const activeTheme = useActiveTheme();
  const camera = useRef(null);
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isPhotoHdr, setIsPhotoHdr] = useState(false);

  device = useCameraDevice(deviceType);

  const checkPermission = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
  };
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

      imageType == 'profileImage'
        ? setImage(imagearry)
        : setMeterImage(imagearry);

      setModalVisible(false);
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
      paddingHorizontal: 25,
    },
    modalContent: {
      width: screenWidth,
      height: screenHeight,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    bottomContainer: {
      justifyContent: 'center',
      alignItems: 'center',
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

  const format = useCameraFormat(device, [
    {photoHdr: isPhotoHdr},
    {videoHdr: true},
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
            zoom={device?.neutralZoom}
            torch={isTorchOn ? 'on' : 'off'}
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
                  style={{backgroundColor: activeTheme.Light}}
                  size={28}
                />
              </View>
              {deviceType == 'back' && (
                <View
                  style={{
                    backgroundColor: 'rgba(0, 0,0, 0.9)',
                    borderRadius: 26,
                  }}>
                  <IconButton
                    onPress={() => setIsTorchOn(!isTorchOn)}
                    icon={isTorchOn == true ? 'flash' : 'flash-off'}
                    iconColor={activeTheme.Light}
                    size={28}
                  />
                </View>
              )}
            </View>
            <View style={styles.bottomContainer}>
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
export default VisionCamera;
