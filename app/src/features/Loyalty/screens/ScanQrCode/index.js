import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Alert,
  Linking,
  SafeAreaView,
  AppState,
  useWindowDimensions,
  Pressable,
  Modal,
  Clipboard,
  ScrollView,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
  useCameraFormat,
} from 'react-native-vision-camera';
import ConfettiCannon from 'react-native-confetti-cannon';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import * as Animatable from 'react-native-animatable';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import AppLoader, { AppLoader2 } from '../../../../core/components/Loader/AppLoader';
import { ActivityIndicator, IconButton, Title } from 'react-native-paper';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import Geolocation from '@react-native-community/geolocation';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import Svg, { Defs, Mask, Rect } from 'react-native-svg';
import { launchImageLibrary } from 'react-native-image-picker';
import RNQRGenerator from 'rn-qr-generator';
import { Button, Icon } from '@rneui/themed';

import { useIsFocused } from '@react-navigation/native';
import AppButton from '../../../../core/components/Button/AppButton';
import { useTranslation } from 'react-i18next';
import useCache from '../../../../core/utils/useCache';
import { EnterCouponCode } from './EnterCouponCode';
import useCoupon from '../../../../api/hooks/useCoupon';
import { AuthContext } from '../../../../auth/AuthContext';
import { AuthorizationScreen } from '../../../../core/components/No_Internet_Connection/AppNoInternet';
import { Images } from '../../../../core/assets';
import { CallHistoryIcon, CheckIcon, CloseIcon, CopyButton, DynamicSvg, EmailIcon, FAQIcon, PhoneIcon, RupeeIcon, ScanQrIcon, SuccessCircle } from '../../../../core/assets/SVGs/svg';
import FastImage from 'react-native-fast-image';


const scanCodeHandler = async (codes, Scanning) => {
  // const toast = useToast();
  //  const permissionApproved = await requestGeolocationPermission()
  // return false;
  Geolocation.getCurrentPosition(
    async position => {
      Scanning({
        coupon_code: codes[0].value,
        lat: String(position.coords.latitude),
        lng: String(position.coords.longitude),
      });
    },
    error => {
      // toast.show(t(error.message), { type: 'danger', duration: 3000 });
    },
  );

};

