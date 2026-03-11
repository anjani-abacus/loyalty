import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions, SafeAreaView, ScrollView } from 'react-native';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import Toast from 'react-native-toast-message';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { ApiCall } from '../../../../services/ServiceProvider';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import { UPLOAD_URL } from '../../../../services/BaseService';
import { titleCase } from '../../../../core/utils/TextUtils';
import AppBoldText from '../../../../core/components/BoldText/AppBoldText';
import RenderHTML from 'react-native-render-html';
import AppButton from '../../../../core/components/Button/AppButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import { TextInput } from 'react-native-paper';
import AppLoader, { AppLoader2 } from '../../../../core/components/Loader/AppLoader';
import { Images } from '../../../../core/assets';


const LoyaltyGiftGalleryDetail = ({ navigation }) => {
    const [cashPoint, setcashPoint] = useState(0); // Default quantity
    const [cashValue, setCashValue] = useState(0); // Default quantity
    const route = useRoute();
    const activetheme = useActiveTheme();
    const GlobelStyle = useGlobelStyle();
    const [giftDetail, setgiftDetail] = useState({});
    const [influencerPoint, setInfluencerPoint] = useState({});
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { width } = useWindowDimensions();
    const org_data = {};
    const { t } = useTranslation();
    const isFocused = useIsFocused();

    useEffect(() => {
        getGiftDetail();
    }, [isFocused]);


    const getGiftDetail = useCallback(async () => {
        try {
            setIsRefreshing(true);
            await ApiCall({ 'id': route.params.id }, 'AppGiftGallery/giftGalleryDetail').then(result => {
                if (result.statusCode == 200) {
                    setgiftDetail(result.gift_master_list);
                    setInfluencerPoint(result.detail);
                    setcashPoint(result.gift_master_list.range_start);
                    setCashValue(Number(result.gift_master_list.range_start) * Number(result.gift_master_list.point_range_value));
                    navigation.setOptions({
                        headerBackVisible: true,
                        headerRight: () => (
                            <>
                                <Animatable.View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} duration={1000} animation={'zoomIn'}>
                                    <MaterialIcons name="paid" color={'#FFD700'} size={18} />
                                    <Text style={[GlobelStyle.backButton, { fontSize: 14, marginRight: 5 }]}>
                                        <AppBoldText>
                                            {t('Balance') + ' -:'} {result.detail.wallet_point + ' '} {t('Points')}
                                        </AppBoldText>


                                    </Text>
                                </Animatable.View>


                            </>
                        ),
                        //custom header from constant file
                    });
                } else {
                    Toast.show({ type: 'error', text1: result.statusMsg, visibilityTime: 6000 });
                }
                setIsRefreshing(false);

            });
        } catch (err) {
            setIsRefreshing(false);
            Toast.show({ type: 'error', text1: t(err), visibilityTime: 6000 });
        }
    }, []);

    const source = {
        html: `
     ${giftDetail.termsNcondition}`,
    };

    const SendRequest = () => {

        if (giftDetail.gift_type == 'Cash') {


            if (cashPoint == undefined || !cashPoint) {
                Toast.show({ type: 'error', text1: 'Please enter redeem points value', visibilityTime: 6000 });
                return;
            }

            else if (parseFloat(cashPoint) < parseFloat(giftDetail.range_start)) {
                Toast.show({ type: 'error', text1: 'You cannot send redeem request less than ' + giftDetail.range_start + ' points.', visibilityTime: 6000 });
                return;
            }

            else if (parseFloat(cashPoint) > parseFloat(giftDetail.range_end)) {

                Toast.show({ type: 'error', text1: 'You cannot send redeem request more than ' + giftDetail.range_end + ' points.', visibilityTime: 6000 });
                return;
            }


            else if (parseFloat(giftDetail.range_end) > parseFloat(org_data.payout_per_transaction_limit)) {
                Toast.show({ type: 'error', text1: 'You cannot send redeem request more than ' + org_data.payout_per_transaction_limit + ' points.', visibilityTime: 6000 });
                return;
            }

            else if (parseFloat(cashPoint) > parseFloat(influencerPoint.wallet_point)) {
                Toast.show({ type: 'error', text1: 'Insufficient point in your wallet', visibilityTime: 6000 });
                return;
            }
            else if (influencerPoint.pending_gift_count != 0 && org_data.redeem_request_accept == '0') {
                Toast.show({ type: 'error', text1: 'Your redeem request already in process.', visibilityTime: 6000 });
                return;
            }
            else {
                navigation.navigate('LoyaltyRedeemRequest', {
                    'karigar_id': influencerPoint.id, 'gift_id': route.params.id, 'mode': 'reedeemPoint', 'offer_balance': '', 'cash_point': cashPoint, 'gift_type': 'Cash', 'cash_value': cashValue, 'payment_mode': 'Bank' || 'Khalti', 'wallet_no': '',
                });
            }
        }
        if (parseFloat(influencerPoint.wallet_point) < parseFloat(giftDetail.gift_point)) {
            toast.show('Insufficient point in your wallet', { type: 'danger', duration: 3000 });
            return;
        }

        if (giftDetail.gift_type == 'Gift') {
            navigation.navigate('LoyaltyRedeemRequest', {
                'karigar_id': influencerPoint.id, 'gift_id': route.params.id, 'mode': 'reedeemPoint', 'offer_balance': '', 'gift_type': 'Gift', 'payment_mode': 'Bank' || 'Khalti', 'wallet_no': '',
            });


        }

    };


    const getValue = (value) => {
        if (parseFloat(value) > parseFloat(influencerPoint.wallet_point)) {
            Toast.show({ type: 'error', text1: 'Insufficient Balance', visibilityTime: 6000 });
            return;
        }
        else {
            setCashValue(value * giftDetail.point_range_value);
        }
    };

    return (
        <SafeAreaView style={styles.LoyaltyGiftGalleryDetailcontainer}>
            {
                isRefreshing ?
                    <AppLoader2 loading={isRefreshing} color={activetheme.Dark} size={40} /> :
                    <ScrollView>
                        <View >
                            {/* Coffee Image */}
                            {
                                giftDetail.gift_type == 'Gift' && giftDetail.gift_img != '' && <Animatable.Image
                                    source={{ uri: UPLOAD_URL + 'gift_gallery/' + giftDetail.gift_img }} // Replace with actual image URL
                                    style={styles.LoyaltyGiftGalleryDetailimage}
                                    duration={1000}
                                    animation={'zoomIn'}
                                    easing={'ease-in-cubic'}
                                />
                            }
                            {
                                (giftDetail.gift_type == 'Cash') && <Animatable.Image
                                    source={Images.cash} // Replace with actual image URL
                                    style={styles.LoyaltyGiftGalleryDetailimage}
                                    duration={1000}
                                    animation={'zoomIn'}
                                />
                            }


                            {/* Coffee Details */}
                            <Animatable.View style={styles.LoyaltyGiftGalleryDetaildetailsContainer} duration={1000} animation={'slideInRight'}>
                                <Text style={styles.LoyaltyGiftGalleryDetailsubtitle}>{titleCase(giftDetail.title)}</Text>
                                {
                                    giftDetail.gift_type == 'Gift' ? <Text style={styles.LoyaltyGiftGalleryDetailtitle}>{giftDetail.gift_point} {t('Points')}</Text> :
                                        <Text style={styles.LoyaltyGiftGalleryDetailtitle}>{giftDetail.range_start} to {giftDetail.range_end} {t('Points')}</Text>
                                }
                                {
                                    giftDetail.termsNcondition && (
                                        <>
                                            <Text style={styles.LoyaltyGiftGalleryDetaildescription}>
                                                <AppBoldText>{t('Description')}</AppBoldText>
                                            </Text>
                                            <Text style={styles.LoyaltyGiftGalleryDetaildescription}>
                                                <RenderHTML
                                                    contentWidth={width}
                                                    source={source}
                                                />
                                            </Text>
                                        </>
                                    )
                                }

                            </Animatable.View>
                            {
                                giftDetail.gift_type == 'Cash' &&
                                (
                                    <>
                                        <View>
                                            <TextInput label={t('Enter Point') + ' *'} placeholder={t('Enter Point')} name="cashPoint" value={cashPoint} onChangeText={(val) => { setcashPoint(val); getValue(val); }} mode="outlined" keyboardType="number-pad" />
                                        </View>
                                        {/* Quantity Selector */}
                                        <View style={styles.LoyaltyGiftGalleryDetailquantityContainer}>
                                            {/* <View style={styles.LoyaltyGiftGalleryDetailcounter}>
                                            <TouchableOpacity style={styles.LoyaltyGiftGalleryDetailbutton} >
                                                <Text style={styles.LoyaltyGiftGalleryDetailbuttonText}>-</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={styles.LoyaltyGiftGalleryDetailbutton} >
                                                <Text style={styles.LoyaltyGiftGalleryDetailbuttonText}>+</Text>
                                            </TouchableOpacity>
                                        </View> */}


                                            <Text style={styles.LoyaltyGiftGalleryDetailprice}>{t('Redeem Point Value')}</Text>
                                            <Text style={styles.LoyaltyGiftGalleryDetailpointsText}>{cashValue}</Text>

                                        </View>
                                    </>
                                )
                            }
                            {/* cash And Bank */}
                            {
                                giftDetail.gift_type == 'Cash' && (
                                    (org_data.redeemption_prefrence == 0 || org_data.redeemption_prefrence == 2) ? (influencerPoint.account_holder_name == '' || influencerPoint.account_no == '' || influencerPoint.bank_name == '' || influencerPoint.ifsc_code == '') && influencerPoint.user_redeemption_prefrence === 'Bank' : ((org_data.redeemption_prefrence == 1 || org_data.redeemption_prefrence == 2) && influencerPoint.upi_id == '')
                                ) &&
                                <>
                                    {
                                        org_data.loyalty == '1' ?
                                            (
                                                <View style={styles.LoyaltyGiftGalleryDetailerrorBg}>
                                                    <Text style={[styles.LoyaltyGiftGalleryDetailKYCReject]}>
                                                        {t('Your Bank Detail Is Not Updated. Please Update Bank Detail')}
                                                    </Text>
                                                    <TouchableOpacity onPress={() => navigation.navigate('Update Profile', { 'data': influencerPoint, 'registerType': 'Other' })}>
                                                        <AppButton
                                                            title={t('Update Now') + ''}
                                                            mode={'elevated'}
                                                            loading={false}
                                                            disabled={false}
                                                            color={'#3a40ff'}

                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            ) :
                                            org_data.dms == '1' &&
                                            <View style={[styles.LoyaltyGiftGalleryDetailerrorBg, GlobelStyle.mt10, GlobelStyle.mb10]}>

                                                <Text style={[styles.LoyaltyGiftGalleryDetailKYCReject]}>
                                                    {t('Your Bank Detail Is Not Updated. Contact To Admin For Updating Bank Detail')}
                                                </Text>

                                            </View>

                                    }



                                </>
                            }



                            {/* document  */}

                            {
                                giftDetail.gift_type == 'Gift' && (influencerPoint.document_no == '' || influencerPoint.document_type == '' || influencerPoint.document_image == '') &&
                                <>
                                    {
                                        org_data.loyalty == '1' ?
                                            (
                                                <View style={styles.LoyaltyGiftGalleryDetailerrorBg}>
                                                    <Text style={styles.LoyaltyGiftGalleryDetailKYCReject}>
                                                        {t('Your Document Details Is Not Updated. Please Update Document Details')}
                                                    </Text>
                                                    <View style={GlobelStyle.mt10}>
                                                        <AppButton
                                                            title={t('Update Now') + ''}
                                                            mode={'elevated'}
                                                            loading={false}
                                                            disabled={false}
                                                            color={'#3a40ff'}
                                                            onPress={() => navigation.navigate('Update Profile', { 'data': influencerPoint, 'registerType': 'Other' })}
                                                        />
                                                    </View>
                                                </View>
                                            ) :
                                            org_data.dms == '1' &&
                                            <View style={[styles.LoyaltyGiftGalleryDetailerrorBg, GlobelStyle.mt10, GlobelStyle.mb10]}>

                                                <Text style={styles.LoyaltyGiftGalleryDetailKYCReject}>
                                                    {t('Your Document Details Is Not Updated. Please Update Document Details')}
                                                </Text>

                                            </View>


                                    }


                                </>
                            }




                            {/* Redeem Button */}
                            <View style={{ marginTop: 10 }}>
                                <AppButton
                                    title={t('Send Redeem Request')}
                                    mode={'elevated'}
                                    loading={false}
                                    disabled={(((org_data.redeemption_prefrence == 0 || org_data.redeemption_prefrence == 2) ? ((influencerPoint.account_holder_name == '' || influencerPoint.account_no == '' || influencerPoint.bank_name == '' || influencerPoint.ifsc_code == '') &&
                                        influencerPoint.user_redeemption_prefrence === 'Bank') : (org_data.redeemption_prefrence == 1 || org_data.redeemption_prefrence == 2) && influencerPoint.upi_id == '') && giftDetail.gift_type == 'Cash') || (influencerPoint.document_no == '' || influencerPoint.document_type == '' || influencerPoint.document_image == '') && giftDetail.gift_type == 'Gift'}
                                    color={activetheme.themeColor}
                                    onPress={() => {
                                        SendRequest();
                                    }}
                                />

                            </View>
                        </View>
                    </ScrollView>

            }

        </SafeAreaView >

    );
};

