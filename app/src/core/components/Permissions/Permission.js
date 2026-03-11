import LinearGradient from 'react-native-linear-gradient';
import { StatusBarHeader } from '../StatusBar/StatusBar';
import { Images } from '../../assets';
import { ImageBackground, ScrollView, StyleSheet, Image, Text, View, Dimensions, TouchableOpacity, StatusBar, Alert } from 'react-native';
import Angle from '../../assets/icons/Angle.svg';
import NotificationsFill from '../../assets/icons/NotificationsFill.svg';
import Gallery from '../../assets/icons/Gallery.svg';
import Camera from '../../assets/icons/Camera.svg';
import Active from '../../assets/icons/Active.svg';
import InActive from '../../assets/icons/InActive.svg';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import Toast from 'react-native-toast-message';
import * as Animatable from 'react-native-animatable';


//   - ACCESS_FINE_LOCATION
//   - ACCESS_COARSE_LOCATION
//   - CAMERA
//   - READ_EXTERNAL_STORAGE
//   - READ_MEDIA_IMAGES
//   - RECORD_AUDIO
//   - CALL_PHONE


import {
  request,
  openSettings,
  PERMISSIONS,
  check,
} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PERMISSION_LIST } from '../../utils/Constant';
import { DynamicIcon } from '../../assets/icons';
import { useEffect, useState } from 'react';
import useTheme from '../Theme/useTheme';
import { LeftArrowIcon } from '../../assets/SVGs/svg';



export const requestGeolocationPermission = async () => {
  try {
    request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, {
      title: 'Location Permissions',
      message: 'This App Requires Location Permission. Please Click On To "While using the app"',
      buttonPositive: 'Allow',
      buttonNegative: 'Cancel',
    }).then(async status => {
      if (status == 'granted') {
        await AsyncStorage.setItem('geolocationPermission', 'true');
        setgeolocation(true);
        return status;
      } else {
        Alert.alert(
          'Geolocation Permission Denied !',
          'This app needs location permission to function properly. Please grant location permission in the settings.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => {
                openSettings('application');
              },
            },
          ],
        );
        setgeolocation(false);
        await AsyncStorage.setItem('geolocationPermission', 'false');
      }
    });
  } catch (err) {
    Toast.show({
      type: 'error',
      text1: err?.message || 'Try again',
      visibilityTime: 2000,
    });
  }
};


const Permission = ({ navigation }) => {
  const [perissionList, setPermissionList] = useState([]);
  const activeTheme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8fafc',
    },

    preferenceSection: {
      paddingVertical:20,
    },

    sectionTitle: {
      // marginBottom: 10,
    },

    sectionTitleText: {
      fontWeight: 'bold',
      fontSize: 18,
      color: '#000',
    },

    optionsWrapper: {
      paddingHorizontal:20,
      // Optional wrapper for future layout styling
    },

    option: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      borderBottomWidth: 0.5,
      borderBottomColor: '#ccc',
    },

    optionText: {
      fontWeight: 'bold',
      fontSize: 16,
      color: activeTheme.text,
    },
    optionSubText: {
      fontSize: 14,
    },

    allowBtn: {
      paddingHorizontal: 10,
      borderWidth: 1,
      borderRadius: 15,
      backgroundColor: '#004CAC',
      color: '#fff',
    },
  });
  const fetchPermissions = async () => {
    const listWithStatus = await Promise.all(
      PERMISSION_LIST.map(async (item) => {
        const status = await check(PERMISSIONS.ANDROID[item.key]);
        return { ...item, granted: status === 'granted' };
      })
    );
    setPermissionList(listWithStatus);
  };

  useEffect(() => {
    fetchPermissions();
  }, []);


  const requestPermission = async (item) => {
    const result = await request(PERMISSIONS.ANDROID[item.key]);
    if (result === 'granted') {
      alert(`${item.title} permission granted`);
    } else if (result === 'blocked') {
      alert(
        `${item.title} permission is blocked. Please enable it in Settings.`
      );
    } else {
      alert(`${item.title} permission denied`);
    }

    // Refresh the permission status after requesting
    fetchPermissions();
  };

  const GlobelStyle = useGlobelStyle();
  return <>
    <ScrollView>
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
          }}>Permissions</Text>
          <View style={{
            height: 50,
            width: 50,
            borderRadius: 200,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop:10,
          }}>
            <Image
              source={Images.permissions} // replace with your illustration
              style={{ height: 50, width: 50 }}
              resizeMode="cover"
            />
          </View>

        </View>


        <View style={styles.preferenceSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Allowed Permissions</Text>
          </View>
          <View style={styles.optionsWrapper}>
            {perissionList?.filter(item => item?.granted).length > 0 ? (
              perissionList?.filter(item => item?.granted).map((item) => (
                <TouchableOpacity key={item.key} style={styles.option}>
                  <View style={{ flex: 1 }}>
                    <View style={[GlobelStyle.flexDirectionRow, { gap: 10 }]}>
                      {/* <NotificationsFill width={20} height={20} fill="#004CAC" /> */}
                      {/* <DynamicIcon width={20} height={20} iconName={item?.icon} /> */}
                      <Text style={styles.optionText}>{item?.title}</Text>
                    </View>
                    <Text style={styles.optionSubText}>{item?.subtitle}</Text>
                  </View>
                  <Active width={40} height={40} fill="#004CAC" />
                </TouchableOpacity>
              ))
            ) : (
              <View>
                <Text style={{ fontSize: 16, color: '#888' }}>No permission allowed</Text>
              </View>
            )}
          </View>
        </View>

        <View style={[styles.preferenceSection, { marginTop: 10 }]}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionTitleText}>Denied Permissions</Text>
          </View>
          <View style={styles.optionsWrapper}>
            {perissionList?.filter(item => !item?.granted).length > 0 ? (
              perissionList?.filter(item => !item?.granted).map((item) => (
                <TouchableOpacity key={item.key} style={styles.option} onPress={() => requestPermission(item)}>
                  <View style={{ flex: 1 }}>
                    <View style={[GlobelStyle.flexDirectionRow, { gap: 10 }]}>
                      {/* <NotificationsFill width={20} height={20} fill="#777" /> */}
                      {/* <DynamicIcon width={20} height={20} iconName={item?.icon} /> */}
                      <Text style={styles.optionText}>{item?.title}</Text>
                    </View>
                    <Text style={styles.optionSubText}>{item?.subtitle}</Text>
                  </View>
                  <InActive width={40} height={40} fill="#777" />
                </TouchableOpacity>
              ))
            ) : (
              <View>
                <Text style={{ fontSize: 16, color: '#888' }}>No permission denied</Text>
              </View>
            )}
          </View>
        </View>

      </LinearGradient>
    </ScrollView>
  </>;

};

export default Permission;
