import { useNavigation, useRoute } from '@react-navigation/native';
import { CheckBox, ListItem } from '@rneui/themed';
import React, { useCallback, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,

} from 'react-native';
import { ApiCall } from '../../../../services/ServiceProvider';
import Toast from 'react-native-toast-message';
import { useTranslation } from 'react-i18next';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import { Checkbox, Title } from 'react-native-paper';
import { default as Icon } from 'react-native-vector-icons/MaterialIcons';
import AppBoldText from '../../../../core/components/BoldText/AppBoldText';
import AppLoader, { AppLoader2 } from '../../../../core/components/Loader/AppLoader';
import AppButton from '../../../../core/components/Button/AppButton';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';


const LoyaltyRedeemRequest = () => {
    const [otp, setOtp] = useState('');
    const [otp2, setOtp2] = useState('');
    const [timeLeft, setTimeLeft] = useState(30);
    const [otpButton, setOtpButton] = useState(true);
    const [checked, setChecked] = useState(false);
    const [cancelPolicy, setCancelPolicy] = useState(false);
    const [CashPoint, setCashPoint] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [isCancellationPolicyAccepted, setIsCancellationPolicyAccepted] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [giftDetail, setGiftDetail] = useState({});
    const [karigarDetail, setKarigarDetail] = useState({});
    const route = useRoute();
    const navigation = useNavigation();
    const gift_id = route.params.gift_id;
    const gift_type = route.params.gift_type;
    const activeTheme = useActiveTheme();
    const { t } = useTranslation();
    const GlobelStyle = useGlobelStyle();
    const [buttonLoading, setButtonLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);
    const org_data = {};

    useEffect(() => {

        getOtpDetail();
        getGiftDetail();
        if (gift_type == 'Cash') {
            setCashPoint(route.params.cash_point);
        }
    }, []);


    const handleOtpChange = (text) => {
        setOtp2(text);
    };

    const getOtpDetail = async () => {
        try {
            setOtpButton(false);
            await ApiCall({}, 'AppGiftTracker/otpSend').then((result) => {
                if (result.statusCode == 200) {
                    setOtp(result.resp.otp);
                    const id = setInterval(() => {
                        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
                    }, 1000);
                    setTimeout(() => {
                        setOtpButton(true);
                        clearInterval(id);
                        setTimeLeft(30);
                    }, 30000);
                }
                else {
                    Toast.show({ type: 'error', text1: result.statusMsg, visibilityTime: 6000 });
                }
            });
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Failed' + error, visibilityTime: 6000 });
        }

    };


    const getGiftDetail = useCallback(async () => {
        try {
            setIsRefreshing(true);
            await ApiCall({ 'id': gift_id }, 'AppGiftGallery/giftGalleryDetail').then(result => {
                if (result.statusCode == 200) {
                    setGiftDetail(result.gift_master_list);
                    setKarigarDetail(result.detail);
                    setIsRefreshing(false);

                } else {
                    Toast.show({ type: 'error', text1: result.statusMsg, visibilityTime: 6000 });
                    setIsRefreshing(false);
                }
            });
        } catch (err) {
            setIsRefreshing(false);
            Toast.show({ type: 'error', text1: t('Please Try Again...') + err, visibilityTime: 6000 });
        }
    }, []);

    const address = () => {
        if (checked == true) {
            setShippingAddress(karigarDetail.address + ' ,' + karigarDetail.city + ' ,' + karigarDetail.district + ' ,' + karigarDetail.state + ' ,' + karigarDetail.pincode);
        }
        else {
            setShippingAddress('');
        }
    };

    useEffect(() => {
        address();
    }, [checked]);

    const submit = async () => {
        try {
            if (giftDetail.gift_type == 'Gift' && !shippingAddress) {
                Toast.show({ type: 'error', text1: 'Shipping address required', visibilityTime: 6000 });
                return;
            }
            if (giftDetail.gift_type == 'Gift' && (karigarDetail.document_no == '' || karigarDetail.document_type == '' || karigarDetail.document_image == '')) {
                Toast.show({ type: 'error', text1: 'Document details not updated yet. Update your document details and retry', visibilityTime: 6000 });
                return;
            }

            if (giftDetail.gift_type == 'Cash' && (karigarDetail.account_holder_name == '' || karigarDetail.bank_name == '' || karigarDetail.account_no == '' || karigarDetail.ifsc_code == '')) {
                Toast.show({ type: 'error', text1: 'Bank details not updated yet. Update your bank details and retry', visibilityTime: 6000 });
                return;
            }

            if (giftDetail.gift_type == 'Cash') {
                if (org_data.redeemption_prefrence == 0 || org_data.redeemption_prefrence == 2) {
                    if ((!karigarDetail.bank_name || !karigarDetail.account_no || !karigarDetail.ifsc_code || !karigarDetail.account_holder_name) && karigarDetail.user_redeemption_prefrence === 'Bank') {
                        Toast.show({ type: 'error', text1: 'Bank details not updated yet. Update your bank details and retry', visibilityTime: 6000 });
                        return;
                    }
                }
                if (org_data.redeemption_prefrence == 1 || org_data.redeemption_prefrence == 2) {
                    if (!karigarDetail.upi_id && karigarDetail.user_redeemption_prefrence === 'UPI') {
                        Toast.show({ type: 'error', text1: 'UPI details not updated yet. Update your UPI details and retry', visibilityTime: 6000 });
                        return;
                    }
                }
            }

            if (otp2 != otp) {
                Toast.show({ type: 'error', text1: 'Invaild OTP', visibilityTime: 6000 });
                return;
            }

            if (!cancelPolicy) {
                Toast.show({ type: 'error', text1: 'Accept Cancellation Policy', visibilityTime: 6000 });
                return;
            }

            setButtonLoading(true);
            setButtonDisable(true);
            setIsRefreshing(true);
            await ApiCall({
                'data': {
                    'gift_id': gift_id,
                    'gift_name': giftDetail.title,
                    'redeem_type': giftDetail.gift_type,
                    'point': giftDetail.gift_type == 'Cash' ? CashPoint : giftDetail.gift_point,
                    'payment_mode': 'Bank',
                    'account_holder_name': karigarDetail.account_holder_name,
                    'bank_name': karigarDetail.bank_name,
                    'account_no': karigarDetail.account_no,
                    'ifsc_code': karigarDetail.ifsc_code,
                    'shipping_address': shippingAddress,
                    'remark': '',
                },
            }, 'AppGiftTracker/addRedeemRequest').then((result) => {
                if (result.statusCode == 200) {
                    navigation.goBack();
                    Toast.show({ type: 'success', text1: result.statusMsg, visibilityTime: 6000 });
                }
                else if (result.status == 'tds_amount_greater_than_your_redeem') {

                    Toast.show({ type: 'error', text1: 'You Can not redeem because your TDS amount is greater than your redeem amount !' });
                    return;
                }
                else {
                    Toast.show({ type: 'error', text1: result.statusMsg, visibilityTime: 6000 });

                }
                setIsRefreshing(false);
                setButtonDisable(false);
                setButtonLoading(false);
            });
        } catch (error) {
            setButtonDisable(false);
            setButtonLoading(false);
            setIsRefreshing(false);
            Toast.show({ type: 'error', text1: t(error), visibilityTime: 6000 });
        }


    };

    return (
        <SafeAreaView style={styles.container}>
            {
                isRefreshing ? <View style={{ flex: 1 }}>
                    <AppLoader2 loading={isRefreshing} color={'red'} size={40} />
                </View> : <ScrollView >
                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryTitle}>{t('Summary')}</Text>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>{t('Your Current Points')}</Text>
                            <Text style={styles.summaryValue}>{karigarDetail.wallet_point}</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>{t('Gift Point Value')}</Text>
                            <Text style={styles.summaryValue}>-{gift_type == 'Gift' ? giftDetail.gift_point : CashPoint}</Text>
                        </View>
                        <View style={styles.summaryItem}>
                            <Text style={styles.summaryLabel}>{t('Your Balance Points')}</Text>
                            <Text style={styles.summaryValue}>= {gift_type == 'Gift' ? (parseFloat(karigarDetail.wallet_point) - parseFloat(giftDetail.gift_point)) : (parseFloat(karigarDetail.wallet_point) - parseFloat(CashPoint))}</Text>
                        </View>
                    </View>

                    <Text style={styles.otpText}>
                        {t('To Confirm your redeem request,')} {t('kindly enter the OTP sent on your registered mobile number-')} {karigarDetail.mobile_no}
                    </Text>

                    <TextInput
                        style={styles.otpInput}
                        placeholder={t('Enter the OTP here...')}
                        value={otp2}
                        placeholderTextColor="#666363"
                        onChangeText={handleOtpChange}
                        keyboardType="numeric"
                        maxLength={6}
                    />
                    {
                        otpButton ? <TouchableOpacity style={[styles.resendButton, { backgroundColor: activeTheme.themeColor }]} onPress={getOtpDetail}>
                            <Text style={styles.resendButtonText}>{t('Didn\'t receive? Resend')}</Text>
                        </TouchableOpacity> :
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Title style={[GlobelStyle.smLargeFont]}>
                                    {t('Didn\'t receive?')} {'00:'} {timeLeft}s
                                </Title>
                            </View>

                    }

                    {
                        giftDetail.gift_type == 'Gift' ? (
                            <>
                                <CheckBox
                                    title={t('Same as address')}
                                    checked={checked}
                                    iconType="material-community"
                                    checkedIcon="checkbox-marked"
                                    uncheckedIcon="checkbox-blank-outline"
                                    containerStyle={{ width: '100%', marginLeft: -10, backgroundColor: 'none' }}
                                    onPress={() => { setChecked(!checked); address(); }}
                                />

                                <View style={[GlobelStyle.mt16]}>
                                    <TextInput
                                        style={styles.otpInput}
                                        placeholder={t('Shipping Address')}
                                        placeholderTextColor="#666363"
                                        value={shippingAddress}
                                        onChangeText={setShippingAddress}
                                        multiline
                                    />
                                </View>
                            </>
                        ) : (
                            <>
                                {
                                    giftDetail.user_redeemption_prefrence == 'Bank' && (
                                        <>
                                            < ListItem bottomDivider>
                                                <Icon name="account-balance" size={24} />
                                                <ListItem.Content>
                                                    <ListItem.Title><AppBoldText>{t('Account Holder Name')}</AppBoldText></ListItem.Title>
                                                    <ListItem.Subtitle>{karigarDetail.account_holder_name ? karigarDetail.account_holder_name : '---'}</ListItem.Subtitle>
                                                </ListItem.Content>
                                            </ListItem>


                                            <ListItem bottomDivider>
                                                <Icon name="savings" size={24} />
                                                <ListItem.Content>
                                                    <ListItem.Title><AppBoldText>{t('Bank Name')}</AppBoldText></ListItem.Title>
                                                    <ListItem.Subtitle>{karigarDetail.bank_name ? karigarDetail.bank_name : '---'}</ListItem.Subtitle>
                                                </ListItem.Content>
                                            </ListItem>



                                            <ListItem bottomDivider>
                                                <Icon name="account-balance-wallet" size={24} />
                                                <ListItem.Content>
                                                    <ListItem.Title><AppBoldText>{t('Account Number')}</AppBoldText></ListItem.Title>
                                                    <ListItem.Subtitle>{karigarDetail.account_no ? karigarDetail.account_no : '---'}</ListItem.Subtitle>
                                                </ListItem.Content>
                                            </ListItem>


                                            <ListItem bottomDivider>
                                                <Icon name="savings" size={24} />
                                                <ListItem.Content>
                                                    <ListItem.Title><AppBoldText>{t('IFSC Code')}</AppBoldText></ListItem.Title>
                                                    <ListItem.Subtitle>{karigarDetail.ifsc_code ? karigarDetail.ifsc_code : '---'}</ListItem.Subtitle>
                                                </ListItem.Content>
                                            </ListItem>
                                        </>
                                    )

                                }

                                {
                                    giftDetail.user_redeemption_prefrence == 'UPI' && (
                                        <ListItem bottomDivider>
                                            <Icon name="savings" size={24} />
                                            <ListItem.Content>
                                                <ListItem.Title><AppBoldText>{t('IFSC Code')}</AppBoldText></ListItem.Title>
                                                <ListItem.Subtitle>{karigarDetail.ifsc_code ? karigarDetail.ifsc_code : '---'}</ListItem.Subtitle>
                                            </ListItem.Content>
                                        </ListItem>
                                    )
                                }

                            </>
                        )
                    }



                    <View style={GlobelStyle.mb10}>
                        <CheckBox
                            title={t('I accept the') + ' ' + t('Cancellation Policy')}
                            checked={cancelPolicy}
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            containerStyle={{ width: '100%', marginLeft: -10, backgroundColor: 'none' }}
                            onPress={() => setCancelPolicy(!cancelPolicy)}
                        />

                    </View>

                    <View style={styles.buttonContainer}>
                        {/* <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.pop()}> */}


                        {/* </TouchableOpacity> */}
                        <AppButton
                            title={t('Cancel')}
                            mode={'contained'}
                            // loading={buttonLoading}
                            disabled={buttonDisable}
                            color={'red'}
                            onPress={() => navigation.pop()}
                        />
                        <AppButton
                            title={t('Confirm')}
                            mode={'contained'}
                            loading={buttonLoading}
                            disabled={buttonDisable}
                            color={activeTheme.themeColor}
                            onPress={() => submit()}
                        />
                        {/* <TouchableOpacity style={styles.confirmButton}> */}
                        {/* <Text style={styles.buttonText}>Confirm</Text> */}

                        {/* </TouchableOpacity> */}
                    </View>
                </ScrollView>
            }

        </SafeAreaView >

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
    },
    summaryContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        color: '#000',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#666363',
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    summaryLabel: {
        color:'#666363',
        fontWeight: 'bold',
    },
    summaryValue: {
        color: '#007bff',
    },
    otpText: {
        color: '#666363',
        marginBottom: 10,
    },
    otpInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        color: '#666363',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginBottom: 10,
    },
    resendButton: {
        // backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    resendButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    cancellationPolicyText: {
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
    },
    confirmButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        flex: 1,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default LoyaltyRedeemRequest;
