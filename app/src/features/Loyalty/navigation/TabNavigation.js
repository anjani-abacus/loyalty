import React, { useState, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dialog, Icon } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomSheetModal, BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import VerticalTabView from '../../../core/components/Filter/VerticalTabView';
import { SafeAreaView } from 'react-native';
import useGlobelStyle from '../../../core/assets/Style/GlobelStyle';
import ScanQRCode from '../screens/ScanQrCode';
import LoyaltyHome from '../screens/Home/LoyaltyHome';
import { useTranslation } from 'react-i18next';
import { DynamicIcon } from '../../../core/assets/icons';
import PointHistory from '../screens/PointHistory';
import SpinAndWin from '../screens/SpinAndWheel';
import useTheme from '../../../core/components/Theme/useTheme';
import Notifications from '../../../core/screens/Notifications';
import TabBarLayout from './TabBarLayout';
import * as Animatable from 'react-native-animatable';
import BumpShape, { BellIcon, BumpShapeShadow, ClockIcon, DynamicSvg, HomeIcon, LeaderBoardIcon, ScanIcon, ScanQrIcon, SpinIcon } from '../../../core/assets/SVGs/svg';
import LinearGradient from 'react-native-linear-gradient';
import LeaderBoard from '../screens/LeaderBoard';

const Tab = createBottomTabNavigator();
const More = () => null;
export default function TabNavigation({ navigation }) {
  const activeTheme = useTheme();
  const GlobelStyle = useGlobelStyle();
  const [loginData, setLoginData] = useState(null);
  const { t } = useTranslation();

  const s = StyleSheet.create({
    tabBarStyle: {
      position: 'absolute',
      backgroundColor: '#FFFFFF',
      height: 50,
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderRadius: 15,

      marginHorizontal: 20,
      marginBottom: 10,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      bottom: 0,
      elevation: 10,
      color: activeTheme.text,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
  });

  const screensSFA = [
    {
      name: 'More',
      component: More,
      focusedIcon: 'layer-group',
      icon: 'layers',
      type: 'feather',
      focusedType: 'font-awesome-5',
      navigate: 'SfaHome',
    },
    {
      name: 'Secondary Order',
      focusedIcon: 'home',
      icon: 'home-outline',
      type: 'ionicon',
      focusedType: 'ionicon',
      component: VerticalTabView,
    },
  ];

  const screensLoyalty = [
    {
      name: 'Home',
      component: LoyaltyHome,
      focusedIcon: 'home',
      icon: 'activeHome',
      type: 'ionicon',
      focusedType: 'ionicon',
      navigate: 'SfaHome',
      svg: HomeIcon,
    },
    {
      name: 'Spin to Win',
      component: SpinAndWin,
      focusedIcon: 'spin',
      icon: 'activeSpin',
      type: 'materialIcons',
      focusedType: 'materialIcons',
      navigate: 'TicketList',
      svg: SpinIcon,
    },
    // {
    //   name: 'Enter Code',
    //   component: EnterCouponCode,
    //   focusedIcon: 'password',
    //   icon: 'password',
    //   type: 'ionicon',
    //   focusedType: 'ionicon',
    //   navigate: 'EnterCouponCode',
    // },
    {
      name: 'Scan and Win',
      component: ScanQRCode,
      focusedIcon: 'scanWhite',
      icon: 'scanWhite',
      type: 'materialicon',
      focusedType: 'materialicon',
      navigate: 'ScanQrCode',
      svg: ScanIcon,
    },
    {
      name: 'LeaderBoard',
      component: LeaderBoard,
      focusedIcon: 'LeaderBoardIcon',
      icon: 'LeaderBoardIcon',
      type: 'materialIcons',
      focusedType: 'materialIcons',
      navigate: 'LeaderBoard',
      svg: LeaderBoardIcon,
    },
    {
      name: 'Point History',
      focusedIcon: 'history',
      icon: 'history',
      type: 'material',
      focusedType: 'material',
      component: PointHistory,
      svg: ClockIcon,
    },
  ];


  useEffect(() => {

    if (loginData === null) {
      getHomeData();
    }
  }, [loginData]);

  const shadowStyle = {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  };

  const getHomeData = async () => {
    try {
      const LoginData = await AsyncStorage.getItem('userData');

      let UserData = JSON.parse(LoginData);
      setLoginData(UserData);
    } catch { }
  };
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '70%'], []);
  const handlePresentModalPress = () => {
    bottomSheetModalRef.current.present();
  };

  return (
    <SafeAreaView style={[GlobelStyle.container]}>
      <BottomSheetModalProvider>

        {/* <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: activeTheme.themeColor,
            tabBarInactiveTintColor: activeTheme.Dark,
            tabBarStyle: [
              {
                borderRadius: 0,
                backgroundColor: '#fff',
                elevation: 10, // Android shadow
                shadowColor: '#000',       // iOS shadow
                shadowOffset: { width: 0, height: -4 },
                shadowOpacity: 0.1,
                shadowRadius: 6,

              }
            ],
            tabBarLabelStyle: {
              fontWeight: '700'
            },
          }}
          tabBarBadge={true}
          shifting={false}
          // initialRouteName={}
          tabBarLabel={false}
          tabBar={(props) => <TabBarLayout {...props}/>}


          > */}

        <Tab.Navigator
          tabBar={(props) => <TabBarLayout {...props} />}
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: activeTheme.themeColor,
            tabBarInactiveTintColor: activeTheme.Dark,
          }}
        >
          {
            loginData?.loggedInUserType == 'Employee' && screensSFA.map(row => {
              if (row.name != 'More') {
                return (
                  <Tab.Screen
                    name={row.name}
                    key={row.name}
                    tabBarIcon
                    tabBarLabel
                    component={row.component}
                    options={{
                      tabBarIcon: ({ focused }) => (
                        <Icon
                          name={focused ? row.focusedIcon : row.icon}
                          type={focused ? row.focusedType : row.type}
                          color={focused ? '#FFAE31' : activeTheme.LightGrey}
                          size={focused ? 30 : 25}
                        />
                      ),
                    }}
                  />
                );
              } else {
                return (
                  <Tab.Screen
                    name={row.name}
                    key={row.name}
                    tabBarIcon
                    tabBarLabel
                    component={row.component}
                    listeners={() => ({
                      tabPress: e => {
                        e.preventDefault(); // Prevents navigation
                        // handlePresentModalPress();
                      },
                    })}
                    options={{
                      tabBarIcon: ({ focused }) => (
                        <Icon
                          name={focused ? row.focusedIcon : row.icon}
                          type={focused ? row.focusedType : row.type}
                          color={focused ? '#FFAE31' : activeTheme.LightGrey}
                          size={focused ? 25 : 20}
                          onPress={() => {
                            handlePresentModalPress();
                          }}
                        />
                      ),
                      // tabBarButton: (props) => (
                      //   <CustomButton {...props} />
                      // )
                    }}
                  />
                );
              }
            })
          }

          {
            screensLoyalty.map(row => {
              if (row.name != 'Scan and Win') {
                return (
                  <Tab.Screen
                    name={t(row.name)}
                    key={row.name}
                    TabBarLayout={TabBarLayout}
                    component={row.component}
                    options={{
                      tabBarLabelStyle: [s.button],
                      tabBarIcon: (isFocused) => {
                        return (
                          <View>
                            <DynamicSvg width={26} height={26} fill={isFocused ? '#003EEE' : '#888'} stroke={isFocused ? '#003EEE' : '#888'} iconName={row?.svg} />
                          </View>
                        );
                      },

                    }}
                  />
                );
              } else {
                return (
                  <Tab.Screen
                    name={t(row.name)}
                    key={row.name}
                    tabBarIcon
                    tabBarLabel
                    component={row.component}
                    options={{
                      tabBarLabelStyle: [s.button],
                    }
                    }
                  />
                );
              }
            })
          }


        </Tab.Navigator>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={s.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}
