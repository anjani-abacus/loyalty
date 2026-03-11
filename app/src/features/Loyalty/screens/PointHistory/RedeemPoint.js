import React, { useEffect, useState, useContext } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AppTextInput from '../../../../core/components/TextInput/AppTextInput';
import { useNavigation } from '@react-navigation/native';
import { useRequestRedeemOtp } from '../../../../api/hooks/useVerifyMobile';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import Toast from 'react-native-toast-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { AuthContext } from '../../../../auth/AuthContext';
import { ThemeContext } from '../../../../context/ThemeContext';
import BankDetails from '../../../../core/screens/MyProfile/BankDetails';
import ThemedText from '../../../../core/components/ThemedText';
import { Icon } from '@rneui/themed';
import useStyles from './style';
import useTheme from '../../../../core/components/Theme/useTheme';
import FastImage from 'react-native-fast-image';
import { Images } from '../../../../core/assets';
import Coin from '../../../../core/assets/icons/CoinGold.svg';
import Gift3dBox from '../../../../core/assets/icons/Gift3dBox.svg';
import RadioChecked from '../../../../core/assets/icons/RadioChecked.svg';
import RadioUnchecked from '../../../../core/assets/icons/RadioUnchecked.svg';
import { AuthorizationScreen } from '../../../../core/components/No_Internet_Connection/AppNoInternet';
import { useTranslation } from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import { LockIcon } from '../../../../core/assets/SVGs/svg';
import AppTheme from '../../../../core/components/Theme/AppTheme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UpcomingRewards from '../../../../core/components/UpcomingRewards';

const addressSchema = Yup.object().shape({
    // address: Yup.string().trim().required("Address is required"),
    pincode: Yup.string()
        .trim()
        .length(6, 'Must be 6 digits')
        .required('Pincode is required'),
    state: Yup.string().trim().required('State is required'),
    district: Yup.string().trim().required('District is required'),
    city: Yup.string().trim().required('City is required'),
    area: Yup.string().trim().required('Area is required'),
    country: Yup.string().nullable(),
});

const validationSchema = Yup.object().shape({
    gift_point: Yup.string().required('Enter points to send request'),
    remark: Yup.string(),
    addressInfo: addressSchema,
});

const Card = ({ closeBottomSheet, item }) => {
    const styles = useStyles();
    const {t} = useTranslation();
    const activeTheme = useTheme();
    return (
        <>
            <View
                style={{
                    backgroundColor: '#F8F3E9',
                    padding: 10,
                    margin: 10,
                    marginBottom: 0,
                    flexDirection: 'row',
                    gap: 20,
                }}
            >
                <TouchableOpacity style={[{
                    position: 'absolute',
                    height: 30,
                    width: 30,
                    borderRadius: 50,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: 0,
                    backgroundColor: '#F9E2E2',
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                }]} onPress={closeBottomSheet}>
                    <ThemedText style={[styles.buttonText, { color: '#f00' }]}>
                        X
                    </ThemedText>
                </TouchableOpacity>

                <View style={{
                    alignItems: 'center',
                    borderRadius: 10,
                    flexDirection: 'row',
                    backgroundColor: activeTheme.section,
                    justifyContent: 'center',
                    padding: 5,

                }}>
                    <FastImage
                        style={{ height: 100, width: 100, borderRadius: 10 }}
                        source={{ uri: item?.gift_img }}
                        priority={FastImage.priority.high}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>

                <View style={{
                    flex:1,
                }}>
                    <View>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: '#000',
                            flexShrink:1,
                        }}>{item?.title}</Text>

                        {/* <Text style={{
                            fontSize: 12,
                            color: '#000'
                        }}>Color - desert item</Text>
                        <Text style={{
                            fontSize: 12,
                            color: '#000'
                        }}>Capacity - 256GB</Text> */}
                    </View>

                    <View style={{
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        padding: 5,
                        marginTop: 4,
                    }}>
                        <Text>{t('Coins Required')}</Text>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%',
                            gap: 4,
                            alignItems: 'center',
                            marginTop: 5,
                        }}>
                            <Coin height="20" width="20" />
                            <Text style={{
                                color: '#000',
                                fontSize: 18,
                                fontWeight: 'bold',
                            }}>{item?.gift_point}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* <View style={{ paddingHorizontal: 10 }}>
                <UpcomingRewards title={t('Other rewards, you can claim')} />
            </View> */}
        </>
    );
};

