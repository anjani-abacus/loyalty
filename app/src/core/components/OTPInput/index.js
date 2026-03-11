import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import {Title} from 'react-native-paper';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {Formik} from 'formik';
import VerifyOtpStyle, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
  otpStyle,
} from './VerifyOtpStyle';
import useActiveTheme from '../Theme/useActiveTheme';
import {useTranslation} from 'react-i18next';

const OTPInput = ({cellCount, setOTP}) => {
  const CELL_COUNT = cellCount;
  const [value, setValue] = useState('');
  const {Value, Text: AnimatedText} = Animated;
  const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
  const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
  const animateCell = ({hasValue, index, isFocused}) => {
    Animated.parallel([
      Animated.timing(animationsColor[index], {
        useNativeDriver: false,
        toValue: isFocused ? 1 : 0,
        duration: 250,
      }),
      Animated.spring(animationsScale[index], {
        useNativeDriver: false,
        toValue: hasValue ? 1 : 1,
        duration: hasValue ? 300 : 250,
      }),
    ]).start();
  };
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useActiveTheme();
  const {t} = useTranslation();
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={[otpStyle.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <CodeField
      {...props}
      ref={ref}
      value={value}
      autoFocus
      onChangeText={val => {
        setValue(val);
        setOTP(val);
      }}
      cellCount={CELL_COUNT}
      rootStyle={otpStyle.codeFieldRoot}
      keyboardType="number-pad"
      renderCell={renderCell}
    />
  );
};

export default OTPInput;
