import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState, useCallback, useRef, useContext } from 'react';
import AppLoader, { AppLoader2 } from '../../../../core/components/Loader/AppLoader';
import AppTheme from '../../../../core/components/Theme/AppTheme';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import * as Animatable from 'react-native-animatable';
import WebView from 'react-native-webview';
import { View, StyleSheet, Linking, Text, TouchableOpacity, ScrollView, Animated, useWindowDimensions, RefreshControl, FlatList, Platform, StatusBar, ImageBackground } from 'react-native';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import { Images } from '../../../../core/assets';
import CallSupport from '../../../../core/assets/icons/CallSupport.svg';
import Instagram from '../../../../core/assets/icons/Instagram.svg';
import Glob from '../../../../core/assets/icons/Glob.svg';
import Message from '../../../../core/assets/icons/Message.svg';
import { useContactUs } from '../../../../api/hooks/useMasters';
import { AuthContext } from '../../../../auth/AuthContext';
import MapView, { Marker } from 'react-native-maps';
import useTheme from '../../../../core/components/Theme/useTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StatusBarHeader } from '../../../../core/components/StatusBar/StatusBar';
import LinearGradient from 'react-native-linear-gradient';
import { HelpIcon, LeftArrowIcon } from '../../../../core/assets/SVGs/svg';
// about US
export const AboutUs = ({ navigation }) => {
  const activeTheme = useTheme();
  const { isLoading, refetch, data: aboutUs, isFetching } = useContactUs({ filter: {} });
  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [200, 50],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: activeTheme.background || '#F8FAFC',
    },
    headerContainer: {
      position: 'relative',
      overflow: 'hidden',
      marginBottom: 12,
      marginTop: 12,
    },
    headerGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
    },
    headerImage: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingBottom: 40,
    },
    headerContent: {
      zIndex: 2,
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    companyName: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
      marginBottom: 8,
    },
    tagline: {
      fontSize: 16,
      color: '#E2E8F0',
      textAlign: 'center',
      fontWeight: '500',
    },
    contentContainer: {
      backgroundColor: activeTheme.whiteBg || '#FFFFFF',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 20,
      flex: 1,
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
    },
    scrollContent: {
      paddingHorizontal: 24,
      paddingBottom: 40,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    sectionIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: activeTheme.primary || '#643bf6ff',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: activeTheme.text || '#1E293B',
      flex: 1,
    },
    descriptionCard: {
      backgroundColor: activeTheme.cardBg || '#F8FAFC',
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      borderLeft: 4,
      borderLeftColor: activeTheme.primary || '#3B82F6',
    },
    description: {
      fontSize: 16,
      lineHeight: 26,
      color: activeTheme.fadedText || '#64748B',
      textAlign: 'justify',
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
    },
    statCard: {
      flex: 1,
      backgroundColor: activeTheme.lightPrimaryBg || '#EFF6FF',
      borderRadius: 16,
      padding: 16,
      marginHorizontal: 6,
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    statNumber: {
      fontSize: 24,
      fontWeight: 'bold',
      color: activeTheme.primary || '#3B82F6',
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: activeTheme.fadedText || '#64748B',
      textAlign: 'center',
      fontWeight: '500',
    },
    featuresContainer: {
      marginTop: 20,
    },
    featureItem: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: activeTheme.whiteBg || '#FFFFFF',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      elevation: 1,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    featureIcon: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: activeTheme.lightPrimaryBg || '#EFF6FF',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
    },
    featureText: {
      fontSize: 15,
      color: activeTheme.text || '#1E293B',
      fontWeight: '500',
      flex: 1,
    },
    refreshButton: {
      position: 'absolute',
      top: StatusBar.currentHeight + 10,
      right: 20,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
  });

  const features = [
    { icon: 'verified', text: 'Trusted by thousands of customers' },
    { icon: 'support-agent', text: '24/7 Customer Support' },
    { icon: 'security', text: 'Secure & Reliable Platform' },
    { icon: 'trending-up', text: 'Continuous Innovation' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#CE90FF', '#3600C0']}
        style={{
          backgroundColor: '#3a459c',
          paddingHorizontal: 10,
          paddingBottom: 10,
          height: 100,
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
          }}>About Us</Text>
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
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <ImageBackground
          source={{ uri: aboutUs?.data?.contact_detail?.profile_img }}
          style={{ height: 140 }}
          // style={[styles.headerImage, StyleSheet.absoluteFillObject]}
          resizeMode="contain"
        />


      </Animated.View>

      <View style={styles.contentContainer}>
        <Animated.ScrollView
          style={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {/* <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Happy Customers</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5+</Text>
              <Text style={styles.statLabel}>Years Experience</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Support</Text>
            </View>
          </View> */}

          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Icon name="info" size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.sectionTitle}>About Us</Text>
          </View>

          <View style={styles.descriptionCard}>
            <Text style={styles.description}>
              {aboutUs?.data?.contact_detail?.about_us ||
                "We are a forward-thinking company committed to delivering exceptional experiences to our customers. With years of industry expertise and a passion for innovation, we've built a platform that combines reliability, security, and user-friendly design.\n\nOur mission is to create meaningful connections between businesses and their customers through cutting-edge technology and personalized service. Every day, we strive to exceed expectations and set new standards in our industry."
              }
            </Text>
          </View>

          {/* <View style={styles.featuresContainer}>
            {features.map((feature, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.featureItem,
                  {
                    opacity: scrollY.interpolate({
                      inputRange: [0, 100 + (index * 50)],
                      outputRange: [0, 1],
                      extrapolate: 'clamp',
                    }),
                  },
                ]}
              >
                <View style={styles.featureIcon}>
                  <Icon name={feature.icon} size={18} color={activeTheme.primary || '#3B82F6'} />
                </View>
                <Text style={styles.featureText}>{feature.text}</Text>
              </Animated.View>
            ))}
          </View> */}
        </Animated.ScrollView>
      </View>

    </View>
  );
};



