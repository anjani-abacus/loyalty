import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Dialog, Button} from 'react-native-paper';
import AppTheme from '../Theme/AppTheme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import useActiveTheme from '../Theme/useActiveTheme';

export default function AppDialog({visible, hideDialog, icon, title, content}) {
  const activeTheme = useActiveTheme();

  const styles = StyleSheet.create({
    Title: {
      textAlign: 'center',
      fontSize: 16,
      fontFamily: 'Sequel Sans Heavy Head',
      color: activeTheme.LightGrey,
    },
    MainContent: {
      textAlign: 'center',
      fontSize: 12,
      backgroundColor: activeTheme.Light,
      borderRadius: 8,
      alignItems: 'center',
    },
    Content: {
      textAlign: 'center',
      fontSize: 12,
      color: activeTheme.TextColor,
    },
    Button: {
      paddingVertical: 16,
      display: 'flex',
      borderTopWidth: 1,
      borderColor: activeTheme.Lightest,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <Dialog style={styles.MainContent} visible={visible} onDismiss={hideDialog}>
      <MaterialIcons size={32} color={activeTheme.Danger} name={icon} />
      <Dialog.Title style={styles.Title}>{title}</Dialog.Title>
      <Dialog.Content>
        <Text style={styles.Content} variant="bodyMedium">
          {content}
        </Text>
      </Dialog.Content>
      <TouchableOpacity style={styles.Button} onPress={hideDialog}>
        <Text style={{color: activeTheme.TextColor, fontWeight: '700'}}>
          OK
        </Text>
      </TouchableOpacity>
    </Dialog>
  );
}
