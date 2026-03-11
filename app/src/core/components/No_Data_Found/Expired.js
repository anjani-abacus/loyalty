import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Caption} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

export default function Expired() {
  const {t} = useTranslation();
  const styles = StyleSheet.create({
    noDataContent: {
      fontSize: 16,
      lineHeight: 25,
    },
    noDataContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 24,
    },

    noDataImg: {
      width: 150,
      height: 150,
    },
  });
  return (
    <View style={styles.noDataContainer}>
      <Image
        resizeMode="contain"
        style={styles.noDataImg}
        source={require('../../assets/SVGs/Expired.jpeg')}
      />
    </View>
  );
}
