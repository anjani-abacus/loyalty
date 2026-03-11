
// ToastConfig.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Linking, Text } from 'react-native';
import Toast, { BaseToast } from 'react-native-toast-message';
import ThemedText from '../core/components/ThemedText';
import { navigate } from './navigationService';
export const toastConfig = () => {
  return ({
    customSuccess: ({ text1, text2, props }) => (
      <View style={styles.successContainer}>
        <View style={styles.message}>
          <View>
            <ThemedText style={styles.title}>{text1}</ThemedText>
            {/* <TouchableOpacity onPress={() => Toast.hide()}>
              <ThemedText style={styles.close}>Close</ThemedText>
            </TouchableOpacity> */}
          </View>
          <ThemedText style={styles.subtitle}>{text2}</ThemedText>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => {
            Toast.hide();
            props?.navigation.navigate(props?.navigateTo || 'TargetScreen');
          }}>
            <ThemedText style={styles.view}>View History?</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    ),

    customError: ({ text1, text2, props }) => (
      <View style={styles.toastContainer}>
        <View style={styles.message}>
          <View>
            <ThemedText style={[styles.title, {color:'#f00'}]}>{text1}</ThemedText>
          </View>
          <ThemedText style={styles.subtitle}>{text2}</ThemedText>
        </View>
      </View>
    ),
    customFile: ({ text1 = 'a', fileUrl = '', props }) => (
  <BaseToast
    style={{ borderLeftColor: '#4CAF50' }}
    contentContainerStyle={{ paddingHorizontal: 15 }}
    text1={text1}
    renderTrailingIcon={() => (
      <TouchableOpacity onPress={() => Linking.openURL(props?.fileUrl)}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
          Open File
        </Text>
      </TouchableOpacity>
    )}
  />
),
  });
};

const styles = StyleSheet.create({
  // --- From First Style ---
  base: {
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 10,
    marginTop: 10,
  },
  message: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    color: '#555',
    fontSize: 14,
  },
  close: {
    color: '#f00',
    marginLeft: 12,
  },
  action: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  info: {
    backgroundColor: '#dff3ff',
    borderLeftWidth: 5,
    borderLeftColor: '#2196F3',
  },
  success: {
    backgroundColor: '#e0f8e9',
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#f44336',
    borderLeftWidth: 5,
    borderLeftColor: '#fff',
  },
  toastContainer: {
    backgroundColor: '#f5455c',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#f5455c',
    width:'95%',
  },
  successContainer: {
    padding: 12,
    borderRadius: 10,
    width:'95%',
    backgroundColor: '#e0f8e9',
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  actions: {
    flexDirection: 'row',
  },
  view: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 12,
  },
});
