import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { Text } from 'react-native-paper';
import { TabView } from 'react-native-tab-view';
import { TabBarLayout } from '../../../../core/utils/Constant';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import { ImageBackground, RefreshControl, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import { Images } from '../../../../core/assets';
import useTheme from '../../../../core/components/Theme/useTheme';
import { useInfluencerBadge } from '../../../../api/hooks/useMasters';
import moment from 'moment';

const BadgesList = () => {
    const GlobelStyle = useGlobelStyle();
    const isFocused = useIsFocused();
    const activeTheme = useTheme();
    const [activeItem, setActiveItem] = useState(null);
    const { mutate: fetchInfluencerBadge, data: influencerBadges } = useInfluencerBadge();

    useEffect(() => {
        fetchInfluencerBadge({ filter: {} }, {
            onSuccess: (result) => {
                console.log(result?.data);
            },
        });
    }, []);

    const styles = StyleSheet.create({
        progressWrapper: {
            width: '100%',
            height: 10,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 15,
            backgroundColor: '#9BC0EE',
        },
        progress: {
            height: 10,
            borderRadius: 10,
            width: '60%',
            backgroundColor: '#FFA000',
            position: 'relative',
        },
        progressEdge: {
            left: '95%',
            top: '-48%',
            height: 18,
            width: 18,
            borderRadius: 14,
            backgroundColor: '#FFA000',
        },
        tile: {
            backgroundColor: '#E8F3FF',
            padding: 8,
            borderRadius: 8,
        },
        tileTitle: {
            fontSize: 10,
        },
        tileValue: {
            fontWeight: 'bold',
            fontSize: 12,
            color: '#000',
        },
        cardWrapper: {
            backgroundColor: activeTheme.section,
            borderRadius: 10,
            padding: 5,
            alignItems: 'center',
            width: '31%',
        },
        cardTitle: {
            fontSize: 16,
            fontWeight: 'bold',
            color: activeTheme.text,
            marginVertical: 10,
            textAlign: 'center',
        },
        cardDetailTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: activeTheme.text,
        },
        detailText: {
            fontSize: 16,
            color: activeTheme.text,
        },
        innerWrapper: {
            padding: 10,
            gap: 10,
            flexDirection: 'row',
        },
    });

    const { t } = useTranslation();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'myProgress', title: 'My Progress' },
        { key: 'otherBadges', title: 'Other Badges' },
    ]);


    const bottomSheetRef = useRef(null);
    const openBottomSheet = (item) => {
        console.log('item ===> ', item);
        setActiveItem(item);
        bottomSheetRef.current?.present();
    };
    const closeBottomSheet = () => bottomSheetRef.current.dismiss();

    const Card = ({ item, index }) => {

        return (
            <TouchableOpacity onPress={() => openBottomSheet(item)} style={styles.cardWrapper}>
                <ImageBackground
                    source={{ uri: item?.image }}
                    style={{ width: 100, height: 100 }}
                    resizeMode="cover"
                 />
                <View>
                    <Text style={styles.cardTitle}>{item?.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const ListView = ({ activeKey, data, fetchInfluencerBadge }) => {
        const [refreshing, setRefreshing] = useState(false);
        const onRefresh = () => {
            fetchInfluencerBadge({filter:{}});
            setRefreshing(true);
        };



        return (
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View
                    style={{
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        backgroundColor: activeTheme.maincontainer,
                        flexDirection: 'row',
                        flex: 1,
                        gap: 10,
                        flexWrap: 'wrap',
                    }}>
                    {data?.map((item) => <Card item={item} index={index} />)}
                </View>
            </ScrollView>
        );
    };


    const tabRenderScene = ({ route, focused }) => {
        if (!focused) {return null;} // Skip rendering for unfocused tabs
        const data =
            route.key === 'myProgress'
                ? influencerBadges?.data?.newlyEarnedBadge
                : influencerBadges?.data?.alreadyEarnedBadges;

        return <ListView activeKey={route.key} fetchInfluencerBadge={fetchInfluencerBadge} data={data} />;
    };


    return (
        <SafeAreaView style={GlobelStyle.tabViewContainer}>
            <TabView
                renderTabBar={props => (
                    <TabBarLayout props={{ ...props }} tabWidth={2} />
                )}
                navigationState={{ index, routes }}
                renderScene={(props) => tabRenderScene({ ...props, focused: routes[index]?.key === props.route.key })}

                // renderScene={({ route, focused }) => {
                //     if (!focused) return null;
                //     console.log(route)

                //     return (
                //         <ListView activeKey={route.key} />

                //     )
                // }}
                lazy
                onIndexChange={setIndex}
                initialLayout={{ width: '100%' }}
                style={GlobelStyle.tabView}
            />
            <BottomSheetModalProvider>
                <BottomSheetModal
                    index={0}
                    ref={bottomSheetRef}
                    snapPoints={['60%']}
                    backgroundStyle={{
                        backgroundColor: activeTheme.section,
                    }}
                    enablePanDown={false}
                    backdropComponent={(props) => (
                        <BottomSheetBackdrop
                            {...props}
                            appearsOnIndex={0}
                            pressBehavior="close"
                            disappearsOnIndex={-1}
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
                    <View style={styles.innerWrapper}>
                        <ImageBackground
                            source={{ uri: activeItem?.image }}
                            style={{ width: 100, height: 100 }}
                            resizeMode="cover"
                         />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.cardDetailTitle}>{activeItem?.title}</Text>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={[styles.innerWrapper, { flexWrap: 'wrap' }]}>
                            <View style={styles.tile}>
                                <Text style={styles.tileValue}>{activeItem?.slab_type}</Text>
                                <Text style={styles.tileTitle}>Slab Type</Text>
                            </View>

                            {activeItem?.slab_type?.toLowerCase() == 'custom' && <>
                                <View style={styles.tile}>
                                    <Text style={styles.tileValue}>{moment(activeItem?.start_date).format('DD MMM, YYYY')}</Text>
                                    <Text style={styles.tileTitle}>Start Date</Text>
                                </View>

                                <View style={styles.tile}>
                                    <Text style={styles.tileValue}>{moment(activeItem?.end_date).format('DD MMM, YYYY')}</Text>
                                    <Text style={styles.tileTitle}>End Date</Text>
                                </View>
                            </>}

                            {activeItem?.slab_type == 'DAYWISE' && <View style={styles.tile}>
                                <Text style={styles.tileValue}>{activeItem?.eligible_days}</Text>
                                <Text style={styles.tileTitle}>Eligible Days</Text>
                            </View>}

                            <View style={styles.tile}>
                                <Text style={styles.tileValue}>{activeItem?.eligible_value}</Text>
                                <Text style={styles.tileTitle}>Scanning point</Text>
                            </View>

                            <View style={styles.tile}>
                                <Text style={styles.tileValue}>{activeItem?.badge_type}</Text>
                                <Text style={styles.tileTitle}>Badge Type</Text>
                            </View>

                            <View style={styles.tile}>
                                <Text style={styles.tileValue}>{activeItem?.point_incentive_type}</Text>
                                <Text style={styles.tileTitle}>Point Incentive Type</Text>
                            </View>

                            <View style={styles.tile}>
                                <Text style={styles.tileValue}>{activeItem?.point_value}</Text>
                                <Text style={styles.tileTitle}>Point Value</Text>
                            </View>
                        </View>
                        {/* <View style={{ padding: 10 }}>
                            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold', color: activeTheme.text }}>Target: 123 Pts.</Text>
                                <Text style={{ fontWeight: 'bold', color: activeTheme.text }}>Scanned: 123 Pts.</Text>
                            </View>
                            <View style={styles.progressWrapper}>
                                <View style={styles.progress}>
                                    <View style={styles.progressEdge} />
                                </View>
                            </View>
                        </View> */}
                    </ScrollView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </SafeAreaView>

    );
};





export default BadgesList;
