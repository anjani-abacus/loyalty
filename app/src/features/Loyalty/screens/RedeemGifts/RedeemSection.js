import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, Text, StatusBar } from 'react-native';
import ThemedText from '../../../../core/components/ThemedText';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import { useTranslation } from 'react-i18next';
import FastImage from 'react-native-fast-image';
import AppLoader, { AppLoader2 } from '../../../../core/components/Loader/AppLoader';
import * as Animatable from 'react-native-animatable';
import Trophy from '../../../../core/assets/icons/Trophy.svg';
import Coin from '../../../../core/assets/icons/Coins.svg';
import { styles } from './styles';
import { TabBarLayout } from '../../../../core/utils/Constant';
import { Images } from '../../../../core/assets';
import RedeemPoint from '../PointHistory/RedeemPoint';
import Summary from '../PointHistory/Summary';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { useGiftGallery } from '../../../../api/hooks/useMasters';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import useTheme from '../../../../core/components/Theme/useTheme';
import { useSavedAddress } from '../../../../core/components/FormManager/AddressFormScreen';
import Toast from 'react-native-toast-message';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { StatusBarHeader } from '../../../../core/components/StatusBar/StatusBar';
import { IconButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { HelpIcon, LeftArrowIcon, ShareIcon } from '../../../../core/assets/SVGs/svg';
import { handleShare } from '../Home/LoyaltyHome';
import { AuthContext } from '../../../../auth/AuthContext';
import { AuthorizationScreen } from '../../../../core/components/No_Internet_Connection/AppNoInternet';


export const Card = ({ balance, openBottomSheet = () => { }, item, index, navigation }) => {
    const activeTheme = useTheme();
    const GlobelStyle = useGlobelStyle();

    const hapticOptions = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
    };
    const eligiblityHandler = () => {
        Toast.show({ type: 'error', text1: 'You are not eligible for this gift', text2: 'kindly earn more points to avail this gift', visibilityTime: 2000 });
        ReactNativeHapticFeedback.trigger('notificationError', hapticOptions);
    };
    return (
        <TouchableOpacity onPress={() => { (balance >= (item?.gift_point || item?.point_range_value)) ? openBottomSheet(item) : eligiblityHandler(); }} key={'key' + index} style={[{ width: '100%', borderWidth: 0.2, borderColor: '#aaa', marginBottom: 5, backgroundColor: activeTheme.section, padding: 5, borderRadius: 3, gap: 5, alignItems: 'center' }, GlobelStyle.flexDirectionRow, GlobelStyle.justifyContentBetween]}>
            <FastImage
                style={[{ width: 30, height: 30 }]}
                resizeMode={FastImage.resizeMode.stretch}
                source={Images[item?.gift_type?.toLowerCase()]}
            />
            <View style={{ flex: 1 }}>
                <View style={[{ flex: 1, justifyContent: 'center' }]}>
                    <ThemedText style={{ fontSize: 14, fontWeight: 'bold' }}>{item?.title}</ThemedText>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        backgroundColor: '#EFF3FF',
                        // borderWidth: 1,
                        // borderColor: '#9BB1F0',
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 5,
                        paddingVertical: 3,
                    }}>

                        {/* <Coin width={22} height={22} fill="#FFD700" /> */}
                        {item?.gift_type?.toLowerCase() == 'gift' && <ThemedText style={{ fontWeight: 'bold', fontSize: 10, color: '#003EEE' }}>{item?.gift_point} Pts</ThemedText>}
                        {/*  to {item?.range_end} */}
                        {item?.gift_type?.toLowerCase() == 'cash' && <ThemedText style={{ fontWeight: 'bold', fontSize: 10, color: '#003EEE' }}>{item?.point_range_value} Pts </ThemedText>}
                    </View>
                </View>
            </View>
            <View style={{
                borderWidth: 0.5,
                borderColor: '#8768d5ff',
                borderRadius: 5,
                paddingHorizontal: 5,
                paddingVertical: 3,
                alignItems: 'center', justifyContent: 'center',
                flexDirection: 'row',
                marginRight: 5,
            }}>

                <Text style={{ textAlign: 'center', color: (balance < (item?.gift_point || item?.point_range_value)) ? '#ccc' : '#3600C0', fontWeight: 'bold' }}>Claim</Text>
            </View>
        </TouchableOpacity>
    );
};


