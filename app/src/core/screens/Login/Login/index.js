import DeviceInfo from 'react-native-device-info';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import ThemedText from '../../../components/ThemedText';
import useGlobelStyle from '../../../assets/Style/GlobelStyle';
import useLoginStyle from './loginStyle';
import { TextInput, Checkbox } from 'react-native-paper';
import SnackbarComponent from '../../../../core/components/Snackbar/Snackbar';
import { Formik } from 'formik';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import { phoneSchema } from '../../../../core/components/ValidationSchema/SchemaProfile';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Toast from 'react-native-toast-message';
import { useRequestMobileOtp } from '../../../../api/hooks/useVerifyMobile';
import useTheme from '../../../components/Theme/useTheme';
import { requestHint } from 'react-native-otp-verify';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../../../assets';
import { StatusBarHeader } from '../../../components/StatusBar/StatusBar';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LoginPage({ navigation }) {
  const version = DeviceInfo.getVersion();
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useTheme();
  const LoginStyle = useLoginStyle();
  const { t } = useTranslation();
  const animationRef = useRef(null);

  const LaguageFunction = async () => {
    await AsyncStorage.getItem('language').then(value => {
      console.log('value ===> ', value);
      if (value) {
        console.log('selected...');
      } else {
        console.log('not selected...');
      }
    });
  };

  useEffect(()=>{
    console.log('checking...');
    LaguageFunction();
  }, []);

  const [checked, setChecked] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const { mutate, isPending } = useRequestMobileOtp();

  const styles = StyleSheet.create({
    logo: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: 20,
    },
    circle: {
      height: 250,
      width: 250,
      borderRadius: 200,
      // backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      // elevation: 5,
      // shadowColor: '#000',
      // shadowOpacity: 0.1,
      // shadowRadius: 4,
      // shadowOffset: { width: 0, height: 0 },
    },
    title: {
      fontSize: 28,
      fontWeight: '700',
      marginBottom: 10,
    },
    subtitle: {
      // textAlign: 'center',
      fontSize: 14,
      color: '#444',
      marginBottom: 20,
    },
    termsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginVertical: 16,
    },
    link: {
      fontWeight: '700',
      textDecorationLine: 'underline',
    },
    loginButton: {
      paddingVertical: 14,
      alignItems: 'center',
      borderRadius: 30,
      marginBottom: 20,
      marginTop:10,
    },
    loginText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
    },
    appVersion: {
      flex: 1,
      justifyContent: 'flex-end',

    },
    appVersionText: {
      fontSize: 14,
      color: '#444',
      marginTop: 10,
      textAlign: 'center',
    },
    signupLink: {
      fontWeight: '700',
      color: '#000',
    },
  });

  const handleSubmit = (values) => {
    if (!checked) {
      animationRef.current?.shake();
      return;
    }
    const request = { phone: values?.phoneNumber };
    mutate(request, {
      onSuccess: (resp) => {
        Toast.show({
          type: 'success',
          text1: resp?.message || 'OTP Sent Successfully',
          visibilityTime: 2000,
        });
        ReactNativeHapticFeedback.trigger('notificationSuccess', {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: false,
        });
        navigation.navigate('VerifyOtpPage', {
          data: resp?.data,
          otp_data: {},
          userInformation: { ...resp?.data, ...request },
        });
      },
      onError: () => {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong!',
          visibilityTime: 6000,
        });
      },
    });
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['#FDEBEB', '#bf8ef3ff']}
      style={[{flexGrow:1, justifyContent: 'center' }]}
    >
      <StatusBarHeader height={StatusBar.currentHeight} />
      <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, alignItems: 'center', padding: 10, paddingTop: 120 }}
      enableOnAndroid={true}
      extraScrollHeight={20} // pushes input above keyboard
      keyboardShouldPersistTaps="handled"
  >
        {/* App Logo */}
        {/* <ThemedText style={styles.logo}>Basiq360</ThemedText> */}


        {/* Illustration */}
        <Animatable.View animation="fadeInUp" easing="ease-out" duration={500} delay={1000} style={{ textAlign: 'center' }}>
          <View style={styles.circle}>
            <Image
              source={Images.mobileVerify} // replace with your illustration
              style={{ height: 250, width: 250 }}
              resizeMode="cover"
            />
          </View>
        </Animatable.View>



        {/* Login Form */}
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: 20,
          padding: 10,
          width: '100%',
        }}>
          {/* Welcome Section */}
          <ThemedText style={styles.title}>{t('Welcome')}</ThemedText>
          <ThemedText style={styles.subtitle}>
            {t('LoginMessage')}
          </ThemedText>
          <Formik
            initialValues={{ phoneNumber: '' }}
            validationSchema={phoneSchema}
            onSubmit={handleSubmit}
          >
            {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => {
              async function getPhoneNumber() {
                try {
                  const phoneNumber = await requestHint();
                  if (phoneNumber && phoneNumber.length >= 10) {
                    const cleanNumber = phoneNumber.replace('+91', '').replace(/\D/g, '');
                    if (cleanNumber.length === 10) {
                      setFieldValue('phoneNumber', cleanNumber);
                      setTimeout(() => handleSubmit(), 0);
                    }
                  }
                } catch (error) {
                  console.log('Error fetching phone number', error);
                }
              }

              return (
                <View>
                  <TextInput
                    mode="outlined"
                    disabled={isPending}
                    activeOutlineColor={activeTheme.themeColor} // stronger highlight
                    outlineColor={activeTheme.Lightest} // subtle border when inactive
                    textColor={activeTheme.TextColor} // ensure contrast
                    placeholder="XXX XXX XXXX"
                    placeholderTextColor={activeTheme.Lightest}
                    keyboardType="numeric"
                    maxLength={10}
                    onFocus={() => {
                      if (!values.phoneNumber) {getPhoneNumber();}
                    }}
                    onChangeText={value => { handleChange('phoneNumber')(value); setButtonDisabled(value?.length != 10); if (value?.length == 10) { handleSubmit(values); } }}
                    value={values.phoneNumber}
                    left={
                      <TextInput.Icon
                        icon="phone"
                        color={activeTheme.themeColor}
                        style={{ marginTop: 4 }}
                      />
                    }
                    style={{
                      width: '100%',
                      borderRadius: 16, // smooth rounded corners
                      backgroundColor: '#fff', // clean white input background
                      fontSize: 16,
                      paddingHorizontal: 8,
                      elevation: 3, // subtle shadow for Android
                      shadowColor: '#000',
                      shadowOpacity: 0.05,
                      shadowOffset: { width: 0, height: 2 },
                      shadowRadius: 4,
                    }}
                    theme={{
                      roundness: 10,
                      colors: {
                        primary: activeTheme.themeColor, // border + active text color
                        text: activeTheme.TextColor,
                        placeholder: activeTheme.Lightest,
                        background: '#fff',
                      },
                    }}
                  />


                  {touched.phoneNumber && errors.phoneNumber && (
                    <Animatable.View animation="shake">
                      <ThemedText style={[GlobelStyle.error]}>
                        {errors.phoneNumber}
                      </ThemedText>
                    </Animatable.View>
                  )}

                  {/* Terms */}
                  {/* <Animatable.View ref={animationRef}>
                    <View style={styles.termsContainer}>
                      <Checkbox
                        disabled={isPending}
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => setChecked(!checked)}
                        color={activeTheme.TextColor}
                      />
                      <ThemedText style={GlobelStyle.smLabel}>
                        {t('I Agree With')}{' '}
                      </ThemedText>
                      <TouchableOpacity onPress={() => Linking.openURL('https://basiq360.com')}>
                        <ThemedText style={styles.link}>
                          {t('Terms & Conditions')}
                        </ThemedText>
                      </TouchableOpacity>
                    </View>
                  </Animatable.View> */}

                  {/* Proceed Button */}
                  <TouchableOpacity
                    onPress={()=>((values.phoneNumber?.length !== 10) ?
                      Toast.show({
                        type: 'error',
                        text1: 'Please enter a valid mobile number',
                        visibilityTime: 6000, position:'bottom', bottomOffset:150,
                      })
                       : handleSubmit())}
                    disabled={isPending}
                    style={[
                      styles.loginButton,
                      {
                        backgroundColor: '#003EEE',
                      },
                    ]}
                  >
                    {isPending ? (
                      <ActivityIndicator size="small" color={activeTheme.Light} />
                    ) : (
                      <Text style={styles.loginText}>
                        {t('Proceed')}
                      </Text>
                    )}
                  </TouchableOpacity>


                </View>
              );
            }}
          </Formik>

          {/* Signup Link */}
          <View style={styles.appVersion}>
            <View style={{ alignItems: 'center' }}>
              <Image
                source={Images.LoyaltyLogo} // replace with your illustration
                style={{ height: 100, width: '60%', opacity: 0.5 }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.appVersionText}>
              Version:
              <Text
                style={styles.signupLink}

              >
                {version}
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <SnackbarComponent
        visible={showSnackBar}
        message={snackMessage}
        backgroundColor={activeTheme.Danger}
      />
    </LinearGradient>
  );
}



export default LoginPage;
