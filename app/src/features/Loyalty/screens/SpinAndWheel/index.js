import Video from 'react-native-video';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Linking,
  Modal,
  StatusBar,
  Animated as RnAnimated,
} from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
  ScrollView,
} from 'react-native-gesture-handler';
import Svg, {
  Circle,
  G,
  Path,
  Text as SvgText,
  TSpan,
  Image as SvgImage,
  Defs,
  ClipPath,
  Rect,
} from 'react-native-svg';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useSpinWheelConfig} from './SpinWheelConfig';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import SpinButton3D from './SpinButton';
import Speaker from '../../../../core/assets/icons/Speaker.svg';
import SpeakerMute from '../../../../core/assets/icons/SpeakerMute.svg';
import Coin from '../../../../core/assets/icons/Coin.svg';
import Info from '../../../../core/assets/icons/Info.svg';
import style from './styles';
import ConfettiCannon from 'react-native-confetti-cannon';
import {AuthContext} from '../../../../auth/AuthContext';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {FooterBar, StatusBarHeader} from '../../../../core/components/StatusBar/StatusBar';
import useTheme from '../../../../core/components/Theme/useTheme';
import {ThemeContext} from '../../../../context/ThemeContext';
import {useEarnPoint} from '../../../../api/hooks/useSpinwin';
import LinearGradient from 'react-native-linear-gradient';

import CongratulationsScreen from '../../../../core/components/CongratulationScreen';

import BetterLuckModal from '../../../../core/components/SpinWheelDialoge';
import { AuthorizationScreen } from '../../../../core/components/No_Internet_Connection/AppNoInternet';
import { Images } from '../../../../core/assets';
import { useTranslation } from 'react-i18next';

const truncate = (text, maxLength = 14) =>
  text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const offersList = [
  // {title: 'Points should be redemeed within month'},
  {title: 'You can spin the wheel once you earn +5000 points'},

  {
    title:
      'Eared coins can be used to redeem gifts.',
  },
  {title: 'Coins will be credited just after spinning the wheel.'},
  {
    title: 'If you have any query you contact us on',
    link: 'info@starkpaints.com',
  },
];

const sendEmail = email => {
  const mailtoUrl = `mailto:${email}`;

  Linking.openURL(mailtoUrl).catch(error => {});
};

export const PointBalance = ({ navigation }) => {
  const isFocused = useIsFocused();
  const styles = style(0);
  const {
    isLoading: earnPointLoading,
    refetch: earnPointRefetch,
    data: earnedPoints,
    isFetching: earnPointIsFetching,
  } = useEarnPoint({ filter: {} }); //for points


    useEffect(() => {
    if (isFocused) {
      earnPointRefetch();
    }
  }, [isFocused]);

  const shineAnim = useRef(new RnAnimated.Value(-1)).current;
  const shineWidth = 150; // adjust based on your text width
  const shineTranslate = shineAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-shineWidth, shineWidth],
  });

  useEffect(() => {
    RnAnimated.loop(
      RnAnimated.timing(shineAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);


  useFocusEffect(useCallback(() => {
     earnPointRefetch();
    }, []));


  {/* <View
        style={{
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#fff',
          flexDirection: 'row',
          width: 100,
          gap: 4,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 3,
          paddingHorizontal: 15,
        }}>
        <Coin height="15" width="15" />
        <Text
          style={{
            color: '#fff',
            fontSize: 12,
            fontWeight: 'bold',
          }}>
          {earnedPoints?.data?.total_point ?? '--'}
        </Text>
      </View> */}

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CoinDetail')}
      style={[styles.coinContainer, { overflow: 'hidden', borderRadius: 8 }]} // make sure to clip shine
    >
      <Coin width={25} height={25} style={styles.coinIcon} />

      <RnAnimated.View
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 8,
        }}
      >
        <View style={styles.coinValueBox}><Text style={styles.coinText}>{earnedPoints?.data?.total_point || 0}</Text></View>

        <RnAnimated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 60, // width of the shine strip
            transform: [{ translateX: shineTranslate }],
          }}
          pointerEvents="none"
        >
          <LinearGradient
            colors={['transparent', 'rgba(255,255,255,0.6)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />
        </RnAnimated.View>
      </RnAnimated.View>
    </TouchableOpacity>
  );
};

