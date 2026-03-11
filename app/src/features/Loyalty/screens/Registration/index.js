import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Success from '../../../../core/assets/icons/Success.svg';
import * as Animatable from 'react-native-animatable';
import ConfettiCannon from 'react-native-confetti-cannon';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View, Modal } from 'react-native';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import AddressForm from '../../../../core/components/FormManager/AddressForm';
import DocumentPicker from 'react-native-document-picker';
import { ImageModal } from '../../../../core/components/ConfirmationModal/ConfirmationModal';
import BasicForm from '../../../../core/components/FormManager/BasicForm';
import { useCreateUser, useValidateReferralCode } from '../../../../api/hooks/useUsers';
import Toast from 'react-native-toast-message';
import CropScreen from '../../../../core/components/CropView';
import useTheme from '../../../../core/components/Theme/useTheme';
import { userSchema } from '../UpdateProfile/userSchema';
import DealerForm from '../../../../core/components/FormManager/DealerForm';
import FormProvider from '../../../../core/components/FormManager/FormProvider';
import { createUserSchema } from '../../../../core/components/ValidationSchema/SchemaProfile';
import Camera from '../../../../core/assets/icons/Camera.svg';
import UploadImage from '../../../../core/assets/icons/uploadImage.svg';
import ViewImage from '../../../../core/assets/icons/uploadImage.svg';
import { Icon } from '@rneui/themed';
import { Title } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import AppTextInput from '../../../../core/components/TextInput/AppTextInput';
import { useFormikContext } from 'formik';
import AppTheme from '../../../../core/components/Theme/AppTheme';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBarHeader } from '../../../../core/components/StatusBar/StatusBar';
import { HelpIcon, LeftArrowIcon } from '../../../../core/assets/SVGs/svg';
import { CheckIcon } from '../../../../core/assets/SVGs/svg';
import Edit from '../../../../core/assets/icons/Edit.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DocumentForm from '../../../../core/components/FormManager/DocumentForm';
import { UserProfileImage } from '../../../../core/screens/MyProfile/UserProfileImage';
import { ScrollView } from 'react-native-gesture-handler';
import { AppCamera } from '../../../../core/components/Camera/AppCamera';
import { Images } from '../../../../core/assets';
import { InteractionManager } from 'react-native';

