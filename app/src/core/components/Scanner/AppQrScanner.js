import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import {Camera, useCodeScanner} from 'react-native-vision-camera';
import {IconButton, Title} from 'react-native-paper';
import {Svg, Defs, Rect, Mask} from 'react-native-svg';
import {launchImageLibrary} from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import useActiveTheme from '../Theme/useActiveTheme';
export default function AppQrScanner({device}) {
  const activeTheme = useActiveTheme();
  const camera = useRef(null);
  const screenHeight = Dimensions.get('window').height;
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [CameraShown, setCameraShow] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [bgColor, setBgColor] = useState('');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes) {
        setShowSnackBar(true);
        setSnackMessage('hello');
        setBgColor(activeTheme.Light);
        setTimeout(() => {
          setShowSnackBar(false);
        }, 2000);
      }
    },
  });
  const CameraFrame = () => {
    return (
      <Svg height="100%" width="100%">
        <Defs>
          <Mask id="mask" x="0" y="0" height="100%" width="100%">
            <Rect height="100%" width="100%" fill="#fff" />

            <Rect
              x="10%"
              y="14%"
              height="320"
              width="320"
              fill="black"
              rx="10"
              ry="10"
            />
          </Mask>
        </Defs>
        <Rect
          height="100%"
          width="100%"
          fill="rgba(0,0,0,0.8)"
          mask="url(#mask)"
        />
        <Rect
          x="10%"
          y="14%"
          rx="10"
          ry="10"
          height="320"
          width="320"
          fill="none"
          stroke="white"
          strokeWidth="4"
        />
      </Svg>
    );
  };
  const styles = StyleSheet.create({
    takePictureButton: {
      width: 60,
      height: 60,
      borderRadius: 60,
      borderWidth: 2,
      borderColor: activeTheme.Dark,
      backgroundColor: activeTheme.Light,
    },
    backButton: {
      backgroundColor: 'rgba(0,0,0,0.0)',
      position: 'absolute',
      justifyContent: 'center',
      width: '100%',
      top: 0,
      padding: 20,
    },
    barcodeTextURL: {
      fontSize: 20,
      color: 'white',
      fontWeight: '700',
    },
  });
  const [selectedImage, setSelectedImage] = useState('');
  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        RNQRGenerator.detect({
          uri: selectedImage, // local path of the image. Can be skipped if base64 is passed.
          // base64: imageBase64String, // If uri is passed this option will be skipped.
        })
          .then(response => {
            const {values} = response; // Array of detected QR code values. Empty if nothing found.
          })
          .catch(error => {});
      }
    });
  };

  return (
    <>
      {CameraShown == true && (
        <View style={{height: screenHeight}}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            codeScanner={codeScanner}
            torch={isTorchOn ? 'on' : 'off'}
          />

          <View style={styles.backButton}>
            <IconButton
              icon={'arrow-left'}
              style={{backgroundColor: activeTheme.Light}}
              size={28}
            />
          </View>

          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
            }}>
            <CameraFrame />
            <View
              style={{
                position: 'absolute',
                top: '8%',
                left: 0,
                right: 0,
                alignItems: 'center',
              }}>
              <Title style={{color: 'white'}}>Scan Qr Code</Title>
            </View>
            <View style={styles.backButton}>
              <IconButton
                onPress={() => setCameraShow(false)}
                icon={'arrow-left'}
                style={{backgroundColor: activeTheme.Light}}
                size={28}
              />
            </View>
            <View
              style={{
                borderColor: activeTheme.Light,
                position: 'absolute',
                bottom: '35%',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '50%',
              }}>
              <IconButton
                onPress={() => setIsTorchOn(!isTorchOn)}
                icon={isTorchOn == true ? 'flash' : 'flash-off'}
                style={{backgroundColor: activeTheme.Light}}
                size={28}
              />
              <IconButton
                onPress={openImagePicker}
                icon={'image'}
                style={{backgroundColor: activeTheme.Light}}
                size={28}
              />
              {/* <SnackbarComponent
                style={{
                  position: 'absolute',
                  top: '8%',
                  left: 0,
                  right: 0,
                  alignItems: 'center',
                }}
                visible={showSnackBar}
                message={snackMessage}
                backgroundColor={bgColor}
              /> */}
            </View>
          </View>
        </View>
      )}
    </>
  );
}
