import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Images } from '../../../../core/assets';
import CreativeHighlight from '../../../../core/assets/icons/creativeHighlight.svg';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import ImageView from 'react-native-image-viewing';
import { useBannerList } from '../../../../api/hooks/useMasters';
const { width: screenWidth } = Dimensions.get('window');

const carousalData = [
  {
    title: 'You 💜 Stark Paints',
    subTitle: 'Your friends are going to love us too',
    // message: "Refer and Earn upto ₹5K",
    badge: 'PREMIUM',
    page: 'LeaderBoard',
    img: 'https://picsum.photos/400/600?random=1',
  },
  {
    title: '🎯 Best Seller',
    subTitle: 'Featured Product - Stark Texture',
    badge: 'TRENDING',
    page: 'LeaderBoard',
    img: 'https://picsum.photos/400/600?random=1',
  },
  {
    title: '⭐ Quality Choice',
    subTitle: "Customer's Favorite Brand",
    badge: 'VERIFIED',
    page: 'LeaderBoard',
    img: 'https://picsum.photos/400/600?random=1',
  },
];

const Card = ({ item, index, openImageViewer, styles, navigation }) => {
  return (
    <TouchableOpacity
      // onPress={() => navigation.navigate(item?.page)}
      // onPress={() => {
      //   console.log('Image pressed, index:', index);
      //   openImageViewer(index);
      // }}
      style={styles.HighlightButton}
      activeOpacity={0.8}
    >
      {/* <View style={styles.contentContainer}>
      <ImageBackground
        source={{ uri: item.banner_image }}
        style={{ height: '100%', width: '100%' }}
        resizeMode="cover"
      />
      </View> */}

        <View style={styles.contentContainer}>

        <View style={styles.textWrapper}>
          <Text allowFontScaling={false} style={styles.HighlightButtonText}>{item?.title}</Text>
          <Text allowFontScaling={false} style={styles.HighlightButtonSubText}>{item?.subTitle}</Text>
          <Text allowFontScaling={false} style={styles.messageText}>{item?.message}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <CreativeHighlight />
      </View>
    </TouchableOpacity>
  );
};

function HighlightCarousel({ autoPlay, showIndicator, height, navigation }) {
  const activeTheme = useActiveTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageViewVisible, setImageViewVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { data: bannerList, refetch: refetchBannerList } = useBannerList();
  // bannerList?.data?.result

  const openImageViewer = (index) => {
    console.log('Opening image viewer for index:', index);
    console.log('Current feelist:', carousalData?.length);
    setCurrentImageIndex(index);
    setImageViewVisible(true);
  };

  const styles = StyleSheet.create({
    HighlightButton: {
      borderRadius: 16,
      // paddingTop:10,
      marginHorizontal: 5,
      backgroundColor: '#F9EFFF',
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
    },
    contentContainer: {
      flex: 1.2,
      // padding: 20,
      justifyContent: 'center',
    },
    badgeContainer: {
      alignSelf: 'flex-start',
      marginBottom: 8,
    },
    badge: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#000',
      fontSize: 10,
      fontWeight: '800',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    textWrapper: {
      flex: 1,
      padding: 10,
    },
    HighlightButtonText: {
      color: '#000',
      fontWeight: '700',
      fontSize: 18,
      // marginBottom: 6,
      lineHeight: 22,
      textShadowColor: 'rgba(0, 0, 0, 0.3)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    HighlightButtonSubText: {
      color: '#000',
      fontSize: 14,
      lineHeight: 18,
      fontWeight: '500',
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 1,
    },
    messageText: {
      color: '#003EEE',
      fontSize: 20,
      marginVertical: 8,
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.2)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 1,
    },
    imageContainer: {
      flex: 0.9,
      height: '100%',
      position: 'relative',
    },
    image: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageOverlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 8,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: -25,
      // marginBottom: 8,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
      transition: 'all 0.3s ease',
    },
    activeDot: {
      backgroundColor: '#CE90FF',
      width: 24,
      borderRadius: 4,
    },
    inactiveDot: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    carouselContainer: {
      // paddingVertical: 8,
      // marginBottom:20
    },
  });

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        // data={bannerList?.data?.result}
        data={carousalData}
        width={(screenWidth - 40)}
        height={height || 100}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        loop
        autoPlay={autoPlay}
        autoPlayInterval={4000}
        scrollAnimationDuration={1000}
        style={{ alignSelf: 'center' }}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item, index }) => (
          <Card
            openImageViewer={openImageViewer}
            navigation={navigation}
            styles={styles}
            item={item}
            index={index}
          />
        )}
      />

      {showIndicator && (
        <View style={styles.paginationContainer}>
          {carousalData.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === activeIndex ? styles.activeDot : styles.inactiveDot,
              ]}
          />
          ))}
        </View>
      )}

      <ImageView
        images={bannerList?.data?.result?.map(post => ({ uri: post.banner_image }))}
        imageIndex={currentImageIndex}
        visible={imageViewVisible}
        onRequestClose={() => {
          console.log('Closing image viewer');
          setImageViewVisible(false);
        }}
        animationType="slide"
      />
    </View>
  );
}

export default HighlightCarousel;
