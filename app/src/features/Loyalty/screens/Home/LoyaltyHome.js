import Toast from 'react-native-toast-message';
import { RefreshControl, Touchable } from 'react-native';
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  Pressable,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Linking,
  Animated,
} from 'react-native';
import {
  AnimatedFAB,
  Badge,
  Modal,
} from 'react-native-paper';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import * as Animatable from 'react-native-animatable';

import * as Yup from 'yup';
import { ScrollView } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { Images } from '../../../../core/assets';
import { DynamicIcon } from '../../../../core/assets/icons';
import Support from '../../../../core/assets/icons/support.svg';
import Success from '../../../../core/assets/icons/Success.svg';
import Fire from '../../../../core/assets/icons/fire.svg';
import TopRight from '../../../../core/assets/icons/topRight.svg';
import { useGetUserData, useStreakProgress } from '../../../../api/hooks/useUsers';
import HighlightCarousel from '../Carousel/HighlightCarousel';
import BannerCarousel from '../Carousel/BannerCarousel';
import { EnterCouponCode } from '../ScanQrCode/EnterCouponCode';
import { requestNotificationPermission } from '../../../../services/PermissionService';
import { ThemeContext } from '../../../../context/ThemeContext';
import useTheme from '../../../../core/components/Theme/useTheme';
import { useTranslation } from 'react-i18next';
import { PointBalance } from '../SpinAndWheel';
import { UserProfileImage } from '../../../../core/screens/MyProfile/UserProfile';
import LinearGradient from 'react-native-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../../../auth/AuthContext';
import { FooterBar, StatusBarHeader } from '../../../../core/components/StatusBar/StatusBar';
import CompetitiveBanner from '../../../../core/components/LeaderBoardBanner';
import BumpSquare, { DynamicSvg, LedgerIcon, redeemIcon, ScanIcon, walletIcon } from '../../../../core/assets/SVGs/svg';
import { BellIcon } from '../../../../core/assets/SVGs/svg';
import FastImage from 'react-native-fast-image';
import { useBannerList, useContactUs, useTopFiveGifts } from '../../../../api/hooks/useMasters';
import RedeemGifts from '../HighlightRedeemGifts';
import ThemedText from '../../../../core/components/ThemedText';
import { ImageModal } from '../../../../core/components/ConfirmationModal/ConfirmationModal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppLoader2 } from '../../../../core/components/Loader/AppLoader';



const BANNER_HEIGHT = 180; // initial height of banner

const Header = ({ navigation, userInfoData, activeTheme, styles }) => {
  const { setActiveStatusConfig, theme } = useContext(AuthContext);
  useFocusEffect(
    React.useCallback(() => {
      setActiveStatusConfig({ height: 0 });

      // return () => {
      //   setActiveStatusConfig({ backgroundColor: activeTheme.PrimaryBg });
      // };
    }, [theme])
  );

  const insets = useSafeAreaInsets();


  const GlobelStyle = useGlobelStyle();
  return (

    <View style={{ width: '100%' }} >
      <StatusBarHeader height={StatusBar.currentHeight || insets.top} />
      <View style={styles.attendanceDetailsHeader}>
        <View style={[GlobelStyle.flexDirectionRow, { alignItems: 'center', gap: 10 }]}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
              <UserProfileImage style={{ width: 40, height: 40, borderRadius: 40 }} user={userInfoData} enablePreview={false} />
              <View>
                <Text style={{ fontSize: 12, color: '#fff', fontWeight: 'bold' }}>{userInfoData?.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 10, color: (userInfoData?.status_of_profile?.toLowerCase()) == 'approved' ? 'rgba(6, 112, 6, 1)' : 'rgba(240, 31, 31, 1)', paddingHorizontal: 3, borderRadius: 8, backgroundColor: (userInfoData?.status_of_profile?.toLowerCase()) == 'approved' ? 'rgba(185, 246, 185, 1)' : 'rgba(243, 212, 212, 1)' }}>
                    {/* KYC {userInfoData?.kyc_status} */}
                    {userInfoData?.status_of_profile}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[GlobelStyle.flexDirectionRow, { alignItems: 'center', gap: 10 }]}>
          {/* <TouchableOpacity onPress={() => navigation.navigate("Support")}>
            <Support width={24} height={20} fill={"#fff"} />
          </TouchableOpacity> */}

          {/* <TouchableOpacity onPress={() => navigation.navigate("notifications")}>
            <BellIcon isNewNotification={true} width={24} height={20} fill={"#fff"} />
          </TouchableOpacity> */}
          <PointBalance navigation={navigation} />
        </View>
      </View>

    </View>
  );
};


