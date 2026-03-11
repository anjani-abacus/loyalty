import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TabView } from 'react-native-tab-view';
// import { TabBarLayout } from '../../../../core/utils/Constant';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import { Text, View, Image, ImageBackground, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import Fire from '../../../../core/assets/icons/fire.svg';
import Coin from '../../../../core/assets/icons/CoinGold.svg';
import Avtar from '../../../../core/assets/icons/Avtar.svg';
import influencerListJson from '../../../../core/utils/data/influecerlist.json';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

import {
    useWindowDimensions,
} from 'react-native';
import { TabBar } from 'react-native-tab-view';
import { useTranslation } from 'react-i18next';
import useTheme from '../../../../core/components/Theme/useTheme';
import { IconButton } from 'react-native-paper';
import { Images } from '../../../../core/assets';
import { StatusBarHeader } from '../../../../core/components/StatusBar/StatusBar';
import { useLeaderBoard } from '../../../../api/hooks/useMasters';

const TabBarLayout = React.memo(
    ({
        props,
        tabWidth,
        isBorderTab = false,
        isSecondaryTab = false,
        activeColor = '#0092FF',
        gap = 6,
        scrollEnabled = true,
        allCount = null,
        indicatorStyle,
        onTabPress = () => { },
    }) => {
        const style = useGlobelStyle();
        const divisionType = typeof tabWidth;
        const layout = useWindowDimensions();
        const activeTheme = useTheme();
        const { t } = useTranslation();

        if (indicatorStyle == undefined) {
            indicatorStyle = isBorderTab
                ? style.noUnderLineTabStyle
                : style.underLineTabStyle;
        }

        return (
            <TabBar
                {...props}
                style={{ backgroundColor: 'transparent' }}
                scrollEnabled={scrollEnabled}
                activeColor={activeColor}
                labelStyle={style.tabTextStyle}
                gap={gap}
                onTabPress={onTabPress}
                indicatorStyle={indicatorStyle}
                renderLabel={({ route, focused }) => (
                    <Text
                        style={[
                            isBorderTab
                                ? style?.borderTabStyle(focused)
                                : isSecondaryTab
                                    ? style?.secondaryTabStyle(focused)
                                    : null,
                            {
                                width:
                                    divisionType == 'number' ? layout?.width / tabWidth : 'auto',
                                textAlign: 'center',
                                color: activeTheme.text,
                                marginVertical: -10,
                            },
                        ]}>
                        {t(route?.title)}{' '}
                        {allCount !== null &&
                            (allCount[route?.payload]
                                ? '(' + allCount[route?.payload] + ')'
                                : '(0)')}
                    </Text>
                )}
                tabStyle={{
                    width: divisionType == 'number' ? layout?.width / tabWidth : 'auto',
                }}
            />
        );
    },
);

const ROUTES = [
    { key: 'Weekly', title: 'Weekly', payload: 'Weekly' },
    { key: 'Monthly', title: 'Monthly', payload: 'Monthly' },
    { key: 'Yearly', title: 'Yearly', payload: 'Yearly' },
];

