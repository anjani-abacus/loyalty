import React, {useEffect, useState} from 'react';
import {Platform, Linking, PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AppDialog from '../Dialog/AppDialog';
import {ApiCall} from '../../services/ServiceProvider';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';
import {Icon} from '@rneui/themed';
const GeoLocationComponent = ({StartCheckin}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [accountSuspended, setAccountSuspended] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGeoLocation = async () => {
      await getGeoLocation();
    };
    fetchGeoLocation();
  }, []);

  const getGeoLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();

        Geolocation.getCurrentPosition(
          async position => {
            if (position.mocked) {
              setAccountSuspended(true);
              setDialogVisible(true);
              setTitle('Third Party App in Use');
              setContent('Your account is blocked');
            } else {
              setDialogVisible(false);
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              StartCheckin(lat, lng);
            }
          },
          error => {
            if (error.code === 1) {
              setDialogVisible(true);
              setTitle('Please Turn On Location');
              setContent('Go to settings and turn on location permission');
            } else if (error.code === 2) {
              setDialogVisible(true);
              setTitle('Location Error');
              setContent(error.message);
            }
          },
        );
      } catch (error) {
        if (error instanceof Error) {
          toast.show(
            'Location Services are disabled. Please enable them to use this feature.',
            {
              type: 'danger',
              duration: 3000,
              icon: (
                <Icon
                  name="error"
                  type="material-community-icons"
                  color="white"
                  size={20}
                />
              ),
            },
          );
        }
      }
    }
  };

  const hideAlertDialog = async () => {
    if (!accountSuspended) {
      if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
      } else {
        Linking.openSettings();
      }
    } else {
      setIsLoading(true);
      try {
        const result = await ApiCall(
          {
            app_name: 'name',
            package_name: 'package',
          },
          'Login/thirdPartyDisabled',
        );
        if (result.statusCode === 200) {
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setDialogVisible(false);
  };

  return (
    <>
      <AppDialog
        visible={dialogVisible}
        hideDialog={hideAlertDialog}
        icon="error"
        title={title}
        content={content}
      />
    </>
  );
};

export default GeoLocationComponent;
