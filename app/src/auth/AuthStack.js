import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScreenWrapper from '../features/Loyalty/navigation/ScreenWrapper';
import LoginPage from '../core/screens/Login/Login';
import VerifyOtpPage from '../core/screens/Login/VerifyOtp';
import Registration from '../features/Loyalty/screens/Registration';
import SuccessScreen from '../features/Loyalty/screens/Registration/WelcomeBack';
import LanguageType from '../core/screens/Login/LanguageType';
import Faq from '../features/Loyalty/screens/Faq';

const Stack = createStackNavigator();

const AuthStack = () => {
  const { t } = useTranslation();


  const wrap = (Component) => (props) => (
    <ScreenWrapper>
      <Component {...props} />
    </ScreenWrapper>
  );

  return (
    <>
      <Stack.Navigator>

        <Stack.Screen
          name="LanguageType"
          component={wrap(LanguageType)}
          options={{
            title: t('ChangeLanguage'),
            headerShown: false,
            headerStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="Login"
          component={wrap(LoginPage)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyOtpPage"
          component={wrap(VerifyOtpPage)}
          options={{
            title: t('Verify OTP'),
            headerShown: false,
            headerStyle: { backgroundColor: 'transparent' },
          }}
        />
        <Stack.Screen
          name="Registration"
          component={wrap(Registration)}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FAQ"
          component={wrap(Faq)}
          options={{
            title: t('FAQ'),
            headerShown: true,
          }}
        />

        <Stack.Screen
          name="SuccessScreen"
          component={wrap(SuccessScreen)}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast />
    </>
  );
};

export default AuthStack;