const NavigationButtons = ({ navigation, styles, activeTheme, setRedeemModal }) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.sectionWrapper, styles.navigationWrapper]}>
      <Text style={styles.sectionHeader}>Reward Points</Text>
      <View style={[styles.gap10, styles.flex, styles.justifyBetwen]}>
        <View style={{
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 10,
          flex: 1,
        }}>
          <Text style={{
            fontWeight: 'bold',
            color: '#000',
            fontSize: 10,
          }}>{t('Convert points into rewards')}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { navigation.navigate('LoyaltyGiftGallery'); }} style={[styles.requestBtn, styles.flex, styles.activeBtn]}>
              <Text style={[styles.requestBtnText]} allowFontScaling={false}>{t('RedeemPoints')}</Text>
              <TopRight width={14} height={14} fill="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{
          backgroundColor: '#fff',
          padding: 10,
          borderRadius: 10,
          flex: 1,
        }}>
          <Text style={{
            fontWeight: 'bold',
            color: '#000',
            fontSize: 10,
          }}>{t('Track your reward request')}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { navigation.navigate('TrackRequest'); }} style={[styles.requestBtn, styles.flex, styles.activeBtn]}>
              <Text style={[styles.requestBtnText]} allowFontScaling={false}>{t('TrackRequest')}</Text>
              <TopRight width={14} height={14} fill="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const HighLightedFeatures = ({ styles, navigation }) => {
  const { t } = useTranslation();
  const tiles = [
    {
      'svg': ScanIcon,
      'title': t('Scan and Win'),
      'navigateTo': 'ScanQrCode',
    },
    {
      'svg': redeemIcon,
      'title': t('Coin History'),
      'navigateTo': 'PointHistory',
    },
    {
      'svg': LedgerIcon,
      'title': t('Send Request'),
      'navigateTo': 'LoyaltyGiftGallery',
    },
    {
      'svg': walletIcon,
      'title': t('Track Request'),
      'navigateTo': 'TrackRequest',
    },
  ];
  return (
    <>
      <View style={[styles.highlightedSectionWrapper]}>
        <View style={styles.highlightedFeaturesWrapper}>
          {
            tiles?.map((element, i) => {
              return <TouchableOpacity key={i} onPress={() => navigation.navigate(element?.navigateTo, element?.options)}>
                <View style={styles.action}>
                  <View style={styles.highlightedTile}>
                    {/* <DynamicIcon width={22} height={22} iconName={element?.icon || 'document'} /> */}
                    <DynamicSvg width={26} height={26} fill={'#dbe0f0ff'} stroke={'#003EEE'} iconName={element?.svg} />
                  </View>
                  <Text numberOfLines={2} style={styles.highlightedTitleText}>{element?.title}</Text>
                </View>
              </TouchableOpacity>;
            })
          }
        </View>
      </View>
    </>
  );
};

export const Features = ({ navigation }) => {
  const TILE_SIZE = Dimensions.get('window').width / 4;
  const activeTheme = useTheme();
  const styles = StyleSheet.create({
    sectionWrapper: {
      backgroundColor: activeTheme.section,
      borderRadius: 8,
      padding: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#D7D2DB',
    },
    featuresWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 15,
      marginTop: 15,
      // justifyContent: 'space-between',
    },
    action: {
      alignItems: 'center',
      width: TILE_SIZE - 30,
    },
    tile: {
      backgroundColor: '#F9EFFF',
      borderRadius: 40,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleText: {
      textAlign: 'center',
      color: '#777',
      fontWeight: 'bold',
      fontSize: 12,
      marginTop: 5,
    },
  });

  const { t } = useTranslation();
  const tiles = [
    {
      'icon': 'product',
      'title': t('Products'),
      'navigateTo': 'Category',
      'options': { 'id': 1 },
    },
    {
      'icon': 'videos',
      'title': t('Videos'),
      'navigateTo': 'LoyaltyVideos',
    },
    {
      'icon': 'about',
      'title': t('AboutUs'),
      'navigateTo': 'AboutUs',
    },
    {
      'icon': 'contact',
      'title': t('Contact'),
      'navigateTo': 'ContactUs',
    },
    {
      'icon': 'document',
      'title': t('Catalogue'),
      'navigateTo': 'Catalogue',
    },
    {
      'icon': 'faq',
      'title': t('FAQ'),
      'navigateTo': 'FAQ',
    },
    {
      'icon': 'badge',
      'title': t('Badge'),
      'navigateTo': 'Badges',
    },
    // {
    //   "icon": "postEarn",
    //   "title": t('Post & Earn'),
    //   "navigateTo": "Feed"
    // },
    {
      'icon': 'support',
      'title': t('Support'),
      'navigateTo': 'Support',
    },
    {
      'icon': 'query',
      'title': t('Tickets'),
      'navigateTo': 'TicketList',
    },
  ];
  return (
    <>
      <View style={styles.sectionWrapper}>
        <View style={styles.featuresWrapper}>
          {
            tiles?.map((element, i) => {
              return <TouchableOpacity key={i} onPress={() => navigation.navigate(element?.navigateTo, element?.options)}>
                <View style={styles.action}>
                  <View style={styles.tile}>
                    <DynamicIcon width={22} height={22} iconName={element?.icon || 'document'} />
                  </View>
                  <Text numberOfLines={2} style={styles.titleText}>{element?.title}</Text>
                </View>
              </TouchableOpacity>;
            })
          }
        </View>
      </View>
    </>
  );
};

