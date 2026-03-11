import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import * as Progress from 'react-native-progress';
import useActiveTheme from '../Theme/useActiveTheme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Title} from 'react-native-paper';
import AppBoldText from '../BoldText/AppBoldText';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import NetInfo from '@react-native-community/netinfo';

const LoaderComponent = isLoading => {
  const loading = isLoading; // Use loader context to get loading state
  const GlobelStyle = useGlobelStyle();
  const [progress, setProgress] = useState(10); // Start progress at 10%
  const [intervals, setIntervals] = useState([]); // Store active intervals

  const networkInformation = '';
  useEffect(() => {
    NetInfo.addEventListener(state => {
      networkInformation = state;
    });
  }, []);

  const activeTheme = useActiveTheme();
  // Function to create a loading interval
  const signalStrength =
    networkInformation.details.strength >= 90
      ? 'signal'
      : networkInformation.details.strength < 90 &&
        networkInformation.details.strength >= 50
      ? 'signal-cellular-2'
      : 'signal-cellular-1';
  const signalStrengthColor =
    networkInformation.details.strength >= 90
      ? activeTheme.Green
      : networkInformation.details.strength < 90 &&
        networkInformation.details.strength >= 50
      ? activeTheme.Warning
      : activeTheme.Danger;
  const signalStrengthText =
    networkInformation.details.strength >= 90
      ? 'Good Connection'
      : networkInformation.details.strength < 90 &&
        networkInformation.details.strength >= 50
      ? 'Poor Connection'
      : 'Bad connection';
  const createLoadingInterval = (maxTime, maxPercent, next) => {
    let currentTime = 0; // Track elapsed time
    const step = 0.01 * maxTime; // Calculate step size for intervals

    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const updatedProgress = prevProgress + 0.01 * maxPercent;
        if (updatedProgress >= maxPercent) {
          clearInterval(interval);
          if (next) {next();} // Call the next function when complete
        }
        return Math.min(updatedProgress, maxPercent); // Avoid overshooting
      });

      currentTime += step;
      if (currentTime >= maxTime) {
        clearInterval(interval);
        if (next) {next();}
      }
    }, step);

    setIntervals(prevIntervals => [...prevIntervals, interval]); // Store the interval
    return interval;
  };

  // Function to clear all intervals
  const resetIntervals = () => {
    intervals.forEach(clearInterval);
    setIntervals([]); // Clear the intervals array
  };

  useEffect(() => {
    if (loading) {
      // Start staged progress updates
      createLoadingInterval(1000, 30, () =>
        createLoadingInterval(1000, 60, () =>
          createLoadingInterval(1000, 90, () => {}),
        ),
      );
    } else {
      // When loading is complete, jump to 100% and reset
      setProgress(100);
      resetIntervals();
      setTimeout(() => setProgress(10), 500); // Reset to 10% after a short pause
    }

    // Cleanup intervals when component unmounts or loading state changes
    return () => resetIntervals();
  }, [loading]);

  if (!loading && progress === 10) {return null;} // Hide loader if inactive

  return (
    <ImageBackground
      source={require('../../assets/Images/loaderBackground.jpeg')} // Path to your background image
      style={styles.loaderContainer} // Apply styles to the ImageBackground component
      resizeMode="cover" // To make the image cover the entire container
    >
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIcons
            name={networkInformation.type == 'wifi' ? 'wifi' : 'swap-vertical'}
            size={30}
            color={activeTheme.LinkClr}
          />
          <Title>
            <AppBoldText>{'  |  '}</AppBoldText>
          </Title>
          <View style={{flexDirection: 'row'}}>
            <MaterialCommunityIcons
              name={signalStrength}
              color={signalStrengthColor}
              size={30}
            />
            <Title>
              <AppBoldText>
                {'  '}
                {networkInformation.details.linkSpeed}
                {'Mbps'}
              </AppBoldText>
            </Title>
          </View>
        </View>
        <View style={[GlobelStyle.mb12, {flexDirection: 'row'}]}>
          <Title style={{color: signalStrengthColor}}>
            <AppBoldText>{signalStrengthText}</AppBoldText>
          </Title>
          <Title> Speed</Title>
        </View>
        <Progress.Bar
          progress={progress / 100}
          width={280}
          height={7}
          color={activeTheme.themeColor}
          borderWidth={1}
          borderColor="#ccc"
        />
        <Text style={styles.percentageText}>{Math.round(progress)}%</Text>
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
  image: {
    width: 250,
    height: 250,
  },
  percentageText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',

    color: '#333',
  },
});

export default LoaderComponent;
