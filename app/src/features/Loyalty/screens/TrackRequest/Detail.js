import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ListItem, Skeleton } from '@rneui/themed';
import { ApiCall } from '../../../../services/ServiceProvider';
import { useIsFocused, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import AppBoldText from '../../../../core/components/BoldText/AppBoldText';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import FastImage from 'react-native-fast-image';
import { default as Icon } from 'react-native-vector-icons/MaterialIcons';
import { UPLOAD_URL } from '../../../../services/BaseService';
import { SkeletonCard, UserProfileCard } from '../../../../core/utils/skeleton';
import AppButton from '../../../../core/components/Button/AppButton';
import { ChangeShippingAddress } from '../../../../core/components/StatusModal/EventStatus';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import { Images } from '../../../../core/assets';

const RedeemRequestDetail = () => {
    const route = useRoute();
    const activetheme = useActiveTheme();
    const GlobelStyle = useGlobelStyle();
    const [trackRequestDetail, setTrackRequestDetail] = useState({});
    const [editAddress, seteditAddress] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        getredeemList();
    }, [editAddress]);


    const getredeemList = useCallback(async () => {
        try {
            setIsRefreshing(true);
            await ApiCall({ 'id': route.params.id }, 'AppGiftTracker/redeemGiftRequestDetail').then(result => {
                if (result.statusCode == 200) {

                    setTrackRequestDetail(result.gift_master_list);
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



    return (
        <View style={GlobelStyle.container}>
            {
                isRefreshing ? <UserProfileCard length={10} width={150} />
                    :
                    <>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                {
                                    trackRequestDetail.redeem_type == 'Gift' ? <FastImage
                                        style={[GlobelStyle.AboutUSheaderImage]}
                                        source={{
                                            uri:
                                                UPLOAD_URL + 'gift_gallery/' + trackRequestDetail.gift_img,
                                            priority: FastImage.priority.normal,
                                        }}
                                        resizeMode={FastImage.resizeMode.contain}
                                    /> : <FastImage
                                        style={[GlobelStyle.AboutUSheaderImage]}
                                        source={Images.cash}
                                        resizeMode={FastImage.resizeMode.contain}
                                    />
                                }
                            </ListItem.Content>
                        </ListItem>


                        {/* detail section */}
                        <FlatList data={[]} renderItem={null} keyExtractor={({ item }) => item} ListHeaderComponent={() => {
                            return (
                                <>

                                    <ListItem bottomDivider>
                                        <Icon name="calendar-month" size={24} />
                                        <ListItem.Content>
                                            <ListItem.Title><AppBoldText>{t('Date')}</AppBoldText> </ListItem.Title>
                                            <ListItem.Subtitle>{trackRequestDetail.account_holder_name ? moment(trackRequestDetail.date_created).format('DD MMM YYYY') : '----'}</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                    <ListItem bottomDivider>
                                        <Icon name="star-half" size={24} />
                                        <ListItem.Content>
                                            <ListItem.Title><AppBoldText>{t('Req. ID')}</AppBoldText></ListItem.Title>
                                            <ListItem.Subtitle>{trackRequestDetail.req_id ? trackRequestDetail.req_id : '----'}</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                    <ListItem bottomDivider>
                                        <Icon name="title" size={24} />
                                        <ListItem.Content>
                                            <ListItem.Title><AppBoldText>{t('Title')}</AppBoldText></ListItem.Title>
                                            <ListItem.Subtitle>{trackRequestDetail.gift_name ? trackRequestDetail.gift_name : '----'}</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                    <ListItem bottomDivider>
                                        <Icon name="format-list-bulleted" size={24} />
                                        <ListItem.Content>
                                            <ListItem.Title><AppBoldText>{t('Redeem Type')}</AppBoldText></ListItem.Title>
                                            <ListItem.Subtitle>{trackRequestDetail.redeem_type ? trackRequestDetail.redeem_type : '----'}</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                    <ListItem bottomDivider>
                                        <Icon name="loyalty" size={24} />
                                        <ListItem.Content>
                                            <ListItem.Title><AppBoldText>{t('Redeem Points')}</AppBoldText></ListItem.Title>
                                            <ListItem.Subtitle>{trackRequestDetail.redeem_type == 'Gift' ? trackRequestDetail.gift_point_value : trackRequestDetail.point}</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
                                    {
                                        trackRequestDetail.redeem_type == 'Cash' && (
                                            <>
                                                <ListItem bottomDivider>
                                                    <Icon name="hdr-weak" size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title><AppBoldText>{t('Point Range')}</AppBoldText></ListItem.Title>
                                                        <ListItem.Subtitle>{trackRequestDetail.range_start} to {trackRequestDetail.range_end}</ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                                <ListItem bottomDivider>
                                                    <Icon name="star" size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title><AppBoldText>{t('Point Value')}</AppBoldText></ListItem.Title>
                                                        <ListItem.Subtitle>{trackRequestDetail.point_range_value}</ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                                <ListItem bottomDivider>
                                                    <Icon name="star" size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title><AppBoldText>{t('Redeem Amount')}</AppBoldText></ListItem.Title>
                                                        <ListItem.Subtitle>{trackRequestDetail.cash_point}</ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                            </>
                                        )
                                    }

                                    {
                                        (trackRequestDetail.account_holder_name) && (
                                            <>
                                                <ListItem bottomDivider>
                                                    <Icon name="account-balance" size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title><AppBoldText>{t('Account Holder Name')}</AppBoldText></ListItem.Title>
                                                        <ListItem.Subtitle>{trackRequestDetail.account_holder_name ? trackRequestDetail.account_holder_name : '---'}</ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                            </>
                                        )
                                    }
                                    {
                                        (trackRequestDetail.bank_name) && (
                                            <>
                                                <ListItem bottomDivider>
                                                    <Icon name="hd" size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title><AppBoldText>{t('Bank Name')}</AppBoldText></ListItem.Title>
                                                        <ListItem.Subtitle>{trackRequestDetail.bank_name ? trackRequestDetail.bank_name : '---'}</ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                            </>
                                        )
                                    }

                                    {
                                        (trackRequestDetail.account_no) && (
                                            <>
                                                <ListItem bottomDivider>
                                                    <Icon name="account-balance-wallet" size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title><AppBoldText>{t('Account Number')}</AppBoldText></ListItem.Title>
                                                        <ListItem.Subtitle>{trackRequestDetail.account_no ? trackRequestDetail.account_no : '---'}</ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                            </>
                                        )
                                    }
                                    {
                                        (trackRequestDetail.ifsc_code) && (
                                            <>
                                                <ListItem bottomDivider>
                                                    <Icon name="savings" size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title><AppBoldText>{t('IFSC Code')}</AppBoldText></ListItem.Title>
                                                        <ListItem.Subtitle>{trackRequestDetail.ifsc_code ? trackRequestDetail.ifsc_code : '---'}</ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                            </>
                                        )
                                    }
                                    {
                                        (trackRequestDetail.status) && (
                                            <>
                                                <ListItem bottomDivider>
                                                    <Icon name="comment-bank" size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title><AppBoldText>{t('Redeem Status')}</AppBoldText></ListItem.Title>
                                                        <ListItem.Subtitle>{trackRequestDetail.status ? trackRequestDetail.status : '---'}</ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                            </>
                                        )
                                    }


                                    {
                                        (trackRequestDetail.reject_reason) && (
                                            <>
                                                <ListItem bottomDivider>
                                                    <Icon name="star" size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title><AppBoldText>{t('Reject Reason')}</AppBoldText></ListItem.Title>
                                                        <ListItem.Subtitle>{trackRequestDetail.reject_reason ? trackRequestDetail.reject_reason : '---'}</ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                            </>
                                        )
                                    }

                                    {trackRequestDetail.redeem_type === 'Cash' && (
                                        <>
                                            {trackRequestDetail.transfer_date !== '0000-00-00' && (
                                                <ListItem bottomDivider>
                                                    <Icon name="star" size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title><AppBoldText>{t('Transfer Date')}</AppBoldText></ListItem.Title>
                                                        <ListItem.Subtitle>
                                                            {moment(trackRequestDetail.transfer_date).format('DD MMM YYYY')}
                                                        </ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                            )}
                                            {(trackRequestDetail.razorpay_payout_id || trackRequestDetail.transaction_id) && (
                                                <ListItem bottomDivider>
                                                    <Icon name="info" size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title><AppBoldText>{t('Transaction Id')}</AppBoldText></ListItem.Title>
                                                        <ListItem.Subtitle>
                                                            {trackRequestDetail.razorpay_payout_id || trackRequestDetail.transaction_id}
                                                        </ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                            )}
                                            {trackRequestDetail.transfer_remark && (
                                                <ListItem bottomDivider>
                                                    <Icon name="info" size={24} />
                                                    <ListItem.Content>
                                                        <ListItem.Title><AppBoldText>{t('Remark')}</AppBoldText></ListItem.Title>
                                                        <ListItem.Subtitle>
                                                            {trackRequestDetail.transfer_remark.replace(/_/g, ' ').toLowerCase()}
                                                        </ListItem.Subtitle>
                                                    </ListItem.Content>
                                                </ListItem>
                                            )}
                                        </>
                                    )}
                                    {!editAddress && trackRequestDetail.redeem_type === 'Gift' && trackRequestDetail.shipping_address && (
                                        <ListItem bottomDivider>
                                            <Icon name="location-on" size={24} />
                                            <ListItem.Content>
                                                <ListItem.Title><AppBoldText>{t('Shipping Address')}</AppBoldText></ListItem.Title>
                                                <ListItem.Subtitle>
                                                    {trackRequestDetail.shipping_address ? trackRequestDetail.shipping_address : '---'}
                                                </ListItem.Subtitle>
                                            </ListItem.Content>
                                        </ListItem>
                                    )}
                                    {trackRequestDetail.shipped_date !== '0000-00-00 00:00:00' && (
                                        <ListItem bottomDivider>
                                            <Icon name="star" size={24} />
                                            <ListItem.Content>
                                                <ListItem.Title><AppBoldText>{t('Shipped Date')}</AppBoldText></ListItem.Title>
                                                <ListItem.Subtitle>
                                                    {moment(trackRequestDetail.shipped_date).format('DD MMM YYYY')}
                                                </ListItem.Subtitle>
                                            </ListItem.Content>
                                        </ListItem>
                                    )}
                                    {trackRequestDetail.shipping_type !== '' && (
                                        <ListItem bottomDivider>
                                            <Icon name="local-shipping" size={24} />
                                            <ListItem.Content>
                                                <ListItem.Title><AppBoldText>{t('Shipping Type')}</AppBoldText></ListItem.Title>
                                                <ListItem.Subtitle>{trackRequestDetail.shipping_type}</ListItem.Subtitle>
                                            </ListItem.Content>
                                        </ListItem>
                                    )}
                                    {trackRequestDetail.shipping_remark !== '' && (
                                        <ListItem bottomDivider>
                                            <Icon name="info" size={24} />
                                            <ListItem.Content>
                                                <ListItem.Title><AppBoldText>{t('Shipping Remark')}</AppBoldText></ListItem.Title>
                                                <ListItem.Subtitle>{trackRequestDetail.shipping_remark}</ListItem.Subtitle>
                                            </ListItem.Content>
                                        </ListItem>
                                    )}
                                    {trackRequestDetail.recieved_date !== '0000-00-00 00:00:00' && (
                                        <ListItem bottomDivider>
                                            <Icon name="star" size={24} />
                                            <ListItem.Content>
                                                <ListItem.Title><AppBoldText>{t('Received Date')}</AppBoldText></ListItem.Title>
                                                <ListItem.Subtitle>
                                                    {moment(trackRequestDetail.recieved_date).format('DD MMM YYYY')}
                                                </ListItem.Subtitle>
                                            </ListItem.Content>
                                        </ListItem>
                                    )}

                                </>
                            );
                        }} />
                        {
                            trackRequestDetail.redeem_type == 'Gift' && trackRequestDetail.status == 'Pending' && <View style={[GlobelStyle.ml10, GlobelStyle.mt10, GlobelStyle.mr10]}>
                                <AppButton
                                    title={t('Change Shipping Address') + ''}
                                    mode={'contained'}
                                    loading={false}
                                    disabled={false}
                                    color={activetheme.themeColor}
                                    onPress={() => { seteditAddress(true); }}
                                />
                            </View>
                        }

                    </>
            }
            {/* profile */}


            {
                editAddress && <ChangeShippingAddress modalVisible={editAddress} setModalVisible={seteditAddress} trackRequestDetail={trackRequestDetail} />
            }

        </View>
    );
};



export default RedeemRequestDetail;
