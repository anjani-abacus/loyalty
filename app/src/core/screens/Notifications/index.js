import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNoDataFound from '../../components/No_Data_Found/AppNoDataFound';
import { FlatList } from 'react-native-gesture-handler';
import { View } from 'react-native-animatable';
import { StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { ApiCall } from '../../../services/ServiceProvider';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import AppSearchBar from '../../components/Searchbar/AppSearchBar';
import { ImageModal } from '../../../core/components/ConfirmationModal/ConfirmationModal';
import Toast from 'react-native-toast-message';
import { UPLOAD_URL } from '../../../services/BaseService';
import useGlobelStyle from '../../assets/Style/GlobelStyle';

import { TabView } from 'react-native-tab-view';
import { TabBarLayout } from '../../../core/utils/Constant';
import NewMessage from '../../assets/icons/NewMessage.svg';
import { useNotificationList, useReadNotification } from '../../../api/hooks/useMasters';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBarHeader } from '../../components/StatusBar/StatusBar';
import { HelpIcon, LeftArrowIcon } from '../../assets/SVGs/svg';

const style = StyleSheet.create({
  notificationWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 5,
    padding: 5,
    borderRadius: 4,
    gap: 15,
  },
  notificationDate: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF9F00',
  },
  innerView: {
    backgroundColor: '#FDF2E1',
    padding: 20,
    borderRadius: 10,
    flex: 1,
  },
  notification: {
    flex: 1,
    fontStyle: 'italic',
  },
  mainContainer: {
    padding: 10,
    minHeight: '100%',
  },
  unreadMessage: {
    fontWeight: 'bold',
    color: '#000',
  },
  unreadSubject: {
    fontWeight: 'bold',
    color: '#FF9F00',
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#FDF2E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#FF9F00',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  subject: {
    fontSize: 14,
    color: '#FF9F00',
  },
  content: {
    fontSize: 14,
    color: '#000',
  },
  time: {
    color: '#aaa',
    fontSize: 12,
    fontWeight: 'bold',
  },
  readAllText: {
    textDecorationLine: 'underline',
    color: '#00f',
    marginBottom: 15,
  },
  notificationSubject: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationContent: {
    fontSize: 16,
  },
});

const Card = ({ readNotification, openBottomSheet, setActiveMessage, item }) => {
  return <TouchableOpacity onPress={() => { setActiveMessage(item), openBottomSheet(); readNotification({ id: item?.id }); }} style={style.notificationWrapper}>
    <View style={style.imageStyle}>
      {!item?.del && <View style={style.onlineIndicator} />}
      <NewMessage width={42} height={42} fill="#FF9F00" />
    </View>
    <View style={{ flex: 1 }}>
      <Text numberOfLines={1} style={[style.subject, (!item?.del && style.unreadSubject)]}>
        {item?.subject}
      </Text>
      <Text numberOfLines={2} style={[style.content, (!item?.del && style.unreadMessage)]}>
        {item?.msg}
      </Text>
      <Text style={[style.time, (!item?.del && style.unreadMessage)]}>{moment(item?.date_created).format('DD MMM, YYYY')}</Text>
    </View>
  </TouchableOpacity>;
};

const ListView = ({ list, openBottomSheet, setActiveMessage }) => {
  const [dataList, setDataList] = useState([]);
  const { mutate: readNotification } = useReadNotification();


  return (
    <>
      {/* <TouchableOpacity>
        <Text style={style.readAllText}>Read all</Text>
      </TouchableOpacity> */}
      <FlatList
        // [{ isRead: true }, { isRead: true }, { isRead: false }, { isRead: false }]
        data={list}
        ListEmptyComponent={
          <View style={{ marginTop: 200 }}>
            <AppNoDataFound title={'No Data Available'} />
          </View>
        }

        contentContainerStyle={{ paddingBottom: 70 }}

        renderItem={({ item, index }) => <Card setActiveMessage={setActiveMessage} readNotification={readNotification} openBottomSheet={openBottomSheet} item={item} />}
      />
    </>
  );
};


