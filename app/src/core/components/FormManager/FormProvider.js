
import { Formik, FormikProvider } from 'formik';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import AppButton from '../../components/Button/AppButton';
import AppTheme from '../../components/Theme/AppTheme';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

const FormProvider = ({ isPending = false, onSubmit, validationSchema, initialValue, children, route, navigation, loginInputs }) => {
  const GlobelStyle = useGlobelStyle();
  return <ScrollView style={{ margin: 16 }} showsVerticalScrollIndicator={false}>
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema || Yup.object({})}
      onSubmit={(value) => onSubmit(value)}
      enableReinitialize={true}
    >
      {
        (formik) => {
          return <FormikProvider value={formik}>
            {children}
            <View style={[GlobelStyle.mt8]}>
              <AppButton
                title="Submit"
                mode={'contained'}
                type="submit"
                loading={isPending}
                disabled={isPending}
                color={AppTheme.light.themeColor}
                onPress={() => {
                  if (!formik.isValid) {
                    const errorFields = Object.keys(formik.errors);

                    console.log('Fields with errors:', errorFields);

                    Toast.show({ type: 'error', text1: 'Please fill all required fields correctly', visibilityTime: 6000, position: 'bottom', bottomOffset: 100 });
                  } formik.handleSubmit();
                }} // ✅ Call Formik's handleSubmit
              />
            </View>
          </FormikProvider>;
        }
      }
    </Formik>
  </ScrollView>;
};

export default FormProvider;