const SocialSection = ({ styles, navigation }) => {
  const { t } = useTranslation();

  const { isLoading, refetch, data: contactUs, isFetching } = useContactUs({ filter: {} });

  const tiles = [
    {
      'title': t('Instagram'),
      'navigateTo': contactUs?.data?.contact_detail?.instagram_url,
      'options': { 'id': 1 },
      'iconName': 'instagramSquare',
    },
    {
      'title': t('Youtube'),
      'navigateTo': contactUs?.data?.contact_detail?.youtube_url,
      'iconName': 'youtubeSquare',
    },
    {
      'title': 'Facebook',
      'navigateTo': contactUs?.data?.contact_detail?.facebook_url,
      'iconName': 'facebookSquare',
    },
    // {
    //   "title": t("Linkedin"),
    //   "navigateTo": "https://www.linkedin.com/company/basiq360/posts/?feedView=all",
    //   "iconName": "linkedin"
    // },
    // {
    //   "title": t("Twitter"),
    //   "navigateTo": "https://x.com/basiq360",
    //   "iconName": "twitterSquare"
    // }
  ];

  const openLink = async (url) => {
    // Check if the link can be opened
    try {
      await Linking.openURL(url); // always works for https://
    } catch (err) {
      console.error('Failed to open URL:', err);
    }
  };

  return (
    <>
      <View horizontal style={[{ paddingBottom: 10, marginVertical: 10 }]}>
        <View style={{ flex: 1, flexDirection: 'row', gap: 5, justifyContent: 'space-between' }}>
          {
            tiles?.map((element, i) => {
              return <TouchableOpacity key={i} style={{ flex: 1, paddingRight: 5, overflow: 'hidden', backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#ccc', borderRadius: 5 }} onPress={() => openLink(element?.navigateTo)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                  <FastImage
                    style={[{ width: 20, height: 20 }]}
                    source={Images[element?.iconName]}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text numberOfLines={2} style={{ fontWeight: 'bold', color: '#000', fontSize: 12, textAlign: 'center' }}>{element?.title}</Text>
                </View>
              </TouchableOpacity>;
            })
          }
        </View>
      </View>
    </>
  );
};

const HighlightBanner = ({ navigation, styles }) => {
  return <HighlightCarousel navigation={navigation} showIndicator={true} autoPlay={true} />;
};

const BannerSection = ({ navigation, styles }) => {
  const { data: bannerData, isLoading, isError } = useBannerList();

  if (isLoading) {
    return <View style={{ height: 180, justifyContent: 'center' }}><AppLoader2 loading={true} /></View>;
  }

  if (isError || !bannerData?.data?.result) {
    return null;
  }

  const activeBanners = bannerData.data.result.filter(banner => banner.del === false);

  if (activeBanners.length === 0) {
    return null;
  }

  return <BannerCarousel data={activeBanners} autoPlay={true} />;
};

export const handleShare = async () => {
  try {
    const message = 'Check out this awesome app: https://play.google.com/store/apps/details?id=com.basiq360.starkpaints';

    await Share.share({
      message: message,
    }, {
      dialogTitle: 'Share this application with:',
      subject: 'Refer and Earn',
    });
  } catch (error) {
    console.error('Error sharing product details:', error);
  }
};

const ReferSection = ({ navigation, styles }) => {
  return (
    <TouchableOpacity onPress={handleShare} style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 70 }}>
      <ImageBackground
        source={Images.shareAndRefer}
        style={{ height: 210, width: '100%', backgroundColor: '#fff', borderRadius: 20 }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const StreakSection = ({ userInfoData, streakDetails, navigation, styles }) => {
  const streakWeak = [{ day: '1st\n', title: 'Day', isChecked: true }, { day: '2nd\n', title: 'Day', isChecked: true }, { day: '3rd\n', title: 'Day', isChecked: true }, { day: '4th\n', title: 'Day', isChecked: false }, { day: '5th\n', title: 'Day', isChecked: false }, { day: '6th\n', title: 'Day', isChecked: false }, { day: '7th\n', title: 'Day', isChecked: false }];
  const { t } = useTranslation();
  return <View style={{ flexDirection: 'row' }}>
    {/* <ImageBackground
      source={Images.dottedBg}
      style={[styles.sectionWrapper, { width: '100%', backgroundColor: '#fff' }]}
      resizeMode="cover" // or "contain", "stretch", "repeat", "center"
    > */}
    {/* <View style={[styles.sectionWrapper, { width: '100%', backgroundColor: '#fff' }]}> */}
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['#FFFFFF', '#fff']}
      style={[styles.sectionWrapper, { width: '100%', backgroundColor: '#fff' }]}
    // style={{
    //   borderRadius: 30,
    //   height: 30,
    //   width: 30,
    //   padding: 5,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   borderWidth: 1,
    //   borderColor: '#E5D7FF'
    // }}
    >
      <ImageBackground
        source={Images.dottedBg}
        style={[{ width: '100%', backgroundColor: 'transparent' }]}
        resizeMode="cover" // or "contain", "stretch", "repeat", "center"
      >
        <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row', marginBottom: 10 }}>
          <View style={{ flex: 1 }}>
            <Text style={{
              color: '#333333',
              fontSize: 16,
              fontWeight: 'bold',
            }} >{t('Streak Challenge')}</Text>
            <Text style={{
              color: '#000',
              fontSize: 10,
              marginTop: 5,
            }}>{t('You doing really great')}, {userInfoData?.name}!</Text>
          </View>

          <View style={{ alignItems: 'center', gap: 5, flexDirection: 'row' }}>
            <Fire height="35" width="35" />
            <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#000' }}>{streakDetails?.data?.streak_count}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#000' }}>{'Day\nStreak'}</Text>
          </View>
        </View>
        <View style={{ borderTopWidth: 0.7, borderColor: '#e6dff6ff', paddingTop: 10, flexDirection: 'row', justifyContent: 'space-around' }}>
          {streakWeak?.map((row, index) => <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {(index < streakDetails?.data?.streak_count) ?
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#3600C0', '#CE90FF']}
                style={{
                  borderRadius: 30,
                  height: 30,
                  width: 30,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E5D7FF',
                }}>
                <Success width={18} height={18} fill={'#fff'} />
              </LinearGradient> :
              <View
                style={{
                  borderRadius: 30,
                  height: 30,
                  width: 30,
                  padding: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E5D7FF',
                }} >
                {(index == streakDetails?.data?.streak_count) && <Animatable.View
                  animation={{
                    0: { scale: 0, opacity: 0.5 },
                    1: { scale: 0.8, opacity: 0 }, // expands and fades out
                  }}
                  iterationCount="infinite"
                  duration={2000}
                  easing="ease-out"
                  style={{
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    top: '-85%',
                    borderRadius: 40,
                    backgroundColor: '#3600C0',
                  }}
                />}
              </View>

            }
            <Text style={{
              color: (index < streakDetails?.data?.streak_count) ? '#3600C0' : '#333333',
              fontSize: 12,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>{row?.day}
              <Text style={{ color: (index < streakDetails?.data?.streak_count) ? '#3600C0' : '#999', fontSize: 10 }}>
                {row?.title}
              </Text></Text>

          </View>)}
        </View>
      </ImageBackground>
    </LinearGradient>
    {/* </View> */}
    {/* </ImageBackground> */}

  </View>;
};

const LoyaltyHome = (props) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { navigation } = props;
  const { theme } = useContext(ThemeContext);
  const [visible, setvisible] = useState(false);
  const activeTheme = useTheme();
  const GlobelStyle = useGlobelStyle();
  const [query, refetch] = useGetUserData();
  const { data: userInfoData, isPending, refetch: userRefetch } = query;
  const { data: streakDetails, refetch: refetchStreakDetails } = useStreakProgress();
  const { loginData, setLoginData } = useContext(AuthContext);

  const imageviewHandler = (imageurl) => {
    setvisible(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      refetchStreakDetails();
      userRefetch();
    }, [])
  );

  const bottomSheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const scrollOffset = useRef(0);
  const scrollTimeout = useRef(null);

  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const inputRef = useRef(null);

  // const activeTheme = useActiveTheme()
  const [redemptionType, setRedemptionType] = useState('giftRedemption');
  const TILE_SIZE = Dimensions.get('window').width / 4;
  const [redeemModal, setRedeemModal] = useState(false);
  const validationSchema = Yup.object().shape({
    redemptionType: Yup.string(),
    pointRequest: Yup.string(),
    remark: Yup.string(),
  });

  const openBottomSheet = () => bottomSheetRef.current?.present();
  const closeBottomSheet = () => bottomSheetRef.current.dismiss();

  const enableNotification = async () => {
    const granted = await requestNotificationPermission();
  };


  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await userRefetch();
      await refetch(); // refresh user data
      await refetchStreakDetails(); // refresh streak data
      queryClient.invalidateQueries(['earnPoint']);

    } catch (err) {
      console.error('Refresh error:', err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    enableNotification();

  }, []);

  const styles = StyleSheet.create({
    banner: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    },
    // sectionWrapper: {
    //   backgroundColor: '#fff',
    //   borderRadius: 8,
    //   padding: 16
    // },
    sectionHeader: {
      color: '#333333',
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    imageTile: {
      borderWidth: 2,
    },
    // NEW



    accountContainer: {
      marginHorizontal: 16,
      alignItems: 'center',
    },
    mainContainer: {
      width: '100%',
      justifyContent: 'space-around',
      flexDirection: 'row',
    },

    TimeContainer: {
      padding: 4,
      borderRadius: 4,
      alignItems: 'center',
      // backgroundColor: AppTheme.LightSkyBlue,
    },
    AttendanceButton: {
      padding: 4,
      marginTop: 12,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      margin: 'auto',
      flexDirection: 'row',
    },
    TextInput: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 16,
      paddingHorizontal: 15,
      fontSize: 14,
      shadowColor: '#000',
    },
    ModalBackGround: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    Modal: {
      width: '100%',
      height: '100%',
      backgroundColor: activeTheme.Light,
      borderRadius: 10,
      padding: 16,
      alignItems: 'center',
    },

    AttendanceGroupButton: {
      padding: 4,
      borderRadius: 50,
      marginTop: 16,
    },
    Container: {
      paddingHorizontal: 20,
      backgroundColor: activeTheme.themeColor,
      paddingBottom: 20,
      // minHeight:300,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
    },

    logoWrapper: {
      backgroundColor: '#fff',
      borderRadius: 4,
      paddingHorizontal: 10,
    },
    attendanceDetailsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 5,
      alignItems: 'center',
    },
    attendanceDetailsBody: {
      flex: 1,
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    userIcon: { backgroundColor: 'white', borderRadius: 50 },
    userProfile: { borderRadius: 5 },
    baseWhiteText: { color: 'white', fontSize: 14 },
    baseBoldWhiteText: { color: 'white', fontWeight: '700', fontSize: 16 },
    attendanceDetailsFooter: {
      borderTopWidth: 1,
      borderTopColor: '#0b57b8',
      paddingVertical: 10,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    totalWorkingText: { color: 'white', fontWeight: '700', fontSize: 24 },
    attendanceBtn: { width: '100%', flex: 1, alignItems: 'center' },
    logo: { height: 70, width: 100 },
    viewBox: { width: '100%', height: '100%', gap: 10 },
    profileImageBox: {
      justifyContent: 'center',
      marginHorizontal: 'auto',
      alignItems: 'center',
      borderWidth: 2,
      borderStyle: 'dotted',
      borderColor: 'black',
      borderRadius: 110,
      height: 210,
      width: 210,
    },
    retakeButton: { top: 15, position: 'absolute', right: 15 },
    retakeButtonContent: {
      fontSize: 22,
      color: 'white',
      backgroundColor: activeTheme.themeColor,
      padding: 4,
      borderRadius: 50,
    },
    attDetails: {
      flex: 1,
      backgroundColor: '#eee',
      borderRadius: 20,
      padding: 5,
    },
    meterReadingHeader: { fontWeight: 'bold', marginBottom: 4 },
    meterReadingImage: { width: 250, height: 250, borderRadius: 10 },
    readingRetakeButton: { top: 0, position: 'absolute', right: 0 },
    readingRetakeButtonContent: {
      fontSize: 22,
      color: 'white',
      backgroundColor: activeTheme.themeColor,
      padding: 1,
      borderBottomRightRadius: 8,
    },
    footerButtons: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    HighlightButton: {
      borderRadius: 8,
      paddingTop: 5,
      width: '100%',
      backgroundColor: activeTheme.Primary,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    textWrapper: {
      padding: 10,
      paddingLeft: 20,
    },
    HighlightButtonText: {
      color: '#fff',
      fontWeight: '400',
      fontSize: 16,
    },
    pageWrapper: {
      padding: 20,
      paddingTop: 0,
      backgroundColor: activeTheme.Light,
      position: 'relative',
      zIndex: 3,
    },
    inputWrapper: {
      marginTop: 10,
    },
    inputSection: {
      marginBottom: 10,
    },
    inputBlock: {
      borderColor: '#D3D3D3',
      borderWidth: 1,
      backgroundColor: '#fff',
      borderRadius: 6,
      height: 50,
    },
    errorText: {
      color: '#EB3B3B',
      fontSize: 12,
    },
    primaryBg: {
      backgroundColor: activeTheme.Primary,
    },
    innerView: {
      flex: 1,
      padding: 10,
    },
    sectionWrapper: {
      backgroundColor: activeTheme.section,
      borderRadius: 8,
      padding: 16,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#D7D2DB',
    },
    sectionHeaderText: {
      fontSize: 22,
      color: '#000',
      marginBottom: 10,
    },
    featuresWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 15,
      marginTop: 15,
    },
    highlightedSectionWrapper: {
      backgroundColor: activeTheme.section,
      borderRadius: 8,
      // paddingVertical: 10,
      paddingHorizontal: 0,
      marginBottom: 10,
    },
    highlightedFeaturesWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      gap: 15,
      marginTop: 15,
    },
    navigationWrapper: {
      padding: 10,
      backgroundColor: '#F9EFFF',
    },
    imageTile: {
      height: 40,
      width: 40,
      borderRadius: 40,
      overflow: 'hidden',
    },
    flex: {
      gap: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    justifyBetwen: {
      justifyContent: 'space-between',
    },
    justifyEnd: {
      justifyContent: 'flex-end',
    },
    alignCenter: {
      alignItems: 'center',
    },
    flex1: {
      flex: 1,
    },
    flexEnd: {
      alignItems: 'flex-end',
    },
    main: {
      marginTop: 20,
    },
    button: {
      paddingHorizontal: 24,
      paddingVertical: 16,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#CCCCCC',
    },
    filledBtn: {
      backgroundColor: '#FFA000',
      borderColor: '#FFA000',
    },
    profileBtn: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#fff',
      borderRadius: 6,
      justifyContent: 'center',
    },

    profileBtnText: {
      color: '#004CAC',
      fontWeight: 'bold',
    },
    whiteText: {
      color: '#fff',
    },
    subText: {
      color: '#BFCBFA',
      fontSize: 18,
    },
    valueText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    largeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    MedText: {
      fontSize: 16,
      color: '#000',
    },
    progressWrapper: {
      width: '100%',
      height: 6,
      borderRadius: 10,
      marginTop: 10,
      marginBottom: 15,
      backgroundColor: '#9BC0EE',
    },
    progress: {
      height: 6,
      borderRadius: 10,
      width: '60%',
      backgroundColor: '#FFA000',
      position: 'relative',
    },
    progressEdge: {
      left: '95%',
      top: '-50%',
      height: 14,
      width: 14,
      borderRadius: 14,
      backgroundColor: '#FFA000',
    },
    requestBtn: {
      justifyContent: 'space-around',
      borderRadius: 8,
      padding: 6,
      marginTop: 10,
    },
    AnimatedFav: {
      bottom: 16,
      right: 120,
      position: 'absolute',
      backgroundColor: activeTheme.themeColor,
      borderRadius: 12,
      color: activeTheme.TextColor,
    },
    requestBtnText: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 12,
      color: '#fff',
    },
    activeBtn: {
      backgroundColor: '#003EEE',
    },
    outlinedBtn: {
      borderWidth: 2,
      borderColor: '#E2E8F0',
    },
    highlightedTile: {
      backgroundColor: '#003EEE',
      borderRadius: 40,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tile: {
      backgroundColor: '#F9EFFF',
      borderRadius: 40,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activityBg: {
      backgroundColor: '#F3E8FF',
    },
    action: {
      alignItems: 'center',
      width: TILE_SIZE - 30,
    },
    titleText: {
      textAlign: 'center',
      color: '#777',
      fontWeight: 'bold',
      fontSize: 12,
    },
    highlightedTitleText: {
      textAlign: 'center',
      color: '#777',
      fontWeight: 'bold',
      fontSize: 10,
    },
    justifyAround: {
      justifyContent: 'space-around',
    },
    approvedText: {
      borderWidth: 1,
      borderColor: '#E2E8F0',
      borderRadius: 30,
      paddingHorizontal: 10,
      paddingVertical: 2,
      color: '#000',
    },
    linkText: {
      color: '#3663EC',
    },
    card: {
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      borderRadius: 6,
      padding: 15,
    },

    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    subHeaderText: {
      fontSize: 14,
    },
    boldSubHeader: {
      fontWeight: 'bold',
      color: '#2544B9',
    },
    optionalBox: {
      marginTop: 10,
    },
    option: {
      padding: 16,
      borderRadius: 6,
      marginVertical: 5,
      borderWidth: 1,
      borderColor: '#E2E8F0',
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },
    optionText: {
      fontSize: 16,
    },
    activeOptionText: {
      color: '#fff',
    },
    inactiveOptionText: {
      color: '#000',
    },
    activeOption: {
      backgroundColor: '#2544B9',
      borderColor: 'transparent',
    },

    activeIcon: {
      borderColor: '#fff',
    },
    inactiveIcon: {
      borderColor: '#000',
    },

    optionIcon: {
      borderWidth: 2,
      backgroundColor: '#fff',
      borderRadius: 50,
      height: 24,
      width: 24,
      padding: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    innerRing: {
      borderWidth: 3,
      borderColor: '#2544B9',
      width: 20,
      height: 20,
      borderRadius: 50,
    },

  });
  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const scrollingUp = currentOffset < scrollOffset.current;

    // Save current offset
    scrollOffset.current = currentOffset;

    // Set scroll direction
    setIsScrollingUp(scrollingUp);

    // Set scrolling to true
    setIsScrolling(true);

    // Clear previous timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // After 300ms of no scroll, assume stopped
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 300);
  };



  const scrollY = useRef(new Animated.Value(0)).current;

  // Interpolate banner height with scroll
  const bannerHeight = scrollY.interpolate({
    inputRange: [0, BANNER_HEIGHT], // scroll distance
    outputRange: [BANNER_HEIGHT, 30], // collapse to 0
    extrapolate: 'clamp',
  });

  return <>

    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['#3600C0', '#CE90FF']} style={{
        paddingHorizontal: 20,
        zIndex: 3,
        position: 'relative',
      }}>
      <Header activeTheme={activeTheme} navigation={navigation} userInfoData={userInfoData?.data?.result} styles={styles} />
    </LinearGradient>

    <Animated.View style={[styles.banner, { height: bannerHeight }]}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#3600C0', '#CE90FF']} style={{
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          paddingHorizontal: 20,
          paddingBottom: 10,
          height: '100%',
          width: '100%',
          justifyContent: 'flex-end',
        }}>
        <HighlightBanner height={120} navigation={navigation} styles={styles} />
      </LinearGradient>
    </Animated.View>

    <Animated.ScrollView
      contentContainerStyle={{ paddingTop: 120 }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false }
      )}
      scrollEventThrottle={16}
      style={styles.pageWrapper}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={activeTheme.Primary}
          colors={[activeTheme.Primary]}
          progressViewOffset={120} // Add this line - pushes spinner below banner
        />
      }
    >

      <HighLightedFeatures styles={styles} navigation={navigation} />
      {/* <Features styles={styles} navigation={navigation} /> */}
      <NavigationButtons activeTheme={activeTheme} navigation={navigation} setRedeemModal={setRedeemModal} styles={styles} />

      {/* <RedeemGifts dataList={TopFiveGifts?.data?.result} disableHeader={true} navigation={navigation} /> */}

      {(loginData?.status_of_profile?.toLowerCase() == 'approved') && <HighlightedGifts setvisible={imageviewHandler} loginData={loginData} navigation={navigation} styles={styles} />}

      {/* <StreakSection streakDetails={streakDetails} userInfoData={userInfoData?.data?.result} navigation={navigation} styles={styles} /> */}
      <SocialSection styles={styles} navigation={navigation} />
      {/* <CompetitiveBanner navigation={navigation} /> */}
      <BannerSection navigation={navigation} styles={styles} />

      <View style={{ marginVertical: 80 }} />
      {/* <HighlightBanner navigation={navigation} styles={styles} /> */}
      <FooterBar />
      {/* <ReferSection navigation={navigation} styles={styles} /> */}
    </Animated.ScrollView>

    <BottomSheetModalProvider>
      <BottomSheetModal
        index={0}
        ref={bottomSheetRef}
        snapPoints={['25%']}
        enablePanDown={true}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            pressBehavior="none" // disables tap to close
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
        <EnterCouponCode
          setModalVisible={setModalVisible}
          inputRef={inputRef}
          userType={''}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
    {/* user?.profile_img ||  */}

  </>;
};
export default LoyaltyHome;