const SpinWheel = ({navigation}) => {
  const {
    wheelSize,
    center,
    rotation,
    isSpinning,
    isSpeakerOn,
    setSpeakerOn,
    segments,
    setShowWinModal,
    showWinModal,
    spin,
    disabledButton,
    speakerRef,
    pan,
  } = useSpinWheelConfig();

  const {t} = useTranslation();

  const styles = style(wheelSize);
  const {setActiveStatusConfig, loginData} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const bottomSheetRef = useRef(null);
  const activeTheme = useTheme();
  const openBottomSheet = () => {
    console.log('open bottom sheet');
    bottomSheetRef.current?.present();};
  const closeBottomSheet = () => bottomSheetRef.current.dismiss();

  useFocusEffect(
    React.useCallback(() => {
      setActiveStatusConfig({height: 0});

      return () => {
        setActiveStatusConfig({backgroundColor: activeTheme.PrimaryBg});
      };
    }, [theme]),
  );

  const [paused, setPaused] = useState(true);

  // useEffect(()=>{
  //   earnPointRefetch()
  // }, [isSpinning])

  useEffect(() => {
    if (showWinModal?.state) {
      const timeout = setTimeout(() => {
        setPaused(false);
      }, 300); // Delay to ensure modal is visible before playing
      return () => clearTimeout(timeout);
    } else {
      setPaused(true);
    }
  }, [showWinModal]);

  const animatedStyle = useAnimatedStyle(() => {
    const normalized = rotation.value % 360;
    return {
      transform: [{rotate: `${normalized}deg`}],
    };
  });
const handleClose = () =>{
  setShowWinModal({ state: false, pointSegment: {} });
};


  if (loginData?.status_of_profile?.toLowerCase() != 'approved') {
      return <AuthorizationScreen image={Images.scanNotAllowed} imageSize={'contain'} handler={false} title={'Not Allowed To Spin'} message={"You can't spin the wheel as your profile is not approved yet. kindly contact to admin"} />;
    }

  return (
    <>
     {showWinModal?.state ? showWinModal?.pointSegment?.slab_point > 0 ? <CongratulationsScreen onClose={()=>handleClose()} amount={showWinModal?.pointSegment?.slab_point} /> : <BetterLuckModal  onClose={()=>handleClose()} onTryAgain={spin} /> :
      <ImageBackground
        source={require('../../../../core/assets/Images/pupleBust.jpg')}
        style={{flex: 1}}
        resizeMode="cover">
        {/* <LinearGradient
           start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
     colors={['#3600c0', 'rgba(14, 10, 150, 1)']}


            style={{   position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      }}
          /> */}

        <StatusBarHeader height={StatusBar.currentHeight} />
        <View style={styles.topBar}>
          {isSpeakerOn ? (
            <TouchableOpacity
              onPress={() => {
                ReactNativeHapticFeedback.trigger('impactHeavy', hapticOptions);
                setSpeakerOn(false);
              }}>
              <Speaker width={22} height={22} fill="#fff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                ReactNativeHapticFeedback.trigger('impactHeavy', hapticOptions);
                setSpeakerOn(true);
              }}>
              <SpeakerMute width={22} height={22} fill="#ffffffff" />
            </TouchableOpacity>
          )}

          <PointBalance navigation={navigation} styles={styles} />
        </View>

        <GestureHandlerRootView style={styles.container}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              gap: 5,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 3,
              borderWidth: 1,
              borderColor: '#777',
              borderRadius: 15,
              backgroundColor: 'rgba(0,0,0,.2)',
            }}
            onPress={openBottomSheet}>
            <Info height="12" width="12" fill="#ccc" />
            <Text style={{color: '#ccc', fontSize: 10}}>Details</Text>
          </TouchableOpacity>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#888',
                fontSize: 10,
                textAlign: 'center',
                fontWeight: 'bold',
                letterSpacing: 4,
              }}>
              THE LUCKY WHEEL
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 12,
                marginVertical: 10,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {t('Spin and earn points')}
            </Text>
          </View>
          <View
            style={{
              marginBottom: -35,
              zIndex: 10,
              backgroundColor: '#000',
              paddingHorizontal: 10,
              borderTopWidth: 3,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: '#f39e09',
              borderRadius: 20,
            }}>
            {/* <Text style={{color: '#eee', fontSize: 12}}>
              Earned{' '}
              <Text
                style={{color: '#f39e09', fontSize: 14, fontWeight: 'bold'}}>
                1,00,000
              </Text>{' '}
              Coins
            </Text> */}
          </View>
          {/* <View style={styles.spinInnerContainer}> */}
          <View style={styles.spinInnerContainer}>
            <GestureDetector
              gesture={isSpinning ? Gesture.Pan().onUpdate(() => {}) : pan}>
              <Animated.View style={[styles.wheelWrapper, animatedStyle]}>
                <ImageBackground
                  source={require('../../../../core/assets/Images/goldenBg.jpg')}
                  style={styles.wheelBorder}
                  imageStyle={{borderRadius: (wheelSize + 40) / 2}}
                  resizeMode="cover">
                  <View style={styles.wheelContainer}>
                    <Svg
                      width={wheelSize}
                      height={wheelSize}
                      viewBox={`0 0 ${wheelSize} ${wheelSize}`}>
                      <G rotation={0} origin={`${center}, ${center}`}>
                        <Circle
                          cx={center}
                          cy={center}
                          r={center - 2}
                          stroke="#fff"
                          strokeWidth={4}
                          fill="none"
                        />
                        {segments?.map((seg, i) => {
                          const start = (i * 360) / segments.length;
                          const end = ((i + 1) * 360) / segments.length;
                          const largeArc = end - start <= 180 ? '0' : '1';
                          const startX =
                            center + center * Math.cos((Math.PI * start) / 180);
                          const startY =
                            center + center * Math.sin((Math.PI * start) / 180);
                          const endX =
                            center + center * Math.cos((Math.PI * end) / 180);
                          const endY =
                            center + center * Math.sin((Math.PI * end) / 180);
                          const mid = (start + end) / 2;
                          const textX =
                            center +
                            center * 0.6 * Math.cos((Math.PI * mid) / 180);
                          const textY =
                            center +
                            center * 0.6 * Math.sin((Math.PI * mid) / 180);

                          return (
                            <G key={`arc-${i}`}>
                              <Path
                                d={`M${center},${center} L${startX},${startY} A${center},${center} 0 ${largeArc} 1 ${endX},${endY} Z`}
                                fill={seg.color}
                              />
                              <SvgText
                                x={textX}
                                y={textY}
                                fill="#fff"
                                fontSize="22"
                                fontWeight="bold"
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fontFamily="Dancing Script"
                                transform={`rotate(${
                                  mid + 90
                                }, ${textX}, ${textY})`}>
                                <TSpan x={textX} dy={-32}>
                                  {' '}
                                  {seg?.slab_point}
                                </TSpan>
                                <Circle
                                  cx={textX + 5}
                                  cy={textY + 15}
                                  r={16}
                                  stroke="#fff"
                                  strokeWidth={2}
                                  fill="none"
                                />
                                <SvgImage
                                  href={require('../../../../core/assets/Images/CoinGold.png')}
                                  x={textX - 10}
                                  y={textY}
                                  width={30}
                                  height={30}
                                />
                              </SvgText>
                            </G>
                          );
                        })}

                        <Circle
                          cx={center}
                          cy={center}
                          r={20}
                          style={{borderWidth: 2}}
                          fill="gold"
                          stroke="white"
                          strokeWidth={4}
                        />
                      </G>
                    </Svg>
                  </View>
                </ImageBackground>
              </Animated.View>
            </GestureDetector>

            {/* <ImageBackground source={require('../../../../core/assets/Images/logo2.png')} style={styles.centerImage} resizeMode="contain" /> */}
            <View style={styles.pointer}>
              <Svg height="30" width="30" viewBox="0 0 60 60">
                <Defs>
                  <ClipPath id="clip">
                    <Path d={'M0,50 Q30,70 60,50 L30,10 Z'} />
                  </ClipPath>
                </Defs>
                <Rect
                  width="60"
                  height="60"
                  fill="gold"
                  clipPath="url(#clip)"
                />
              </Svg>
            </View>

            <View
              style={{
                height: 200,
                width: 40,
                borderWidth: 18,
                borderColor: '#f39e09',
                position: 'absolute',
                bottom: 45,
                opacity: 0.2,
                zIndex: -1,
              }}
            />
            <TouchableOpacity
              disabled={isSpinning || disabledButton}
              style={{opacity: isSpinning ? 0.6 : 1}}>
              <SpinButton3D speakerRef={speakerRef} spin={spin} />
            </TouchableOpacity>
          </View>

        </GestureHandlerRootView>

        <BottomSheetModalProvider>
          <BottomSheetModal
            index={0}
            ref={bottomSheetRef}
            snapPoints={['50%']}
            enablePanDown={false}
            backdropComponent={props => (
              <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="close"
              />
            )}
            keyboardBehavior="interactive"
            keyboardBlurBehavior="restore"
            onChange={index => {
              if (index === -1) {
                closeBottomSheet();
              }
            }}>
            <View style={styles.offersHeader}>
              <Text style={styles.offerTitle}>INFO</Text>
              <Text style={styles.subTitle}>Please Note:</Text>
            </View>
            <ScrollView style={styles.listWrapper}>
              {offersList?.map((item, i) => (
                <View key={i} style={styles.row}>
                  <View style={styles.bullet} />
                  <Text style={styles.itemText}>
                    {item?.title}{' '}
                    <TouchableOpacity onPress={() => sendEmail(item?.link)}>
                      <Text style={styles.link}>{item?.link}</Text>
                    </TouchableOpacity>
                  </Text>
                </View>
              ))}
            </ScrollView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
        {/*  */}
        {/* <Modal visible={showWinModal?.state} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>


            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowWinModal({ state: false, pointSegment: {} })}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>


            <View style={styles.videoWrapper}>
              <Video
                source={require('../../../../core/assets/videos/WinVideo.mp4')}
                style={styles.video}
                resizeMode="contain"
                controls={false}
                paused={paused}
                repeat={false}
                muted={!isSpeakerOn}
              />


              <View style={styles.overlayTextWrapper}>
                <Text style={styles.overlayText}>🎉 Congratulations! 🎉</Text>
                <Text style={styles.overlaySubText}>You won {showWinModal?.pointSegment?.slab_point} Point!</Text>
              </View>
            </View>
          </View>
        </View>

      </Modal> */}
      <FooterBar/>
      </ImageBackground>
}
    </>
  );
};

export default SpinWheel;