const Registration = ({ navigation, route }) => {
  const { mutate, isPending } = useCreateUser();
  const loginInputs = route?.params;
  const activeTheme = useTheme();
  const GlobelStyle = useGlobelStyle();
  const initialValues = userSchema({}, 'registration');
  initialValues.basicInfo.mobile = loginInputs?.phone || '';
  // camera configurations
  const selectedUri = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [croppingImage, setCroppingImage] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [visible, setvisible] = useState(false);

  useEffect(() => {
    const backHandler = () => navigation.pop();
    return backHandler;
  }, [navigation]);

  const handleDocumentPick = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      selectedUri.current = res;
      setCroppingImage(true);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.error('Unknown error:', err);
      }
    }
  };

  useEffect(() => {
    console.log('isCameraVisible');
    if (!croppingImage && selectedUri) {
      closeBottomSheet();
    }
  }, [croppingImage]);

  const updateProfileImageCamera = (base64Image) => {
    console.log('base64Image[0] ===> ', base64Image[0]);
    setSelectedFile({ uri: base64Image[0]?.base64 });
    closeBottomSheet();
    // const formData = new FormData();
    // formData.append('profile_img', {
    //   uri: `${base64Image[0]?.base64}`,
    //   // uri: 'file://'+selectedFile.uri || selectedUri?.current?.uri,
    //   type: "image/jpeg",
    //   name: "profile.jpg",
    // });
    // mutate(formData, {
    //   onSuccess: ({ data }) => {
    //     // navigation.goBack();
    //     setLoginData((prev) => ({ ...prev, profile: data?.result?.profile }))
    //     refetch()
    //     Toast.show({ type: 'success', text1: data?.message || 'Updated Successfully' });
    //   },
    //   onError: (data) => {
    //     Toast.show({ type: 'error', text1: data?.message || 'Something went wrong!' });
    //   }
    // })
  };

  const bottomSheetRef = useRef(null);
  const openBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.present();
    }
  };

  const closeBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.dismiss();
    }
  };

  const onSubmit = (values) => {
    console.log('submitted values ===> ', values);


    const formData = new FormData();
    formData.append('basicInfo', JSON.stringify(values?.basicInfo));
    formData.append('dealerDetails', JSON.stringify(values?.dealerDetails));
    formData.append('document_no', values?.documentDetails?.document_no);
    formData.append('referral_code', JSON.stringify(values?.referral_code));


    if (selectedUri?.current) {
      console.log('selectedFile ===> ', selectedUri);
      const documentImage = selectedUri.current;
      formData.append('profile_img', {
        uri: documentImage.uri,
        type: documentImage.type || 'image/jpeg',
        name: documentImage.name || 'profile.jpg',
      });
    }

    if (values?.documentDetails?.document_img_front?.uri) {
      const documentImage = values.documentDetails.document_img_front;
      formData.append('document_img_front', {
        uri: documentImage.uri,
        type: documentImage.type || 'image/jpeg',
        name: documentImage.name || 'pan.jpg',
      });
    }

    if (values?.documentDetails?.document_img_back?.uri) {
      const documentImageBack = values.documentDetails.document_img_back;
      formData.append('document_img_back', {
        uri: documentImageBack.uri,
        type: documentImageBack.type || 'image/jpeg',
        name: documentImageBack.name || 'pan.jpg',
      });
    }


    mutate(formData, {
      onSuccess: (resp) => {
        navigation.pop();
        Toast.show({ type: 'success', text1: resp?.message || 'Registered Successfully' });
      },
      onError: (resp) => {
        Toast.show({ type: 'error', text1: resp?.message || 'Something went wrong!' });
      },
    });
  };

  return (
    <LinearGradient start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['#F5E6FF', '#e1caf0ff']}
      style={[{ flexGrow: 1, justifyContent: 'center' }]}>
      <StatusBarHeader height={StatusBar.currentHeight} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={240} // pushes input above keyboard
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrowIcon fill="#000" />
          </TouchableOpacity>
          <Text style={{
            flex: 0.8,
            textAlign: 'center',
            color: '#000',
            fontSize: 18,
            fontWeight: 'bold',
          }}>Registration</Text>
          <View />
          {/* <TouchableOpacity onPress={() => navigation.navigate("FAQ")}>
            <HelpIcon
              style={{ marginRight: 10 }}
              width={30}
              height={30}
              fill="#000"
              stroke='#000'
              strokeWidth={0.1}
            />
          </TouchableOpacity> */}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 5, marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#e4ecfaff', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, justifyContent: 'center', gap: 5 }}>
            <CheckIcon width={16} height={16} fill={'rgba(14, 174, 14, 1)'} />
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#000' }}>{loginInputs?.phone || 'XXXXX XXXXX'}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.pop()} style={{ flexDirection: 'row', backgroundColor: '#e4ecfaff', paddingHorizontal: 2, paddingVertical: 2, borderRadius: 10, justifyContent: 'center', gap: 5 }}>
            <Edit width={16} height={16} fill="#1761bcff" />
          </TouchableOpacity>
        </View>

        <FormProvider isPending={isPending} onSubmit={onSubmit} mutate={mutate} validationSchema={createUserSchema} initialValue={initialValues} navigation={navigation} route={route} loginInputs={loginInputs}>
          <>
            <View style={{ alignItems: 'center', borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
              <UserProfileImage
                selectedFile={selectedFile}
                bottomSheetRef={bottomSheetRef}
                openBottomSheet={openBottomSheet}
                closeBottomSheet={closeBottomSheet}
                style={{ width: 100, height: 100, borderRadius: 100 }} />
            </View>

            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
              <BasicForm />
            </View>

            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
              <AddressForm formParent="basicInfo.addressInfo" formTitle="Address Information" />
            </View>

            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
              <DealerForm />
            </View>

            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
              <DocumentForm formParent="basicInfo.documentDetails" formTitle="Document Information" />
            </View>

            <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
              <ReferralCodeForm />
            </View>
          </>
        </FormProvider>
      </KeyboardAwareScrollView>

      <BottomSheetModalProvider>
        <BottomSheetModal
          index={0}
          ref={bottomSheetRef}
          snapPoints={['28%']}
          enablePanDown={true}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close" // disables tap to close
            />
          )}
          keyboardBehavior="interactive" // important!
          keyboardBlurBehavior="restore" // optional, better UX
          onChange={(index) => {
            if (index === -1) {
              closeBottomSheet();
            }
          }}
        >
          <ScrollView style={{ padding: 10 }}>
            <TouchableOpacity
              disabled={!selectedFile}
              style={{
                borderBottomWidth: 1,
                borderColor: '#ccc',
                paddingHorizontal: 5,
                paddingVertical: 15,
                flexDirection: 'row',
                opacity: !selectedFile ? 0.4 : 1,
                gap: 5,
              }} onPress={() => setvisible(true)}>
              <ViewImage width={20} height={20} />
              <Text style={{
                fontSize: 16,
                color: '#000',
              }}>View Profile Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              borderBottomWidth: 1,
              borderColor: '#ccc',
              padding: 5,
              paddingVertical: 15,
              flexDirection: 'row',
              gap: 5,
            }} onPress={handleDocumentPick} >
              <UploadImage width={20} height={20} />
              <Text style={{
                fontSize: 16,
                color: '#000',
              }}>Choose from Gallery</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={{
              padding: 5,
              paddingVertical: 15,
              flexDirection: "row",
              gap: 5
            }} onPress={() => { setIsCameraVisible(true) }}>
              <Camera width={20} height={20} />
              <Text style={{
                fontSize: 16,
                color: '#000'
              }}>Click Photo</Text>
            </TouchableOpacity> */}
          </ScrollView>
        </BottomSheetModal>
      </BottomSheetModalProvider>

      <AppCamera
        modalVisible={isCameraVisible}
        setModalVisible={setIsCameraVisible}
        onlyCamera={true}
        isMultiple={false}
        setImages={updateProfileImageCamera}
        images={images}
      />

      <Modal
        style={{ flex: 1, justifyContent: 'center' }}
        animationType="slide"
        transparent={true}
        visible={croppingImage}>
        <CropScreen imageUri={selectedUri.current?.uri} setCroppingImage={setCroppingImage} setSelectedFile={setSelectedFile} />
      </Modal>

      <ImageModal modalVisible={visible} setModalVisible={setvisible} url={selectedFile?.uri || Images.default} />
    </LinearGradient>

  );
};

