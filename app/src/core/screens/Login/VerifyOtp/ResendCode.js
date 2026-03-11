import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import VerifyOtpStyle, {
} from './VerifyOtpStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

const ResendCode = ({ resetForm, mutateOtp, otpData, activeTheme, GlobelStyle }) => {
  const [showResendOTP, setShowResendOTP] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const isFirstRender = useRef(true);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = timerHandler();
    return () => clearInterval(interval);
  }, []);

  const timerHandler = () => {
    if (isFirstRender?.current) {
      isFirstRender.current = false;
    } else {
      resetForm();
      handleSubmit({ 'phoneNumber': otpData?.phone });
    }
    setShowResendOTP(false);
    let localTime = timeLeft;
    const interval = setInterval(() => {
      localTime = localTime - 1;
      setTimeLeft(localTime);
      if (localTime <= 0) {
        setTimeLeft(5);
        setShowResendOTP(true);
        clearInterval(interval);
      }
    }, 1000);
    return interval;
  };

  const handleSubmit = (values) => {
    const request = { 'phone': values?.phoneNumber };
    mutateOtp(request, {
      onSuccess: (resp) => {
        Toast.show({type: 'success', text1: resp?.message || 'OTP Sent Successfully'});
      },
      onError: (err) => {
        Toast.show({type: 'error', text1: err?.message || 'Something went wrong'});
      },
    });
  };

  return <View style={{ flex: 1 }}>
    {!showResendOTP ? (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 8,
        }}>
        <Text style={[GlobelStyle.smLargeFont]}>
          {'00:'}
          {timeLeft}s
        </Text>
      </View>
    ) : (
      <View>
        <TouchableOpacity
          style={[VerifyOtpStyle.linkStyle]}
          onPress={() => timerHandler()}>
          <MaterialIcons
            name="refresh"
            color={activeTheme.themeColor}
            size={22}
          />
          <Text
            style={[
              GlobelStyle.smLargeFont,
              {
                color: activeTheme.themeColor,
                marginLeft: 16,
              },
            ]}>
            {t('ResendCode')}
          </Text>
        </TouchableOpacity>
      </View>
    )}
  </View>;
};


export default ResendCode;
