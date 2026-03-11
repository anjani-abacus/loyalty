import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useActiveTheme from '../Theme/useActiveTheme';
const {width, height} = Dimensions.get('window');

const CongratulationScreen = ({amount, onClose}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [translateAnim] = useState(new Animated.Value(40));
  const activeTheme = useActiveTheme();
  useEffect(() => {
    // Animation for entrance effect
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    }, 100);

    return () => clearTimeout(timer);
  }, [fadeAnim, translateAnim]);

  const renderStars = () => {
    return [...Array(20)].map((_, i) => (
      <View
        key={i}
        style={[
          styles.star,
          {
            left: Math.random() * width,
            top: Math.random() * height,
          },
        ]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.backgroundGradient}
      />

      {/* Stars Background */}
      <View style={styles.starsContainer}>{renderStars()}</View>

      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{translateY: translateAnim}],
          },
        ]}>
        <TouchableOpacity
          style={{position: 'relative', top: -150, left: 150}}
          onPress={onClose}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{marginBottom:4,color:activeTheme.White}}>Skip</Text>
            <Icon name="chevron-right" size={24} color={activeTheme.White} />
          </View>
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.congratulationsText}>Congratulations</Text>
          <Text style={styles.youWonText}>you won {amount} Points</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>+{amount} </Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  starsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  star: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#fbbf24',
    borderRadius: 2,
    opacity: 0.3,
  },
  content: {
    alignItems: 'center',
    zIndex: 10,
  },
  textContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  congratulationsText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 2,
    // Gradient text effect - you might need a library like react-native-linear-gradient-text
    // or use multiple Text components with different colors for gradient effect
  },
  youWonText: {
    fontSize: 24,
    color: '#d1d5db',
    fontWeight: '300',
    textAlign: 'center',
  },
  amountContainer: {
    alignItems: 'center',
    justifyContent:'center',
    flexDirection:'row',
    padding:8,
    height:130,
    backgroundColor:'#7d7d7d36',
    borderRadius:22,
  },
  amountText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default CongratulationScreen;
