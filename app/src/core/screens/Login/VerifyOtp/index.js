import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  TextInput,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import useGlobelStyle from '../../../assets/Style/GlobelStyle';
import DeviceInfo from 'react-native-device-info';
import { Title } from 'react-native-paper';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Formik } from 'formik';
import VerifyOtpStyle, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
  otpStyle,
} from './VerifyOtpStyle';
import { Appbar } from 'react-native-paper';
import SnackbarComponent from '../../../../core/components/Snackbar/Snackbar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useTranslation } from 'react-i18next';
import * as Animatable from 'react-native-animatable';
import AppButton from '../../../../core/components/Button/AppButton';
import { AuthContext } from '../../../../auth/AuthContext';
import { validationSchema } from '../../../../core/components/ValidationSchema/SchemaProfile';
import RNOtpVerify from 'react-native-otp-verify';
import ResendCode from './ResendCode';
import { useRequestMobileOtp, useVerifyMobile } from '../../../../api/hooks/useVerifyMobile';
import { request } from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import useTheme from '../../../components/Theme/useTheme';
import { getFcmToken } from '../../../../config/notificationConfig';
import LinearGradient from 'react-native-linear-gradient';
import { Images } from '../../../assets';
import { LeftArrowIcon } from '../../../assets/SVGs/svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { Value, Text: AnimatedText } = Animated;
const CELL_COUNT = 6;
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
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



