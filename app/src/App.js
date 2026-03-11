import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import useTheme from './core/components/Theme/useTheme';
import Statusbar, { FooterBar } from './core/components/StatusBar/StatusBar';
import AuthProvider from './auth/AuthContext';
import ThemeProvider from './context/ThemeContext';
import AppNav from './navigation/AppNav';
import 'react-native-reanimated';
import i18n from '../src/core/screens/Language/i18n/i18n.config';
import RNBootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import VersionCheck from 'react-native-version-check';

import { initializeNotifications } from './config/notificationConfig';
import { Alert, AppState, Linking, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { toastConfig } from './services/ToastService';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import { flushPendingNavigation, navigationRef } from './services/navigationService';


if (__DEV__) {
  try {
    require('../ReactotronConfig');
  } catch (error) {
    console.warn('ReactotronConfig failed to load:', error);
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // retry once globally
    },
  },
});


const checkAppUpdate = async () => {
  try {
    console.log('checkAppUpdate started');

    // Get current version
    const currentVersion = VersionCheck.getCurrentVersion();
    console.log('Current version:', currentVersion);

    // Only check for updates if app is published on store
    // Skip version check in development or if app is not published
    if (__DEV__) {
      console.log('Skipping version check in development mode');
      return;
    }

    // Get latest version with timeout and better error handling
    const latestVersion = await Promise.race([
      VersionCheck.getLatestVersion(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Network timeout')), 15000)
      ),
    ]).catch((error) => {
      console.log('Error getting latest version:', error.message);

      // Check if it's a "not found" error (app not published)
      if (error.message && error.message.includes('Parse Error')) {
        console.log('App not found on store - likely not published yet');
        return null;
      }
      return null;
    });

    console.log('Latest version:', latestVersion);
    console.log('Versions comparison - Current:', currentVersion, 'Latest:', latestVersion);

    // Only show update if we have valid versions and they're different
    if (latestVersion &&
      latestVersion !== 'undefined' &&
      latestVersion !== null &&
      currentVersion !== latestVersion &&
      latestVersion !== '0.0.0' &&
      latestVersion !== currentVersion) {
      console.log('Update available - showing alert');
      Alert.alert(
        'Update Available',
        `A new version (${latestVersion}) is available. You are currently on version ${currentVersion}.`,
        [
          {
            text: 'Later',
            style: 'cancel',
          },
          {
            text: 'Update Now',
            onPress: () => {
              try {
                const storeUrl = Platform.OS === 'ios'
                  ? VersionCheck.getAppStoreUrl({
                    appID: 'com.basiq360.starkpaints',
                  })
                  : VersionCheck.getPlayStoreUrl({
                    packageName: 'com.basiq360.starkpaints',
                  });
                console.log('Opening store URL:', storeUrl);
                Linking.openURL(storeUrl);
              } catch (linkError) {
                console.log('Error opening store URL:', linkError);
              }
            },
          },
        ]
      );
    } else if (latestVersion === null) {
      console.log('App not published on store yet - version check disabled');
    } else {
      console.log('App is up to date or could not determine latest version');
    }
  } catch (err) {
    console.log('checkAppUpdate error:', err);
  }
};

const ThemedApp = () => {
  const activeTheme = useTheme();

  useEffect(() => {
    const isLightBackground = activeTheme.overlayBackground === '#fff';
    SystemNavigationBar.setNavigationColor(activeTheme.overlayBackground, isLightBackground ? 'dark' : 'light');
  }, [activeTheme]);


  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}
        onReady={() => {
          console.log('Navigation ready ✅');
          flushPendingNavigation();
        }}>
        <Statusbar />
        <AppNav />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

function App() {
  // const activeTheme = useTheme();
  const LaguageFunction = async () => {
    await AsyncStorage.getItem('language').then(value => {
      if (value) {i18n.changeLanguage(value);}
    }).catch((err) => {
      console.log('lang error: ', err);
    });
  };

  useEffect(() => {
    RNBootSplash.hide({ fade: true });
    console.log('splash closed');
    console.log('VersionCheck object:', VersionCheck);
    console.log('VersionCheck methods:', Object.getOwnPropertyNames(VersionCheck));
    try {
      checkAppUpdate();
    } catch (error) {
      console.log('Error calling checkAppUpdate:', error);
    }
    LaguageFunction();

    // Check for app updates

    const unsubscribe = initializeNotifications();
    return unsubscribe; // cleanup on unmount
  }, []);

  useEffect(() => {
    const handleAppStateChange = async (nextState) => {
      if (nextState === 'active') {
        const link = await AsyncStorage.getItem('PENDING_DEEPLINK');
        console.log(link);
        if (link) {
          await AsyncStorage.removeItem('PENDING_DEEPLINK');
          Linking.openURL(link);
        }
      }
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>

            <PaperProvider theme={{ ...MD3LightTheme, colors: { ...MD3LightTheme.colors } }}>
              <ThemedApp />
              <Toast config={toastConfig} />
            </PaperProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
  );
}

export default App;
