import React, { useRef, useState, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  Animated,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Sound from 'react-native-sound';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const PushableButton = ({ spin, speakerRef }) => {
  const { t } = useTranslation();
  const [pressAnim] = useState(new Animated.Value(0));
  const shineAnim = useRef(new Animated.Value(-1)).current;

  const tickSoundRef = useRef(
    new Sound(
      require('../../static/Sounds/Tick.wav'),
      Sound.MAIN_BUNDLE,
      err => {
        if (err) {console.warn('Failed to load tick sound', err);}
      }
    )
  );

  const hapticOptions = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const handlePressIn = () => {
    ReactNativeHapticFeedback.trigger('impactHeavy', hapticOptions);

    if (speakerRef.value)
      {tickSoundRef.current.stop(() => tickSoundRef.current.play());}

    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    spin();
  };

  const translateY = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-6, -2],
  });

  const shineTranslate = shineAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-width, width],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(shineAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={styles.pushable}>
          <Animated.View style={[styles.front, { transform: [{ translateY }] }]}>
            <Text style={styles.text}>{t('Spin To Win')}</Text>

            {/* Shining Effect */}
            <Animated.View
              style={[
                styles.shineOverlay,
                { transform: [{ translateX: shineTranslate }] },
              ]}
              pointerEvents="none"
            >
              <LinearGradient
                colors={['transparent', 'rgba(255,255,255,0.4)', 'transparent']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              />
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default PushableButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  pushable: {
    backgroundColor: 'hsl(38, 100%, 32%)',
    borderRadius: 12,
    overflow: 'hidden',
  },
  front: {
    backgroundColor: 'hsl(52, 100%, 47.1%)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 42,
    position: 'relative',
    overflow: 'hidden',
  },
  text: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  shineOverlay: {
    position: 'absolute',
    top: 0,
    left: -100,
    width: 100,
    height: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
    transform: [{ rotate: '45deg' }],
  },
});