const LeaderBoard = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('month');
    const [dataFilter, setDataFilter] = useState('State Wise');
    const globelStyle = useGlobelStyle();
    const { data: leaderboardData, refetch } = useLeaderBoard({type:dataFilter});

    const isFirstRender = useRef(true);

    useEffect(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false; // Set to false after the first render
            return; // Skip the effect on the first render
        }
        refetch({type:dataFilter});
    }, [dataFilter]);

    const filterRenderTabBar = props => (
        <TabBarLayout
            props={{ ...props }}
            tabWidth={'auto'} // auto, count of visible tabs
            isSecondaryTab={false}
        />
    );

    const renderTypeScene = ({ route, mode }) => {
        return (
            <>
                {renderHeader()}
                <ScrollView style={{
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                }}>
                    {influencerListJson?.map((item, index) => renderLeaderboardItem({ item, index }))}
                </ScrollView>
            </>
        );
    };

    const RenderTopThree = () => {
        const topThree = leaderboardData?.data?.leaderboard[activeTab]?.slice(0, 3) || [];

        return (
            <>
                <LinearGradient colors={['#FFFFFF', '#F5E6FF']} style={{
                    marginBottom: -30,
                }}>
                    {/* header */}
                    <StatusBarHeader height={StatusBar.currentHeight} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconButton
                            onPress={() => navigation.goBack()}
                            icon={'arrow-left'}
                            // style={{ backgroundColor: activeTheme.Light }}
                            size={22}
                        />
                        <Text style={{
                            flex: 0.8,
                            textAlign: 'center',
                            color: '#000000',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>Leaderboard</Text>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 5,

                    }}>
                        {/* TABS */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                        }}>
                            {/* <TouchableOpacity style={{
                                paddingHorizontal: 10,
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                borderColor: '#fff',
                                ...(activeTab == 'today' && { backgroundColor: '#003EEE' }),
                                borderWidth: 1,
                                borderRadius: 20,
                                paddingVertical: 2
                            }}
                                onPress={() => setActiveTab("today")}>
                                <Text style={{ color: activeTab == 'today' ? "#fff" : "#C4B2D1", fontSize: 14 }}>Today</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={{
                                paddingHorizontal: 10,
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                borderColor: '#fff',
                                ...(activeTab == 'week' && { backgroundColor: '#003EEE' }),
                                borderWidth: 1,
                                borderRadius: 20,
                                paddingVertical: 2,
                            }}
                                onPress={() => setActiveTab('week')}>
                                <Text style={{ color: activeTab == 'week' ? '#fff' : '#C4B2D1', fontSize: 14 }}>This Week</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                paddingHorizontal: 10,
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                borderColor: '#fff',
                                ...(activeTab == 'month' && { backgroundColor: '#003EEE' }),
                                borderWidth: 1,
                                borderRadius: 20,
                                paddingVertical: 2,
                            }}
                                onPress={() => setActiveTab('month')}>
                                <Text style={{ color: activeTab == 'month' ? '#fff' : '#C4B2D1', fontSize: 14 }}>Month</Text>
                            </TouchableOpacity>
                        </View>

                        {/* TABS */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                        }}>
                            {dataFilter == 'State Wise' && <TouchableOpacity style={{
                                paddingHorizontal: 10,
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                borderColor: '#fff',
                                ...({ backgroundColor: '#dee6fcff' }),
                                borderWidth: 1,
                                borderRadius: 20,
                                paddingVertical: 2,
                            }}
                                onPress={() => setDataFilter('District Wise')}>
                                <Text style={{ color: '#003EEE', fontWeight: 'bold', fontSize: 12 }}>Switch to District</Text>
                            </TouchableOpacity>}
                            {dataFilter == 'District Wise' && <TouchableOpacity style={{
                                paddingHorizontal: 10,
                                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                borderColor: '#fff',
                                ...({ backgroundColor: '#dee6fcff' }),
                                borderWidth: 1,
                                borderRadius: 20,
                                paddingVertical: 2,
                            }}
                                onPress={() => setDataFilter('State Wise')}>
                                <Text style={{ color: '#003EEE', fontWeight: 'bold', fontSize: 12 }}>Switch to State</Text>
                            </TouchableOpacity>}
                        </View>
                    </View>


                    <View style={[{ flexDirection: 'row', alignItems: 'flex-end' }]}>

                        {/* SECOND */}
                        <View style={[styles.topCard]}>
                            <View style={{
                                marginRight: -50,
                                top: 90,
                            }}>
                                {topThree[1]?.name && <Animatable.View animation="slideInUp" delay={200}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                        }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <View style={{
                                                height: 70,
                                                width: 70,
                                                backgroundColor: '#fff',
                                                borderRadius: 70,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                elevation: 5, // Elevation for shadow
                                                shadowColor: '#000', // Shadow color
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 5,
                                                },
                                                shadowOpacity: 0.1, // Subtle shadow for depth
                                                shadowRadius: 10,
                                            }}>
                                                <Avtar height="50" width="50" />
                                            </View>

                                            <Text style={{
                                                color: '#333333',
                                                fontSize: 10,
                                                fontWeight: 'bold',
                                                marginVertical: 5,
                                                textAlign: 'center',
                                            }}>{topThree[1]?.name}</Text>

                                            <Text style={{
                                                paddingHorizontal: 5,
                                                backgroundColor: '#D1E2FF',
                                                borderColor: '#FFFFFF',
                                                borderRadius: 10,
                                                color: '#333333',
                                                fontSize: 10,
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                            }}>{topThree[1]?.current_wallet_balnc || 0} Pt.</Text>
                                        </View>
                                    </View>

                                    <ImageBackground
                                        source={require('../../../../core/assets/Images/SilverBar.png')} // Path to your background image
                                        style={{ height: 230, width: '100%' }} // Apply styles to the ImageBackground component
                                        resizeMode="contain" // To make the image contain the entire container
                                    />
                                    <Text style={{
                                        position: 'absolute',
                                        top: 120,
                                        left: 0,
                                        width: '100%',
                                        textAlign: 'center',
                                        color: '#939EB1',
                                        fontSize: 32,
                                        fontWeight: 'bold',
                                    }}>2</Text>
                                </Animatable.View>}
                            </View>
                        </View>

                        {/* FIRST */}
                        <View style={[styles.topCard]}>
                            <View style={{
                                top: 50,
                            }}>
                                <Animatable.View animation="slideInUp" delay={100}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                        }}>
                                        <View>
                                            <View style={{
                                                height: 70,
                                                width: 70,
                                                backgroundColor: '#fff',
                                                borderRadius: 70,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                elevation: 5, // Elevation for shadow
                                                shadowColor: '#000', // Shadow color
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 5,
                                                },
                                                shadowOpacity: 0.1, // Subtle shadow for depth
                                                shadowRadius: 10,
                                            }}>
                                                <Avtar height="50" width="50" />
                                            </View>
                                            <Text style={{
                                                color: '#333333',
                                                fontSize: 10,
                                                fontWeight: 'bold',
                                                marginVertical: 5,
                                                textAlign: 'center',
                                            }}>{topThree[0]?.name}</Text>
                                            <Text style={{
                                                paddingHorizontal: 5,
                                                backgroundColor: '#FFDE9C',
                                                borderColor: '#FFFFFF',
                                                borderRadius: 10,
                                                color: '#333333',
                                                fontSize: 10,
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                            }}>{topThree[0]?.current_wallet_balnc || 0} Pt.</Text>
                                        </View>
                                    </View>
                                    <ImageBackground
                                        source={require('../../../../core/assets/Images/GoldBar.png')} // Path to your background image
                                        style={{ height: 230, width: '100%' }} // Apply styles to the ImageBackground component
                                        resizeMode="contain" // To make the image contain the entire container
                                    />

                                    <Text style={{
                                        position: 'absolute',
                                        top: 120,
                                        left: 0,
                                        width: '100%',
                                        textAlign: 'center',
                                        color: '#D19725',
                                        fontSize: 42,
                                        fontWeight: 'bold',
                                    }}>1</Text>
                                </Animatable.View>
                            </View>
                        </View>

                        {/* THIRD */}
                        <View style={[styles.topCard]}>
                            <View style={{
                                marginLeft: -40,
                                top: 130,
                            }}>
                                {topThree[2]?.name && <Animatable.View animation="slideInUp" delay={300}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                        }}>
                                        <View>
                                            <View style={{
                                                height: 70,
                                                width: 70,
                                                backgroundColor: '#fff',
                                                borderRadius: 70,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                elevation: 5, // Elevation for shadow
                                                shadowColor: '#000', // Shadow color
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 5,
                                                },
                                                shadowOpacity: 0.1, // Subtle shadow for depth
                                                shadowRadius: 10,
                                            }}>
                                                <Avtar height="50" width="50" />
                                            </View>
                                            <Text style={{
                                                color: '#333333',
                                                fontSize: 10,
                                                fontWeight: 'bold',
                                                marginVertical: 5,
                                                textAlign: 'center',
                                            }}>{topThree[2]?.name}</Text>
                                            <Text style={{
                                                paddingHorizontal: 5,
                                                backgroundColor: '#FFD6C7',
                                                borderColor: '#FFFFFF',
                                                borderRadius: 10,
                                                color: '#333333',
                                                fontSize: 10,
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                            }}>{topThree[2]?.current_wallet_balnc || 0} Pt.</Text>
                                        </View>
                                    </View>
                                    <ImageBackground
                                        source={require('../../../../core/assets/Images/BronzeBar.png')} // Path to your background image
                                        style={{ height: 230, width: '100%' }} // Apply styles to the ImageBackground component
                                        resizeMode="contain" // To make the image contain the entire container
                                    />
                                    <Text style={{
                                        position: 'absolute',
                                        top: 120,
                                        left: 0,
                                        width: '100%',
                                        textAlign: 'center',
                                        color: '#D1866D',
                                        fontSize: 32,
                                        fontWeight: 'bold',
                                    }}>3</Text>
                                </Animatable.View>}
                            </View>
                        </View>
                    </View>
                </LinearGradient>
            </>
        );
    };

    const renderLeaderboardItem = ({ item, index }) => {
        if (index < 3) {return null;}

        return (
            <View style={[styles.listItem, (item.name == 'You' && styles.selfItem)]}>
                <View style={styles.listItemLeft}>
                    <Text style={{
                        borderRadius: 10,
                        textAlign: 'left',

                        color: '#A6A6A6',
                        fontWeight: 'bold',

                        flex: 0.2,
                    }}>#{index + 1}</Text>
                    <View style={[styles.avatarWrapper, { flex: 0.5 }]}>
                        {
                            item.avatar ? <Image source={{ uri: item.avatar }} style={styles.listAvatar} />
                                : <View style={styles.listAvatar}>
                                    <Avtar height="30" width="30" />
                                </View>
                            // <Image source={Images.user} style={styles.listAvatar} />
                        }
                    </View>
                    <View style={[styles.listUserInfo, { flex: 1 }]}>
                        <Text style={[styles.listUserName, (item.name == 'You' && { color: '#fff' })]}>{item?.name}</Text>
                        {/* <Text style={[styles.listCategory, (item.name == 'You' && { color: '#eee' })]}>{item.state}</Text> */}
                    </View>
                    {/* <View style={[styles.listUserInfo, { flexDirection: 'row', gap: 5, alignItems: 'center', flex: 0.8 }]}>
                        <Fire height="15" width="15" />
                        <Text style={{
                            fontSize: 14,
                            fontWeight: 'bold'
                        }}>8 Days</Text>
                    </View> */}
                </View>
                <View style={[styles.listItemRight, { flex: 0.3 }]}>
                    <View style={{
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: '#9BB1F0',
                        flexDirection: 'row',
                        backgroundColor: '#EFF3FF',
                        width: '100%',
                        gap: 4,
                        alignItems: 'center',
                        padding: 3,
                    }}>
                        <Coin height="15" width="15" />
                        <Text style={{
                            color: '#003EEE',
                            fontSize: 12,
                            fontWeight: 'bold',
                        }}>{item?.current_wallet_balnc}</Text>
                    </View>
                </View>
            </View>
        );
    };

    MyCustomComponent = Animatable.createAnimatableComponent(RenderTopThree);

    return (
        <View style={[styles.container]}>
            <>
                <MyCustomComponent />
                <View style={{ flex: 1, padding: 10, paddingBottom:100, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
                    <>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 18,
                                borderRadius: 18,
                            }}>{dataFilter}</Text>
                        </View>
                        <View style={[styles.listItem, styles.headerRow]}>
                            <View style={styles.listItemLeft}>
                                <Text style={[styles.headerText, { flex: 0.5 }]}>Rank</Text>

                                <View style={[styles.listUserInfo, { flex: 1.5 }]}>
                                    <Text style={styles.headerText}>Influencer</Text>
                                </View>
                                {/* <View style={[styles.listUserInfo, { flex: 0.8 }]}>
                                    <Text style={styles.headerText}>Streak</Text>
                                </View> */}
                            </View>
                            <View style={[{ alignItems: 'center', flex: 0.3 }]}>
                                <Text style={styles.headerText}>Point</Text>
                            </View>
                        </View>
                        <ScrollView>

                            {
                                leaderboardData?.data?.leaderboard[activeTab]?.length > 3 ?
                                    leaderboardData?.data?.leaderboard[activeTab]?.map((item, index) => renderLeaderboardItem({ item, index }))
                                    : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            fontSize: 28,
                                            color: '#aaa',
                                        }}>No Data Available</Text>
                                    </View>
                            }
                        </ScrollView>
                    </>
                </View>
            </>
        </View>
    );
};



export default LeaderBoard;
