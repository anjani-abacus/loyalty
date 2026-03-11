import 'react-native-reanimated';
import { PermissionsAndroid } from 'react-native';

import {
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
  requestNotifications,
} from 'react-native-permissions';
import { Alert, Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

const handlePermissionResult = (result, permissionName) => {
  if (result === RESULTS.GRANTED) {
    return true;
  }

  if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
    Alert.alert(
      `${permissionName} Permission Required`,
      `Please enable ${permissionName.toLowerCase()} access from settings to use this feature.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openSettings() },
      ],
    );
  }

  return false;
};

export const requestCameraPermission = async () => {
  const permission = isIOS
    ? PERMISSIONS.IOS.CAMERA
    : PERMISSIONS.ANDROID.CAMERA;

  const result = await request(permission);
  return handlePermissionResult(result, 'Camera');
};

export const requestPhotoLibraryPermission = async () => {
  const permission = isIOS
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

  const result = await request(permission);
  return handlePermissionResult(result, 'Gallery');
};

export const requestNotificationPermission = async () => {
  const permission = isIOS
    ? PERMISSIONS.IOS.NOTIFICATIONS
    : PERMISSIONS.ANDROID.POST_NOTIFICATIONS;

  const result = await requestNotifications(['alert', 'sound'], {
        title: 'Notification Permissions',
        message: 'Notification may include alerts, sound and icon badgets. Please Click On To "Allow"',
        buttonPositive: 'Allow',
        buttonNegative: 'Cancel',
      });
  return handlePermissionResult(result, 'Notification');
};
