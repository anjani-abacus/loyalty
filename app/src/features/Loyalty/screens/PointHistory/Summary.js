import React, { useContext, useState } from 'react';
import {
    Clipboard,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    View,
    Linking,
} from 'react-native';
import ThemedText from '../../../../core/components/ThemedText';
import { Keyboard } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import { useNavigation } from '@react-navigation/native';
import useStyles from './style';
import LeftArrow from '../../../../core/assets/icons/arrow_left.svg';
import Gift3dBox from '../../../../core/assets/icons/Gift3dBox.svg';
import ResendCode from '../../../../core/screens/Login/VerifyOtp/ResendCode';
import { useRequestMobileOtp, useRequestRedeemOtp, useVerifyRedeemOtp } from '../../../../api/hooks/useVerifyMobile';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import { CheckBox, color } from '@rneui/base';
import { AuthContext } from '../../../../auth/AuthContext';
import { useAddRedeemRequest } from '../../../../api/hooks/useMasters';
import Toast from 'react-native-toast-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import LinearGradient from 'react-native-linear-gradient';
import { CopyButton, FolderCircleIcon, PercentageCircleIcon, StarBadgeIcon } from '../../../../core/assets/SVGs/svg';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { otpStyle } from '../../../../core/components/OTPInput/VerifyOtpStyle';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Checkbox } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object().shape({
    redemptionType: Yup.string(),
    otp: Yup.string(),
    remark: Yup.string(),
});
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


