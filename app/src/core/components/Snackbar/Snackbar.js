import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default function SnackbarComponent({ visible, message, backgroundColor }) {


  return (
    <View
      style={{
        width: Dimensions.get('screen').width,
        position: 'absolute',
        bottom: 0,
        zIndex: 100,
      }}>
      <Snackbar
        style={{
          textContent: {
            fontSize: 11,
          },
          backgroundColor: backgroundColor,
        }}
        elevation={0}
        visible={visible}
        duration={2000}
        onDismiss={() => visible = false}
      >
        {message}
      </Snackbar>
    </View>
  );
}
