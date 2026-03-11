import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import AuthStack from '../auth/AuthStack';
import { BlurView } from '@react-native-community/blur';
import LottieView from 'lottie-react-native';
import NetInfo from '@react-native-community/netinfo';
import AppNoInternet, { AuthorizationScreen } from '../core/components/No_Internet_Connection/AppNoInternet';
import { StatusBarHeader } from '../core/components/StatusBar/StatusBar';
import AppNavigator from './AppNavigator';

import React from 'react';
import { View, ActivityIndicator, StyleSheet ,Image} from 'react-native';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import { Images } from '../core/assets';
import FastImage from 'react-native-fast-image';
import useTheme from '../core/components/Theme/useTheme';
import { useTranslation } from 'react-i18next';

const AppNav = () => {
  const { loginToken, loading, isLoggingOut, activeStatusConfig } = useContext(AuthContext);
  const [connectStatus, setConnectStatus] = useState(false);
  const { t } = useTranslation();
  const [checking, setChecking] = useState(false);
  const activeTheme = useTheme();
  const handleRetry = () => {
    setChecking(true);
    NetInfo.fetch().then((state) => {
      setChecking(false);
      if (state.isConnected) {
        alert('Internet connected!');
      } else {
        alert('No Internet');
      }
    });
  };

  useEffect(() => {
    NetInfo.addEventListener(networkState => {
      if (networkState.isConnected) {
        setConnectStatus(true);
      } else {
        setConnectStatus(false);
      }
    });
  }, []);


  if (loading || isLoggingOut) {
    return (
      <View style={{ flex: 1, backgroundColor:activeTheme.maincontainer, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        {isLoggingOut && (
          <FastImage
            style={[{ width: '80%', height: 40, marginTop: 20 }]}
            resizeMode={FastImage.resizeMode.contain}
            source={Images.LoyaltyLogo}
          />
        )}
      </View>
    );
  }

  if (!connectStatus) {
    return <AuthorizationScreen handlerFn={handleRetry} isLoading={checking} image={Images.noInternet} imageSize={'cover'} handler={true} title={t('No_Internet_Connection')} message={t('Please_check_your_connection_and_try_again')} />;
  }

  return <>
    {/* <StatusBarHeader {...activeStatusConfig} /> */}

    {!loginToken ? <AuthStack /> : <><AppNavigator /><GlobalLoader /></>}

  </>;
};
export default AppNav;



export const GlobalLoader = () => {
  const isFetching = useIsFetching({
    predicate: query => { return query.meta?.showGlobalLoader !== false; },
  });
  const isMutating = useIsMutating({
    predicate: mutation => { return mutation.meta?.showGlobalLoader !== false; },
  });

  const loading = isFetching + isMutating > 0;
  const activeTheme = useTheme();

  const styles = StyleSheet.create({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent dark background
      justifyContent: 'center',
      alignItems: 'center',
    },
    blurView: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

  });
  if (!loading) {return null;}

  return (
    <View style={styles.overlay}>
      <BlurView
        style={styles.blurView}
        blurType="light"
        blurAmount={4}
        reducedTransparencyFallbackColor={activeTheme.maincontainer}
      />
     <LottieView
        source={require('../core/assets/utils/LoadingDotsBlue.json')}
        autoPlay
        loop

        style={{ width: 500, height: 500 ,zIndex: 1000}}
      />
    </View>
  );
};