const styles = StyleSheet.create({
    LoyaltyGiftGalleryDetailcontainer: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 30 },
    LoyaltyGiftGalleryDetailimage: { width: '100%', height: 400, resizeMode: 'contain' },
    LoyaltyGiftGalleryDetaildetailsContainer: { marginTop: 20 },
    LoyaltyGiftGalleryDetailsubtitle: { fontSize: 14, color: 'gray', marginBottom: 5 },
    LoyaltyGiftGalleryDetailtitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    LoyaltyGiftGalleryDetaildescription: { fontSize: 16, color: 'gray', marginBottom: 20 },
    LoyaltyGiftGalleryDetailquantityContainer: { marginVertical: 20 },
    LoyaltyGiftGalleryDetailprice: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
    LoyaltyGiftGalleryDetailpointsText: { fontSize: 14, color: 'gray', marginBottom: 10 },
    LoyaltyGiftGalleryDetailcounter: { flexDirection: 'row', alignItems: 'center' },
    LoyaltyGiftGalleryDetailbutton: { backgroundColor: '#f2f2f2', padding: 10, borderRadius: 8 },
    LoyaltyGiftGalleryDetailbuttonText: { fontSize: 18, fontWeight: 'bold' },
    LoyaltyGiftGalleryDetailquantity: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 20 },
    LoyaltyGiftGalleryDetailredeemButton: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    LoyaltyGiftGalleryDetailerrorBg: {
        backgroundColor: '#D50D2D',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    LoyaltyGiftGalleryDetailKYCReject: {
        fontSize: 16, fontWeight: 'bold', color: '#fff', lineHeight: 20,
    },
    LoyaltyGiftGalleryDetailredeemButtonText: { fontSize: 16, fontWeight: 'bold', color: '#000' },
});

export default LoyaltyGiftGalleryDetail;
