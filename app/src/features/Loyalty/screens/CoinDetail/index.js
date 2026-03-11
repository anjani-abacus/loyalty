import { Linking, SafeAreaView, ScrollView, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { MailIcon, CallHistoryIcon, ClockIcon, HelpIcon, LeftArrowIcon, PhoneCall, SearchIcon, ScanQrIcon, ScanIcon, ReferralIcon, Stars, LockIcon } from '../../../../core/assets/SVGs/svg';
import { StatusBarHeader } from '../../../../core/components/StatusBar/StatusBar';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { Images } from '../../../../core/assets';
import Chat from '../../../../core/assets/icons/Chat.svg';
import SpinTheWheel from '../../../../core/assets/icons/SpinTheWheel.svg';
import GiftBox from '../../../../core/assets/icons/GiftBox.svg';
import About from '../../../../core/assets/icons/tiles/about.svg';
import Coin from '../../../../core/assets/icons/CoinGold.svg';
import Gift3dBox from '../../../../core/assets/icons/Gift3dBox.svg';
import { Icon } from '@rneui/themed';
import { AccordionList } from '../Faq';
import { UserProfileImage } from '../../../../core/screens/MyProfile/UserProfile';
import { useGetUserData } from '../../../../api/hooks/useUsers';
import { ListView } from '../PointHistory';
import { useInfluencerLedger } from '../../../../api/hooks/useMasters';
import { useEarnPoint, useUpcomingGifts } from '../../../../api/hooks/useSpinwin';
import UpcomingRewards from '../../../../core/components/UpcomingRewards';

const CoinDetail = ({ navigation }) => {
    const {
        isLoading: earnPointLoading,
        refetch: earnPointRefetch,
        data: { data: earnedPoints },
        isFetching: earnPointIsFetching,
    } = useEarnPoint({ filter: {} });

    const [query, refetch] = useGetUserData();
    const { data: userInfoData, isPending } = query;
    const makeCall = (phoneNumber) => {
        let phoneUrl = `tel:${phoneNumber}`;
        Linking.openURL(phoneUrl).catch((err) =>
            console.error('Error opening dialer:', err)
        );
    };



    const {
        mutate: ledgerListMutate,
        isPending: ledgerIsPending,
        data: ledgerData,
        reset: resetLedger,
    } = useInfluencerLedger();

    const onRefresh = () => {
        resetLedger();
        ledgerListMutate({ filter: { limit: 25, start: 0, ledger: '' } });
    };

    useEffect(() => {
        ledgerListMutate(
            { filter: { limit: 25, start: 0 } },
            {

            },
        );
    }, []);

    const [activeTab, setActiveTab] = useState('scan_point');

    const sendMail = ({ email, subject, body }) => {
        const mailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.openURL(mailUrl).catch((err) =>
            console.error('Error opening mail app:', err)
        );
    };

    return <SafeAreaView style={{
        backgroundColor: '#fff',
        flex: 1,
    }}>
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#CE90FF', '#3600C0']}
            style={{
                backgroundColor: '#3a459c',
                height: 150,
            }}
        >
            <StatusBarHeader height={StatusBar.currentHeight} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <LeftArrowIcon />
                </TouchableOpacity>
                <Text style={{
                    flex: 0.8,
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: 'bold',
                }}>Coin Balance</Text>
                <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
                    <HelpIcon
                        icon={'arrow-left'}
                        style={{ marginRight: 10 }}
                        width={30}
                        height={30}
                        fill="#fff"
                        stroke="#fff"
                        strokeWidth={0.1}
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient>

        <View style={{ paddingHorizontal: 10 }}>
            <View
                style={{
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    marginTop: -50,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                    padding: 5,
                }}>
                <TouchableOpacity onPress={() => { navigation.navigate('My Profile'); }} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20,
                    padding: 5,
                }}>
                    <UserProfileImage style={{ width: 40, height: 40, borderRadius: 40 }} user={userInfoData} enablePreview={false} />
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#000', fontWeight: 'bold' }}>Hi, {userInfoData?.data?.result?.name}</Text>
                    </View>
                    <View>
                        <Icon
                            name="right"
                            type="ant-design"
                            style={{ alignItems: 'center' }}
                            color={'#000'}
                            size={16}
                        />
                    </View>
                </TouchableOpacity>

                <View style={{
                    paddingHorizontal: 5,
                    gap: 20,
                    borderRadius: 8,
                    paddingBottom: 10,
                }}>
                    <LinearGradient start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#FFFFFF', '#F6E8FF']}
                        style={{ borderWidth: 1, borderColor: '#D5D9EF', borderRadius: 8, padding: 10 }}>
                        <Text style={{ color: '#000', fontSize: 10 }}>Current Balance</Text>
                        <View>
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
                                }}>{earnedPoints?.total_point}</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'space-between',
                                marginTop: 10,
                            }}
                        >
                            {[
                                { label: 'By Scan', value: earnedPoints?.scan_point || 0 },
                                { label: 'By Referral', value: earnedPoints?.referral_point || 0 },
                                { label: 'By Bonus', value: earnedPoints?.bonus_point || 0 },
                                { label: 'By Redeem', value: earnedPoints?.redeem_point || 0 },
                                { label: 'Welcome Point', value: earnedPoints?.welcome_point || 0 },
                            ].map((item, index) => (
                                <View
                                    key={index}
                                    style={{
                                        width: '47%',
                                        backgroundColor: '#fff',
                                        borderRadius: 6,
                                        padding: 5,
                                        marginBottom: 12,
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            color: '#7f8c8d',
                                            marginTop: 5,
                                        }}
                                    >
                                        {item.label}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 'bold',
                                            color: '#2c3e50',
                                        }}
                                    >
                                        {item.value}
                                    </Text>

                                </View>
                            ))}
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </View>

        <ScrollView>
            <View style={{
                paddingHorizontal: 10,
                marginTop: 15,
            }}>
                {/*  onPress={()=>navigation.navigate("SpinAndWin")}  */}
                <TouchableOpacity>
                    <View style={{
                        borderWidth: 0.5,
                        borderColor: '#ddd',
                        borderRadius: 8,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 15,
                        backgroundColor: '#FBF5FF',
                        borderWidth: 1,
                        borderColor: '#D5D9EF',
                        marginBottom: 10,
                    }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                color: '#000',
                            }}>Spin to Win</Text>
                            <Text style={{ fontSize: 10, color: '#000' }}>Spin the wheel and get free reward points.</Text>
                        </View>

                        {/* <View style={{ flex: 1 }}>
                    <Text style={{
                        fontWeight: '500',
                        fontSize: 12,
                        color: '#000',
                        textAlign: 'center',
                        marginBottom: 5
                    }}>Come Back In</Text>
                    <View style={{
                        borderWidth: 1, borderColor: '#D5D9EF', borderRadius: 8
                    }}>
                        <LinearGradient start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#FFFFFF', '#F6E8FF']} style={{ borderRadius: 8, padding: 5, flexDirection: 'row', justifyContent: 'center' }}>
                            <View style={{
                                width: 30,
                            }}>
                                <View style={{
                                    backgroundColor: '#B14AF5',
                                    borderRadius: 6,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: '#fff'
                                    }}>2</Text>
                                </View>
                                <Text style={{ fontSize: 8, color: '#000', textAlign: 'center' }}>DAYS</Text>
                            </View>

                            <View>
                                <Text style={{
                                    fontSize: 28,
                                    fontWeight: 'bold',
                                    color: '#B14AF5',
                                    lineHeight: 30
                                }}>:</Text>
                            </View>

                            <View style={{
                                width: 30,
                            }}>
                                <View style={{
                                    backgroundColor: '#B14AF5',
                                    borderRadius: 6,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: '#fff'
                                    }}>10</Text>
                                </View>
                                <Text style={{ fontSize: 8, color: '#000', textAlign: 'center' }}>HOURS</Text>
                            </View>

                            <View>
                                <Text style={{
                                    fontSize: 28,
                                    fontWeight: 'bold',
                                    color: '#B14AF5',
                                    lineHeight: 30
                                }}>:</Text>
                            </View>

                            <View style={{
                                width: 30,
                            }}>
                                <View style={{
                                    backgroundColor: '#B14AF5',
                                    borderRadius: 6,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        color: '#fff'
                                    }}>59</Text>
                                </View>
                                <Text style={{ fontSize: 8, color: '#000', textAlign: 'center' }}>MIN.</Text>
                            </View>
                        </LinearGradient>
                    </View>
                </View> */}

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <SpinTheWheel height="100" width="100" />
                        </View>
                    </View>
                </TouchableOpacity>

                <UpcomingRewards earnedPoints={earnedPoints} />


            </View>

            <View style={{
                marginTop: 10,
                backgroundColor: '#fff',
                padding: 10,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                borderWidth: 1,
                borderColor: '#ebd3fbff',


            }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Recent Transactions</Text>
                <ScrollView style={{
                    height: 400,
                }}>
                    <ListView activeKey={'Ledger'} ledgerData={ledgerData} onRefresh={onRefresh} ledgerIsPending={ledgerIsPending} routes={[
                        { key: 'Ledger', title: 'Ledger' }, { key: 'Scan History', title: 'Scan History' }]} index={0} />
                </ScrollView>
            </View>
        </ScrollView>


    </SafeAreaView>;
};

export default CoinDetail;
