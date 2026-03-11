import { ScrollView, Text } from 'react-native';
import React from 'react';
import {
    View,
} from 'react-native';
import { LockIcon } from '../../../core/assets/SVGs/svg';
import LinearGradient from 'react-native-linear-gradient';
import Coin from '../../../core/assets/icons/CoinGold.svg';
import Gift3dBox from '../../../core/assets/icons/Gift3dBox.svg';
import { useUpcomingGifts } from '../../../api/hooks/useSpinwin';
import { useTranslation } from 'react-i18next';

const UpcomingRewards = ({earnedPoints = 0, title}) => {
    const {t} = useTranslation();
    const {
            isLoading: upcomingLoading,
            refetch: upcomingRefetch,
            data: giftsResponse,
            isFetching: upcomingIsFetching,
        } = useUpcomingGifts({ filter: {} });
        const upcomingGifts = giftsResponse?.data;

    return <View style={{
        backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#D5D9EF',
            borderColor: '#ddd',
            borderRadius: 8,
            borderWidth: 0.5,
            marginBottom: 5,
            padding: 5,
    }}>
        <Text style={{
                fontSize: 14,
                paddingHorizontal: 8,
                fontWeight: '500',
                color: '#000',
            }}>{title || 'Rewards to Claim'}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 5,
                marginBottom: 10,
            }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
                    {upcomingGifts?.data?.map((item) =>
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        flex: 1,
                        borderWidth:1,
                        borderColor:'#ccc',
                        marginHorizontal:5,
                        borderRadius: 4,
                        shadowColor: '#C7C3C9',
                        shadowOpacity: 0.8,
                        shadowOffset: { width: 0, height: 0 },
                        shadowRadius: 8,
                        elevation: 8,
                        padding: 8,
                        width: 130,
                    }}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#BDDCE0', '#003EEE']}
                            style={{
                                borderRadius: 4,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Gift3dBox height={60} width={60} />
                        </LinearGradient>
                        <View>
                            <Text style={{
                                color: '#000',
                                fontSize: 10,
                            }}>{t('Get reward worth')}</Text>

                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', gap:3}}>
                                <LockIcon fill="#000" stroke="#000" height={14} width={14} />
                                <View style={{flexDirection:'row', alignItems:'center', gap:3}}>
                                    <Text style={{ fontWeight: 'bold', color:'#000', fontSize: 14 }}>{item?.gift_point}</Text>
                                    <Coin height="12" width="12" />
                                </View>
                            </View>
                        </View>
                        {/* <View
                            style={{
                                backgroundColor: "#003EEE",
                                borderRadius: 5,
                                padding: 6,
                                marginTop: 10,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                gap: 6
                            }}
                        > */}
                            {/* {(item?.gift_point - earnedPoints?.total_point > 0) ? <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                <LockIcon fill="#fff" stroke="#fff" height={12} width={12} />
                                <Text style={{ fontSize: 12, flexDirection: 'row', gap: 4, alignItems: 'center', textAlign: 'center', color: '#fff', fontWeight: "bold" }}>
                                    Required {item?.gift_point - earnedPoints?.total_point}
                                </Text>
                                <Coin height="12" width="12" />
                            </View> :
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                                    <LockIcon fill="#fff" stroke="#fff" height={12} width={12} />
                                    <Text style={{ fontSize: 12, flexDirection: 'row', gap: 4, alignItems: 'center', textAlign: 'center', color: '#fff', fontWeight: "bold" }}>
                                        Redeem Now
                                    </Text>
                                    <Coin height="12" width="12" />
                                </View>
                            } */}
                            {/* <Text style={{ textAlign: 'center', color: '#fff', fontWeight: "bold" }}>Required {item?.gift_point - earnedPoints?.total_point}</Text> */}

                        {/* </View> */}
                    </View>)}
                </ScrollView>
            </View>
            </View>;
};

export default UpcomingRewards;
