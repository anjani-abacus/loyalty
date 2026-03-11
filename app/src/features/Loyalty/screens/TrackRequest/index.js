import Coin from '../../../../core/assets/icons/CoinGold.svg';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useContext, useRef, useState } from 'react';
import { IconButton, Text } from 'react-native-paper';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import { FlatList, ImageBackground, RefreshControl, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AppNoDataFound from '../../../../core/components/No_Data_Found/AppNoDataFound';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import { AppLoader2 } from '../../../../core/components/Loader/AppLoader';
import FastImage from 'react-native-fast-image';
import { Images } from '../../../../core/assets';
import { ScrollView } from 'react-native-gesture-handler';
import { useRedeemGiftRequestList } from '../../../../api/hooks/useMasters';
import useTheme from '../../../../core/components/Theme/useTheme';
import { StatusBarHeader } from '../../../../core/components/StatusBar/StatusBar';
import LinearGradient from 'react-native-linear-gradient';
import { HelpIcon, LeftArrowIcon } from '../../../../core/assets/SVGs/svg';
import * as Animatable from 'react-native-animatable';
import { AuthorizationScreen } from '../../../../core/components/No_Internet_Connection/AppNoInternet';
import { AuthContext } from '../../../../auth/AuthContext';

// const TransactionDetail = ({ styles, data }) => {
//     const activeTheme = useTheme()
//     return <ScrollView style={{
//         backgroundColor: activeTheme.maincontainer
//     }}>
//         <View style={{
//             alignItems: 'center',
//             marginHorizontal: 20,
//             marginTop: 20,
//             marginBottom: 10,
//             borderRadius: 6,
//             paddingVertical: 20,
//             backgroundColor: activeTheme.section,

//         }}>
//             <View style={{
//                 height: 150,
//                 width: 150,
//                 borderWidth: 1,
//                 borderColor: '#FDF9C3',
//                 borderRadius: 150,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: '#FDF9C3'
//             }}>
//                 <FastImage
//                     style={{ height: 100, width: 100 }}
//                     source={Images[data?.gift_type?.toLowerCase()]}
//                     priority={FastImage.priority.high}
//                     resizeMode={FastImage.resizeMode.cover}
//                 />
//             </View>
//         </View>

//         <View>
//             <View style={{
//                 flexDirection: 'row',
//                 gap: 10,
//                 marginHorizontal: 20,
//                 borderRadius: 10
//             }}>
//                 <View style={{
//                     alignItems: 'center',
//                     borderRadius: 6,
//                     backgroundColor: activeTheme.section,
//                     flex: 1,
//                     paddingVertical: 10
//                 }}>
//                     <Text style={{ color: activeTheme.text }}>{data?.req_id}</Text>
//                     <Text style={{ color: activeTheme.text }}>Request Id</Text>
//                 </View>

//                 <View style={{
//                     alignItems: 'center',
//                     borderRadius: 6,
//                     backgroundColor: activeTheme.section,
//                     flex: 1,
//                     paddingVertical: 10
//                 }}>
//                     <Text style={{ color: activeTheme.text }}>{data?.date_created ? moment(data?.date_created).format('DD MMM, YYYY') : ''}</Text>
//                     <Text style={{ color: activeTheme.text }}>Date</Text>
//                 </View>
//             </View>

//             <View style={{
//                 flexDirection: 'row',
//                 gap: 10,
//                 marginTop: 10,
//                 marginHorizontal: 20,
//                 borderRadius: 10
//             }}>
//                 <View style={{
//                     alignItems: 'center',
//                     borderRadius: 6,
//                     backgroundColor: activeTheme.section,
//                     flex: 1,
//                     paddingVertical: 10
//                 }}>
//                     <Text style={{ color: activeTheme.text }}>{data?.gift_type}</Text>
//                     <Text style={{ color: activeTheme.text }}>Redeem Type</Text>
//                 </View>

//                 <View style={{
//                     alignItems: 'center',
//                     borderRadius: 6,
//                     backgroundColor: activeTheme.section,
//                     flex: 1,
//                     paddingVertical: 10
//                 }}>
//                     <Text style={{ color: activeTheme.text }}>{data?.redeem_point}</Text>
//                     <Text style={{ color: activeTheme.text }}>Redeem Points</Text>
//                 </View>
//             </View>

//             {/* <View style={{
//                 flexDirection: 'row',
//                 gap: 10,
//                 marginTop: 10,
//                 marginHorizontal: 20,
//                 borderRadius: 10
//             }}>
//                 <View style={{
//                     alignItems: 'center',
//                     borderRadius: 6,
//                     backgroundColor: activeTheme.section,
//                     flex: 1,
//                     paddingVertical: 10
//                 }}>
//                     <Text style={{ color: activeTheme.text }}>{data?.gift_type}</Text>
//                     <Text style={{ color: activeTheme.text }}>Redeem Type</Text>
//                 </View>
//             </View> */}

//         </View>
//     </ScrollView>
// }

const TransactionDetail = ({ styles, data }) => {
    const activeTheme = useTheme();
    return <ScrollView style={{
        backgroundColor: activeTheme.maincontainer,
    }}>
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
            <View style={{
                alignItems: 'center',
                borderRadius: 6,
                flexDirection: 'row',
                backgroundColor: activeTheme.section,
                justifyContent: 'center',
                padding: 5,

            }}>
                {data?.gift_gallery_master?.gift_img ? <FastImage
                    style={{ height: 100, width: 100, borderRadius: 10 }}
                    source={{ uri: data?.gift_gallery_master?.gift_img }}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.cover}
                /> : <FastImage
                    style={{ height: 100, width: 100, borderRadius: 10 }}
                    source={Images.gift}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.cover}
                /> }
            </View>

            <View style={{
                justifyContent: 'space-between',
            }}>
                <View>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#000',
                    }}>{data?.title}</Text>
                </View>

                <View style={{
                    backgroundColor: '#fff',
                    borderRadius: 8,
                    padding: 5,
                    marginTop: 4,
                }}>
                    <Text>Coins Used</Text>
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
                        }}>{data?.gift_point || data?.redeem_point || 0}</Text>
                    </View>
                </View>
            </View>
        </View>

        <View style={{ paddingHorizontal: 10 }}>
            <View style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
                borderRadius: 10,
            }}>
                <View style={{
                    borderRadius: 6,
                    backgroundColor: activeTheme.section,
                    flex: 1,
                    paddingHorizontal: 8,
                }}>
                    <Text style={{ color: activeTheme.text, fontWeight: 'bold' }}>{data?.req_id}</Text>
                    <Text style={{ color: activeTheme.text }}>Request Id</Text>
                </View>

                <View style={{
                    borderRadius: 6,
                    backgroundColor: activeTheme.section,
                    flex: 1,
                    paddingHorizontal: 8,
                }}>
                    <Text style={{ color: activeTheme.text, fontWeight: 'bold' }}>{data?.date_created ? moment(data?.date_created).format('DD MMM, YYYY') : ''}</Text>
                    <Text style={{ color: activeTheme.text }}>Date Created</Text>
                </View>
            </View>

            <View style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
            }}>
                <View style={{
                    borderRadius: 6,
                    backgroundColor: activeTheme.section,
                    flex: 1,
                    paddingHorizontal: 8,
                }}>
                    <Text style={{ color: activeTheme.text, fontWeight: 'bold' }}>{data?.redeem_type || 'N/A'}</Text>
                    <Text style={{ color: activeTheme.text }}>Redeem Type</Text>
                </View>

                <View style={{
                    borderRadius: 6,
                    backgroundColor: activeTheme.section,
                    flex: 1,
                    paddingHorizontal: 8,
                }}>
                    <Text style={{ color: activeTheme.text, fontWeight: 'bold' }}>{data?.redeem_point || 'N/A'}</Text>
                    <Text style={{ color: activeTheme.text }}>Redeem Points</Text>
                </View>

            </View>
            <View style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
            }}>
                <View style={{
                    borderRadius: 6,
                    backgroundColor: activeTheme.section,
                    flex: 1,
                    paddingHorizontal: 8,
                }}>
                    <Text style={{ color: activeTheme.text, fontWeight: 'bold' }}>{moment(data?.shipping_date).format('DD MMM, YYY') || 'N/A'}</Text>
                    <Text style={{ color: activeTheme.text }}>Shipping Date</Text>
                </View>

                <View style={{
                    borderRadius: 6,
                    backgroundColor: activeTheme.section,
                    flex: 1,
                    paddingHorizontal: 8,
                }}>
                    <Text style={{ color: activeTheme.text, fontWeight: 'bold' }}>{data?.shipping_type || 'N/A'}</Text>
                    <Text style={{ color: activeTheme.text }}>Shipping Type</Text>
                </View>
            </View>
            <View style={{ marginVertical: 10 }}>
                <View style={{
                    borderRadius: 6,
                    backgroundColor: activeTheme.section,
                    flex: 1,
                    paddingHorizontal: 8,
                }}>
                    <Text style={{ color: activeTheme.text }}>Shipping Address</Text>
                    <Text style={{ color: activeTheme.text, fontWeight: 'bold' }}>{data?.shipping_address}</Text>
                </View>
            </View>
            <View style={{ marginVertical: 10 }}>
                <View style={{
                    borderRadius: 6,
                    backgroundColor: activeTheme.section,
                    flex: 1,
                    paddingHorizontal: 8,
                }}>
                    <Text style={{ color: activeTheme.text }}>Shipping Remark</Text>
                    <Text style={{ color: activeTheme.text, fontWeight: 'bold' }}>{data?.shipping_remark || 'N/A'}</Text>
                </View>
            </View>

            {/* <View style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
                marginHorizontal: 20,
                borderRadius: 10
            }}>
                <View style={{
                    alignItems: 'center',
                    borderRadius: 6,
                    backgroundColor: activeTheme.section,
                    flex: 1,
                    paddingVertical: 10
                }}>
                    <Text style={{ color: activeTheme.text }}>{data?.gift_type}</Text>
                    <Text style={{ color: activeTheme.text }}>Redeem Type</Text>
                </View>
            </View> */}

        </View>
    </ScrollView>;
};

