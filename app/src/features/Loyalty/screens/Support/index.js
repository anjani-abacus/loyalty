import { Linking, SafeAreaView, ScrollView, Text } from 'react-native';
import React, { useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import { MailIcon, ClockIcon, HelpIcon, LeftArrowIcon, PhoneCall } from '../../../../core/assets/SVGs/svg';
import { StatusBarHeader } from '../../../../core/components/StatusBar/StatusBar';
import LinearGradient from 'react-native-linear-gradient';
import Chat from '../../../../core/assets/icons/Chat.svg';
import GiftBox from '../../../../core/assets/icons/GiftBox.svg';
import Coin from '../../../../core/assets/icons/CoinGold.svg';
import { Icon } from '@rneui/themed';
import { AccordionList } from '../Faq';
import { useContactUs, useFaqQuestion, useRedeemGiftRequestList } from '../../../../api/hooks/useMasters';
import moment from 'moment';

const Support = ({ navigation }) => {
    const { isLoading, refetch, data: requestListData, isFetching } = useRedeemGiftRequestList({ filter: {} });
    const { data: contactUs } = useContactUs({ filter: {} });
    const { mutate: faqMutate, data: faqList } = useFaqQuestion();

      useEffect(() => {
        faqMutate({ 'filters': {} });
      }, []);

    const makeCall = (phoneNumber) => {
        let phoneUrl = `tel:${phoneNumber}`;
        Linking.openURL(phoneUrl).catch((err) =>
            console.error('Error opening dialer:', err)
        );
    };

    const sendMail = ({email, subject, body}) => {
        const mailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        Linking.openURL(mailUrl).catch((err) =>
            console.error('Error opening mail app:', err)
        );
    };

    return <SafeAreaView style={{
        backgroundColor: '#f6effbff',
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
                }}>Support</Text>
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
            <TouchableOpacity
                onPress={() => { navigation.navigate('TicketList'); }}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    paddingHorizontal: 5,
                    paddingVertical: 20,
                    marginTop: -50,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                }}>
                <Chat fill="#4caf50" width={44} height={44} />
                <View style={{ flex: 1 }}>
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>My Tickets</Text>
                    <Text>View all chats with support</Text>
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
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 20,
            }}>
                <Text style={{
                    color: '#000',
                    fontWeight: 500,
                    flex:1,
                }}>Check all other pending redeem request</Text>

                <TouchableOpacity onPress={() => navigation.navigate('TrackRequest')}>
                    <Text style={{
                        color: '#003EEE',
                        fontWeight: 'bold',
                    }}>View All</Text>
                </TouchableOpacity>
            </View>

            {requestListData?.data?.data?.filter((elem)=>elem.action_status == 'PENDING')?.length > 0 &&
            [requestListData?.data?.data?.filter((elem)=>elem.action_status == 'PENDING')[0]]?.map((elem)=>{
                return <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 20,
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 20,
                    borderWidth: 0.5,
                    borderColor: '#D7D2DB',
                }}>
                    <View style={{
                        padding: 10,
                        backgroundColor: '#F6E8FF',
                        borderRadius: 50,
                        height: 60,
                        width: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <GiftBox fill="#4caf50" width={44} height={44} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: '#000', fontWeight: 'bold' }}>Request ID {elem?.id}</Text>
                        <Text>{elem?.gift_name}</Text>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                        }}>
                            <View style={{
                                backgroundColor: elem?.action_status == 'APPROVED' ? 'rgba(207, 245, 207, 1)' : '#f3e4c9ff',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 16,
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 4,
                            }}>
                                <ClockIcon height={16} width={16} fill={elem?.action_status == 'APPROVED' ? 'rgba(22, 142, 22, 1)' : '#FFA000'} />
                                <Text style={{
                                    color: elem?.action_status == 'APPROVED' ? 'rgba(22, 142, 22, 1)' : '#FFA000',
                                }}>{elem?.action_status}</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={{
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: '#9BB1F0',
                            flexDirection: 'row',
                            backgroundColor: '#EFF3FF',
                            width: '100%',
                            gap: 10,
                            alignItems: 'center',
                            padding: 3,
                        }}>
                            <Coin height="15" width="15" />
                            <Text style={{
                                color: '#003EEE',
                                fontSize: 12,
                                fontWeight: 'bold',
                            }}>{elem?.redeem_point}</Text>
                        </View>
                        <Text style={{ fontSize: 12 }}>{moment(elem?.date_created).format('DD MMM, YYYY')}</Text>
                    </View>
                </View>;
            })
            }

            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
                     <TouchableOpacity onPress={()=>sendMail({email:contactUs?.data?.contact_detail?.email, subject:'Query', body:''})} style={{
                        flexDirection: 'row',
                        gap: 20,
                        alignItems: 'center',
                        flex: 1,
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        justifyContent: 'space-between',
                        backgroundColor: '#ebd3fbff',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#fff',
                    }}>
                        <MailIcon height={30} width={30} />
                        <Text style={{ fontWeight: 400, color: '#000', fontSize: 20 }}>Mail</Text>
                        <Icon
                            name="right"
                            type="ant-design"
                            style={{ alignItems: 'center' }}
                            color={'#000'}
                            size={16}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => makeCall(contactUs?.data?.contact_detail?.contact_number)} style={{
                        flexDirection: 'row',
                        gap: 20,
                        alignItems: 'center',
                        flex: 1,
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        justifyContent: 'space-between',
                        backgroundColor: '#ebd3fbff',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#fff',
                    }}>

                        <PhoneCall height={24} width={24} />
                        <Text style={{ fontWeight: 400, color: '#000', fontSize: 20 }}>Call</Text>
                        <Icon
                            name="right"
                            type="ant-design"
                            style={{ alignItems: 'center' }}
                            color={'#000'}
                            size={16}
                        />

                    </TouchableOpacity>

                </View>
                {/* <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-around' }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Chat Ai")} style={{
                        flexDirection: 'row',
                        gap: 20,
                        marginVertical: 10,
                        alignItems: 'center',
                        flex: 1,
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        justifyContent: 'space-between',
                        backgroundColor: '#ebd3fbff',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#fff'
                    }}>
                        <About height={30} width={30} />
                        <Text style={{ fontWeight: 400, color: '#000', fontSize: 20 }}>Chat</Text>
                        <Icon
                            name="right"
                            type="ant-design"
                            style={{ alignItems: 'center' }}
                            color={'#000'}
                            size={16}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("TicketAdd")} style={{
                        flexDirection: 'row',
                        gap: 20,
                        alignItems: 'center',
                        flex: 1,
                        paddingVertical: 15,
                        paddingHorizontal: 20,
                        justifyContent: 'space-between',
                        backgroundColor: '#ebd3fbff',
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#fff'
                    }}>

                        <SearchIcon height={26} width={26} />
                        <Text style={{ fontWeight: 400, color: '#000', fontSize: 20 }}>Query</Text>
                        <Icon
                            name="right"
                            type="ant-design"
                            style={{ alignItems: 'center' }}
                            color={'#000'}
                            size={16}
                        />

                    </TouchableOpacity>
                </View> */}
            </View>

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
            <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Frequently Asked Questions</Text>
            <ScrollView style={{
                height: 400,
            }}>
                <AccordionList data={faqList?.data?.data} />
            </ScrollView>
        </View>
    </SafeAreaView>;
};

export default Support;
