import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  StyleSheet,
  Linking,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import { AppLoader2 } from '../../../core/components/Loader/AppLoader';
import { TabView } from 'react-native-tab-view';
import { TabBarLayout } from '../../../core/utils/Constant';
import useActiveTheme from '../../../core/components/Theme/useActiveTheme';
import AppNoDataFound from '../../../core/components/No_Data_Found/AppNoDataFound';
import Style from '../../assets/Style/styles';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import { useTranslation } from 'react-i18next';
import Video from 'react-native-video';
import { Images } from '../../assets';
import PlayButton from '../../assets/icons/PlayButton.svg';
import { useTutorialVideoList } from '../../../api/hooks/useMasters';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBarHeader } from '../../components/StatusBar/StatusBar';
import { HelpIcon, LeftArrowIcon } from '../../assets/SVGs/svg';
import { PointBalance } from '../../../features/Loyalty/screens/SpinAndWheel';

const Card = ({ item, index, navigation }) => {
  return (
    <View style={{ marginBottom: 5 }}>
      <ImageBackground
        source={Images.videoBg}
        style={styles.background}
        resizeMode="cover" // or "contain", "stretch", "repeat", "center"
      >

        <View style={{
          height: 180,
          padding: 15,
          justifyContent: 'space-between',
        }}>
          <View style={{
            maxWidth: '60%',
          }}>
            <Text style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 16,
            }}>{item?.video_desc}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 10,
          }}>
            <View style={{ maxWidth: '60%' }}>
              <Text style={{
                fontSize: 16,
                color: '#fff',
              }}>{item?.video_title}</Text>
            </View>

            <TouchableOpacity
              onPress={() => { navigation.navigate('VideoPlayer', { url: item?.video_url }); }}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderWidth: 1.5,
                borderColor: '#fff',
                borderRadius: 8,
                flexDirection: 'row',
                gap: 5,
                backgroundColor: 'rgba(226, 232, 240, 0.2)',
              }}>
              <PlayButton width={20} height={20} />
              <Text style={{
                fontWeight: 'bold',
                color: '#fff',
                fontSize: 16,
              }}>
                Play Video</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const ListView = ({ navigation }) => {
  const { refetch, data: tutorialList, isFetching } = useTutorialVideoList({ filter: {} });
  const { t } = useTranslation();
  const activeTheme = useActiveTheme();
  const GlobelStyle = useGlobelStyle();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const videoPlayerRef = useRef(null);
  const [title, setTitle] = useState('');

  const onRefresh = () => {
    refetch();
  };

  const renderVideoPlayer = () => {
    if (videoUrl) {
      return (
        <>
          <Video
            ref={videoPlayerRef}
            source={{ uri: videoUrl }}
            style={styles.videoPlayer}
            controls
          />
          <View style={styles.videoTitle}>
            <Text style={styles.videoTitleText}>{title}</Text>
          </View>
        </>
      );
    }
    return null;
  };


  return (
    <SafeAreaView style={GlobelStyle.container}>
      <View style={Style.CategoryCard}>
        {isRefreshing ? (
          <AppLoader2
            loading={isRefreshing}
            color={activeTheme.Secondary}
            size={40}
          />
        ) : (
          <>
            <View style={[{ marginTop: 10, marginBottom: 25 }, Style.scrollView]}>
              {/* {renderVideoPlayer()} */}
              <FlatList
                data={tutorialList?.data?.video_list?.filter(elem=>elem?.platform == 'ALL')}
                ListEmptyComponent={
                  <View style={{ marginTop: 200 }}>
                    <AppNoDataFound />
                  </View>
                }
                refreshControl={
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                  />
                }
                // ListHeaderComponent={ListHeader}
                renderItem={({ item, index }) => {
                  return <>
                    <Card navigation={navigation} item={item} index={index} />
                  </>;
                }}
              />
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const VideoTutorials = ({ navigation }) => {
  const [index, setIndex] = useState(0);
  const GlobelStyle = useGlobelStyle();
  const [routes] = useState([
    { key: 0, title: 'Videos' },
    { key: 1, title: 'Tutorials' },
  ]);

  const renderScene = ({ route }) => {
    return <ListView navigation={navigation} activeKey={route.key} />;
  };

  return <SafeAreaView style={GlobelStyle.tabViewContainer}>
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
        }}>Videos</Text>
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
    <ListView navigation={navigation} activeKey={0} />
    {/* <TabView
      renderTabBar={props => (
        <TabBarLayout props={{ ...props }} tabWidth={2} />
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      lazy
      onIndexChange={setIndex}
      initialLayout={{ width: '100%' }}
      style={GlobelStyle.tabView}
    /> */}
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  text: {
    color: '#fff',
    fontSize: 24,
  },
  videoPlayer: {
    width: '100%',
    height: 180,
  },
  videoTitle: {
    width: '100%',
    backgroundColor: '#F0F8FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  videoTitleText: {
    color: '#2B3348',
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  videoTextContainer: {
    marginBottom: 10,
  },
  remarkTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  remarkText: {
    color: '#2B3348',
  },
  playButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default VideoTutorials;
