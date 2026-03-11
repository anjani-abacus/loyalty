
import React, { useContext, useState } from 'react';
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import SnackbarComponent from '../../../../core/components/Snackbar/Snackbar';
import AddressForm from '../../../../core/components/FormManager/AddressForm';
import BankInfoForm from '../../../../core/components/FormManager/BankInfoForm';
import { useGetUserData, useUpdateUser } from '../../../../api/hooks/useUsers';
import { userSchema } from './userSchema';
import FormProvider from '../../../../core/components/FormManager/FormProvider';

import { AuthContext } from '../../../../auth/AuthContext';
import Toast from 'react-native-toast-message';
import BasicForm from '../../../../core/components/FormManager/BasicForm';
import DealerForm from '../../../../core/components/FormManager/DealerForm';
import DocumentForm from '../../../../core/components/FormManager/DocumentForm';
import useTheme from '../../../../core/components/Theme/useTheme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { StatusBarHeader } from '../../../../core/components/StatusBar/StatusBar';
import { HelpIcon, LeftArrowIcon } from '../../../../core/assets/SVGs/svg';
import { updateUserSchema } from '../../../../core/components/ValidationSchema/SchemaProfile';

const UpdateProfile = ({ navigation, route }) => {
  useGetUserData();
  const { loginData, setLoginData } = useContext(AuthContext);
  const { mutate, isPending, isSuccess, isError, error } = useUpdateUser();
  const loginInputs = route?.params;
  const updateType = route?.params?.formType;
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [bgColor, setBgColor] = useState('');
  const GlobelStyle = useGlobelStyle();
  const activetheme = useTheme();

  const onSubmit = (values) => {

    const formData = new FormData();
    formData.append('basicInfo', JSON.stringify(values?.basicInfo));
    formData.append('documentDetails', JSON.stringify(values?.documentDetails));
    formData.append('bankDetails', JSON.stringify(values?.bankDetails));
    formData.append('dealerDetails', JSON.stringify(values?.dealerDetails));

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

    if (values?.documentDetails?.document_pan_img?.uri) {
      const panImg = values.documentDetails.document_pan_img;
      formData.append('document_pan_img', {
        uri: panImg.uri,
        type: panImg.type || 'image/jpeg',
        name: panImg.name || 'pan.jpg',
      });
    }


    mutate(formData, {
      onSuccess: ({ data }) => {
        navigation.goBack();
        Toast.show({ type: 'success', text1: data?.message || 'Updated Successfully' });
      },
      onError: (data) => {
        Toast.show({ type: 'error', text1: data?.message || 'Something went wrong!' });
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
        extraScrollHeight={200} // pushes input above keyboard
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
          }}>Update Profile Information</Text>
          <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
            <HelpIcon
              style={{ marginRight: 10 }}
              width={30}
              height={30}
              fill="#000"
              stroke="#000"
              strokeWidth={0.1}
            />
          </TouchableOpacity>
        </View>


        <FormProvider isPending={isPending} onSubmit={onSubmit} initialValue={userSchema(loginData)}  validationSchema={updateUserSchema(updateType)} navigation={navigation} route={route} loginInputs={loginInputs}>
          <>
            {updateType == 'BasicInformation' && <>
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
                <BasicForm formType="update" />
              </View>

              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
                <AddressForm formParent="basicInfo.addressInfo" formTitle="Address Information" />
              </View>
            </>
            }

            {updateType == 'documentInfo' &&
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
                <DocumentForm formParent="basicInfo.documentDetails" formTitle="Document Information" />
              </View>
            }

            {
              updateType == 'dealerInfo' &&
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
                <DealerForm />
              </View>
            }

            {(updateType == 'bankInfo') && <>
              <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
                <BankInfoForm />
              </View>
            </>}
          </>
        </FormProvider>

        <SnackbarComponent
          visible={showSnackBar}
          message={snackMessage}
          backgroundColor={bgColor}
        />
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};



export default UpdateProfile;
