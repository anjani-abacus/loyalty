import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window');

const defaultDataWith6Colors = [
  '#B0604D',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
];

const Card = ({children, styles, item, index }) => {
  return (
          <View style={[styles.card, { backgroundColor: item }]}>
            {children}
          </View>
        );
      };

function BannerCarousel({autoPlay, showIndicator, height, children }) {
  const [activeIndex, setActiveIndex] = useState(0); // ✅ Track current index
  const styles = StyleSheet.create({
    card: {
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 0,
    },
    paginationContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 5,
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
        data={defaultDataWith6Colors}
        width={screenWidth * 0.95}
        height={height || 80}
        mode="normal"
        loop
        autoPlay={autoPlay || false}
        autoPlayInterval={3000}
        scrollAnimationDuration={800}
        style={{ alignSelf: 'center' }}
        onSnapToItem={(index) => setActiveIndex(index)} // ✅ Update state on snap
        renderItem={({item, index})=><Card children={children} styles={styles} item={item} index={index} />}
      />

      {showIndicator && <View style={styles.paginationContainer}>
        {defaultDataWith6Colors.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>}
    </>
  );
}

export default BannerCarousel;