const ReferralCodeForm = () => {
  const { t } = useTranslation();
  const GlobelStyle = useGlobelStyle();
  const { values, handleChange, setFieldValue, errors, touched } = useFormikContext();
  const { mutate, isPending } = useValidateReferralCode();
  const [isValidRefferralCode, setIsValidRefferralCode] = useState(false);

  const explosion = useRef(null);
  const startConfetti = () => {
    if (explosion.current) {
      explosion.current.start();
    }
  };

  const handleCheckRefferalCode = () => {
    mutate({ 'referred_by_code': values?.referral_code }, {
      onSuccess: (resp) => {
        Toast.show({ type: 'success', text1: resp?.data?.message, visibilityTime: 2000 });
        setIsValidRefferralCode(true);
        // startConfetti()
      },
    });
  };

  return (
    <>
      <View style={[GlobelStyle.AdressHeader, GlobelStyle.mt16]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            gap: 10,
          }}
        >
          <Icon name="share" />
          <Title style={[GlobelStyle.largeFont]}>
            {t('Referral Code')}
          </Title>
        </View>

        {isValidRefferralCode && <View
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Animated ripple */}
          <Animatable.View
            animation={{
              0: { scale: 0, opacity: 0.5 },
              1: { scale: 1, opacity: 0 }, // expands and fades out
            }}
            iterationCount="infinite"
            duration={2000}
            easing="ease-out"
            style={{
              position: 'absolute',
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#20852fff',
            }}
          />

          {/* Static LinearGradient circle */}
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#00c01dff', '#2d923dff', '#20852fff']}
            style={{
              borderRadius: 25,
              height: 25,
              width: 25,
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#E5D7FF',
            }}
          >
            <Success width={16} height={16} fill="#fff" />
          </LinearGradient>
        </View>}
      </View>

      <View style={[GlobelStyle.mt8, { position: 'relative' }]}>
        <AppTextInput
          label={t('Referral Code')}
          mode="outlined"
          placeholderTextColor={AppTheme.Medium}
          type="textInput"
          value={values?.referral_code}
          onChangeText={handleChange('referral_code')}
          autoCorrect={true}
        />
        {(values?.referral_code && isValidRefferralCode) ? <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: '80%', position: 'absolute', right: 10, top: '10%' }} onPress={() => {
          setFieldValue('referral_code', '');
          setIsValidRefferralCode;
        }}>
          <Text style={{ color: '#316bf3ff', fontWeight: 'bold', textDecorationLine: 'underline' }}>
            {isPending ? 'Validating...' : 'Change'}
          </Text>
        </TouchableOpacity> :
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: '80%', position: 'absolute', right: 10, top: '10%' }} onPress={() => {
            !values?.referral_code ? Toast.show({ type: 'error', text1: 'Enter code first!' }) : handleCheckRefferalCode();
          }}>
            <Text style={{ color: '#316bf3ff', fontWeight: 'bold', textDecorationLine: 'underline' }}>
              {isPending ? 'Validating...' : 'Apply'}
            </Text>
          </TouchableOpacity>}
      </View>
      {errors?.referral_code && touched?.referral_code && (
        <Caption style={[GlobelStyle.errorMsg]}>
          {errors?.referral_code}
        </Caption>
      )}

    </>
  );
};



export default Registration;
