import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import Geolocation from '@react-native-community/geolocation';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Caption, Divider } from 'react-native-paper';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import AppButton from '../../../../core/components/Button/AppButton';

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(175, 173, 173, 0.7)',
    backgroundColor: 'rgba(202, 202, 202, 0.7)',
    paddingHorizontal: 25,

    marginTop: -10,
  },
  modalContent: {
    width: '100%',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: '100%',
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
    marginHorizontal: 0,
    paddingVertical: 5,
  },
  modalButtonText2: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
  modalButton: {
    paddingVertical: 13,
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
  container: {
    backgroundColor: 'white',
    margin: 16,
    alignSelf: 'center',
  },
  dropdown: {
    height: 40,
    width: 320,
    borderColor: '#2B3348',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 10,
    bottom: 32,
    zIndex: 999,
    color: '#2B3348',
    // paddingHorizontal: 8,
    fontSize: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#2B3348',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export const EnterCouponCode = ({
  scanCodeHandler = ()=>{},
  Scanning = ()=>{},
  setModalVisible = ()=>{},
  inputRef = {current:null},
  userType = '',
}) => {

  const [isSubmit, setIsSubmit] = useState(false);
  const activeTheme = useActiveTheme();
  const GlobelStyle = useGlobelStyle();
  const { t } = useTranslation();
  const org_data = null;
  // Toast is imported as Toast from react-native-toast-message

  const submit = async payload => {
    scanCodeHandler(payload, Scanning);
  };

  const TeamStatusValidation = Yup.object().shape({
    code: Yup.string()
      .matches(/^\S/, 'First character cannot be a space')
      .required('This field is required'),
  });

  useEffect(()=>{
     setTimeout(() => {
      inputRef.current?.focus(); // Auto-focus input
     }, 200);
  }, []);

  return (
    <>
      <View style={styles.modalContent}>
        <View>
          <Formik
            initialValues={{
              code: '',
            }}
            validationSchema={TeamStatusValidation}
            onSubmit={values => {
                submit([{value: values.code}]);

            }}>
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View>
                <View
                  style={[
                    GlobelStyle.mb16,
                    GlobelStyle.justifyContentCenter,
                  ]}>
                  <View
                    style={{
                      // alignSelf: 'center',
                      backgroundColor: activeTheme.bgSecondary,
                      padding: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={GlobelStyle.addressStyle}>
                      {t('Enter coupon code to get your points')}
                    </Text>
                  </View>
                  <View>
                    {/* <BottomSheetTextInput
                      placeholder="Coupon Code *"
                      onChangeText={handleChange('code')}
                      value={values.code}
                      ref={inputRef}
                      style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 5,
                        margin: 10,
                      }}
                    /> */}

                    <TextInput
                      placeholder="Coupon Code *"
                      onChangeText={handleChange('code')}
                      value={values.code}
                      ref={inputRef}
                      style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 5,
                        margin: 10,
                        color:activeTheme.TextColor,
                      }}
                    />
                    {errors.code && touched.code && (
                      <Caption style={[GlobelStyle.errorMsg]}>
                        {t(errors.code)}
                      </Caption>
                    )}
                  </View>
                </View>
                <View style={styles.modalButtons}>

                  {
                    isSubmit ? <Text style={{ alignSelf: 'center' }}>{t('Please wait...')}</Text> :
                      <AppButton
                        title={!isSubmit ? t('Submit') : 'Please wait...'}
                        mode={'text'}
                        loading={isSubmit}
                        disabled={isSubmit}
                        color={activeTheme.themeColor}
                        onPress={() => handleSubmit()}
                      />
                  }
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </>
  );
};
