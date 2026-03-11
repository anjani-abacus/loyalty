// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { View } from 'react-native';
// import { ActivityIndicator, Text } from 'react-native-paper';

// export default function AppLoader({ loading, color, size }) {
//   const { t } = useTranslation();
//   const loadingQuotes = [
//     "Loading... Your success is on the way!",
//     "Almost there! Keep pushing!",
//     "Loading... Don't give up!",
//     "Just a moment! Your dreams are worth waiting for!",
//     "Loading... You got this!",
//     "Good things take time...",
//     "Almost there, stay with us...",
//     "We're working on it...",
//     "This won't take long...",
//     "Getting things ready...",
//     "Your patience is appreciated...",
//     "Believe you can and you're halfway there.",
//     "It does not matter how slowly you go as long as you do not stop.",
//     "Success is not final, failure is not fatal: It is the courage to continue that counts.",
//     "Don't watch the clock; do what it does. Keep going.",
//     "You miss 100% of the shots you don't take.",
//     "I have not failed. I've just found 10,000 ways that won't work.",
//     "You are never too old to set another goal or to dream a new dream.",
//     "The only way to do great work is to love what you do.",
//     "Keep your eyes on the stars, and your feet on the ground.",
//     "You don't have to be great to start, but you have to start to be great.",

//   ]

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
//       <ActivityIndicator animating={loading} color={color} size={size} />
//       <Text>{t(loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)])}</Text>
//     </View>
//   );
// }

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ImageBackground, Modal, ActivityIndicator } from 'react-native';
import * as Progress from 'react-native-progress';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useActiveTheme from '../Theme/useActiveTheme';
import AppBoldText from '../BoldText/AppBoldText';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import NetInfo from '@react-native-community/netinfo';

import { measureConnectionSpeed } from 'react-native-network-bandwith-speed';
import { Images } from '../../assets';
import { Title } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const AppLoader = ({ isLoading }) => {
  // const [progress, setProgress] = useState(10); // Start progress at 10%
  const intervalsRef = React.useRef([]); // Store active intervals
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useActiveTheme();
  const { t } = useTranslation();
  const [networkSpeed, setNetworkSpeed] = useState({});
  useEffect(() => {
    unsubscribe();
    getNetworkBandwidth();
  }, []);

  getNetworkBandwidth = async () => {
    try {
      Speed = await measureConnectionSpeed();
      setNetworkSpeed(Speed);
    } catch (err) {
    }
  };
  let networkInformation = {};
  let signalStrengthIcon = '';
  let signalStrengthColor = '';
  let signalStrengthText = '';
  const getSignalStrengthDetails = () => {
    signalStrengthIcon =
      networkInformation.details.cellularGeneration == '5g' ||
        networkInformation.details.cellularGeneration == '4g'
        ? 'signal'
        : networkInformation.details.cellularGeneration == '3g'
          ? 'signal-cellular-2'
          : 'signal-cellular-1';
    signalStrengthColor =
      networkInformation.details.cellularGeneration == '5g' ||
        networkInformation.details.cellularGeneration == '4g'
        ? activeTheme.Green
        : networkInformation.details.cellularGeneration == '3g'
          ? activeTheme.Warning
          : activeTheme.Danger;
    signalStrengthText =
      networkInformation.details.cellularGeneration == '5g' ||
        networkInformation.details.cellularGeneration == '4g'
        ? 'Good Connection'
        : networkInformation.details.cellularGeneration == '3g'
          ? 'Poor Connection'
          : 'Bad connection';
  };

  const getWifiStrengthDetails = () => {
    signalStrengthIcon =
      networkInformation.details.strength >= 90
        ? 'signal'
        : networkInformation.details.strength < 90 &&
          networkInformation.details.strength >= 50
          ? 'signal-cellular-2'
          : 'signal-cellular-1';
    signalStrengthColor =
      networkInformation.details.strength >= 90
        ? activeTheme.Green
        : networkInformation.details.strength < 90 &&
          networkInformation.details.strength >= 50
          ? activeTheme.Warning
          : activeTheme.Danger;
    signalStrengthText =
      networkInformation.details.strength >= 70
        ? 'Good Connection'
        : networkInformation.details.strength < 70 &&
          networkInformation.details.strength >= 30
          ? 'Poor Connection'
          : 'Bad connection';
  };

  const unsubscribe = NetInfo.addEventListener(state => {
    networkInformation = state;

    {
      networkInformation.type === 'cellular'
        ? getSignalStrengthDetails()
        : getWifiStrengthDetails();
    }
  });

  const [progress, setProgress] = React.useState(0);
  const [indeterminate, setIndeterminate] = React.useState(true);

  useEffect(() => {
    let interval = setInterval(() => { }, 1000);
    const timer = setTimeout(() => {
      setIndeterminate(false);
      interval = setInterval(() => {
        setProgress(prevProgress =>
          Math.min(1, prevProgress + Math.random() / 180),
        );
      }, 500);
    }, 1500);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);
  if (!isLoading && progress === 10) {return null;} // Hide loader when not loading
  const percentage = Math.round(progress * 100);
  return (
    <ImageBackground

      source={Images?.LoaderBackground}

      style={styles.loaderContainer}
      resizeMode="cover">
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <MaterialCommunityIcons
            name={networkInformation.type === 'wifi' ? 'wifi' : 'swap-vertical'}
            size={30}
            color={activeTheme.LinkClr}
          />
          <Title>
            <AppBoldText>
              {networkInformation.type === 'cellular'
                ? networkInformation.details.cellularGeneration
                : ''}
              {'  |  '}
            </AppBoldText>
          </Title>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons
              name={signalStrengthIcon}
              color={signalStrengthColor}
              size={30}
            />
            <Title>
              {!networkSpeed?.speed ? (
                <AppBoldText>{t('Please wait...')}</AppBoldText>
              ) : (
                <AppBoldText>
                  {'  '}
                  {(networkSpeed?.speed * 10).toFixed(2) || '0'}
                  {networkSpeed?.metric || 'Mbps'}
                </AppBoldText>
              )}
            </Title>
          </View>
        </View>
        <View style={[GlobelStyle.mb12, { flexDirection: 'row' }]}>
          <Title style={{ color: signalStrengthColor }}>
            <AppBoldText>{t(signalStrengthText)}</AppBoldText>
          </Title>
          {/* <Title> {t('Speed')}</Title> */}
        </View>

        <Progress.Bar
          width={245}
          height={7}
          progress={progress}
          indeterminate={indeterminate}
        />
        {percentage >= 1 && (
          <Text style={styles.percentageText}>{`${Math.round(
            percentage,
          )}%`}</Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  progress: {
    height: 7,
  },
});

export default AppLoader;





export const AppLoader2 = ({ loading }) => {
  const activeTheme = useActiveTheme();

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0008',
    },
    modalView: {
      margin: 20,
      width: 200,
      height: 70,
      backgroundColor: 'white',
      borderRadius: 5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginVertical: 15,
      textAlign: 'center',
      fontSize: 17,
      marginLeft: 15,
      color:activeTheme.Dark,
    },
  });


  return (
    <Modal animationType="fade"
      transparent={true}
      visible={loading}
      statusBarTranslucent={true}>

      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ActivityIndicator size="large" color={activeTheme.PrimaryBlue} />
          <Text style={styles.modalText}>Please wait..</Text>
        </View>
      </View>
    </Modal>
  );
};


