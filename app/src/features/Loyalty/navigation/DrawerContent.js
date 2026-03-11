import DeviceInfo from 'react-native-device-info';
import { ImageBackground, ScrollView, StyleSheet, View, Dimensions, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import ThemedText from '../../../core/components/ThemedText';
import FastImage from 'react-native-fast-image';
import { Images } from '../../../core/assets';
import useGlobelStyle from '../../../core/assets/Style/GlobelStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Angle from '../../../core/assets/icons/Angle.svg';
import Edit from '../../../core/assets/icons/EditWhite.svg';
import Link from '../../../core/assets/icons/LinkRedirect.svg';
import Info from '../../../core/assets/icons/Info.svg';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../../../auth/AuthContext';
import { useContext, useState } from 'react';
// import Instagram from '../../../../core/assets/icons/Instagram.svg'
import Theme from '../../../core/assets/icons/Theme.svg';
import Language from '../../../core/assets/icons/Language.svg';
import Permissions from '../../../core/assets/icons/Permissions.svg';
import Settings from '../../../core/assets/icons/Settings.svg';
import { Button, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import useTheme from '../../../core/components/Theme/useTheme';
import { useTranslation } from 'react-i18next';
import { UserProfileImage } from '../../../core/screens/MyProfile/UserProfile';
import ConfirmationModal from '../../../core/components/ConfirmationModal/ConfirmationModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Features, handleShare } from '../screens/Home/LoyaltyHome';



// const handleShare = () => {
//   shareQRImage()
// };

const handleDownload = () => {
};

const DrawerContent = ({ navigation }) => {
  const version = DeviceInfo.getVersion();
  const GlobelStyle = useGlobelStyle();
  const { logout, loginData, isLoggingOut } = useContext(AuthContext);
  const activeTheme = useTheme();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: activeTheme.maincontainer,
      // backgroundColor: '#f8fafc'
    },
    appVersion: {
      marginTop: 30,
      textAlign: 'center',
    },

    // Header Section
    headerSection: {
      backgroundColor: activeTheme.section,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 10,
    },

    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      paddingTop: 16,
    },

    profileImageContainer: {
      position: 'relative',
    },

    profileImage: {
      width: 64,
      height: 64,
      borderRadius: 20,
      borderWidth: 3,
      borderColor: '#e0f2fe',
    },

    onlineIndicator: {
      position: 'absolute',
      top: 2,
      right: 2,
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: activeTheme.section,
    },

    profileInfo: {
      flex: 1,
    },

    userName: {
      fontSize: 18,
      fontWeight: '700',
      color: activeTheme.text,
      // color: '#1e293b',
      marginBottom: 4,
    },

    phoneNumber: {
      fontSize: 12,
      color: activeTheme.text,
      // color: '#64748b',
      fontWeight: '500',
    },

    editProfileButton: {
      flexDirection: 'row',
      gap: 5,
      borderRadius: 10,
      paddingHorizontal: 5,
      borderWidth: 1,
      backgroundColor: '#004CAC',
      borderColor: '#004CAC',
    },
    editProfileButtonText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#fff',
    },

    qrSection: {
      marginBottom: 10,
      backgroundColor: activeTheme.section,
      padding: 20,
    },

    qrCodeContainer: {
      alignItems: 'center',
      backgroundColor: activeTheme.section,
      // backgroundColor: '#f8fafc',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#e2e8f0',
      paddingTop: 10,
    },

    qrCodeImage: {
      width: 140,
      height: 140,
      borderRadius: 12,
      overflow: 'hidden',
    },

    qrCodeOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: 12,
    },

    qrSubtitle: {
      backgroundColor: activeTheme.section,
      // backgroundColor: '#EFF6FF',
      borderColor: '#D1D5DB',
      marginTop: 8,
      padding: 8,
      flexDirection: 'row',
      gap: 5,
    },
    qrSubtitleText: {
      color: '#004BAC',
    },

    sectionTitleText: {
      fontWeight: 'bold',
      fontSize: 18,
      color: activeTheme.text,
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
      fontSize: 14,
      color: activeTheme.text,
    },

    preferenceSection: {
      padding: 20,
      backgroundColor: activeTheme.section,
    },

    otherSection: {
      padding: 20,
      backgroundColor: activeTheme.section,
    },
    logoutButton: {
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },

    logoutButtonText: {
      color: '#f00',
      fontSize: 16,
    },

    // Action Buttons
    actionButtonsContainer: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 10,
      justifyContent: 'space-around',
    },

    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 4,
      borderColor: '#000',
      borderWidth: 0.2,
      padding: 10,
      borderRadius: 20,
      flex: 1,
    },


    actionButtonText: {
      fontSize: 14,
      color: activeTheme.text,
      // color: '#475569',
      fontWeight: '600',

    },

    actionButtonTextPrimary: {
      color: activeTheme.section,
    },

    // Additional Info Section
    infoSection: {
      marginTop: 24,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },

    infoCard: {
      backgroundColor: activeTheme.section,
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      borderColor: '#f1f5f9',
    },

    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#f1f5f9',
    },

    infoRowLast: {
      borderBottomWidth: 0,
    },

    infoIcon: {
      marginRight: 12,
    },

    infoText: {
      fontSize: 15,
      color: '#475569',
      fontWeight: '500',
      flex: 1,
    },

    infoValue: {
      fontSize: 14,
      color: '#64748b',
      fontWeight: '400',
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section with Profile */}
        <View style={styles.headerSection}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
              <UserProfileImage style={styles.profileImage} user={loginData} />
              <View style={[styles.onlineIndicator, { backgroundColor: loginData?.status_of_profile?.toLowerCase() == 'approved' ? '#10b981' : '#f00' }]} />
            </View>

            <View style={styles.profileInfo}>
              <TouchableOpacity style={[GlobelStyle.flexDirectionRow, GlobelStyle.alignItemsCenter, { gap: 5 }]} onPress={() => navigation.navigate('My Profile')}>
                <ThemedText style={styles.userName}>{loginData?.name}</ThemedText>
                <Link width={14} height={14} fill={activeTheme.text} />
              </TouchableOpacity>
              <View>
                <ThemedText style={styles.phoneNumber}>{loginData?.mobileNo}</ThemedText>
                {/* <View style={[GlobelStyle.flexDirectionRow, GlobelStyle.justifyContentBetween, {marginTop:10}]}>
                <TouchableOpacity onPress={() => navigation.navigate("Update Profile", { formType: 'personalInfo' })} style={styles.editProfileButton}>
                  <Edit width={14} height={14} />
                  <ThemedText style={styles.editProfileButtonText}>{t("EditProfile")}</ThemedText>
                </TouchableOpacity>
              </View> */}
              </View>
            </View>
          </View>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrSection}>
          <View style={styles.qrCard}>
            <View style={styles.qrCodeContainer}>
              <ImageBackground
                source={Images?.qrCodeNew}
                style={styles.qrCodeImage}
                resizeMode="cover"
              >
                <View style={styles.qrCodeOverlay} />
              </ImageBackground>
              <View style={styles.qrSubtitle}>
                <Info width={14} height={14} fill="#004BAC" />
                <ThemedText style={styles.qrSubtitleText}>{t('Invite_others_using_this_QR_code_and_get_rewarded')}</ThemedText>
              </View>
            </View>


            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity
                style={[styles.actionButton]}
                onPress={handleShare}
              >
                <Icon name="share" size={16} color={activeTheme.text} />
                <ThemedText style={styles.actionButtonText}>
                  {t('Share This Application')}
                </ThemedText>
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
              <Icon name="download" size={18} color="#475569" />
              <ThemedText style={styles.actionButtonText}>Download QR</ThemedText>
            </TouchableOpacity> */}
            </View>
          </View>
        </View>

        <View style={{
          backgroundColor:'#fff',
          padding:8,
        }}>
          <View style={styles.sectionTitle}>
            <ThemedText style={styles.sectionTitleText}>Shortcuts</ThemedText>
          </View>
          <Features styles={styles} navigation={navigation} />
        </View>

        <View style={styles.preferenceSection}>
          <View style={styles.sectionTitle}>
            <ThemedText style={styles.sectionTitleText}>{t('PreferenceAndSettings')}</ThemedText>
          </View>
          <View style={styles.optionsWrapper}>
            <TouchableOpacity disabled style={[styles.option, { opacity: 0.2 }]} onPress={() => navigation.navigate('Theme')}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Theme width={20} height={20} fill={activeTheme.text} />
                <ThemedText style={styles.optionText}>{t('Theme')}</ThemedText>
              </View>
              <Angle height={28} fill={activeTheme.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('LanguageType', { type: 'innerPage' })}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Language width={20} height={20} fill={activeTheme.text} />
                <ThemedText style={styles.optionText}>{t('Language')}</ThemedText>
              </View>
              <Angle height={28} fill={activeTheme.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Permissons')}>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Permissions width={20} height={20} fill={activeTheme.text} />
                <ThemedText style={styles.optionText}>{t('Permissions')}</ThemedText>
              </View>
              <Angle height={28} fill={activeTheme.text} />
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.option}>
            <View style={{flexDirection:'row', gap:10}}>
              <Settings width={18} height={18} fill={activeTheme.text} />
              <ThemedText style={styles.optionText}>{t("Settings")}</ThemedText>
            </View>
            <Angle height={28} fill={activeTheme.text} />
          </TouchableOpacity> */}
          </View>
        </View>

        <View style={styles.otherSection}>
          <View>
            <TouchableOpacity
              style={[styles.logoutButton, { opacity: isLoggingOut ? 0.7 : 1 }]}
              onPress={() => setModalVisible(true)}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <ActivityIndicator size="small" color="#f00" />
              ) : (
                <Feather
                  name="log-out"
                  style={{ color: '#f00' }}
                  size={18}
                />
              )}
              <ThemedText style={styles.logoutButtonText}>
                {isLoggingOut ? t('Logging out...') : t('Log out')}
              </ThemedText>
            </TouchableOpacity>

            <ThemedText style={styles.appVersion}>Version {version}</ThemedText>
          </View>
        </View>

        <ConfirmationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          confirmSubmit={logout}
          iconName="logout"
          iconBgColor="rgba(242, 212, 212, 1)"
          iconColor="#f00"
          iconType="material-community"
          title={'Logout'}
          content={t('Are you sure you want to logout ?')}
          theme="Logout"
        />
      </ScrollView>
    </SafeAreaView>
  );
};


// const shareQRImage = async () => {
//   const imageUrl =
//     'https://img.freepik.com/free-vector/scan-me-qr-code_78370-2915.jpg?semt=ais_hybrid&w=740';
//   try {
//     const fileName = 'qr-code.jpg';
//     const localFilePath = `${RNFS.CachesDirectoryPath}/${fileName}`;

//     // 1. Download the remote image to a local path
//     const downloadResult = await RNFS.downloadFile({
//       fromUrl: imageUrl,
//       toFile: localFilePath,
//     }).promise;

//     if (downloadResult.statusCode === 200) {
//       // 2. Share the downloaded image
//       await Share.open({
//         url: `file://${localFilePath}`,
//         type: 'image/jpeg',
//         title: 'Scan this QR code with:',
//         failOnCancel: false,
//       });
//     } else {
//       Alert.alert('Download failed', `Status code: ${downloadResult.statusCode}`);
//     }
//   } catch (error) {
//     console.error('Error while sharing QR:', error);
//     Alert.alert('Error', error.message || 'Something went wrong');
//   }
// };




export default DrawerContent;
