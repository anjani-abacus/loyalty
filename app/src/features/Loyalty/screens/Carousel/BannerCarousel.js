import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';

const { width: screenWidth } = Dimensions.get('window');

const Card = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <FastImage
        source={{
          uri: item?.banner_image,
          priority: FastImage.priority.high,
        }}
        style={styles.bannerImage}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
};

function BannerCarousel({ data, autoPlay, height }) {
  const activeTheme = useActiveTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        width={screenWidth}
        height={height || 180}
        mode="normal"
        loop
        autoPlay={!!autoPlay}
        autoPlayInterval={3000}
        scrollAnimationDuration={800}
        style={{ alignSelf: 'center' }}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <Card item={item} />
        )}
      />

      <View style={styles.paginationContainer}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  cardContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  dot: {
    width: 8,
    height: 3,
    marginHorizontal: 4,
    borderRadius: 2,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 20,
  },
  inactiveDot: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default BannerCarousel;
