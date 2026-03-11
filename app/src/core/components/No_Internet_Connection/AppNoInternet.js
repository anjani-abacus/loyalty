import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import useTheme from '../Theme/useTheme';
import FastImage from 'react-native-fast-image';
import { Images } from '../../assets';
import { useTranslation } from 'react-i18next';

const NoInternetScreen = () => {
  const [checking, setChecking] = useState(false);
  const activeTheme = useTheme();
  const {t} = useTranslation();


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: activeTheme.maincontainer,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: activeTheme.text,
    },
    message: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
      color: activeTheme.text,
    },
    button: {
      paddingHorizontal: 30,
      paddingVertical: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: activeTheme.themeColor,
      fontSize: 16,
      textDecorationLine:'underline',
      fontWeight: '600',
    },
  });

  const handleRetry = () => {
    setChecking(true);
    NetInfo.fetch().then((state) => {
      setChecking(false);
      if (state.isConnected) {
        // ✅ Internet is back
        console.log('Internet connected!');
        // You can navigate back or reload API/data here
      } else {
        // ❌ Still no internet
        console.log('No Internet');
      }
    });
  };

  return (
    <View style={styles.container}>
      <FastImage
        style={[{ width: '100%', height: 280}]}
        resizeMode={FastImage.resizeMode.cover}
        source={Images.noInternet}
      />
      <Text style={styles.title} />
      <Text style={styles.message} />

      <TouchableOpacity style={styles.button} onPress={handleRetry} disabled={checking}>
        {checking ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{t('Retry')}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const AuthorizationScreen = ({image, imageSize, handler, title = '', message = '', handlerFn = ()=>{}, isLoading = false}) => {

  const activeTheme = useTheme();
  const {t} = useTranslation();


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: activeTheme.maincontainer,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
      color: activeTheme.text,
    },
    message: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 20,
      color: activeTheme.text,
    },
    button: {
      paddingHorizontal: 30,
      paddingVertical: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: activeTheme.themeColor,
      fontSize: 16,
      textDecorationLine:'underline',
      fontWeight: '600',
    },
  });



  return (
    <View style={styles.container}>
      <FastImage
        style={[{ width: '100%', height: 280}]}
        resizeMode={FastImage.resizeMode[imageSize]}
        source={image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>
        {message}
      </Text>

      {handler && <TouchableOpacity style={styles.button} onPress={handlerFn} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{t('Retry')}</Text>
        )}
      </TouchableOpacity>}
    </View>
  );
};


export default NoInternetScreen;
