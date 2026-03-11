import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, View} from 'react-native';
import {IconButton, Caption} from 'react-native-paper';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import useActiveTheme from '../Theme/useActiveTheme';
import AppButton from '../Button/AppButton';
import {useTranslation} from 'react-i18next';
import {Picker} from '@react-native-picker/picker';
import {Dropdown} from 'react-native-element-dropdown';
import * as Yup from 'yup';
import {Formik} from 'formik';
import AppTextInput from '../TextInput/AppTextInput';
import {ApiCall} from '../../services/ServiceProvider';
import Toast from 'react-native-toast-message';
import {Icon} from '@rneui/base';
const AppStatusModal = ({
  visible,
  handleModalVisible,
  pickerItems,
  extraRequiredData,
}) => {
  const activeTheme = useActiveTheme();
  const GlobelStyle = useGlobelStyle();
  const {t} = useTranslation();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  const handlePress = () => {
    // dispatch(showMenueModal(false));
    handleModalVisible();
  };

  const submitForm = async values => {
    setButtonLoading(true);
    setButtonDisable(true);
    let Payload = {};
    let Url = '';
    if (extraRequiredData.type == 'Enquiry') {
      Payload = {
        lead_status: values.status,
        lead_reason: values.reason,
        dr_id: extraRequiredData.id,
        converted: extraRequiredData.converted,
      };
      Url = 'AppEnquiry/enquiryStageChange';
    } else if (extraRequiredData.type == 'Leave') {
      Payload = {
        status: values.status,
        reason: values.reason,
        id: extraRequiredData.id,
      };
      Url = 'AppLeave/statusChange';
    } else if (extraRequiredData.type == 'Travel') {
      Payload = {
        status: values.status,
        reason: values.reason,
        id: extraRequiredData.id,
      };
      Url = 'AppTravelPlan/updateStatus';
    }

    try {
      await ApiCall(Payload, Url)
        .then(result => {
          if (result.statusCode == 200) {
            handlePress();
            setButtonLoading(false);
            setButtonDisable(false);
            Toast.show({
              type: 'success',
              text1: result.statusMsg,
              visibilityTime: 6000,
            });
          } else {
            Alert.alert("Status Can't update", result.statusMsg, [
              {
                text: t('OK'),
                onPress: () => {},
              },
            ]);
            setButtonLoading(false);
            setButtonDisable(false);
            Toast.show({
              type: 'error',
              text1: result.statusMsg,
              visibilityTime: 6000,
            });
            handlePress();
          }
        })
        .catch(error => {
          Toast.show({
            type: 'error',
            text1: error,
            visibilityTime: 6000,
          });
        });
    } catch {}
  };
  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: activeTheme.Secondary,
      // opacity: 0.9,
    },
    ModuleList: {
      borderBottomColor: activeTheme.primary100,
      borderBottomWidth: 1,
      height: 50,
      width: '100%',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    modalView: {
      width: '85%',
      backgroundColor: activeTheme.Light,
      borderRadius: 10,

      padding: 12,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      width: '100%',
      borderRadius: 10,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: activeTheme.error50,
    },
    textStyle: {
      color: 'white',
      fontWeight: '700',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 14,
      color: '#2B3348',
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
    modalButtons: {
      width: 322,
      marginHorizontal: 25,
    },
  });
  const FormValidation = Yup.object().shape({
    status: Yup.string().required('Required'),

    reason: Yup.string()
      .matches(/^\S/, t('First character cannot be a space'))
      .when('status', (status, schema) => {
        return status == 'Reject' || status == 'Lost'
          ? schema.required(t('This field is required'))
          : schema;
      }),
  });
  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && {color: activeTheme.themeColor}]}>
        {t('Status')}
      </Text>
    );
  };
  return (
    // <View style={styles.centeredView}>
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          handlePress();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={[GlobelStyle.largeFont]}>{t('Change Status')}</Text>
              <IconButton
                onPress={() => handlePress()}
                icon={'close'}
                size={22}
              />
            </View>
            <View>
              <Formik
                initialValues={{
                  status: '',
                  reason: '',
                }}
                validationSchema={FormValidation}
                onSubmit={values => submitForm(values)}>
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  setFieldValue,
                  errors,
                  touched,
                }) => (
                  <View>
                    <View
                      style={[
                        GlobelStyle.mb16,
                        GlobelStyle.justifyContentCenter,
                      ]}>
                      <View style={styles.container}>
                        {renderLabel()}
                        <Dropdown
                          style={[
                            styles.dropdown,
                            isFocus && {borderColor: activeTheme.themeColor},
                          ]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          data={pickerItems}
                          maxHeight={300}
                          labelField="type"
                          valueField="type"
                          placeholder={'Select Status'}
                          value={values.status}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setFieldValue('status', item.type);
                            setIsFocus(false);
                          }}
                        />

                        {errors.status && touched.status && (
                          <Caption style={[GlobelStyle.errorMsg]}>
                            {errors.status}
                          </Caption>
                        )}
                      </View>
                      {(values.status == 'Reject' ||
                        values.status == 'Lost') && (
                        <View
                          style={{
                            width: 320,
                            alignSelf: 'center',
                          }}>
                          <AppTextInput
                            label={t('Reject Remark') + ' *'}
                            mode="outlined"
                            placeholderTextColor={activeTheme.Medium}
                            type="multiline"
                            value={values.reason}
                            onChangeText={handleChange('reason')}
                            autoCorrect={true}
                          />
                          {errors.reason && touched.reason && (
                            <Caption style={[GlobelStyle.errorMsg]}>
                              {errors.reason}
                            </Caption>
                          )}
                        </View>
                      )}
                    </View>
                    <View style={styles.modalButtons}>
                      <AppButton
                        title={t('Update') + ''}
                        mode={'text'}
                        loading={buttonLoading}
                        disabled={buttonDisable}
                        color={activeTheme.themeColor}
                        onPress={handleSubmit}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default AppStatusModal;