const RedeemPoint = ({deleteAddress, savedAddress, resetAddress, navigation, setRedeemItemDetails, activeItem, availablePoints, closeBottomSheet }) => {
    const { mutate } = useRequestRedeemOtp();
    const styles = useStyles();
    const { t } = useTranslation();
    const activeTheme = useTheme();
    const nativeNavigation = useNavigation();
    const { loginData } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [shippingAddress, setShippingAddress] = useState('Same as Profile Address');
    const [payment_mode, setpayment_mode] = useState('Bank');

    const requiredFields = ['pincode', 'city', 'state', 'district', 'area'];
    const isAddressComplete = (addressInfo = {}) =>
        requiredFields.every((field) => addressInfo?.[field] && addressInfo[field].trim() !== '');


    const profileAddress = {
        country: loginData?.country,
        // address: loginData?.address,
        pincode: loginData?.pincode,
        state: loginData?.state,
        district: loginData?.district,
        city: loginData?.city,
        area: loginData?.area,
    };

    const updateAddressFields = (shippingAddress, setFieldValue) => {
        if (shippingAddress === 'Same as Profile Address') {
            setFieldValue('addressInfo', profileAddress);
        } else if (shippingAddress === 'Other Address') {
            setFieldValue('addressInfo', savedAddress || {});
        }
    };

    const handleSubmit = (values) => {
        const request = { phone: loginData?.mobile };
        console.log(values);
        setRedeemItemDetails(values);
        mutate(request, {
            onSuccess: (resp) => {
                Toast.show({
                    type: 'success',
                    text1: resp?.message || 'OTP Sent Successfully',
                    visibilityTime: 2000,
                });
                nativeNavigation.navigate('pointSummary');
                ReactNativeHapticFeedback.trigger('notificationSuccess',
                    { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
            },
            onError: () => {
                Toast.show('Something went wrong!', {
                    type: 'danger',
                    duration: 3000,
                    icon: (
                        <Icon
                            name="error"
                            type="material-community-icons"
                            color="white"
                            size={20}
                        />
                    ),
                });
            },
        });
    };

    return (
        <Formik
            initialValues={{
                redemptionType: 'giftRedemption',
                gift_point: activeItem?.gift_point,
                Remark: '',
                upi_id: loginData?.upi_id || '',
                payment_mode: 'Bank',
                accountNo: loginData?.accountNo,
                ifscCode: loginData?.ifscCode,
                bankName: loginData?.bankName,
                accountHolderName: loginData?.accountHolderName,
                addressInfo: profileAddress,
            }}
            // validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
        >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => {

                useEffect(() => {
                    if (shippingAddress === 'Same as Profile Address') {
                        setFieldValue('addressInfo', profileAddress);
                    } else if (shippingAddress === 'Other Address' && savedAddress) {
                        setFieldValue('addressInfo', savedAddress);
                    }
                }, [savedAddress, shippingAddress]);

                const isGift = activeItem?.gift_type?.toLowerCase() === 'gift';
                const canSubmit = !isGift || isAddressComplete(values.addressInfo);

                return (
                    <KeyboardAwareScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        enableOnAndroid={true}
                        extraScrollHeight={200} // pushes input above keyboard
                        keyboardShouldPersistTaps="handled"
                    >


                        <>
                            {activeItem && <Card closeBottomSheet={closeBottomSheet} item={activeItem} />}
                            {(activeItem?.gift_type?.toLowerCase() === 'cash' && loginData?.kyc_status?.toLowerCase() != 'approved') ?
                                <AuthorizationScreen
                                    image={Images.scanNotAllowed}
                                    imageSize={'contain'}
                                    handler={false}
                                    title={t('Not Allowed To Redeem')}
                                    message={t('cash redeem not allowed')}
                                /> :
                                <View style={styles.innerView}>
                                    {/* <View style={{ backgroundColor: activeTheme.section, padding: 5 }}>
                                    <View style={[styles.flex, styles.justifyBetwen]}>
                                        <ThemedText style={styles.headerText}>Redeem Your Points</ThemedText>
                                    </View>
                                    <View>
                                        <ThemedText style={styles.subHeaderText}>
                                            Choose how you would like to redeem your
                                        </ThemedText>
                                        <ThemedText style={styles.boldSubHeader}>
                                            {availablePoints} available points.
                                        </ThemedText>
                                    </View>
                                </View> */}

                                    <View style={styles.inputWrapper}>
                                        {(activeItem?.gift_type?.toLowerCase() === 'cash') && <>
                                            <ThemedText>Choose Payment Mode:</ThemedText>
                                            <RadioButton
                                                options={['Bank', 'UPI']}
                                                // direction='horizontal'
                                                optionWrapperStyle={{ gap: 10 }}
                                                selectedOption={payment_mode}
                                                onSelect={(val) => { setFieldValue('payment_mode', val); setpayment_mode(val); }}
                                            />

                                            {payment_mode === 'Bank' && <BankDetails isEditable={false} loginData={loginData} />}

                                            {payment_mode === 'UPI' && <View style={{ backgroundColor: '#fff', padding: 10 }}>
                                                <TextInput
                                                    placeholder="Enter your UPI Id"
                                                    value={values.upi_id}
                                                    style={{ borderWidth: 1, borderRadius: 8, borderColor: '#ccc', paddingHorizontal: 10 }}
                                                    onChangeText={handleChange('upi_id')}
                                                    onBlur={() => handleBlur('upi_id')}
                                                />
                                            </View>}
                                        </>}

                                        <View style={{
                                            backgroundColor: '#F9EFFF',
                                            borderRadius: 10,
                                            padding: 10,
                                        }}>
                                            {activeItem?.gift_type?.toLowerCase() === 'gift' && <>
                                                <ThemedText style={{
                                                    fontSize: 14,
                                            fontWeight: '500',
                                            color: '#000',
                                                }}>{t('Deliver To')}:</ThemedText>
                                                <RadioButton
                                                    options={['Same as Profile Address', 'Other Address']}
                                                    description={profileAddress}
                                                    style={{ marginTop: 0 }}
                                                    preferenceSectionStyle={{ paddingVertical: 0 }}
                                                    optionWrapperStyle={{ justifyContent: 'space-between', width: '100%' }}
                                                    selectedOption={shippingAddress}
                                                    onSelect={(val) => { updateAddressFields(val, setFieldValue); setShippingAddress(val); }}
                                                />

                                                {shippingAddress === 'Same as Profile Address' && (
                                                    <View style={[{ marginTop: 12 }, styles.inputSection]}>
                                                        <View style={{
                                                            backgroundColor: '#fff',
                                                            padding: 16,
                                                            borderRadius: 12,
                                                            shadowColor: '#000',
                                                            shadowOffset: { width: 0, height: 2 },
                                                            shadowOpacity: 0.1,
                                                            shadowRadius: 4,
                                                            elevation: 3,
                                                        }}>
                                                            <ThemedText style={{ fontWeight: '600', fontSize: 16, color: '#333' }}>🏠 {t('Profile Address')}</ThemedText>
                                                            <ThemedText style={{ fontSize: 14, color: '#555', lineHeight: 20 }}>
                                                                {[
                                                                    // profileAddress?.address,
                                                                    profileAddress?.area,
                                                                    profileAddress?.city,
                                                                    profileAddress?.district,
                                                                    profileAddress?.state,
                                                                    profileAddress?.pincode,
                                                                    profileAddress?.country,
                                                                ].filter(Boolean).join(', ')}
                                                            </ThemedText>
                                                        </View>
                                                    </View>
                                                )}

                                                {shippingAddress === 'Other Address' && (
                                                    <View style={[{ marginTop: 12 }, styles.inputSection]}>
                                                        <View style={{
                                                            backgroundColor: '#fff',
                                                            padding: 16,
                                                            borderRadius: 12,
                                                            shadowColor: '#000',
                                                            shadowOffset: { width: 0, height: 2 },
                                                            shadowOpacity: 0.1,
                                                            shadowRadius: 4,
                                                            elevation: 3,
                                                        }}>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                                                                <ThemedText style={{ fontWeight: '600', fontSize: 16, color: '#333' }}>📍 {t('Other Address')}</ThemedText>
                                                                {savedAddress ? <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                                                                    <TouchableOpacity onPress={() => navigation.navigate('Address', {itemInfo:activeItem})}>
                                                                        <Icon name="edit" size={18} color="#007bff" />
                                                                    </TouchableOpacity>
                                                                    <TouchableOpacity onPress={() => {deleteAddress(); setFieldValue('addressInfo', {}); }}>
                                                                        <Icon name="delete" size={18} color="red" />
                                                                    </TouchableOpacity>
                                                                </View> : <TouchableOpacity onPress={() => navigation.navigate('Address', {itemInfo:activeItem})}>
                                                                    <Icon name="add" size={18} color="#007bff" />
                                                                </TouchableOpacity>}
                                                            </View>
                                                            <ThemedText style={{ fontSize: 14, color: savedAddress ? '#555' : '#999', lineHeight: 20 }}>
                                                                {savedAddress ? [
                                                                    // savedAddress?.address,
                                                                    savedAddress?.area,
                                                                    savedAddress?.city,
                                                                    savedAddress?.district,
                                                                    savedAddress?.state,
                                                                    savedAddress?.pincode,
                                                                    savedAddress?.country,
                                                                ].filter(Boolean).join(', ') : t('No saved address found. Please add one.')}
                                                            </ThemedText>
                                                        </View>
                                                    </View>
                                                )}
                                            </>}
                                        </View>

                                        <View style={styles.inputSection}>
                                            <AppTextInput
                                                label="Special Instructions"
                                                mode="outlined"
                                                placeholderTextColor={activeTheme.Medium}
                                                type="multiline"
                                                value={values.Remark}
                                                onChangeText={val => setFieldValue('Remark', val)}
                                                autoCorrect={true}
                                            />
                                            {touched.Remark && errors.Remark && (
                                                <ThemedText style={styles.errorText}>{errors.Remark}</ThemedText>
                                            )}
                                        </View>
                                    </View>

                                    <View style={[styles.flex, styles.justifyEnd]}>
                                        <TouchableOpacity style={[styles.button, { backgroundColor: '#F9E2E2' }]} onPress={closeBottomSheet}>
                                            <ThemedText style={[styles.buttonText, { color: '#f00', fontWeight: 'bold' }]}>Cancel</ThemedText>
                                        </TouchableOpacity>

                                        {/* canSubmit &&  */}
                                        {activeItem?.gift_type?.toLowerCase() == 'gift' && <TouchableOpacity style={[styles.button, styles.filledBtn, ((values.gift_point) ? styles.buttonBg : styles.disabledButton)]} onPress={() => { (values.gift_point) ? handleSubmit() : Toast.show({ type: 'error', text1: 'Select Shipping Address First', visibilityTime: 2000 }); }}>
                                            <ThemedText style={[styles.buttonText, { fontWeight: 'bold' }]}>{t('Send Redeem Request')}</ThemedText>
                                        </TouchableOpacity>}

                                        {activeItem?.gift_type?.toLowerCase() == 'cash' && <TouchableOpacity style={[styles.button, styles.filledBtn, (((payment_mode === 'UPI' && values.upi_id) || payment_mode === 'Bank') ? styles.buttonBg : styles.disabledButton)]} onPress={() => { ((payment_mode === 'UPI' && values.upi_id) || payment_mode === 'Bank') ? handleSubmit() : Toast.show({ type: 'error', text1: 'Enter UPI Id First', visibilityTime: 2000 }); }}>
                                            <ThemedText style={[styles.buttonText, { fontWeight: 'bold' }]}>{t('Send Redeem Request')}</ThemedText>
                                        </TouchableOpacity>}
                                    </View>
                                </View>}
                        </>
                    </KeyboardAwareScrollView>
                );
            }}
        </Formik>
    );
};

export default RedeemPoint;

export const RadioButton = ({ description = {}, direction = 'column', style = {}, preferenceSectionStyle = {}, optionWrapperStyle = {}, options, selectedOption, onSelect, navigation }) => {
    const activeTheme = useTheme();

    const styles = StyleSheet.create({
        active: {
            color: activeTheme.text,
        },
        optionsWrapperHorizontal: {
            flexDirection: 'row',
            ...optionWrapperStyle,
        },
        preferenceSection: {
            padding: 20,
            backgroundColor: '#fff',
            ...preferenceSectionStyle,
        },
        option: {
            gap: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            ...(direction == 'column' && { paddingVertical: 20 }),
            borderBottomWidth: 0.5,
            borderBottomColor: '#ccc',
        },
        optionText: {
            fontWeight: 'bold',
            fontSize: 16,
        },
        ...style,
    });

    const GlobelStyle = useGlobelStyle();
    return <ScrollView>
        <View style={[styles.preferenceSection, { backgroundColor: activeTheme.section, marginTop: 10 }]}>
            <View style={(direction == 'horizontal' && styles.optionsWrapperHorizontal)}>
                {options?.map((option, i) => <TouchableOpacity key={i} style={styles.option} onPress={() => { onSelect(option); }}>

                    <View style={[{ flex: 1 }]}>
                        <Text style={[styles.optionText, styles.active]}>{option}</Text>

                        {/* <ThemedText style={{ fontSize: 14, color: '#555', lineHeight: 20 }}>
                            {[
                                description?.address,
                                description?.area,
                                description?.city,
                                description?.district,
                                description?.state,
                                description?.pincode,
                                description?.country
                            ].filter(Boolean).join(", ")}
                        </ThemedText> */}
                    </View>
                    {
                        selectedOption == option ?
                            <RadioChecked width={20} height={20} fill={activeTheme.text} /> :
                            <RadioUnchecked width={20} height={20} fill={activeTheme.text} />
                    }
                </TouchableOpacity>)}
            </View>
        </View>
    </ScrollView>;
};
