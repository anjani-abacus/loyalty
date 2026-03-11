import React from 'react';
import {Share, Alert} from 'react-native';
import {Button} from 'react-native-paper';

const ShareComponent = ({
  recipientName,
  senderName,
  message,
  buttonStyle,
  textColor,
  activeTheme,
}) => {
  const onShare = async () => {
    const shareData = `Dear ${recipientName},\n\n${message}\n\nThanks & Regards,\n${senderName}`;

    try {
      const result = await Share.share({
        message: shareData,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Handle specific activity type if needed
        } else {
          // Successfully shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Button
      icon="share-variant-outline"
      textColor={textColor || activeTheme.themeColor}
      mode="outlined"
      style={{
        width: '100%',
        borderRadius: 6,
        marginTop: 12,
        borderColor: activeTheme.themeColor,
        backgroundColor: '#fff',
        ...buttonStyle,
      }}
      onPress={onShare}>
      Share
    </Button>
  );
};

export default ShareComponent;
