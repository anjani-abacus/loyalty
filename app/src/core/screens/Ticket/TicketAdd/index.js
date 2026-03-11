import React from 'react';
import { StatusBar, TouchableOpacity, View } from 'react-native';
import { Appbar, Caption, Text, Title } from 'react-native-paper';
import { Icon } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import useGlobelStyle from '../../../assets/Style/GlobelStyle';
import Toast from 'react-native-toast-message';
import AppTextInput from '../../../components/TextInput/AppTextInput';
import AppTheme from '../../../components/Theme/AppTheme';
import useTheme from '../../../components/Theme/useTheme';
import Success from '../../../assets/icons/Success.svg';
import { StatusBarHeader } from '../../../components/StatusBar/StatusBar';
import { HelpIcon, LeftArrowIcon } from '../../../assets/SVGs/svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Skeleton } from '@rneui/base';
import { RenderLabel } from '../../../components/FormManager/utils';
import { Dropdown } from 'react-native-element-dropdown';
import AppButton from '../../../components/Button/AppButton';
import { useAddTicket, useTicketTypeList } from '../../../../api/hooks/useMasters';
import Document from '../../../components/FormManager/Document';

const TicketAdd = ({ navigation }) => {
  const { t } = useTranslation();
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useTheme();

  const { mutate: submitTicketRequest } = useAddTicket();
  const { isLoading, refetch, data: queryTypeList, isFetching } = useTicketTypeList();

  // ✅ Validation Schema
  const validationSchema = Yup.object().shape({
    query_type: Yup.string().required('Ticket type is required'),
    remark: Yup.string().required('Remark is required'),
  });

  // ✅ Initial Values
  const initialValues = {
    query_type: '',
    remark: '',
  };

  // ✅ Submit Handler
  const handleSubmit = (values) => {
    const formData = new FormData();

    formData.append('query_type', values?.query_type);
    formData.append('remark', values?.remark);

    if(values?.documentDetails?.image?.uri){formData.append('image', {
      uri: values?.documentDetails?.image.uri,
      type: values?.documentDetails?.image.type,
      name: values?.documentDetails?.image.name,
    });}

    submitTicketRequest(formData, {
      onSuccess: (resp) => {
        Toast.show({ type: 'success', text1: resp?.message || 'Ticket created successfully' });
        ReactNativeHapticFeedback.trigger('notificationError',
          { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });

        navigation.goBack();
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

        <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <LeftArrowIcon fill="#000" />
          </TouchableOpacity>
          <Text style={{
            flex: 0.8,
            textAlign: 'center',
            color: '#000',
            fontSize: 18,
            fontWeight: 'bold',
          }}>Generate Ticket</Text>
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
        <View style={{ paddingHorizontal: 10 }}>
          <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              validateOnBlur
              validateOnChange
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                errors,
                setFieldValue,
                touched,
                isValid,
              }) => (
                <>
                  <View style={[GlobelStyle.AdressHeader]}>
                    {
                      values?.query_type &&
                      values?.remark &&
                      (
                        <View
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
                        </View>
                      )}
                  </View>

                  <View style={GlobelStyle.mt8}>
                    <>
                      <RenderLabel value={values?.query_type} label="Ticket Type*" />
                      <Dropdown
                        style={[GlobelStyle.dropdown]}
                        placeholderStyle={GlobelStyle.placeholderStyle}
                        selectedTextStyle={[GlobelStyle.selectedTextStyle, { fontSize: 12, marginLeft: 7 }]}
                        inputSearchStyle={GlobelStyle.inputSearchStyle}
                        iconStyle={GlobelStyle.iconStyle}
                        data={queryTypeList?.data?.data?.map(item=>({question:item})) || []}
                        search
                        maxHeight={300}
                        name="query_type"
                        labelField="question"
                        valueField="question"
                        itemTextStyle={{color:activeTheme.text}}
                        placeholder={'Ticket Type' + ' *'}
                        searchPlaceholder="Search..."
                        value={values?.query_type}
                        onChange={item => {
                          setFieldValue('query_type', item.question);
                        }}
                      />
                    </>
                    {errors?.query_type && touched?.query_type && (
                      <Caption style={[GlobelStyle.errorMsg]}>{errors?.query_type}</Caption>
                    )}
                  </View>

                  <View style={[GlobelStyle.mt8]}>
                    <AppTextInput
                      label={'Remark' + ' *'}
                      mode="outlined"
                      placeholderTextColor={AppTheme.Medium}
                      type="multiline"
                      value={values?.remark}
                      onChangeText={handleChange('remark')}
                      autoCorrect={true}
                    />
                  </View>
                  {errors?.remark && touched?.remark && (<Caption style={[GlobelStyle.errorMsg]}>{errors?.remark}</Caption>)}

                  <View style={GlobelStyle.mt18}>
                    <Document document="image" documentKey={'image'} setFieldValue={setFieldValue} uploadedUrl={(values?.image || '')} />
                  </View>

                  <View style={[GlobelStyle.mt8]}>
                    <AppButton
                      title="Submit"
                      mode={'contained'}
                      type="submit"
                      // loading={isPending}
                      // disabled={isPending}
                      color={AppTheme.light.themeColor}
                      onPress={() => {
                        if (!isValid) {
                          Toast.show({ type: 'error', text1: 'Please fill all required fields correctly', visibilityTime: 6000, position: 'bottom', bottomOffset: 150 });
                        } handleSubmit();
                      }} // ✅ Call Formik's handleSubmit
                    />
                  </View>
                </>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

export default TicketAdd;
