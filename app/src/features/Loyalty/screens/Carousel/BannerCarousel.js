import React, { useState } from 'react';
import { View, Dimensions, TouchableOpacity, Text, ImageBackground, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Images } from '../../../../core/assets';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';

const { width: screenWidth } = Dimensions.get('window');

const carousalData = [
  {
    title: 'Scan QR Code',
    subTitle: 'Earn Points',
  },
  {
    title: 'Spin To Win',
    subTitle: 'Spin and earn points',
  },
];

const Card = () => {
  return (
    <ImageBackground
      source={Images.videoBg}
      style={{ height: 200, width: '100%', backgroundColor: '#fff' }}
      resizeMode="cover" // or "contain", "stretch", "repeat", "center"
    />
  );
};

function BannerCarousel({ autoPlay, showIndicator, height, navigation }) {
  const activeTheme = useActiveTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const styles = StyleSheet.create({
    HighlightButton: {
      borderRadius: 8,
      paddingHorizontal: 10,
      width: '100%',
      backgroundColor: activeTheme.Primary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textWrapper: {
      flex: 1,
      paddingRight: 10,
    },
    HighlightButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
    HighlightButtonSubText: {
      color: '#fafafa',
      fontSize: 14,
    },
    image: {
      width: 70,
      height: 80,
      borderRadius: 8,
      overflow: 'hidden',
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 15,
    },
    dot: {
      width: 18,
      height: 3,
      marginHorizontal: 5,
    },
    activeDot: {
      backgroundColor: '#333',
      width: 18,
      height: 3,
    },
    inactiveDot: {
      backgroundColor: '#bbb',
    },
  });

  return (
    <>
      <Carousel
        data={carousalData}
        width={screenWidth * 0.95}
        height={height || 90}
        mode="normal"
        loop
        autoPlay={!!autoPlay}
        autoPlayInterval={3000}
        scrollAnimationDuration={800}
        style={{ alignSelf: 'center' }}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <Card navigation={navigation} styles={styles} item={item} />
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
    </>
  );
}

export default BannerCarousel;
