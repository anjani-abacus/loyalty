import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Caption} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import useActiveTheme from '../Theme/useActiveTheme';
import { Images } from '../../assets';
export default function AppNoDataFound({title}) {
  const {t} = useTranslation();
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useActiveTheme();
  title = t(title || 'NoDataFound');
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
      width: 100,
      height: 100,
    },
  });
  return (
    <View style={styles.noDataContainer}>
      <FastImage
        style={[styles.noDataImg]}
        source={Images.NoData}
        priority={FastImage.priority.high}
        resizeMode={FastImage.resizeMode.contain}
      />

      <Caption style={styles.noDataContent}>{title}</Caption>
    </View>
  );
}