const openInstagram = async (url) => {
  try {
    // Remove extra parameters and trailing slashes if any
    const cleanedUrl = url.split('?')[0].replace(/\/$/, '');

    // Extract username (last part of the URL)
    const username = cleanedUrl.split('/').pop();

    const appUrl = `instagram://user?username=${username}`;
    const webUrl = `https://instagram.com/${username}`;

    const supported = await Linking.canOpenURL(appUrl);

    if (supported) {
      await Linking.openURL(appUrl);
    } else {
      await Linking.openURL(webUrl);
    }

  } catch (err) {
    Alert.alert('Error', 'Unable to open Instagram');
  }
};

const openWebsite = async (url) => {
  await Linking.openURL(url);
};

export const ContactUs = ({ navigation }) => {
  const { loginData } = useContext(AuthContext);
  const activeTheme = useTheme();
  const { isLoading, refetch, data: contactUs, isFetching } = useContactUs({ userId: loginData?.id });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    socialIconTile: {
      backgroundColor: activeTheme.lightPrimaryBg,
      padding: 5,
      flex: 1,
      borderRadius: 10,
      borderColor: '#ccc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontWeight: 'bold',
      color: activeTheme.text,
      fontSize: 16,
      borderColor: '#ccc',
      borderTopWidth: 1,
      paddingTop: 10,
    },
    content: {
      fontSize: 16,
      color: activeTheme.text,
    },
  });

  const makePhoneCall = phoneNumber => {
    let phoneNumberToCall = '';
    if (Platform.OS === 'android') {
      phoneNumberToCall = `tel:${phoneNumber}`;
    } else {
      phoneNumberToCall = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(phoneNumberToCall).catch(error => { }
    );
  };

  const sendEmail = email => {
    const mailtoUrl = `mailto:${email}`;

    Linking.openURL(mailtoUrl).catch(error => { }
    );
  };

  const isFocused = useIsFocused();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [ContactInfo, setContactInfo] = useState([]);
  const GlobelStyle = useGlobelStyle();
  const bottomSheetRef = useRef(null);
  const { width } = useWindowDimensions();


  useEffect(() => {
    if (isFocused) {
      dorefresh();
    }
    openBottomSheet();
  }, [isFocused]);

  const dorefresh = () => {

  };
  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  };


  const initialRegion = {
    latitude: 28.395265845623204,
    longitude: 77.30564446136799,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markers = [
    {
      id: 1,
      title: 'Marker 1',
      description: 'This is Marker 1',
      latitude: 28.395265845623204,
      longitude: 77.30564446136799,
    },
    // Add more markers if needed
  ];

  const source = {
    html: `
      ${ContactInfo.iframe_url}`,
  };

  // if(isLoading){
  //   return <AppLoader2/>
  // }


  return (
    <>
      <BottomSheetModalProvider>

        {isRefreshing ? (
          <AppLoader2 loading={isRefreshing} color={AppTheme.Dark} size={40} />) :
          (
            <>
              <StatusBarHeader height={StatusBar.currentHeight} />
              {/* <View style={{ position: 'absolute', zIndex: 1, top: 50, left: 20 }}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.goBack()}>
                  <View style={{
                    backgroundColor: 'rgba(204, 204, 204, 0.5)',
                    borderWidth: 0.5,
                    borderColor: '#ccc',
                    marginLeft: 5,
                    borderRadius: 50
                  }}>
                    <LeftArrowIcon fill="#000" />
                  </View>
                </TouchableOpacity>
              </View> */}

              {/* <WebView
                source={{ uri: contactUs?.data?.contact_detail?.iframe_url_map }}
                style={{ flex: 1 }}
                startInLoadingState
                javaScriptEnabled
                domStorageEnabled
              /> */}

              <WebView
                originWhitelist={['*']}
                javaScriptEnabled
                domStorageEnabled
                style={{ flex: 1 }}
                source={{
                  html: `
      <html>
        <body style="margin:0;padding:0;overflow:hidden;">
          <iframe
            src="${contactUs?.data?.contact_detail?.iframe_url_map}"
            width="100%"
            height="100%"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </body>
      </html>`,
                }}
              />
              {/* <MapView
                style={StyleSheet.absoluteFillObject}
                initialRegion={{
                  latitude: 28.4547,
                  longitude: 77.3255,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
                }}
                customMapStyle={activeTheme.mapTheme}
              >
                <Marker
                  coordinate={{ latitude: 28.45881, longitude: 77.30591 }}
                  title="Basiq 360"
                />
              </MapView> */}
            </>
          )}

        <BottomSheetModal
          index={0}
          ref={bottomSheetRef}
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            overflow: 'hidden',
          }}
          backgroundStyle={{
            backgroundColor: activeTheme.section,
          }}
          snapPoints={['30%']}
          enablePanDown={false}
          enableOverDrag={false}
          onChange={(index) => {
            openBottomSheet();
          }}
        >
          <BottomSheetView style={{ flex: 1, padding: 10, fontSize: 30 }}>
            <View style={{
              flexDirection: 'row',
              gap: 10,
              justifyContent: 'space-between',
              paddingBottom: 10,
            }}>
              <TouchableOpacity onPress={() => makePhoneCall(contactUs?.data?.contact_detail?.contact_number)} style={styles.socialIconTile}>
                <CallSupport width={40} height={40} fill="#004CAC" />
                <Text>1</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => makePhoneCall(contactUs?.data?.contact_detail?.contact_number_2)} style={styles.socialIconTile}>
                <CallSupport width={40} height={40} fill="#004CAC" />
                <Text>2</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openInstagram(contactUs?.data?.contact_detail?.instagram_url)} style={styles.socialIconTile}>
                <Instagram width={34} height={34} fill="#004CAC" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => openWebsite(contactUs?.data?.contact_detail?.website_url)} style={styles.socialIconTile}>
                <Glob width={32} height={32} fill="#004CAC" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => sendEmail(contactUs?.data?.contact_detail?.email)} style={styles.socialIconTile}>
                <Message width={38} height={38} fill="#004CAC" />
              </TouchableOpacity>
            </View>

            <View>
              <Text style={styles.title}>Location</Text>
              <Text style={styles.content}>{contactUs?.data?.contact_detail?.address}</Text>
            </View>

          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
};