const Notifications = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const GlobelStyle = useGlobelStyle();
  const { data: notificationList, mutate: fetchList } = useNotificationList();
  const [activeMessage, setActiveMessage] = useState(null);


  const [routes] = useState([
    { key: 0, title: 'All' },
    { key: 1, title: 'Unread' },
  ]);

  useEffect(() => {
    fetchList({ type: routes[index]?.title });
  }, [index]);

  const bottomSheetRef = useRef(null);
  const openBottomSheet = (item) => {
    bottomSheetRef.current?.present();
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current.dismiss();
    fetchList({ type: routes[index]?.title });
  };

  const renderScene = ({ route }) => {
    return <ListView setActiveMessage={setActiveMessage} openBottomSheet={openBottomSheet} list={notificationList?.data?.data} activeKey={route.key} />;
  };

  return <>
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
        }}>Notifications</Text>
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
    <TabView
      renderTabBar={props => (
        <TabBarLayout props={{ ...props }} tabWidth={'auto'} />
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      lazy
      onIndexChange={setIndex}
      initialLayout={{ width: '100%' }}
      style={GlobelStyle.tabView}
    />

    <BottomSheetModalProvider>
      <BottomSheetModal
        index={0}
        ref={bottomSheetRef}
        snapPoints={['40%']}
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
        <View style={{
          padding: 10,
          flex: 1,
        }}>
          <View style={[GlobelStyle.flexDirectionRow, GlobelStyle.justifyContentEnd, { marginBottom: 10 }]}>
            <Text style={style.notificationDate}>{moment(activeMessage?.date_created).format('DD MMM, YYYY')}</Text>
          </View>
          <View style={style.innerView}>
            <Text style={style.notificationSubject}>{activeMessage?.subject}</Text>
            <Text style={style.notificationContent}>{activeMessage?.msg}</Text>
          </View>
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  </>;
};


export const AnnouncementScreen = () => {
  const [searchValue, setSearchValue] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Sample announcement data
  useEffect(() => {
    getAnnouncementData('');
  }, []);
  const handleImagePress = image => {
    setSelectedImage(UPLOAD_URL + 'notices/' + image);
    setImageVisible(true);
  };

  const getAnnouncementData = async searchData => {
    setSearchValue(searchData);
    let filter = {};
    filter.search = searchData;
    try {
      await ApiCall(
        { filter: filter },
        'AppAnnouncement/announcementList',
      )
        .then(result => {
          if (result.statusCode == 200) {
            setAnnouncements(result.result);
            setLoading(false);
          } else {
            toast.show(result.statusMsg, {
              type: 'danger',
              duration: 2000,
              icon: (
                <Icon
                  name="error"
                  type="material-community-icons"
                  color="white"
                  size={20}
                />
              ),
            });
          }
        })
        .catch(error => {
          alert('Something went wrong!');
        });
    } catch { }
  };

  const renderItem = ({ item }) => (
    <View style={styles.announcementCard}>
      <View style={styles.announcementHeader}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>
            {moment(item.date_created).format('DD MMM YYYY')}
          </Text>
          <Text style={styles.dateLabel}>Date</Text>
        </View>
        <View style={styles.creatorContainer}>
          <Text style={styles.creator}>{item.created_by_name}</Text>
          <Text style={styles.creatorLabel}>Created By</Text>
        </View>
        <TouchableOpacity
          disabled={!item.image}
          onPress={() => handleImagePress(item.image)}
          style={styles.viewImageContainer}>
          <Text
            style={[
              styles.viewImage,
              { color: !item.image ? '#ccc' : '#3182ce' },
            ]}>
            {item.image ? 'View Image' : 'No Image'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.msg}</Text>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#fff',
    },
    backButton: {
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    searchContainer: {
      marginBottom: 30,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      paddingVertical: 12,
      fontSize: 16,
      color: '#333',
    },
    listContainer: {
      marginHorizontal: 18,
      paddingBottom: 40,
    },
    announcementCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    announcementHeader: {
      flexDirection: 'row',
      backgroundColor: '#e6f0ff',
      padding: 12,
    },
    dateContainer: {
      flex: 1,
    },
    date: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#2c5282',
    },
    dateLabel: {
      fontSize: 12,
      color: '#718096',
      marginTop: 2,
    },
    creatorContainer: {
      flex: 1,
    },
    creator: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#2c5282',
    },
    creatorLabel: {
      fontSize: 12,
      color: '#718096',
      marginTop: 2,
    },
    viewImageContainer: {
      paddingHorizontal: 4,
      alignItems: 'flex-end',
      // backgroundColor: '#3182ce',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 16,
    },
    viewImage: {
      fontSize: 14,
      color: '#3182ce',
      fontWeight: '500',
    },
    imageLabel: {
      fontSize: 12,
      color: '#718096',
      marginTop: 2,
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
    },
    avatarContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#e2e8f0',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    avatarText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#4a5568',
    },
    title: {
      fontSize: 14,
      // fontWeight: 'bold',
      color: '#2d3748',
    },
    bottomNav: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 12,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderTopColor: '#eee',
    },
    navButton: {
      padding: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <AppSearchBar
          term={searchValue}
          onChangeTerm={newValue => getAnnouncementData(newValue)}
          placeHolder="Search here..."
        />
      </View>

      {/* Announcements List */}
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={announcements}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ marginTop: 200 }}>

              <AppNoDataFound
                key={'data not found'}
                title={'No Data Available'}
              />
            </View>
          }
        />
      </View>
      <ImageModal
        modalVisible={imageVisible}
        setModalVisible={setImageVisible}
        url={selectedImage}
      />
      {/* Bottom Navigation */}
    </SafeAreaView>
  );
};


export default Notifications;