const Summary = ({ redeemItemDetails, setIsSummaryActive, activeData, availablePoints, closeBottomSheet }) => {
    console.log(redeemItemDetails);
    const GlobelStyle = useGlobelStyle();
    const { t } = useTranslation();
    const styles = useStyles();
    const [cancelPolicy, setCancelPolicy] = useState(false);
    const { loginData } = useContext(AuthContext);
    const { mutate, isPending, isSuccess, isError, error } = useVerifyRedeemOtp();
    const { mutate: submitRedeemRequest } = useAddRedeemRequest();
    const { mutate: mutateOtp } = useRequestRedeemOtp();
    const activeTheme = useActiveTheme();
    const navigation = useNavigation();
    const [otpData, setOtpData] = useState({});

    const [otp, setOTP] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [value, setValue] = useState('');
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const openLink = async (url) => {
        // Check if the link can be opened
        try {
            await Linking.openURL(url); // always works for https://
        } catch (err) {
            console.error('Failed to open URL:', err);
        }
    };

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

    const submitHandler = (values) => {
        const address = redeemItemDetails?.addressInfo;
        mutate({ 'phone': loginData?.mobile, 'otp': values.otp }, {
            onSuccess: (resp) => {
                // "gift_name":activeData?.title, "redeem_type":activeData?.giftType, "point":activeData?.giftPoint

                const request = {
                    'gift_id': activeData?.id,
                    'gift_point': redeemItemDetails?.gift_point,

                    ...(activeData?.gift_type?.toLowerCase() == 'cash' && {
                        'payment_mode': redeemItemDetails?.payment_mode,
                        'upi_id': redeemItemDetails?.upi_id,
                    }),

                    ...(activeData?.gift_type?.toLowerCase() == 'gift' && {
                        'shipping_address': [
                            // address?.address,
                            address?.area,
                            address?.city,
                            address?.districtName,
                            address?.stateName,
                            address?.pincode,
                            address?.country,
                        ]?.filter(Boolean)?.join(', '),
                    }),

                    'specialInstruction': redeemItemDetails?.Remark,
                };

                console.log('redeem request ===> ', request);
                submitRedeemRequest(request, {
                    onSuccess: (resp) => {
                        Toast.show({ type: 'success', text1: resp?.message || 'Redeem request sent' });
                        ReactNativeHapticFeedback.trigger('notificationError',
                            { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
                        closeBottomSheet();
                    },
                    onError: (err) => {
                        Toast.show({ type: 'error', text1: err?.message || 'Something went wrong' });
                        ReactNativeHapticFeedback.trigger('notificationError',
                            { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
                    },
                });
            },
            onError: (err) => {
                Toast.show({ type: 'error', text1: err?.message || 'Something went wrong' });
                ReactNativeHapticFeedback.trigger('notificationError',
                    { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
            },
        });
    };

    return <Formik
        initialValues={{
            redemptionType: 'giftRedemption',
            giftPoint: '',
            Remark: '',
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
    >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            resetForm,
            isSubmitting,
            setFieldValue,
        }) => {
            return <>
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    enableOnAndroid={true}
                    extraScrollHeight={200} // pushes input above keyboard
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.innerView}>
                        <View style={[styles.flex]}>
                            <TouchableOpacity onPress={() => navigation.goBack()}><LeftArrow width={22} /></TouchableOpacity>
                            <ThemedText style={styles.headerText}>{t('Summary')}</ThemedText>
                        </View>

                        <View style={[GlobelStyle.flex, { gap: 5, marginTop: 10 }]}>

                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                colors={['#FFFFFF', '#BFF5DA']}
                                style={[styles.block, {
                                    padding: 10,
                                    borderColor: '#AFDAC5',
                                    marginVertical: 14,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                }]}
                            >
                                <ThemedText style={styles.blockTitle}>Available Coins</ThemedText>
                                <Text
                                    style={{
                                        color: '#00AC56',
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {availablePoints}
                                </Text>
                                <StarBadgeIcon height={18} width={18} />
                            </LinearGradient>

                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                colors={['#FFFFFF', '#FFE8E5']}
                                style={[styles.block, {
                                    padding: 10,
                                    borderColor: '#f4cac3ff',
                                    marginVertical: 14,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                }]}
                            >
                                <ThemedText style={styles.blockTitle}>{t('To Be Deducted')}</ThemedText>
                                <Text
                                    style={{
                                        color: '#FF624A',
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    -{redeemItemDetails?.gift_point}
                                </Text>
                                {/* <PercentageCircleIcon height={18} width={18} /> */}
                                <View style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: 9,
                                    backgroundColor: '#FF624A',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{ color: '#fff', lineHeight: 18 }}>C</Text>
                                </View>
                            </LinearGradient>

                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                colors={['#FFFFFF', '#F6E8FF']}
                                style={[styles.block, {
                                    padding: 10,
                                    borderColor: '#cad4f1ff',
                                    marginVertical: 14,
                                    borderRadius: 8,
                                    borderWidth: 1,
                                }]}
                            >
                                <ThemedText style={styles.blockTitle}>{t('Balance Coins')}</ThemedText>
                                <Text
                                    style={{
                                        color: '#003EEE',
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {availablePoints - redeemItemDetails?.gift_point}
                                </Text>
                                <FolderCircleIcon size={18} />
                            </LinearGradient>

                        </View>

                        <View style={{
                            backgroundColor: '#fff',
                            padding: 10,
                            borderRadius: 10,

                            shadowColor: '#000000',
                            shadowOpacity: 0.1,
                            shadowOffset: { width: 0, height: 0 },
                            shadowRadius: 2,
                            elevation: 2,

                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                            }}>
                                <Text style={{
                                    color: '#000',
                                    fontWeight: 'bold',
                                }}>{t('Package Details')}</Text>
                                <TouchableOpacity onPress={() => Clipboard.setString('PKG1234ABCD' || '')}>
                                    {/* <Text style={{ alignItems: 'center', fontSize: 12 }}>Package ID: {'PKG1234ABCD'?.toUpperCase() || 'XXXXXXXXXXX'} <CopyButton height={14} width={14} fill="#000" /></Text> */}
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                gap: 10,
                                alignItems: 'center',
                            }}>
                                <View
                                    style={{
                                        padding: 10,
                                        backgroundColor: '#F4F4F4',
                                        borderRadius: 7,
                                    }}
                                >
                                    <Gift3dBox height={60} width={60} />
                                </View>

                                <View style={{flex:1}}>
                                    <Text style={{ color: '#000', fontWeight: 'bold' }}>{activeData?.title}</Text>

                                    <View>
                                        <Text style={{
                                            color: '#000',
                                            fontSize: 14,
                                        }}>{t('Shipping Address')}</Text>
                                        <Text style={{
                                            fontSize: 12,
                                            color:activeTheme.TextColor,
                                        }}>
                                            {redeemItemDetails?.addressInfo ? [
                                                redeemItemDetails?.addressInfo?.area,
                                                redeemItemDetails?.addressInfo?.city,
                                                redeemItemDetails?.addressInfo?.district,
                                                redeemItemDetails?.addressInfo?.state,
                                                redeemItemDetails?.addressInfo?.pincode,
                                                redeemItemDetails?.addressInfo?.country,
                                            ].filter(Boolean).join(', ') : 'No address available!'}

                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                gap: 10,
                                marginTop: 10,
                            }} />

                            <View style={{ marginVertical: 10, borderTopWidth: 1, borderColor: '#eee' }} />

                            {/* <View style={{
                                flexDirection: 'row',
                                gap: 10,
                                marginTop: 10
                            }}>
                                <View>
                                    <Text style={{
                                        color: '#000',
                                        fontSize: 14,
                                    }}>Deliver at 16th Sep, 2025</Text>
                                    <Text style={{
                                        fontSize: 12
                                    }}>
                                        {
                                            loginData?.area + ", " +
                                            loginData?.city + ", " +
                                            loginData?.district + ", " +
                                            loginData?.state + ", " +
                                            loginData?.pincode + ", " +
                                            loginData?.country
                                        }
                                    </Text>

                                    <View style={{
                                        marginTop: 10
                                    }}>
                                        <Text style={{
                                            color: '#000',
                                            fontWeight: "500"
                                        }}>{loginData?.mobile}</Text>
                                    </View>
                                </View>
                            </View> */}
                        </View>

                        <View style={{
                            marginTop: 10,
                        }}>
                            <Text style={{color:activeTheme.TextColor}}>
                                {t('To confirm your redeem request, kindly enter OTP sent on your registered mobile number')}
                            </Text>
                        </View>

                        <View style={styles.inputWrapper}>
                            <CodeField
                                {...props}
                                ref={ref}
                                value={values.otp}
                                autoFocus
                                autoComplete="sms-otp"
                                onChangeText={value => {
                                    handleChange('otp')(value);
                                    handleOtpInputChange(value);
                                    if (value.length === 6) {
                                        Keyboard.dismiss(); // ✅ close keyboard once OTP is filled
                                    }
                                }}
                                cellCount={CELL_COUNT}
                                blurOnSubmit={true}
                                rootStyle={otpStyle.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={renderCell}
                            />
                        </View>
                        <ResendCode resetForm={resetForm} mutateOtp={mutateOtp} otpData={{ 'phone': loginData?.mobile }} GlobelStyle={GlobelStyle} activeTheme={activeTheme} />
                        <View>


                            {/* <TouchableOpacity onPress={openLink('https://basiq360.com')}>
                            <Text>Cancellation Policy</Text>
                        </TouchableOpacity> */}

                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                marginVertical: 16,
                            }}>
                                {/* <CheckBox
                                    title={'I accept the Cancellation Policy'}
                                    checked={cancelPolicy}
                                    iconType="material-community"
                                    checkedIcon="checkbox-marked"
                                    uncheckedIcon="checkbox-blank-outline"
                                    containerStyle={{ width: '100%', marginLeft: -10, backgroundColor: 'none' }}
                                    onPress={() => setCancelPolicy(!cancelPolicy)}
                                /> */}

                                <Checkbox
                                    // disabled={isPending}
                                    status={cancelPolicy ? 'checked' : 'unchecked'}
                                    onPress={() => setCancelPolicy(!cancelPolicy)}
                                    color={activeTheme.TextColor}
                                />
                                <ThemedText style={GlobelStyle.smLabel}>
                                    {('I agree with')} {' '}
                                </ThemedText>
                                <TouchableOpacity onPress={() => Linking.openURL('https://basiq360.com')}>
                                    <ThemedText style={{
                                        fontWeight: '700',
                                        fontSize: 12,
                                        color: '#004CAC',
                                        textDecorationLine: 'underline',
                                    }}>
                                        {t('Cancellation Policy')}
                                    </ThemedText>
                                </TouchableOpacity>
                                {/* <ThemedText style={GlobelStyle.smLabel}> {t('and')} </ThemedText>
                                              <TouchableOpacity onPress={() => Linking.openURL('https://basiq360.com')}>
                                                <ThemedText style={styles.link}>{t('Privacy Policy')}</ThemedText>
                                              </TouchableOpacity> */}
                            </View>

                        </View>
                        <View style={[styles.flex, styles.justifyEnd]}>
                            <TouchableOpacity style={[styles.button, { backgroundColor: '#F9E2E2' }]} onPress={() => closeBottomSheet()}>
                                <ThemedText style={[styles.buttonText, { color: '#f00', fontWeight: 'bold' }]}>Cancel</ThemedText>
                            </TouchableOpacity>

                            <TouchableOpacity disabled={!cancelPolicy} onPress={() => { values.otp ? handleSubmit() : Toast.show({ type: 'error', text1: 'Enter OTP First' }); }} style={[styles.button, styles.filledBtn, ((cancelPolicy && values.otp) ? styles.buttonBg : styles.disabledButton)]}>
                                <ThemedText style={[styles.buttonText, { fontWeight: 'bold' }]}>{t('Verify And Redeem')}</ThemedText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </>;
        }}
    </Formik>;
};

export default Summary;
