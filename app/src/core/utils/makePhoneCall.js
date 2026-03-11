import React from 'react';
import { Linking } from 'react-native';

export default makePhoneCall = phoneNumber => {
    let phoneNumberToCall = '';
    if (Platform.OS === 'android') {
      phoneNumberToCall = `tel:${phoneNumber}`;
    } else {
      phoneNumberToCall = `telprompt:${phoneNumber}`;
    }

    Linking.openURL(phoneNumberToCall).catch(error =>
      {}
    );
};