function VerifyOtpPage({ route, navigation }) {
  const version = DeviceInfo.getVersion();
  const { mutate, isPending: verifyingMobile, isSuccess, isError, error } = useVerifyMobile();
  const { mutate: mutateOtp, isPending: otpIsPending, isSuccess: otpIsSuccess,
    isError: otpIsError, error: otpError } = useRequestMobileOtp();
  const { userInformation, selectedUserType } = route?.params;
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useTheme();
  const { t } = useTranslation();
  const animationRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [otp, setOTP] = useState('');
  const [bgColor, setBgColor] = useState('');
  const [otpData, setOtpData] = useState({});
  const { login } = useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);

  const [showSnackBar, setShowSnackBar] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [snackMessage, setSnackMessage] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleOtpInputChange = value => {
    if (/^\d*$/.test(value)) {
      setButtonDisabled(value.length !== 6);
      setOTP(value);
    }
  };

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 10,
      // backgroundColor: hasValue
      //   ? animationsScale[index].interpolate({
      //     inputRange: [0, 1],
      //     outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
      //   })
      //   : animationsColor[index].interpolate({
      //     inputRange: [0, 1],
      //     outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
      //   }),
      // borderRadius: animationsScale[index].interpolate({
      //   inputRange: [0, 1],
      //   outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      // }),
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
      animateCell({ hasValue, index, isFocused });
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


  const submitHandler = async (values) => {
    const fcmToken = await getFcmToken();
    if(values?.otp){
      mutate({ 'fcmToken': fcmToken, 'phone': userInformation?.phone, 'otp': values?.otp }, {
        onSuccess: (resp) => {
          setIsNavigating(true); // Keep button disabled during navigation

          if (resp?.data?.isRegistered) {
            // Add small delay to ensure smooth transition
            setTimeout(() => {
              login(values, resp?.data);
            }, 300);
          } else {
            // Add small delay to ensure smooth transition
            setTimeout(() => {
              navigation.navigate('Registration', {
                'otp': values?.otp,
                'phone': userInformation?.phone,
                login_type: '',
                influencer_type: '',
                otp_data: '',
              });
              setIsNavigating(false); // Reset state after navigation
            }, 300);
          }
        },
        onError: (err) => {
          setIsNavigating(false); // Reset state on error
          Toast.show({ type: 'error', text1: err?.message || 'Something went wrong' });
          ReactNativeHapticFeedback.trigger('notificationError',
            { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
        },
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#FDEBEB', '#bf8ef3ff']} style={{ padding: 10, backgroundColor: activeTheme.section, flexGrow: 1 }}>
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrowIcon fill="#000" />
          </TouchableOpacity>
        </Appbar.Header>

        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          extraScrollHeight={20} // pushes input above keyboard
          keyboardShouldPersistTaps="handled"
        >


          <Animatable.View animation="fadeInUp" easing="ease-out" duration={500} delay={1000} style={{ marginHorizontal: 'auto', textAlign: 'center' }}>
            <View style={VerifyOtpStyle.circle}>
              <Image
                source={Images.verifyOtp} // replace with your illustration
                style={{ height: 250, width: 250 }}
                resizeMode="cover"
              />
            </View>
          </Animatable.View>
          <View style={{
            borderWidth: 1,
            flex: 1,
            borderColor: '#fff',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 10,
            width: '100%',
            paddingHorizontal: 10,
          }}>
            <View style={[VerifyOtpStyle.loginHeader]}>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={[GlobelStyle.title]}>
                  {t('VerificationCodeMessage')}
                </Text>
                <Text style={[GlobelStyle.title]}>
                  {userInformation?.phone}
                  {', '}
                </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={[GlobelStyle.title, { color: activeTheme.Primary }]}>
                    {t('orChangeNumber')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <Formik
              initialValues={{ otp: '' }}
              onSubmit={values => {
                submitHandler(values);
              }}
              validationSchema={validationSchema}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                resetForm,
                values,
                errors,
                touched,
                setFieldValue,
              }) => {

                useEffect(() => {
                  RNOtpVerify.getOtp()
                    .then(p => RNOtpVerify.addListener(message => {
                      const otp = message.match(/\d{6}/)?.[0];
                      setFieldValue('otp', otp);
                      setTimeout(() => {
                        setIsLoading(false);
                        handleSubmit();
                      }, 0);
                    }))
                    .catch(console.log);
                }, []);

                return (
                  <View style={[VerifyOtpStyle.OtpContainer]}>
                    <CodeField
                      {...props}
                      ref={ref}
                      value={values.otp}
                      autoFocus
                      autoComplete="sms-otp"
                      onChangeText={value => {
                        handleChange('otp')(value);
                        handleOtpInputChange(value);
                        if (value?.length == 6) {
                          Keyboard.dismiss();
                          submitHandler({ ...values, otp: value });
                        }
                      }}
                      cellCount={CELL_COUNT}
                      rootStyle={otpStyle.codeFieldRoot}
                      keyboardType="numeric"
                      textContentType="oneTimeCode"
                      renderCell={renderCell}
                      returnKeyType="done"
                      blurOnSubmit={true}
                      onSubmitEditing={() => Keyboard.dismiss()}
                    />
                    <View
                      style={{
                        marginTop: 14,
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <ResendCode resetForm={resetForm} mutateOtp={mutateOtp} otpData={userInformation} GlobelStyle={GlobelStyle} activeTheme={activeTheme} />
                      <View>
                        {touched.otp && errors.otp && (
                          <Animatable.Text
                            animation="shake"
                            style={[GlobelStyle.error]}>
                            {errors.otp}
                          </Animatable.Text>
                        )}
                        {visible && (
                          <Animatable.Text
                            ref={animationRef}
                            duration={800}
                            style={[GlobelStyle.ContactlargeFont, GlobelStyle.error]}>
                            {t('WrongOtp')}
                          </Animatable.Text>
                        )}
                      </View>
                    </View>
                    <View>
                      {
                        // !verifyingMobile ? <ActivityIndicator size="small" color={activeTheme.Light} /> :
                        // <AppButton
                        //   title={!verifyingMobile ? (t('Verify')) : (t('Please wait...'))}
                        //   mode={'contained'}
                        //   loading={verifyingMobile}
                        //   disabled={(verifyingMobile||values?.otp?.length!=6)}
                        //   color={activeTheme.themeColor}
                        //   onPress={handleSubmit}
                        // />

                        <TouchableOpacity
                          onPress={handleSubmit}
                          disabled={(verifyingMobile || isNavigating || values?.otp?.length != 6)}
                          style={[
                            GlobelStyle.bottomButton,
                            {
                              backgroundColor: (verifyingMobile || isNavigating || values?.otp?.length != 6)
                                ? activeTheme.Medium
                                : activeTheme.themeColor,
                            },
                          ]}>
                          {(verifyingMobile || isLoading) ? (
                            <View style={{ flexDirection: 'row' }}>
                              <ActivityIndicator size="small" color={activeTheme.Light} />
                              <Text style={[GlobelStyle.ContactlargeFont]}>
                                Auto Fetching OTP...
                              </Text>
                            </View>
                          ) : isNavigating ? (
                            <View style={{ flexDirection: 'row' }}>
                              <ActivityIndicator size="small" color={activeTheme.Light} />
                              <Text style={[GlobelStyle.ContactlargeFont]}>
                                Verifying...
                              </Text>
                            </View>
                          ) : (
                            <Text style={[GlobelStyle.ContactlargeFont]}>
                              {!verifyingMobile ? (t('Verify')) : (t('Please wait...'))}
                            </Text>
                          )}
                        </TouchableOpacity>
                      }
                    </View>
                  </View>
                );
              }}
            </Formik>
            <View style={[VerifyOtpStyle.appVersion]}>
              <View style={{ alignItems: 'center' }}>
                <Image
                  source={Images.LoyaltyLogo} // replace with your illustration
                  style={{ height: 100, width: '60%', opacity: 0.5 }}
                  resizeMode="contain"
                />
              </View>
              <Text style={VerifyOtpStyle.appVersionText}>
                Version:
                <Text
                  style={VerifyOtpStyle.signupLink}
                  onPress={() => navigation.navigate('Signup')}
                >
                  {version}
                </Text>
              </Text>
            </View>
          </View>
          <SnackbarComponent
            visible={showSnackBar}
            message={snackMessage}
            backgroundColor={bgColor}
          />
        </KeyboardAwareScrollView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}

export default VerifyOtpPage;
