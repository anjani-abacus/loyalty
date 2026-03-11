import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@rneui/themed';
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheet } from '@rneui/themed';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import {
  launchImageLibrary,
  launchCamera,
  launchDoc,
} from 'react-native-image-picker';
import { Camera } from 'react-native-vision-camera';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { Images } from '../../assets';
import FastImage from 'react-native-fast-image';
import { AppCamera } from '../Camera/AppCamera';
import useActiveTheme from '../Theme/useActiveTheme';
const AttachImages = ({
  title,
  pdf = [],
  setPdf,
  camera = true,
  gallery = true,
  isMultiple = true,
  pdfUpload = false,
  style,
  images,
  setImages,
  labelStyle,
  onModal = false,
  isAddButtonShow = true,
  navigation,
  onlyCamera,
}) => {
  const GlobelStyle = useGlobelStyle();
  const bottomSheetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const activeTheme = useActiveTheme();
  const { t } = useTranslation();

  const closeBottomSheet = () => {
    if (onModal) {
      setIsVisible(false);
    } else {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.dismiss();
      }
    }
  };

  const handleImageSelection = response => {
    if (response.didCancel || response.error) {
    } else if (response.assets) {
      const selectedImages = response.assets.map(asset => ({
        base64: 'data:image/jpeg;base64,' + asset.base64,
        uri: asset.uri,
      }));
      if (isMultiple) {
        setImages([...images, ...selectedImages]);
      } else {
        setImages(...selectedImages);
      }
    } else {
      if (isMultiple) {
        setImages([
          ...images,
          {
            uri: response.uri,
            base64: 'data:image/jpeg;base64,' + response.base64,
          },
        ]);
      } else {
        setImages({
          uri: response.uri,
          base64: 'data:image/jpeg;base64,' + response.base64,
        });
      }
    }
    closeBottomSheet();
  };

  const styles = StyleSheet.create({
    addImage: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 100,
      width: 100,
      borderColor: activeTheme.themeColor,
      borderWidth: 1,
      // borderStyle: 'dashed',
      borderRadius: 10,
      marginBottom: 16,
      backgroundColor: activeTheme.backgroundPrimary,
    },
    modal: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      elevation: 10,
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 16,
      gap: 10,
      // zIndex: 10,
    },
    imageWrapper: {
      position: 'relative',
      marginRight: 8,
      zIndex: 10,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 10,
      borderWidth: 0.5,
    },
    deleteButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 4,
      borderRadius: 50,
    },
    bottomSheet: {
      backgroundColor: '#fff',
      // paddingVertical: 24,
      paddingHorizontal: 16,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    bottomSheetOnModal: {
      position: 'absolute',
      left: 50,
      top: 40,
      zIndex: 100,
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    bottomSheetItem: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    bottomSheetText: {
      fontSize: 18,
      textAlign: 'center',
    },
    cancelButton: {
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
    },
    bottomSheetOnModalItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    bottomSheetOnModalText: {
      fontSize: 14,
      textAlign: 'center',
    },
    cancelOnModalButton: {
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
    },
  });
  const selectImagesFromLibrary = async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
        includeBase64: true,
        quality: 0.7,
      },
      handleImageSelection,
    );
  };

  const selectPdfFromLibrary = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.pdf,
      });

      const fileContent = await RNFS.readFile(doc.uri, 'base64');
      setPdf([...pdf, fileContent]);
      closeBottomSheet();
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      }
    }
  };

  const selectImagesFromCamera = async () => {
    try {
      const cameraPermission = await Camera.getCameraPermissionStatus();

      if (cameraPermission != 'granted' || cameraPermission === 'denied') {
        const newCameraPermission = await Camera.requestCameraPermission();

        if (
          newCameraPermission != 'granted' ||
          newCameraPermission === 'denied'
        ) {
          Alert.alert(
            'Camera Permission Denied !',
            'This app needs camera permission to function properly. Please grant camera permission in the settings.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Open Settings',
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ],
          );
        } else {
          setModalVisible(true);
        }
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert(
        'Camera Error',
        'An error occurred while launching the camera. Please try again.',
      );
    }
  };

  const deleteImage2 = index => {
    setPdf(pdf.filter((_, i) => i !== index));
  };

  const deleteImage = index => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <View style={[GlobelStyle.mt16, style]}>
      {isAddButtonShow && (
        <>
          <Text
            style={[
              {
                color: '#2B3348',
                fontSize: 18,
                fontWeight: '600',
                marginBottom: 15,
              },
              labelStyle,
            ]}>
            {title}
          </Text>
        </>
      )}
      <View style={styles.imageContainer}>
        <View style={{ position: 'relative', zIndex: 100 }}>
          <TouchableOpacity
            onPress={() => selectImagesFromCamera()}
            style={styles.addImage}>
            <Icon
              name="add-a-photo"
              type="material"
              style={{ alignItems: 'center', margin: 6 }}
              color={activeTheme.themeColor}
              size={40}
            />
          </TouchableOpacity>
          {onModal && isVisible && (
            <View style={styles.bottomSheetOnModal}>
              {gallery && (
                <TouchableOpacity
                  style={styles.bottomSheetOnModalItem}
                  onPress={selectImagesFromLibrary}>
                  <Text style={styles.bottomSheetOnModalText}>
                    {t('Select from Gallery')}
                  </Text>
                </TouchableOpacity>
              )}
              {camera && (
                <TouchableOpacity
                  style={styles.bottomSheetOnModalItem}
                  onPress={selectImagesFromCamera}>
                  <Text style={styles.bottomSheetOnModalText}>
                    {t('Take a Photo')}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.bottomSheetOnModalItem, styles.cancelButton]}
                onPress={closeBottomSheet}>
                <Text style={[styles.bottomSheetOnModalText, { color: 'red' }]}>
                  {t('Cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {images.length > 0 &&
          images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <FastImage
                style={styles.image}
                source={{ uri: image.base64 }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <TouchableOpacity
                onPress={() => deleteImage(index)}
                style={styles.deleteButton}>
                <Icon
                  name="delete-sweep"
                  type="material"
                  style={{ alignItems: 'center' }}
                  color={'#FFF'}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          ))}
        {pdf.length > 0 &&
          pdf.map((pdf, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={Images.pdf} style={styles.image} />
              <TouchableOpacity
                onPress={() => deleteImage2(index)}
                style={styles.deleteButton}>
                <Icon
                  name="delete-sweep"
                  type="material"
                  style={{ alignItems: 'center' }}
                  color={'#FFF'}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          ))}
      </View>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={['25%']}
        enablePanDown={true}>
        <View style={styles.bottomSheet}>
          {gallery && (
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={selectImagesFromLibrary}>
              <Text style={styles.bottomSheetText}>
                {t('Select from Gallery')}
              </Text>
            </TouchableOpacity>
          )}
          {pdfUpload && (
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={selectPdfFromLibrary}>
              <Text style={styles.bottomSheetText}>{t('Select Pdf')}</Text>
            </TouchableOpacity>
          )}
          {camera && (
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={selectImagesFromCamera}>
              <Text style={styles.bottomSheetText}>{t('Take a Photo')}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.bottomSheetItem, styles.cancelButton]}
            onPress={closeBottomSheet}>
            <Text style={[styles.bottomSheetText, { color: 'red' }]}>
              {t('Cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
      <AppCamera
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onlyCamera={onlyCamera}
        isMultiple={isMultiple}
        setImages={setImages}
        images={images}
      />
    </View>
  );
};

export default AttachImages;

export const CameraGalleryPhotoUpload = ({
  openSheet,
  setOpenSheet,
  setImages,
  obj = {},
  type = '',
}) => {
  const bottomSheetRef = useRef(null);
  const { t } = useTranslation();
  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.dismiss();
      setOpenSheet(!openSheet);
    }
  };

  const selectImagesFromLibrary = () => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 1, includeBase64: true },
      handleImageSelection,
    );
  };

  const handleImageSelection = response => {
    if (!response.didCancel && !response.error && response.assets) {
      const selectedImages = response.assets.map(asset => ({
        base64: 'data:image/jpeg;base64,' + asset.base64,
        uri: asset.uri,
      }));
      closeBottomSheet();
      setImages(selectedImages[0].base64);

      if (type === 'frontSideTake') {
        obj(prev => ({
          ...prev,
          doc_edit_id: prev.id,
          document_image: selectedImages[0].base64,
        }));
      } else if (type === 'backSideTake') {
        obj(prev => ({
          ...prev,
          doc_edit_back_id: prev.id,
          document_image_back: selectedImages[0].base64,
        }));
      } else if (type === 'bankPassBook') {
        obj(prev => ({
          ...prev,
          doc_edit_back_id: prev.id,
          bank_img: selectedImages[0].base64,
        }));
      } else if (type === 'pancardphoto') {
        obj(prev => ({ ...prev, pan_img: selectedImages[0].base64 }));
      }
    }
  };

  const selectImagesFromCamera = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();

    if (cameraPermission != 'granted' || cameraPermission === 'denied') {
      const newCameraPermission = await Camera.requestCameraPermission();

      if (
        newCameraPermission != 'granted' ||
        newCameraPermission === 'denied'
      ) {
        Alert.alert(
          'Camera Permission Denied !',
          'This app needs camera permission to function properly. Please grant camera permission in the settings.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Open Settings',
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
      } else {
        launchCamera(
          { mediaType: 'photo', includeBase64: true },
          handleImageSelection,
        ).catch(error => {
          Alert.alert(
            'Camera Error',
            'An error occurred while launching the camera. Please try again.',
          );
        });
      }
    } else {
      launchCamera(
        { mediaType: 'photo', includeBase64: true },
        handleImageSelection,
      ).catch(error => {
        Alert.alert(
          'Camera Error',
          'An error occurred while launching the camera. Please try again.',
        );
      });
    }
  };

  useEffect(() => {
    openBottomSheet();
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        style={styles.modal}
        snapPoints={['25%']}
        enableContentPanningGesture={false}
        backdropComponent={props => {
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={1}
            pressBehavior="close"
          />;
        }}
        enablePanDown={true}
        onChange={index => {
          if (index === -1) {
            closeBottomSheet();
          }
        }}>
        <BottomSheetView>
          <View style={styles.bottomSheet}>
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={selectImagesFromLibrary}>
              <Text style={styles.bottomSheetText}>
                {t('Select from Gallery')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={selectImagesFromCamera}>
              <Text style={styles.bottomSheetText}>{t('Take a Photo')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.bottomSheetItem, styles.cancelButton]}
              onPress={closeBottomSheet}>
              <Text style={[styles.bottomSheetText, { color: 'red' }]}>
                {t('Cancel')}
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export const CameraGalleryPhotoUpload2 = ({
  modalVisible,
  setModalVisible,
  onlyCamera,
  isMultiple,
  setImages,
  images,
}) => {
  return (
    <AppCamera
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      onlyCamera={onlyCamera}
      isMultiple={isMultiple}
      setImages={setImages}
      images={images}
    />
  );
};



export const AttachImages2 = ({
  title,
  pdf = [],
  setPdf,
  gallery = true,
  isMultiple = true,
  pdfUpload = false,
  style,
  images,
  setImages,
  labelStyle,
  onModal = false,
  isAddButtonShow = true,
  navigation,
  onlyCamera,
}) => {
  const GlobelStyle = useGlobelStyle();
  const bottomSheetRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const activeTheme = useActiveTheme();
  const { t } = useTranslation();

  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  };

  const closeBottomSheet = () => {
    if (onModal) {
      setIsVisible(false);
    } else {
      if (bottomSheetRef.current) {
        bottomSheetRef.current.dismiss();
      }
    }
  };

  const handleImageSelection = response => {
    if (response.didCancel) {
    } else if (response.error) {
    } else if (response.assets) {
      const selectedImages = response.assets.map(asset => ({
        base64: 'data:image/jpeg;base64,' + asset.base64,
        uri: asset.uri,
      }));
      if (isMultiple) {
        setImages([...images, ...selectedImages]);
      } else {
        setImages(...selectedImages);
      }
    } else {
      if (isMultiple) {
        setImages([
          ...images,
          {
            uri: response.uri,
            base64: 'data:image/jpeg;base64,' + response.base64,
          },
        ]);
      } else {
        setImages({
          uri: response.uri,
          base64: 'data:image/jpeg;base64,' + response.base64,
        });
      }
    }
    setModalVisible(false);
  };

  const styles = StyleSheet.create({
    addImage: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 100,
      width: 100,
      borderColor: activeTheme.themeColor,
      borderWidth: 1,
      // borderStyle: 'dashed',
      borderRadius: 10,
      marginBottom: 16,
      backgroundColor: activeTheme.backgroundPrimary,
    },
    modal: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      elevation: 10,
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 16,
      gap: 10,
      // zIndex: 10,
    },
    imageWrapper: {
      position: 'relative',
      marginRight: 8,
      zIndex: 10,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 10,
      borderWidth: 0.5,
    },
    deleteButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 4,
      borderRadius: 50,
    },
    bottomSheet: {
      backgroundColor: '#fff',
      // paddingVertical: 24,
      paddingHorizontal: 16,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    bottomSheetOnModal: {
      position: 'absolute',
      left: 50,
      top: 40,
      zIndex: 100,
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderColor: '#E0E0E0',
      paddingHorizontal: 16,
      borderRadius: 10,
    },
    bottomSheetItem: {
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    bottomSheetText: {
      fontSize: 18,
      textAlign: 'center',
    },
    cancelButton: {
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
    },
    bottomSheetOnModalItem: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
    },
    bottomSheetOnModalText: {
      fontSize: 14,
      textAlign: 'center',
    },
    cancelOnModalButton: {
      borderTopWidth: 1,
      borderTopColor: '#E0E0E0',
    },
  });
  const selectImagesFromLibrary = async () => {
    await launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0,
        includeBase64: true,
        quality: 0.7,
      },
      handleImageSelection,
    );
  };

  const selectPdfFromLibrary = async () => {
    try {
      const doc = await DocumentPicker.pickSingle({
        type: DocumentPicker.types.pdf,
      });

      const fileContent = await RNFS.readFile(doc.uri, 'base64');
      setPdf([...pdf, fileContent]);
      setModalVisible(false);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
      }
    }
  };

  const selectImagesFromCamera = async () => {
    try {
      const cameraPermission = await Camera.getCameraPermissionStatus();

      if (cameraPermission != 'granted' || cameraPermission === 'denied') {
        const newCameraPermission = await Camera.requestCameraPermission();

        if (
          newCameraPermission != 'granted' ||
          newCameraPermission === 'denied'
        ) {
          Alert.alert(
            'Camera Permission Denied !',
            'This app needs camera permission to function properly. Please grant camera permission in the settings.',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Open Settings',
                onPress: () => {
                  Linking.openSettings();
                },
              },
            ],
          );
        } else {
          setModalVisible(true);
        }
      } else {
        setModalVisible(true);
      }
    } catch (error) {
      Alert.alert(
        'Camera Error',
        'An error occurred while launching the camera. Please try again.',
      );
    }
  };

  const deleteImage2 = index => {
    setPdf(pdf.filter((_, i) => i !== index));
  };

  const deleteImage = index => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  return (
    <View style={[GlobelStyle.mt16, style]}>
      {isAddButtonShow && (
        <>
          <Text
            style={[
              {
                color: '#2B3348',
                fontSize: 18,
                fontWeight: '600',
                marginBottom: 15,
              },
              labelStyle,
            ]}>
            {title}
          </Text>
        </>
      )}
      <View style={styles.imageContainer}>
        <View style={{ position: 'relative', zIndex: 100 }}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.addImage}>
            <Icon
              name="add-a-photo"
              type="material"
              style={{ alignItems: 'center', margin: 6 }}
              color={activeTheme.themeColor}
              size={40}
            />
          </TouchableOpacity>
          {onModal && isVisible && (
            <View style={styles.bottomSheetOnModal}>
              {gallery && (
                <TouchableOpacity
                  style={styles.bottomSheetOnModalItem}
                  onPress={selectImagesFromLibrary}>
                  <Text style={styles.bottomSheetOnModalText}>
                    {t('Select from Gallery')}
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.bottomSheetOnModalItem, styles.cancelButton]}
                onPress={closeBottomSheet}>
                <Text style={[styles.bottomSheetOnModalText, { color: 'red' }]}>
                  {t('Cancel')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {images.length > 0 &&
          images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <FastImage
                style={styles.image}
                source={{ uri: image.base64 }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <TouchableOpacity
                onPress={() => deleteImage(index)}
                style={styles.deleteButton}>
                <Icon
                  name="delete-sweep"
                  type="material"
                  style={{ alignItems: 'center' }}
                  color={'#FFF'}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          ))}
        {pdf.length > 0 &&
          pdf.map((pdf, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={Images.pdf} style={styles.image} />
              <TouchableOpacity
                onPress={() => deleteImage2(index)}
                style={styles.deleteButton}>
                <Icon
                  name="delete-sweep"
                  type="material"
                  style={{ alignItems: 'center' }}
                  color={'#FFF'}
                  size={20}
                />
              </TouchableOpacity>
            </View>
          ))}
      </View>
      <BottomSheet modalProps={{}} isVisible={modalVisible} backdropStyle={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
        <View style={styles.bottomSheet}>
          {gallery && (
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={selectImagesFromLibrary}>
              <Text style={styles.bottomSheetText}>
                {t('Select from Gallery')}
              </Text>
            </TouchableOpacity>
          )}
          {pdfUpload && (
            <TouchableOpacity
              style={styles.bottomSheetItem}
              onPress={selectPdfFromLibrary}>
              <Text style={styles.bottomSheetText}>{t('Select Pdf')}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.bottomSheetItem, styles.cancelButton]}
            onPress={() => setModalVisible(false)}>
            <Text style={[styles.bottomSheetText, { color: 'red' }]}>
              {t('Cancel')}
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>


    </View>
  );
};

