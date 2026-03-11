import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Dimensions } from 'react-native';

const options = ['SFA', 'LOYALTY', 'DMS'];
const screenWidth = Dimensions.get('window').width;

export default function SlidingRadioButtons({selectedUserType, setSelectedUserType}) {

  const slideAnim = useRef(new Animated.Value(1)).current;

  const handlePress = (index) => {
    setSelectedUserType(options[index]);
    Animated.timing(slideAnim, {
      toValue: index,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const segmentWidth = screenWidth * 0.95 / options.length;

  return (
    <View style={styles.container}>
      <View style={styles.radioWrapper}>
        <Animated.View
          style={[
            styles.slider,
            {
              width: segmentWidth,
              left: slideAnim.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, segmentWidth, segmentWidth * 2],
              }),
            },
          ]}
        />
        {options.map((opt, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(index)}
            style={styles.option}>
            <Text style={[styles.optionText, selectedUserType === options[index] && styles.activeText]}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 40,
  },
  radioWrapper: {
    flexDirection: 'row',
    width: screenWidth * 0.95,
    height: 48,
    backgroundColor: '#EFF6FF',
    borderRadius: 25,
    overflow: 'hidden',
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#004CAC',
    borderRadius: 25,
    zIndex: 0,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  optionText: {
    color: '#333',
    fontWeight: '600',
  },
  activeText: {
    color: 'white',
  },
});
