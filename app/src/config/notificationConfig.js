import { Platform, PermissionsAndroid, Linking } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  } else {
    const authStatus = await messaging().requestPermission();
    if (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('Notification permission granted:', authStatus);
    }
  }
}

export async function getFcmToken() {
  try {
    const token = await messaging().getToken();
    console.log('📱 FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
  }
}

export async function setupNotificationChannel() {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
}

export async function onMessageReceived(message) {
  const payload = JSON.parse(message.data.payload);
  console.log('📩 Notification received:', payload);

  await notifee.displayNotification({
    title: message.notification?.title || message.data?.title,
    body: message.notification?.body || message.data?.body,
    android: {
      channelId: 'default',
      pressAction: {
        id: 'default',          // Required
        launchActivity: 'default', // This makes sure app opens on tap
      },
    },
    data: {
      link: payload.link,
      // link: `com.basiq360.starkpaints.dev:/${payload.deepLinkPath}/${payload?.deepLinkParams?.formType}`,
    },
  });
}
notifee.onForegroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    const link = detail.notification?.data?.link;
    console.log('link ===> ', link);
    if (link) {
      const supported = await Linking.canOpenURL(link);

      if (supported) {
        Linking.openURL(link);
      } else {
        console.warn('Cannot open URL:', link);
      }
      // OR use navigation.navigate if you have navigation ref
    }
  }
});

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.PRESS) {
    const link = detail.notification?.data?.link;
    if (link) {
      await AsyncStorage.setItem('PENDING_DEEPLINK', link);

      // forground working
      // const supported = await Linking.canOpenURL(link);

      // if (supported) {
      //   Linking.openURL(link);
      // } else {
      //   console.warn("Cannot open URL:", link);
      // }
    }
  }
});

export function initializeNotifications() {
  requestUserPermission();
  setupNotificationChannel();

  // Foreground notifications
  const unsubscribeForeground = messaging().onMessage(onMessageReceived);

  // Background & quit state
  messaging().setBackgroundMessageHandler(onMessageReceived);

  // Get token on startup
  // getFcmToken();

  // Listen for token refresh
  messaging().onTokenRefresh((newToken) => {
    console.log('🔄 New FCM token:', newToken);
    // Send refreshed token to backend
  });

  return () => {
    unsubscribeForeground();
  };
}