const HighlightedGifts = ({ setvisible, loginData, navigation }) => {
  const { data: TopFiveGifts, refetch: refetchTopFiveGifts } = useTopFiveGifts();
  const styles = StyleSheet.create({
    horizontalContainer: {
      paddingHorizontal: 5,
      gap: 10,
    },
    sectionContainer: {
      marginVertical: 10,
    },
    sectionHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: '#000',
      backgroundColor: '#F3F3FF',
      padding: 5,
      borderRadius: 10,

    },
    highlightBox: {
      backgroundColor: '#EBE9FF',
      padding: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#C9C5FF',
    },
  });

  return <View style={styles.sectionContainer}>
    <View style={styles.highlightBox}>
      {/* <Text style={styles.sectionHeader}>Top 5 Gifts</Text> */}
      <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalContainer}>
        {TopFiveGifts?.data?.result?.map((item, index) => (
          <Card setvisible={setvisible} navigation={navigation} balance={loginData?.current_wallet_balnc} key={index} item={item} count={index + 1} />
        ))}
      </ScrollView>
    </View>
  </View>;
};

const Card = ({ count, balance, openBottomSheet = () => { }, item, index, navigation }) => {
  const [visible, setvisible] = useState(false);
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
  // onPress={() => { (balance >= (item?.gift_point || item?.point_range_value)) ? openBottomSheet(item) : eligiblityHandler() }}
  return (
    <View key={'key' + index} style={[{ padding: 5, width: 200, gap: 10, borderWidth: 0.2, borderColor: '#aaa', backgroundColor: activeTheme.section, borderRadius: 3 }]}>
      {/* <FastImage
          style={[{ width: 120, height: 120, borderWidth: 0.5, borderRadius: 10 }]}
          resizeMode={FastImage.resizeMode.contain}
          source={{ uri: item?.gift_img }}
        // source={Images[item?.gift_type?.toLowerCase()]}
        /> */}

      <TouchableOpacity style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }} onPress={() => setvisible(true)}>
        <ImageBackground
          source={{ uri: item?.gift_img }}
          style={{ height: 100, width: '100%' }}
          resizeMode="contain" // or "contain", "stretch", "repeat", "center"
        />
      </TouchableOpacity>


      <View style={{
        backgroundColor: '#F3F3FF',
        padding: 10,
        justifyContent: 'space-between',
        flex: 1,
      }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <ThemedText style={{ fontSize: 22, fontWeight: 'bold', color: '#6a3dddff' }}>#{count}</ThemedText>
            </View>

            <View>
              <ThemedText numberOfLines={2} style={{ fontSize: 12, fontWeight: 'bold', color: '#6a3dddff' }}>{item?.title}</ThemedText>
            </View>
          </View>


        </View>
        <View style={{
          borderWidth: 0.5,
          backgroundColor: (balance < (item?.gift_point || item?.point_range_value)) ? '#ccc' : ' "#6a3dddff"',

          borderRadius: 5,
          paddingHorizontal: 5,
          paddingVertical: 4,
          alignItems: 'center', justifyContent: 'center',
          flexDirection: 'row',
        }}>

          <TouchableOpacity onPress={() => {
            (balance < (item?.gift_point || item?.point_range_value)) ?
              Toast.show({ type: 'error', text1: 'You are not eligible for this gift', text2: 'kindly earn more points to avail this gift', visibilityTime: 2000 }) :
              navigation.navigate('LoyaltyGiftGallery', { from: 'top_five_gifts', item: item });
          }} >
            <Text style={{ textAlign: 'center', color: '#000', fontWeight: 'bold' }}>Claim</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ImageModal modalVisible={visible} setModalVisible={setvisible} url={item?.gift_img || Images.default} />
    </View>
  );
};