const RedeemSection = ({ disableHeader = false, navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { refetch, data: giftList, isFetching } = useGiftGallery({ filter: {} });
    const { loginData, setLoginData } = useContext(AuthContext);
    const GlobelStyle = useGlobelStyle();
    const activeTheme = useTheme();
    const SheetStack = createStackNavigator();
    const [redeemItemDetails, setRedeemItemDetails] = useState(null);
    const [isSummaryActive, setIsSummaryActive] = useState(false);
    const { t } = useTranslation();
    const [start, setStart] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const bottomSheetRef = useRef(null);

    useFocusEffect(
        React.useCallback(() => {
            const route = navigation.getState().routes.find(r => r.name === 'LoyaltyGiftGallery');
            console.log('route?.params', route?.params);
            if (route?.params?.keepSheetOpen) {
                console.log('params getting ===. ', route?.params);
                setActiveItem(route?.params?.item);
                bottomSheetRef.current?.present();
            }
        }, [navigation])
    );


    const { address: savedAddress, deleteAddress, fetchAddress: fetchSavedAddress, deleteAddress: resetAddress } = useSavedAddress();

    // Use useFocusEffect for better focus handling
    useFocusEffect(
        useCallback(() => {
            console.log('RedeemPoint screen focused, fetching saved address...');
            fetchSavedAddress();
        }, [fetchSavedAddress])
    );


    const openBottomSheet = (item) => {
        setActiveItem(item);
        bottomSheetRef.current?.present();
    };
    const closeBottomSheet = () => { bottomSheetRef.current.dismiss(); refetch(); };

    const AnimatedButton = Animatable.createAnimatableComponent(TouchableOpacity);
    const [activeTab, setActiveTab] = useState(0);
    let onEndReachedCalledDuringMomentum = true;

    const ROUTES = [
        { key: 'Earn', title: 'Earn', payload: 'Earn' },
        { key: 'Redeem', title: 'Redeem', payload: 'Redeem' },
        { key: 'History', title: 'History', payload: 'History' },
    ];

    const filterRenderTabBar = props => (
        <TabBarLayout
            props={{ ...props }}
            activeColor="#3a459c"
            tabWidth={3} // auto, count of visible tabs
            isSecondaryTab={false}
        // indicatorStyle={{backgroundColor: '#E9F6FF', height: '100%'}}
        />
    );

    const renderTypeScene = ({ route, mode }) => {
        return <View style={[styles.layoutWrapper]}>

            <ScrollView style={{ backgroundColor: '#fff', padding: 5, borderRadius: 5 }}

                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        flex: 1,
                        fontWeight: 'bold',
                        fontSize: 16,
                        marginBottom: 10,
                        color: '#000',
                    }}>Rewards</Text>
                </View>
                {giftList?.data?.result?.map((item, index) => <Card balance={giftList?.data?.points} openBottomSheet={openBottomSheet} item={item} navigation={navigation} index={index} />)}
            </ScrollView>
        </View>;
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
        return <AuthorizationScreen image={Images.scanNotAllowed} imageSize={'contain'} handler={false} title={'Not Allowed To Redeem'} message={"You can't redeem a gift as your profile is not approved yet. kindly contact to admin"} />;
    }


    return (
        <>
            <NavigationContainer independent={true}>
                <SheetStack.Navigator screenOptions={{ headerShown: false }}>
                    <SheetStack.Screen name="pointDetails">
                        {() => <ScrollView>
                            <RedeemPoint deleteAddress={deleteAddress} savedAddress={savedAddress} fetchSavedAddress={fetchSavedAddress} resetAddress={resetAddress} navigation={navigation} setRedeemItemDetails={setRedeemItemDetails} activeItem={activeItem} setIsSummaryActive={setIsSummaryActive} availablePoints={giftList?.data?.points} closeBottomSheet={closeBottomSheet} />
                        </ScrollView>}
                    </SheetStack.Screen>
                    <SheetStack.Screen name="pointSummary">
                        {() => <ScrollView>
                            <Summary redeemItemDetails={redeemItemDetails} activeData={activeItem} setIsSummaryActive={setIsSummaryActive} availablePoints={giftList?.data?.points} closeBottomSheet={closeBottomSheet} />
                        </ScrollView>}
                    </SheetStack.Screen>
                </SheetStack.Navigator>
            </NavigationContainer>


        </>

    );
};





export default RedeemSection;
