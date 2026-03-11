import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useActiveTheme from '../Theme/useActiveTheme';
import { useLeaderBoardUserRank } from '../../../api/hooks/useMasters';

import { Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const { width } = Dimensions.get('window');

const CompetitiveBanner = ({ navigation }) => {
  const currentRank = 7;
  const totalPlayers = 1247;
  const activeTheme = useActiveTheme();
  const { data: userRank, refetch } = useLeaderBoardUserRank();

  // Generate animated bars data
  const generateBars = () => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      height: Math.random() * 60 + 20,
      color: i < 3 ? '#FFD700' : i < 5 ? '#FF6B35' : '#6C5CE7',
      delay: i * 0.1,
    }));
  };

  const bars = generateBars();

  const AnimatedBar = ({ height, color }) => (
    <View style={styles.barContainer}>
      <View
        style={[
          styles.bar,
          {
            height: height,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );

  const BackgroundDots = () => (
    <View style={styles.backgroundPattern}>
      {Array.from({ length: 20 }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            {
              left: Math.random() * (width - 32),
              top: Math.random() * 120,
            },
          ]}
        />
      ))}
    </View>
  );
  const styles = StyleSheet.create({
    /* -------------------------------------------------------------
      MAIN CONTAINER
    ------------------------------------------------------------- */
    container: {
      backgroundColor: '#fff',
      borderRadius: 14,
      padding: 5,
      flexDirection: 'row',
      marginVertical: 10,
      borderWidth: 1,
      borderColor: '#E3E3E3',
      position: 'relative',
      overflow: 'hidden',
    },

    /* Background Pattern */
    backgroundPattern: {
      position: 'absolute',
      inset: 0,
    },

    dot: {
      position: 'absolute',
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: activeTheme.Secondary,
      opacity: 0.08,
    },

    /* -------------------------------------------------------------
      LEFT SECTION
    ------------------------------------------------------------- */
    leftSection: {
      flex: 1,
      justifyContent: 'center',
    },

    rankContainer: {
      gap: 6,
    },

    rankBadge: {
      backgroundColor: 'rgba(255,196,0,0.12)',
      paddingHorizontal: 20,
      paddingVertical: 4,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: 'rgba(255,196,0,0.6)',
      alignSelf: 'flex-start',
    },

    rankNumber: {
      fontSize: 22,
      fontWeight: '700',
      color: '#FFC400',
    },

    rankLabel: {
      fontSize: 10,
      color: activeTheme.text,
      opacity: 0.7,
    },

    totalPlayers: {
      fontSize: 10,
      color: activeTheme.text,
      opacity: 0.5,
    },

    /* -------------------------------------------------------------
      CENTER SECTION
    ------------------------------------------------------------- */
    centerSection: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    /* -------------------------------------------------------------
      RIGHT SECTION
    ------------------------------------------------------------- */
    rightSection: {
      alignItems: 'center',
      paddingVertical: 8,
    },

    /* -------------------------------------------------------------
      LEADERBOARD HEADER
    ------------------------------------------------------------- */
    leaderboardContent: {
      flex: 1,
    },

    leaderboardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
      alignItems: 'center',
    },

    leaderboardTitle: {
      fontSize: 16,
      fontWeight: '700',
      paddingLeft:10,
      color: activeTheme.text,
    },

    chevronContainer: {
      borderRadius: 20,
      padding: 8,
      flexDirection: 'row',
    },

    gradientOverlay: {
      ...StyleSheet.absoluteFillObject,
      pointerEvents: 'none',
    },

    /* -------------------------------------------------------------
      PREMIUM NEW SECTION (State/District Cards)
    ------------------------------------------------------------- */
    sectionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
    },

    section: {
      width: '49%',
      backgroundColor:'#f2f4fbff',
      padding:5,
      borderRadius:16,
    },

    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },

    sectionTitle: {
      fontSize: 15,
      fontWeight: '800',
      color: activeTheme.text,
      letterSpacing: 0.3,
    },

    accentDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: activeTheme.Primary,
      marginRight: 6,
    },

    rankRow: {
      flexDirection: 'row',
      gap: 12,
    },

    rankPressable: {
      flex: 1,
    },

    rankCard: {
      paddingVertical: 12,
      paddingHorizontal: 14,
      borderRadius: 12,
      alignItems: 'center',

      /* Softer premium shadow */
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { height: 2, width: 0 },
    },

    cardPressed: {
      transform: [{ scale: 0.96 }],
    },

    premiumRankNumber: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FF8A2D',
      marginBottom: 2,
    },

    premiumRankLabel: {
      fontSize: 13,
      fontWeight: '600',
      color: '#222EAE',
    },
  });


  return (
    <TouchableOpacity onPress={() => navigation.navigate('LeaderBoard')} style={styles.container}>
      {/* Background pattern */}
      <BackgroundDots />

      {/* Left side - Rank */}

      <View style={styles.leftSection}>
        <View style={styles.rankContainer}>
          <Text style={styles.leaderboardTitle}>Leaderboard</Text>

          <View style={styles.sectionRow}>
            {/* State Wise */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.accentDot} />
                <Text style={styles.sectionTitle}>State Wise</Text>
              </View>

              <View style={styles.rankRow}>
                <Pressable style={styles.rankPressable}>
                  {({ pressed }) => (
                    <LinearGradient
                      colors={pressed ? ['#FFE0C7', '#FFC299'] : ['#FFF5EC', '#FFEAD7']}
                      style={[styles.rankCard, pressed && styles.cardPressed]}
                    >
                      <Text style={styles.rankNumber}>
                        #{userRank?.data?.user?.ranks?.state?.week}
                      </Text>
                      <Text style={styles.rankLabel}>Weekly</Text>
                    </LinearGradient>
                  )}
                </Pressable>

                <Pressable style={styles.rankPressable}>
                  {({ pressed }) => (
                    <LinearGradient
                      colors={pressed ? ['#C7D9FF', '#AFC8FF'] : ['#EEF3FF', '#DDE8FF']}
                      style={[styles.rankCard, pressed && styles.cardPressed]}
                    >
                      <Text style={styles.rankNumber}>
                        #{userRank?.data?.user?.ranks?.state?.month}
                      </Text>
                      <Text numberOfLines={1} style={styles.rankLabel}>Monthly</Text>
                    </LinearGradient>
                  )}
                </Pressable>
              </View>
            </View>

            {/* District Wise */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.accentDot} />
                <Text style={styles.sectionTitle}>District Wise</Text>
              </View>

              <View style={styles.rankRow}>
                <Pressable style={styles.rankPressable}>
                  {({ pressed }) => (
                    <LinearGradient
                      colors={pressed ? ['#FFE0C7', '#FFC299'] : ['#FFF5EC', '#FFEAD7']}
                      style={[styles.rankCard, pressed && styles.cardPressed]}
                    >
                      <Text style={styles.rankNumber}>
                        #{userRank?.data?.user?.ranks?.district?.week}
                      </Text>
                      <Text style={styles.rankLabel}>Weekly</Text>
                    </LinearGradient>
                  )}
                </Pressable>

                <Pressable style={styles.rankPressable}>
                  {({ pressed }) => (
                    <LinearGradient
                      colors={pressed ? ['#C7D9FF', '#AFC8FF'] : ['#EEF3FF', '#DDE8FF']}
                      style={[styles.rankCard, pressed && styles.cardPressed]}
                    >
                      <Text style={styles.rankNumber}>
                        #{userRank?.data?.user?.ranks?.district?.month}
                      </Text>
                      <Text numberOfLines={1} style={styles.rankLabel}>Monthly</Text>
                    </LinearGradient>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </View>

      </View>



      {/* Gradient overlay effect */}
      <View style={styles.gradientOverlay} />
    </TouchableOpacity>
  );
};


{/* <View
        style={styles.rightSection}
      >
        <View style={styles.chevronContainer}>
          <Text style={styles.leaderboardTitle}>Leaderboard</Text>
          <Icon name="chevron-right" size={20} color={activeTheme.text} />
        </View>
        <Icon name="leaderboard" size={80} color={'rgba(40, 54, 205, 1)'} />
      </View> */}

export default CompetitiveBanner;
