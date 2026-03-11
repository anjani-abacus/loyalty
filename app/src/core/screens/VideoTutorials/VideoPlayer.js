import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from 'react-native-video-controls';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBarHeader } from '../../components/StatusBar/StatusBar';
import { HelpIcon, LeftArrowIcon } from '../../assets/SVGs/svg';

const extractYouTubeId = (url) => {
  if (!url) {return null;}

  // Case 1: youtu.be/VIDEOID
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1].split(/[?&]/)[0];
  }

  // Case 2: watch?v=VIDEOID
  if (url.includes('watch?v=')) {
    return url.split('watch?v=')[1].split(/[?&]/)[0];
  }

  return null;
};


const VideoPlayerWrappper = ({ route }) => {
  const { url } = route?.params;

  return (
    <VideoPlayer
      source={{ uri: url }}
      seekColor="#FF3366"
      controlTimeout={5000}
    />);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
  },
});

const YouTubePlayerWrapper = ({ route, navigation }) => {
  const { url } = route.params;
  const videoId = extractYouTubeId(url);

  return (
      <>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#000', '#000']}
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
          }}>Video Player</Text>
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
    <View style={{ flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' }}>


      <YoutubePlayer
        height={styles.container.height}
        width={styles.container.width}
        play={true}
        videoId={videoId}
      />
    </View>
    </>
  );
};

export default YouTubePlayerWrapper;
export { VideoPlayerWrappper };