const ScocialSection = ({ styles, navigation }) => {
  const { t } = useTranslation();
  const phoneNumber = '+918860773585';
  const message = 'QR Scanning failed, reason: already qr scanned.';

  const openWhatsApp = () => {
    let url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(() => {
    });
  };

  const openFaq = () => {
    navigation.navigate('FAQ');
  };

  const tiles = [
    {
      'title': t('FAQ'),
      handler: openFaq,
      'options': { 'id': 1 },
      'bgColor': '#FFF1D9',
      'svg': FAQIcon,
      'fill': '#FFA000',
    },
    {
      'title': t('Whatsapp'),
      handler: openWhatsApp,
      'bgColor': '#e3ffd9ff',
      'fill': '#52d506ff',
      'svg': PhoneIcon,
    },
    // {
    //   "title": t("Call"),
    //   "navigateTo": "https://www.linkedin.com/company/basiq360/posts/?feedView=all",
    //   "bgColor": "#d9dfffff",
    //   "fill":"#0033ffff",
    //   "svg":CallHistoryIcon,
    // },
    // {
    //   "title": t("Mail"),
    //   "navigateTo": "https://x.com/basiq360",
    //   "bgColor": "#f2d9ffff",
    //   "fill":"#8800ffff",
    //   "svg":EmailIcon,
    // }
  ];

  const openLink = async (url) => {
    // Check if the link can be opened
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.error('Failed to open URL:', err);
    }
  };

  return (
    <>
      <ScrollView horizontal style={[{ paddingBottom: 10 }]}>
        <View style={{ flex: 1, flexDirection: 'row', gap: 10, justifyContent: 'space-between' }}>
          {
            tiles?.map((element, i) => {
              return <TouchableOpacity key={i} style={{ flex: 1, backgroundColor: element?.bgColor, borderWidth: 0.5, borderColor: '#ccc', borderRadius: 5, padding: 8 }} onPress={element?.handler}>
                <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                  <DynamicSvg width={42} height={42} fill={element?.fill} stroke={element?.fill} iconName={element?.svg} />
                  <Text numberOfLines={2} style={{ color: element?.fill, fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{element?.title}</Text>
                </View>
              </TouchableOpacity>;
            })
          }
        </View>
      </ScrollView>
    </>
  );
};

const ScanQRCode = ({ navigation }) => {

  const { hasPermission, requestPermission } = useCameraPermission();
  const { mutate: scanCouponMutate } = useCoupon();
  const [activeData, setActiveData] = useState(null);

  const { t } = useTranslation();
  const explosion = useRef(null);
  const startConfetti = () => {
    if (explosion.current) {
      explosion.current.start();
    }
  };
  const [dialogStatus, setDialogStatus] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const device = useCameraDevice('back');
  const inputRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  };
  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.dismiss();
    }
  };

  const openDialog = () => {
    setDialogStatus(true);
  };

  const closeDialog = () => {
    setDialogStatus(false);
  };

  const copyToClipboard = (content) => {
    Clipboard.setString(content);
  };

  const [isValidScanning, setIsValidScanning] = useState(true);
  const org_data = null;
  // const userData = useSelector(state => state.Home.userData);
  const { credentials, error, loader } = useCache();
  const { loginData } = useContext(AuthContext);
  const userData = credentials?.userData;
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [permission, setPermission] = useState(false);
  const [viewLoader, setViewLoader] = useState(true);
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useActiveTheme();
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isActive, setisActive] = useState(true);
  const isFocused = useIsFocused();
  const [zoomLevel, setZoomLevel] = useState(device.minZoom);
  const { height, width } = useWindowDimensions();
  // const appStateStatus = AppState.currentState;
  const [modalVisible, setModalVisible] = useState(false);
  const frameWidth = width * 0.8; // 80% of screen width
  const frameHeight = frameWidth; // Square frame
  const offsetX = (width - frameWidth) / 2; // Center horizontally
  const offsetY = (height - frameHeight) / 2.5; // Center vertically

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && isFocused == true) {
        setisActive(true);
      } else {
        setisActive(false);
      }
    });
    requestPermission()
      .then(r => setPermission(r))
      .catch(err => {
        Toast.show({ type: 'error', text1: err.message, visibilityTime: 3000 });
        setPermission(false);
      }).finally(() => {

        setViewLoader(false);
      });

    return () => {
      subscription.remove(); // Clean up!
    };

  }, [hasPermission, isFocused]);

  const Scanning = async payload => {
    if (!isValidScanning) {return;}

    try {
      if (loginData?.status_of_profile?.toLowerCase() != 'approved') {
        Toast.show({
          type: 'error',
          text1: 'Your current profile status is not Approved. You can  scan coupon if your profile status is Approved. To know more, you can call us ',
          visibilityTime: 6000,
        });
        return;
      }
      // setIsRefreshing(true);
      scanCouponMutate({
        coupon_code: payload?.coupon_code, is_mobile_manual_scan: 1, lat: payload?.lat, lng: payload?.lng,
      }, {
        onSuccess: (resp) => {
          closeBottomSheet();
          setDialogType('Success');
          setActiveData({ ...resp?.data, ...payload });


          ReactNativeHapticFeedback.trigger('notificationSuccess',
            { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
        },
        onError: (resp) => {
          setActiveData({ ...resp, ...payload });
          setDialogType('Failure');
          // Toast.show({
          //   type: 'error',
          //   text1: resp?.message || 'Something went wrong',
          //   visibilityTime: 2000,
          // });

          // Toast.show({
          //   type: 'customError',
          //   text1: resp?.message || 'Something went wrong',
          //   text2: `Scanned: ${String(payload?.coupon_code).toUpperCase()}`,
          //   visibilityTime: 4000,
          // });
        },
        onSettled: () => {
          setDialogStatus(true);

            startConfetti();

        },
      });

      setIsRefreshing(false);
    } catch (error) {
      Toast.show({ type: 'error', text1: t(error), visibilityTime: 3000 });
    } finally {
      ReactNativeHapticFeedback.trigger('impactHeavy', { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
      setIsValidScanning(false);
      setTimeout(() => {
        setIsValidScanning(true);
      }, 3000);
    }

  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],

    onCodeScanned: (codes) => scanCodeHandler(codes, Scanning),
  });

  if (viewLoader) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>;
  }

  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          {t('Allow Camera Permission')}
        </Text>
        <Text style={styles.descriptionText}>
          {t('This app needs permission to access your camera to scan the QR code.')}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Linking.openSettings()}>
          <Text style={styles.buttonText}>{t('Go to Settings')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (device == null) {
    Toast.show({ type: 'error', text1: t('Device Not Found!'), visibilityTime: 3000 });
    return (
      <ActivityIndicator
        size="large"
        color="#3CF33A"
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
    );
  }

  const CameraFrame = () => {
    return (
      <>
        <Svg height={height} width={'100%'} position="absolute">
          <Defs>
            <Mask id="mask" x="0" y="0" height="100%" width="100%">
              <Rect height="100%" width="100%" fill="#fff" />

              <Rect
                x={offsetX}
                y={offsetY}
                height={frameHeight}
                width={frameWidth}
                fill="black"
                rx="10"
                ry="10"
              />
            </Mask>
          </Defs>
          <Rect
            height="100%"
            width="100%"
            fill="rgba(0,0,0,0.7)"
            mask="url(#mask)"
          />
          <Rect
            x={offsetX}
            y={offsetY}
            rx="10"
            ry="10"
            height={frameHeight}
            width={frameWidth}
            fill="none"
          />
        </Svg>
        <CornerBox />
      </>
    );
  };

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
        // setSelectedImage(imageUri);

        RNQRGenerator.detect({
          uri: imageUri, // local path of the image. Can be skipped if base64 is passed.
          // base64: imageBase64String, // If uri is passed this option will be skipped.
        })
          .then(response => {
            const { values } = response; // Array of detected QR code values. Empty if nothing found.
            if (values.length != 0) {
              if (org_data?.scanning_geo_loaction === 1) {
                Geolocation.getCurrentPosition(
                  async position => {
                    Scanning({
                      coupon_code: values[0],
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    });
                  },
                  error => {
                    Toast.show({ type: 'error', text1: t(error.message), visibilityTime: 3000 });
                  },
                );
              } else {
                Scanning({ coupon_code: values[0] });
              }
            } else {
              Toast.show({
                type: 'error',
                text1: 'Cannot detect QR code in image',
                visibilityTime: 3000,
              });
            }
          })
          .catch(error => {
            Toast.show({
              type: 'error',
              text1: 'Cannot detect QR code in image',
              visibilityTime: 3000,
            });
          });
      }
    });
  };

  const handleCameraError = error => {
    // if (error.code != 'session/invalid-output-configuration') {
    // toast.show(JSON.stringify(error.code), { type: 'danger', duration: 3000 });
    // }
  };

  const CornerBox = () => {
    const styles = StyleSheet.create({

      box: {
        width: frameWidth,
        height: frameHeight,
        position: 'absolute',
        top: offsetY,
        left: offsetX,

      },
      corner: {
        width: 60,
        height: 60,
        borderColor: 'white',
        position: 'absolute',
      },
      topLeft: {
        top: 0,
        left: 0,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderTopLeftRadius: 10,
      },
      topRight: {
        top: 0,
        right: 0,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderTopRightRadius: 10,
      },
      bottomLeft: {
        bottom: 0,
        left: 0,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderBottomLeftRadius: 10,
      },
      bottomRight: {
        bottom: 0,
        right: 0,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderBottomRightRadius: 10,
      },
    });

    return (
      <View style={styles.box}>
        {/* Corner Borders */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
      </View>
    );
  };

  if (loginData?.status_of_profile?.toLowerCase() != 'approved') {
    return <AuthorizationScreen image={Images.scanNotAllowed} imageSize={'contain'} handler={false} title={t('Not Allowed To Scan')} message={t('Scanning Not Allowed Message')} />;
  }



  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[GlobelStyle.container]}>
        {isRefreshing ? (
          <AppLoader2 loading={isRefreshing} color={'red'} size={40} />
        ) : (
          <>
            {!dialogStatus && <Camera
              style={[StyleSheet.absoluteFill]}
              device={device}
              isActive={isActive}
              codeScanner={codeScanner}
              // style={StyleSheet.absoluteFillObject}
              torch={isTorchOn ? 'on' : 'off'}
              zoom={zoomLevel}
              maxZoom={device.maxZoom}
              enableZoomGesture
              onError={handleCameraError}
            />}

            <View style={{ flex: 1, height: height, gap: 30, zIndex: 100 }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 80,
                paddingHorizontal: 10,
                alignItems: 'flex-end',
              }}>
                <IconButton
                  onPress={() => navigation.goBack()}
                  icon={'arrow-left'}
                  style={{ backgroundColor: '#666' }}
                  iconColor="#fff"
                  size={20}
                />
                <IconButton
                  onPress={() => setIsTorchOn(!isTorchOn)}
                  icon={isTorchOn == true ? 'flash' : 'flash-off'}
                  style={{ backgroundColor: '#666' }}
                  iconColor="#fff"
                  size={20}
                />
              </View>
              <View
                style={{
                  zIndex: 100,
                  alignSelf: 'center',
                  width: '50%',
                  justifyContent: 'flex-end',
                }}>
                <Title style={{ textAlign: 'center', color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  {t('Scan Codes, Earn Points And Get Gifts !')}
                </Title>
                <Icon
                  name="gift"
                  type="antdesign"
                  color={'white'}
                  size={20}
                />
              </View>

              <View style={{ alignItems: 'center', gap: 10, flex: 1 }}>
                <View style={{
                  height: 320,
                  width: '80%',
                }} />
                <View>
                  <AppButton
                    title={<Text style={{ textDecorationLine: 'underline' }}>{t('Upload from gallery')}</Text>}
                    mode={'none'}
                    loading={false}
                    disabled={false}
                    onPress={openImagePicker}
                  />
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-start', paddingBottom: 40 }}>
                  <AppButton
                    title={<View style={{ flexDirection: 'row', gap: 10 }}>
                      <Icon
                        name={'keyboard'}
                        type="material"
                        color={activeTheme.Snow}
                        size={20}
                      />
                      <Text style={{ color: 'white' }}>
                        {t('Enter Manually')}
                      </Text>
                    </View>}
                    mode={'contained'}
                    loading={false}
                    disabled={false}
                    style={{ borderRadius: 60 }}
                    color={'#666'}
                    // onPress={() => setModalVisible(true)}
                    onPress={() => openBottomSheet()}
                  />
                </View>

              </View>
            </View>
            <CameraFrame />

            <Modal
              animationType="slide"
              transparent={true}
              visible={dialogStatus}
              animated={true}
              onRequestClose={() => {
                setModalVisible(false);
              }}>
              {/* <ScrollView showsVerticalScrollIndicator={false}> */}
              <View style={styles.modalView}>
                <View style={styles.modalContent}>


                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      width: '100%',
                      marginBottom: 20,
                    }}>
                    <TouchableOpacity onPress={() => { console.log('active data ===> ', activeData); closeDialog(); }}>
                      <CloseIcon />
                    </TouchableOpacity>
                  </View>

                  {/* FAILURE DIALOG */}
                  {dialogType == 'Failure' && <>
                    <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                      <View style={{
                        position: 'relative',
                      }}>
                        <Animatable.View
                          animation={{
                            0: { scale: 0, opacity: 1 },
                            1: { scale: 1, opacity: 0 }, // expand & fade out
                          }}
                          iterationCount="infinite"
                          duration={2000}
                          easing="ease-out"
                          style={{
                            position: 'absolute',
                            width: 160,
                            top: -35,
                            left: -35,
                            height: 160,
                            borderRadius: 100,
                            backgroundColor: '#f6dedeff',
                            zIndex: -1,
                          }}
                        />
                        <Animatable.View
                          animation={{
                            0: { scale: 0, opacity: 1 },
                            1: { scale: 1, opacity: 0 }, // expand & fade out
                          }}
                          iterationCount="infinite"
                          duration={2000}
                          easing="ease-out"
                          style={{
                            position: 'absolute',
                            width: 130,
                            top: -20,
                            left: -20,
                            height: 130,
                            borderRadius: 100,
                            backgroundColor: '#c23d3dff',
                            zIndex: -1,
                          }}
                        />

                        <Animatable.View
                          animation="pulse"
                          iterationCount="infinite"
                          duration={2000}
                          easing="ease-out"
                          style={{
                            zIndex: -1,
                          }}
                        >
                          <View style={{
                            backgroundColor: '#c23d3dff',
                            width: 90,
                            height: 90,
                            borderRadius: 90,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                            <CloseIcon size={52} color="#fff" />
                          </View>
                        </Animatable.View>
                      </View>
                      <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        gap: 4,
                      }} />

                      <ScrollView>
                        <View style={{ alignItems: 'center' }}>


                          <Text style={{ marginTop: 10, color: 'rgba(228, 137, 137, 1)' }}>Scanned QR</Text>
                          <TouchableOpacity onPress={() => copyToClipboard((activeData?.coupon_code || ''))}>
                            <Text style={{ color: '#f00', alignItems: 'center' }}>{activeData?.coupon_code?.toUpperCase()} <CopyButton fill="#f00" /></Text>
                          </TouchableOpacity>

                          <Text style={{
                            color: '#000000',
                            textAlign: 'center',
                            marginTop: 40,
                            fontWeight:'bold',
                            color:'red',
                            fontSize:18,
                            marginBottom: 10,
                          }}>{activeData?.message}</Text>

                          <Text style={{
                            color: '#000000',
                            textAlign: 'center',
                            marginBottom: 10,
                          }}>For any query <Text style={{ color: '#003EEE' }}>contact us:</Text></Text>

                          <ScocialSection navigation={navigation} />


                          {/* <FastImage
                        style={[{ width: 200, height: 80 }]}
                        resizeMode={FastImage.resizeMode.contain}
                        source={Images.LoyaltyLogo}
                      /> */}
                          <TouchableOpacity
                            onPress={() => closeDialog()}
                            style={{
                              backgroundColor: '#FFF1D9',
                              paddingVertical: 8,
                              paddingHorizontal: 15,
                              borderRadius: 6,
                              width: 200,
                              borderWidth: 1,
                              borderColor: '#FFA000',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexDirection: 'row',
                              gap: 10,
                            }}>
                            <Text style={{ fontSize: 20, color: '#FFA000', textAlign: 'center' }}>Retry</Text>
                            <ScanQrIcon fill="#FFA000" height={20} width={20} />
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => navigation.navigate('PointHistory')}>
                            <Text style={{
                              marginTop: 10,
                              fontSize: 16,
                              color: '#003EEE',
                              textDecorationColor: '#003EEE',
                              textDecorationStyle: 'solid',
                              textDecorationLine: 'underline',
                            }}>View History?</Text>
                          </TouchableOpacity>
                        </View>
                      </ScrollView>
                    </View>
                  </>
                  }


                  {/* SUCCESS DIALOG */}
                  {dialogType == 'Success' && <>
                    <ConfettiCannon
                      count={200}
                      origin={{ x: 180, y: -15 }}
                      autoStart={false}          // stop auto trigger
                      ref={explosion}
                      fadeOut={true}
                      explosionSpeed={300}
                      fallSpeed={2000}
                      colors={['#ff0', '#0f0', '#00f', '#f0f', '#0ff', '#f00']}
                    />
                    <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                      <View style={{
                        position: 'relative',
                      }}>
                        <Animatable.View
                          animation={{
                            0: { scale: 0, opacity: 1 },
                            1: { scale: 1, opacity: 0 }, // expand & fade out
                          }}
                          iterationCount="infinite"
                          duration={2000}
                          easing="ease-out"
                          style={{
                            position: 'absolute',
                            width: 160,
                            top: -35,
                            left: -35,
                            height: 160,
                            borderRadius: 100,
                            backgroundColor: '#DEF6EA',
                            zIndex: -1,
                          }}
                        />
                        <Animatable.View
                          animation={{
                            0: { scale: 0, opacity: 1 },
                            1: { scale: 1, opacity: 0 }, // expand & fade out
                          }}
                          iterationCount="infinite"
                          duration={2000}
                          easing="ease-out"
                          style={{
                            position: 'absolute',
                            width: 130,
                            top: -20,
                            left: -20,
                            height: 130,
                            borderRadius: 100,
                            backgroundColor: '#3DC27D',
                            zIndex: -1,
                          }}
                        />

                        <Animatable.View
                          animation="pulse"
                          iterationCount="infinite"
                          duration={2000}
                          easing="ease-out"
                          style={{
                            zIndex: -1,
                          }}
                        >
                          <SuccessCircle width={90} height={90} />
                        </Animatable.View>
                      </View>
                      <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        gap: 4,
                      }}>
                        <Text style={{
                          fontSize: 52,
                          color: '#000',
                          fontWeight: 'bold',
                        }}>{activeData?.result?.totalPoints || 0}</Text>
                      </View>
                      <View style={{
                        alignItems: 'center',
                      }}>
                        <Text style={{
                          color: '#000000',
                          fontSize: 22,
                        }}>Point Earned</Text>
                        <Text style={{
                          color: '#000000',
                          fontSize: 22,
                        }}>From</Text>

                        <Text style={{ marginTop: 10 }}>Scanned QR</Text>
                        <TouchableOpacity onPress={() => copyToClipboard((activeData?.coupon_code || ''))}>
                          <Text style={{ color: '#000', alignItems: 'center' }}>{activeData?.coupon_code?.toUpperCase() || 'XXXXXXXXXXX'} <CopyButton fill="#000" /></Text>
                        </TouchableOpacity>

                        <FastImage
                          style={[{ width: 200, height: 80 }]}
                          resizeMode={FastImage.resizeMode.contain}
                          source={Images.LoyaltyLogo}
                        />
                        <TouchableOpacity
                          onPress={() => closeDialog()}
                          style={{
                            backgroundColor: '#003EEE',
                            paddingVertical: 8,
                            paddingHorizontal: 15,
                            borderRadius: 6,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            gap: 10,
                          }}>
                          <Text style={{ fontSize: 20, color: '#fff', textAlign: 'center' }}>Scan More</Text>
                          <ScanQrIcon fill="#fff" height={20} width={20} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('PointHistory')}>
                          <Text style={{
                            marginTop: 10,
                            fontSize: 16,
                            color: '#003EEE',
                            textDecorationColor: '#003EEE',
                            textDecorationStyle: 'solid',
                            textDecorationLine: 'underline',
                          }}>View History?</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </>}
                </View>
              </View>
            </Modal>


            <BottomSheetModal
              index={0}
              ref={bottomSheetRef}
              snapPoints={['60%']}
              enablePanDown={true}
              backdropComponent={(props) => (
                <BottomSheetBackdrop
                  {...props}
                  appearsOnIndex={0}
                  disappearsOnIndex={-1}
                  pressBehavior="none" // disables tap to close
                />
              )}
              keyboardBehavior="interactive" // important!
              keyboardBlurBehavior="restore" // optional, better UX
              onChange={(index) => {
                if (index === -1) {
                  closeBottomSheet();
                }
              }}
            >
              <EnterCouponCode
                scanCodeHandler={scanCodeHandler}
                Scanning={Scanning}
                bottomSheetRef={bottomSheetRef}
                openBottomSheet={openBottomSheet}
                closeBottomSheet={closeBottomSheet}
                modalVisible={modalVisible}
                inputRef={inputRef}
                setModalVisible={setModalVisible}
                userType={''}
              />
            </BottomSheetModal>
          </>
        )
        }
      </SafeAreaView >
    </BottomSheetModalProvider>
  );
};
export default ScanQRCode;

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(175, 173, 173, 0.7)',
    backgroundColor: 'rgba(202, 202, 202, 0.4)',
    paddingHorizontal: 15,
    marginTop: -10,
  },
  modalContent: {
    width: '100%',
    padding: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: '100%',
  },
  modalText: {
    fontSize: 18,
    color: '#2B3348',
    fontWeight: '700',
    marginBottom: 10,
  },
  modalContentText: {
    fontSize: 18,
    color: '#2B3348',
    marginBottom: 20,
    width: 330,
    textAlign: 'center',
  },
  modalButtons: {
    width: '100%',
    marginHorizontal: 0,
    paddingVertical: 5,
  },
  modalButtonText2: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  modalButton: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  modalButtonText: {
    color: '#2B3348',
    fontSize: 15,
    fontWeight: '500',
  },
  container: {
    backgroundColor: 'white',
    margin: 16,
    alignSelf: 'center',
  },
  dropdown: {
    height: 40,
    width: 320,
    borderColor: '#2B3348',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 10,
    bottom: 32,
    zIndex: 999,
    color: '#2B3348',
    // paddingHorizontal: 8,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#2B3348',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
