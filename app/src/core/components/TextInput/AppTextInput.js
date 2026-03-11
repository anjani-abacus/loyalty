import React, {useRef} from 'react';
import {Platform, StyleSheet, Animated} from 'react-native';
import {TextInput} from 'react-native-paper';
import colors from './Colors';
import useTheme from '../Theme/useTheme';

const AppTextInput = React.memo(props => {

  const activeTheme = useTheme();
  const inputRef = useRef(null);
  const shakeAnimation = new Animated.Value(0);
  const styles = StyleSheet.create({
    inputBlock: {
      fontSize: 14,
      // backgroundColor: 'rgba(255, 255, 255, 0.4)',

      height: 55,
    },
    multilineBlock: {
      fontSize: 14,
      backgroundColor: activeTheme.Light,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 35,
      borderRadius: 5,
      backgroundColor: colors.white,
      padding: 10,
      marginVertical: 5,
      borderColor: '#f0f0f0',
      borderWidth: 2,
      shadowColor:
        '#.............................................................................',
      shadowOffset: {width: 0, height: -1},
      shadowOpacity: 1,
      shadowRadius: 25,
      elevation: 70,
    },
    icon: {
      marginRight: 10,
    },
    textInput: {
      fontSize: 18,
      fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
    },
  });
  const handleSaveButtonPress = () => {
    const value = inputRef.current?.value || '';
    if (props.label.endsWith('*') && !value.trim()) {
      // Show error and trigger the shake animation
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Handle other actions or validations here
    }
  };

  const interpolatedShakeAnimation = shakeAnimation.interpolate({
    inputRange: [-10, 10],
    outputRange: ['-10deg', '10deg'],
  });
  let template = null;
  const type = props.type;
  switch (type) {
    case 'textInput':
      template = (
        <TextInput
          outlineColor={'transparent'}
          style={styles.inputBlock}
          outlineStyle={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
          textColor={activeTheme.text}
          theme={{
            colors: {
              primary: activeTheme.text,
              underlineColor: 'transparent',
            },
          }}
          selectionColor={activeTheme.text}
          {...props}
          underlineColorAndroid="transparent"
          dense={true}
        />
      );
      break;

    case 'multiline':
      template = (
        <TextInput
          outlineColor={activeTheme.lightBorderColor}
          style={styles.multilineBlock}
          textColor={activeTheme.text}
          theme={{
            colors: {
              primary: activeTheme.text,
              underlineColor: 'transparent',
            },
          }}
          selectionColor={activeTheme.text}
          {...props}
          multiline
          numberOfLines={5}
          underlineColorAndroid="transparent"
        />
      );
      break;

    default:
      break;
  }
  return template;
});

export default AppTextInput;