const Card = ({ styles, openBottomSheet, item, index, navigation }) => {

    const { req_id: reqId, redeem_point: point, gift_type, date_created: dateCreated, redeem_type: redeemType, action_status: status, gift_status } = item;

    const { t } = useTranslation();
    const GlobelStyle = useGlobelStyle();
    return (
        <View style={styles.cardContainer} key={item.id}>
            <TouchableOpacity
                style={[GlobelStyle.flexDirectionRow, styles.cardTouchable]}
                onPress={() => openBottomSheet(item)}
            >
                {/* <FastImage
                    style={styles.cardImage}
                    source={Images[redeemType?.toLowerCase()]}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.cover}
                /> */}
                {item?.gift_gallery_master?.gift_img ? <FastImage
                    style={styles.cardImage}
                    source={{ uri: item?.gift_gallery_master?.gift_img }}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.cover}
                /> : <FastImage
                    style={styles.cardImage}
                    source={Images[redeemType?.toLowerCase()]}
                    priority={FastImage.priority.high}
                    resizeMode={FastImage.resizeMode.cover}
                /> }
                <View style={styles.cardTextWrapper}>
                    <View style={[GlobelStyle.flexDirectionRow, { gap: 5 }]}>
                        <Text style={styles.cardTitle}>
                            Req. Id: {reqId}
                        </Text>
                        {/* <View style={[styles[status?.toLowerCase()], {
                            borderRadius: 20,
                            paddingHorizontal: 10,
                            alignItems: 'center',
                            justifyContent: "center"
                        }]
                        }>
                            <Text style={styles[status?.toLowerCase()]}>{status}</Text>
                        </View> */}
                    </View>
                    <Text style={styles.cardSubtitle}>{redeemType}</Text>
                </View>
                <View style={GlobelStyle.alignItemsEnd}>
                    <Text style={styles.cardTitle}>Coin {point}</Text>
                    <Text style={styles.cardSubtitle}>{dateCreated ? moment(dateCreated).format('DD MMM, YYYY') : ''}</Text>
                </View>
            </TouchableOpacity>
            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                <View style={[styles[(status?.toLowerCase())], {
                borderRadius: 20,
                paddingHorizontal: 10,
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'center',
            }]
            }>

                <Text style={styles[status?.toLowerCase()]}>{status}</Text>
                {status?.toLowerCase() != 'reject' && <Text style={styles[(gift_status?.toLowerCase() == 'inprogress' ? 'pending' : 'approved')]}> - {gift_status}</Text>}
            </View>
            </View>
        </View>
    );
};

