import {View, Text, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import useActiveTheme from '../Theme/useActiveTheme';
import {Icon} from '@rneui/themed';
import ImageViewer from 'react-native-image-viewing';
import {useTranslation} from 'react-i18next';

export default ConfirmationModal = ({
  modalVisible,
  setModalVisible,
  confirmSubmit,
  title,
  content,
  theme,
  iconType,
  iconName,
  iconBgColor = '',
  iconColor = '',
  children = null,
}) => {
  const activeTheme = useActiveTheme();
  const {t} = useTranslation();
  const themes = {
    Alert: {
      background: activeTheme.AlertBackground,
      fill: activeTheme.AlertContent,
    },
    Submit: {
      background: activeTheme.SubmitBackground,
      fill: activeTheme.SubmitContent,
    },
    Delete: {
      background: activeTheme.DeleteBackground,
      fill: activeTheme.DeleteContent,
    },
    Success: {
      background: activeTheme.SuccessBackground,
      fill: activeTheme.SuccessContent,
    },
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.modalView}>
        <View style={styles.modalContent}>
          <View
            style={{
              borderRadius: 25,
              backgroundColor: iconBgColor,
              height: 50,
              width: 50,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <Icon
              name={theme == 'Delete' ? 'delete' : iconName}
              type={iconType}
              style={{alignItems: 'center'}}
              color={iconColor}
              size={20}
            />
          </View>
          <Text style={styles.modalText}>{title}</Text>
          <Text style={styles.modalContentText}>{content}</Text>
          {children}
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[
                styles.modalButton,
                {backgroundColor: activeTheme.themeColor, marginBottom: 8},
              ]}
              onPress={() => {
                setModalVisible(false);
                confirmSubmit();
              }}>
              <Text style={styles.modalButtonText2}>
                {theme == 'Delete'
                  ? t('Delete')
                  : theme == 'Alert'
                  ? t('Yes')
                  : theme == 'Logout'
                  ? t('Logout')
                  : t('Submit')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>
                {theme == 'Alert' ? t('No') : t('Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const ImageModal = ({ modalVisible, setModalVisible, url }) => {
  // Normalize the URL safely
  const getImageUri = (path) => {
    const uri = String(path || ''); // ✅ ensures it's always a string

    if (!uri) {return '';}

    if (uri?.startsWith('file://') || uri?.startsWith('data:') || uri?.startsWith('https://')) {
      return uri;
    }

    // If missing prefix, assume it's a local file path
    return 'file://' + uri;
  };

  const imageUri = getImageUri(url);

  return (
    <ImageViewer
      imageIndex={0}
      images={[{ uri: imageUri }]}
      visible={modalVisible}
      swipeToCloseEnabled={true}
      onRequestClose={() => setModalVisible(false)}
    />
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 25,
  },
  modalContent: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 30,
  },
  modalText: {
    fontSize: 18,
    color: '#2B3348',
    fontWeight: '700',
    marginBottom: 10,
  },
  modalContentText: {
    fontSize: 18,
    color: '#2B3348',
    marginBottom: 20,
    width: 330,
    textAlign: 'center',
  },
  modalButtons: {
    width: '100%',
    marginHorizontal: 30,
  },
  modalButtonText2: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#FFF',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  modalButtonText: {
    color: '#2B3348',
    fontSize: 15,
    fontWeight: '500',
  },
});
