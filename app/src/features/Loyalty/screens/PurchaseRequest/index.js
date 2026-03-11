import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    RefreshControl,
    useWindowDimensions,
    ToastAndroid,
} from 'react-native';
import { ActivityIndicator, AnimatedFAB, Avatar, SegmentedButtons } from 'react-native-paper';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { TabBar, TabView } from 'react-native-tab-view';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import { TabBarLayout } from '../../../../core/utils/Constant';
import Style from '../../../../core/assets/Style/styles';
import AppNoDataFound from '../../../../core/components/No_Data_Found/AppNoDataFound';
import { ApiCall } from '../../../../services/ServiceProvider';
import Toast from 'react-native-toast-message';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const PurchaseRequestList = ({ navigation }) => {
    const GlobelStyle = useGlobelStyle();
    const { t } = useTranslation();
    // CONSTANTS
    const ROUTES_LIST = [
        { key: 'Pending', title: 'Pending', payload: 'Pending' },
        { key: 'Approved', title: 'Approved', payload: 'Approved' },
        { key: 'Reject', title: 'Reject', payload: 'Reject' },
    ];

    const isFocused = useIsFocused();
    const [routes] = useState(ROUTES_LIST);
    const [index, setIndex] = useState(0);
    const activeTheme = useActiveTheme();
    const [allCount, setAllCount] = useState(null);
    const [start, setStart] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(true);
    const [purchaseList, setPurchaseList] = useState([]);
    const [endReached, setEndReached] = useState(false);
    const userData = {};
    let onEndReachedCalledDuringMomentum = true;
    const insets = useSafeAreaInsets();
    const [isScrollingUp, setIsScrollingUp] = useState(true);
    const scrollOffset = useRef(0);



    useEffect(() => {


        if (isFocused == true) {
            getPur();
        }

    }, [start, isFocused, index]);

    const onEndReached = () => {
        const nextStart = start + 20;
        setStart(nextStart);
        moreItem(nextStart);
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        setPurchaseList([]);
        setStart(0);
        if (start === 0) {
            getPur();
        }
    };

    const getPur = useCallback(async () => {
        try {
            setIsRefreshing(true);
            const result = await ApiCall(
                {
                    'Status': ROUTES_LIST[index].key,
                    'limit': 20,
                    'start': start,
                    'filter': {},
                },
                'AppPurchase/purchaseList',
            );

            if (result.statusCode === 200) {
                if (result.statusMsg !== 'Limit exceeded') {
                    // setPurchaseList(prev => {
                    //     return [...prev, ...result.purchase];
                    // });
                    setPurchaseList(result.purchase);
                    setAllCount(result.count);
                }
            }
            if (result.purchase.length < 20) {
                setEndReached(true);
            }
            setIsRefreshing(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error occurred while fetching data',
                visibilityTime: 6000,
            });
            console.error(':', error);
            setIsRefreshing(false);
        }
    }, [start, index]);

    const moreItem = useCallback(async () => {
        try {
            setIsRefreshing(true);

            const result = await ApiCall(
                {
                    'status': ROUTES_LIST[index].key,
                    'limit': 20,
                    'start': start,
                    'filter': {},
                },
                'AppPurchase/purchaseList',
            );

            if (result.statusCode === 200) {
                if (result.statusMsg !== 'Limit exceeded') {
                    setPurchaseList(prev => {
                        return [...prev, ...result.purchase];
                    });
                    setAllCount(result.count);
                }
            }
            if (result.purchase.length < 20) {
                setEndReached(true);
            }
            setIsRefreshing(false);
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Error occurred while fetching data',
                visibilityTime: 6000,
            });
            console.error(':', error);
            setIsRefreshing(false);
        }
    }, [start, index]);

    const handleScroll = event => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        const scrollingUp = currentOffset < scrollOffset.current;
        scrollOffset.current = currentOffset;

        if (scrollingUp !== isScrollingUp) {
            setIsScrollingUp(scrollingUp);
            navigation.setOptions({
                tabBarStyle: scrollingUp
                    ? GlobelStyle.tabBarStyle
                    : GlobelStyle.tabHidden,
            });
        }
    };



    const renderScene = ({ route }) => {

        return (
            <>

                <View
                    style={{
                        paddingVertical: 20,
                        paddingHorizontal: 10,
                        backgroundColor: '#F6F6F6',
                        height: '100%',
                    }}>
                    <FlatList
                        data={purchaseList}
                        onEndReached={() => {
                            if (!onEndReachedCalledDuringMomentum) {
                                onEndReached();
                                onEndReachedCalledDuringMomentum = true;
                            }
                        }}
                        ListFooterComponent={() =>
                            !isRefreshing && !endReached && <ActivityIndicator />
                        }
                        onMomentumScrollBegin={() => {
                            onEndReachedCalledDuringMomentum = false;
                        }}
                        onScroll={handleScroll}
                        scrollEventThrottle={100}

                        refreshControl={
                            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
                        }
                        contentContainerStyle={{ paddingBottom: 50 }}
                        ListEmptyComponent={
                            <View style={{ marginTop: 200 }}>
                                <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={onRefresh}
                                />
                                <AppNoDataFound
                                    title={isRefreshing ? 'Please wait...' : 'No Data Available'}
                                />
                            </View>
                        }

                        renderItem={({ item, index }) => (
                            <View key={item.id} style={[Style.dealerCard, { marginTop: 10 }]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setStart(0);
                                        setPurchaseList([]);
                                        navigation.navigate('PurchaseRequestDetails', item);

                                    }}>
                                    <View style={Style.lastInfoBox}>
                                        <View>
                                            <View
                                                style={[
                                                    Style.lastInfoTitle,
                                                    { marginLeft: 0, paddingLeft: 0 },
                                                ]}>
                                                <Text
                                                    style={[Style.lastInfoTitleText, { marginLeft: 0 }]}>
                                                    {t('Date Created')}
                                                </Text>
                                            </View>
                                            <Text style={[Style.lastInfoText, { marginLeft: 0 }]}>
                                                {item.date_created != '0000-00-00 00:00:00'
                                                    ? moment(item.date_created).format(
                                                        'DD MMM yyyy , hh:mm a',
                                                    )
                                                    : 'N/A'}
                                            </Text>
                                        </View>

                                        <View>
                                            <View style={GlobelStyle.flexRowAlignCenter}>
                                                <Text style={Style.lastInfoTitleText}>
                                                    {t('Invoice Date')}
                                                </Text>
                                            </View>
                                            <Text style={[Style.lastInfoText, { marginLeft: 0 }]}>#{item.invoice_date ? moment(item.invoice_date).format(
                                                'DD MMM yyyy',
                                            ) : 'N/A'}
                                            </Text>
                                        </View>
                                        <View>
                                            <View
                                                style={[
                                                    Style.lastInfoTitle,
                                                    { marginLeft: 0, paddingLeft: 0 },
                                                ]}>
                                                <Text
                                                    style={[Style.lastInfoTitleText, { marginLeft: 0 }]}>
                                                    {t('Invoice Number')}
                                                </Text>
                                            </View>
                                            <Text style={[Style.lastInfoText, { marginLeft: 0 }]}>
                                                {item.invoice_number ? item.invoice_number : 'N/A'}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[Style.lastInfoBox, { marginTop: 10 }]}>
                                        <View>
                                            <View
                                                style={[
                                                    Style.lastInfoTitle,
                                                    { marginLeft: 0, paddingLeft: 0 },
                                                ]}>
                                                <Text
                                                    style={[Style.lastInfoTitleText1, { marginLeft: 0 }]}>
                                                    {t('PO ID')}
                                                </Text>
                                            </View>
                                            <Text style={[Style.lastInfoText, { marginLeft: 0 }]}>
                                                {item.id ? item.id : 'N/A'}
                                            </Text>
                                        </View>

                                        <View>
                                            <View style={GlobelStyle.flexRowAlignCenter}>
                                                <Text style={Style.lastInfoTitleText1}>
                                                    {t('Total Item')}
                                                </Text>
                                            </View>
                                            <Text style={Style.lastInfoText}>
                                                {item.total_item ? item.total_item : 'N/A'}
                                            </Text>
                                        </View>
                                        <View>
                                            <View
                                                style={[
                                                    Style.lastInfoTitle,
                                                    { marginLeft: 0, paddingLeft: 0 },
                                                ]}>
                                                <Text
                                                    style={[Style.lastInfoTitleText1, { marginLeft: 0 }]}>
                                                    {t('Total SQFT')}
                                                </Text>
                                            </View>
                                            <Text style={[Style.lastInfoText, { marginLeft: 0 }]}>
                                                {item.total_sqft ? item.total_sqft : 'N/A'}
                                            </Text>
                                        </View>
                                        <View>
                                            <View
                                                style={[
                                                    Style.lastInfoTitle,
                                                    { marginLeft: 0, paddingLeft: 0 },
                                                ]}>
                                                <Text
                                                    style={[Style.lastInfoTitleText1, { marginLeft: 0 }]}>
                                                    {t('Total Points')}
                                                </Text>
                                            </View>
                                            <Text style={[Style.lastInfoText, { marginLeft: 0 }]}>
                                                {item.total_point_value ? item.total_point_value : 'N/A'}
                                            </Text>
                                        </View>
                                    </View>


                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
                {
                    route.key == 'Pending' && <AnimatedFAB
                        icon={'plus'}
                        label={t('Add New')}
                        extended={isScrollingUp}

                        uppercase
                        onPress={() => userData?.status_of_profile?.toLowerCase() != 'approved' ? Toast.show({ type: 'error', text1: 'Your current profile status is not Approved. You can  add purchase request if your profile status is Approved. To know more, you can call us', visibilityTime: 6000 }) :
                            navigation.navigate('AddPurchaseRequest', {})}
                        visible={true}
                        animateFrom={'right'}
                        rippleColor={'#000'}
                        iconMode={'dynamic'}
                        color={activeTheme.White}

                        style={[GlobelStyle.AnimatedFav, { marginBottom: 50, backgroundColor: activeTheme.themeColor }]}
                    />
                }

                {/* <TouchableOpacity
                    style={Style.dealerAddNewButton}
                    onPress={() => {
                        setStart(0);
                        setPurchaseList([]);
                        userData?.status_of_profile?.toLowerCase() != 'approved' ? toast.show(`Your current profile status is not Approved. You can  add purchase request if your profile status is Approved. To know more, you can call us`, { type: 'danger', duration: 6000 }) :
                            navigation.navigate('AddPurchaseRequest', {});
                    }}>
                    <View>
                        <Text style={Style.addNewButtonText}>{t('Add New')}</Text>
                    </View>
                </TouchableOpacity> */}
            </>
        );
    };


    return (
        <View style={GlobelStyle.tabViewContainer}>
            <TabView
                renderTabBar={props => (
                    <TabBarLayout props={{ ...props }} allCount={allCount}
                        tabWidth={3} />
                )}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={(index) => {

                    setIndex(index);
                    setStart(0);
                    setPurchaseList([]);
                    setAllCount(null);
                }}
                lazy
                initialLayout={{ width: '100%' }}
                style={GlobelStyle.tabView}
            />
        </View>
    );
};

export default PurchaseRequestList;