const TrackRequestList = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { isLoading, refetch, data: requestListData, isFetching } = useRedeemGiftRequestList({ filter: {} });
    const [activeData, setActiveData] = useState(null);
    const GlobelStyle = useGlobelStyle();
    const isFocused = useIsFocused();
    const { loginData, setLoginData } = useContext(AuthContext);
    const { t } = useTranslation();
    const activeTheme = useTheme();


    const styles = StyleSheet.create({
        wrapper: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        coinText: {
            fontSize: 40,
            fontWeight: 'bold',
            color: '#FFD700', // gold
            textShadowColor: 'rgba(255, 255, 255, 0.7)',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
        },
        loaderContainer: {
            paddingVertical: 20,
            paddingHorizontal: 10,
            backgroundColor: '#F6F6F6',
            height: '100%',
        },
        card: {
            backgroundColor: '#3a459c',
            paddingHorizontal: 10,
            paddingBottom: 50,
            height: 250,
            justifyContent: 'flex-start',
        },
        listContainer: {
            backgroundColor: activeTheme.section,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -20,
            paddingTop: 20,
            height: '100%',
            paddingHorizontal: 10,
        },
        flatListContent: {
            paddingBottom: 60,
        },
        emptyContainer: {
            marginTop: 200,
        },
        cardContainer: {
            backgroundColor: activeTheme.section,
            borderBottomWidth: 0.3,
            borderColor: '#ccc',
            padding: 5,
        },
        cardTouchable: {
            gap: 5,
        },
        cardImage: {
            width: 40,
            height: 40,
            borderRadius: 40,
            borderWidth: 1,
            borderColor: '#ccc',
        },
        cardTextWrapper: {
            flex: 1,
        },
        cardTitle: {
            fontWeight: 'bold',
            fontSize: 14,
            color: activeTheme.text,
        },
        cardSubtitle: {
            color: activeTheme.text,
            // color: '#777',
            fontSize: 12,
        },
        sectionBadge: {
            backgroundColor: '#eee',
            borderRadius: 30,
            paddingHorizontal: 15,
            paddingVertical: 3,
            marginBottom: 10,
        },
        sectionBadgeText: {
            fontWeight: 'bold',
            color: '#000',
        },
        sectionMarginTop: {
            marginTop: 20,
        },
        Pending: {
            backgroundColor: '#FDF9C3',
            color: '#8E5C19',
            textTransform: 'capitalize',
            fontWeight:'bold',
            fontSize: 12,
        },
        pending: {
            backgroundColor: '#FDF9C3',
            color: '#8E5C19',
            textTransform: 'capitalize',
            fontSize: 12,
            fontWeight:'bold',
        },
        Reject: {
            backgroundColor: '#F9E2E2',
            color: '#991B21',
            textTransform: 'capitalize',
            fontSize: 12,
            fontWeight:'bold',
        },
        reject: {
            backgroundColor: '#F9E2E2',
            color: '#991B21',
            fontSize: 12,
            fontWeight:'bold',
        },

        approved: {
            backgroundColor: '#BBF7D0',
            color: '#3B803E',
            fontWeight:'bold',
            fontSize: 12,
        },
    });

    const bottomSheetRef = useRef(null);
    const openBottomSheet = (item) => {
        setActiveData(item);
        bottomSheetRef.current?.present();
    };
    const closeBottomSheet = () => bottomSheetRef.current.dismiss();

    const [start, setStart] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [redeemList, setredeemList] = useState([]);
    const [endReached, setEndReached] = useState(false);

    let onEndReachedCalledDuringMomentum = true;

    const onEndReached = () => {
        const nextStart = start + 20;
        setStart(nextStart);
    };

    const onRefresh = () => {
        refetch({ filter: {} });

        setRefreshing(true);
        // simulate network request
        setTimeout(() => {
            setRefreshing(false);
        }, 1500);
    };

    if (loginData?.status_of_profile?.toLowerCase() != 'approved') {
        return <AuthorizationScreen image={Images.scanNotAllowed} imageSize={'contain'} handler={false} title={'Not Allowed see requests'} message={"You can't see requests as your profile is not approved yet. kindly contact to admin"} />;
    }

    if (isLoading) {
        return <AppLoader2 />;
    }

    return (
        <>
            <SafeAreaView>
                {isRefreshing ? (
                    <View style={styles.loaderContainer}>
                        <AppLoader2 isLoading={isRefreshing} />
                    </View>
                ) : (
                    <>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#CE90FF', '#3600C0']}
                            style={styles.card}>
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
                                }}>{t('Track Request')}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
                                    <HelpIcon
                                        style={{ marginRight: 10 }}
                                        width={30}
                                        height={30}
                                        fill="#fff"
                                        stroke="#fff"
                                        strokeWidth={0.1}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                gap: 10,
                                flex: 1,
                                alignItems: 'flex-end',
                            }}>
                                <View style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 20,
                                    borderRadius: 6,
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    borderWidth: 0.5,
                                    borderColor: '#999',
                                }}>
                                    <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>{t('Pending Requests')}</Text>
                                    <View style={{
                                        paddingLeft: 10, flexDirection: 'row',
                                        gap: 10,
                                    }}>
                                        {/* <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 5,
                                            justifyContent: 'flex-end'
                                        }}>
                                            <Text style={{
                                                fontWeight: "bold",
                                                fontSize: 32,
                                                color: "#3600C0"
                                            }}>{requestListData?.data?.CashCount}</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: "bold",
                                                color: '#eee'
                                            }}>{`Cash\nRequests`}</Text>
                                        </View> */}
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: 5,
                                            justifyContent: 'flex-end',
                                        }}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                fontSize: 32,
                                                color: '#4505e7ff',
                                            }}>{requestListData?.data?.data?.filter(elem => elem.action_status == 'PENDING')?.length}</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: 'bold',
                                                color: '#eee',
                                            }}>{`${t('Gift')}\n${t('Requests')}`}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View style={{
                                    flex: 1, paddingHorizontal: 10,
                                    borderRadius: 6,
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    borderWidth: 0.5,
                                    borderColor: '#999',
                                }}>
                                    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" duration={2000} delay={1000} style={{ textAlign: 'center' }}>
                                        <ImageBackground
                                            source={require('../../../../core/assets/Images/giftBox.png')} // Path to your background image
                                            style={{ height: 100, width: '100%' }} // Apply styles to the ImageBackground component
                                            resizeMode="contain" // To make the image cover the entire container
                                         />
                                    </Animatable.View>
                                    {/* <FastImage
                                                style={{ height: 150, width: 150, borderRadius:8 }}
                                                source={Images.giftBox}
                                                priority={FastImage.priority.high}
                                                resizeMode={FastImage.resizeMode.cover}
                                            /> */}
                                </View>
                            </View>
                        </LinearGradient>
                        <View style={styles.listContainer}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                marginBottom: 10,
                                color: '#000',
                            }}>All Requests</Text>

                            <ScrollView
                                refreshControl={
                                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                                }
                            >
                                {requestListData?.data?.data?.map((item, index) => {
                                    return <>
                                        <Card styles={styles} openBottomSheet={openBottomSheet} item={item} index={index} navigation={navigation} />
                                    </>;
                                })}
                            </ScrollView>

                            {/* <FlatList
                                data={requestListData?.data?.data}
                                onEndReached={() => {
                                    if (!onEndReachedCalledDuringMomentum) {
                                        onEndReached();
                                        onEndReachedCalledDuringMomentum = true;
                                    }
                                }}

                                onMomentumScrollBegin={() => {
                                    onEndReachedCalledDuringMomentum = false;
                                }}
                                keyExtractor={(item) => item.id?.toString()}
                                contentContainerStyle={styles.flatListContent}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={isFetching && !isLoading}
                                        onRefresh={onRefresh}
                                    />
                                }
                                initialNumToRender={10}
                                windowSize={10}
                                ListEmptyComponent={
                                    <View style={styles.emptyContainer}>
                                        <AppNoDataFound
                                            title={isRefreshing ? 'Please wait...' : 'No Data Available'}
                                        />
                                    </View>
                                }
                                renderItem={({ item, index }) => {
                                    return <>
                                        <Card styles={styles} openBottomSheet={openBottomSheet} item={item} index={index} navigation={navigation} />
                                    </>
                                }
                                }
                            /> */}
                        </View>
                    </>
                )}
            </SafeAreaView>

            <BottomSheetModalProvider>
                <BottomSheetModal
                    index={0}
                    ref={bottomSheetRef}
                    backgroundStyle={{
                        backgroundColor: activeTheme.section,
                    }}
                    snapPoints={['40%']}
                    enablePanDown={false}
                    backdropComponent={(props) => (
                        <BottomSheetBackdrop
                            {...props}
                            appearsOnIndex={0}
                            disappearsOnIndex={-1}
                            pressBehavior="close" // disables tap to close
                        />
                    )}
                    keyboardBehavior="interactive" // important!
                    keyboardBlurBehavior="restore" // optional, better UX
                    onChange={(index) => {
                        if (index === -1) {
                            closeBottomSheet();
                        }
                    }}
                >
                    <TransactionDetail styles={styles} data={activeData} />
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </>
    );
};



export default TrackRequestList;
