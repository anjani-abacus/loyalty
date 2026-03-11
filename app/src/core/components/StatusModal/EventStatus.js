import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import useActiveTheme from '../Theme/useActiveTheme';
import { Icon } from '@rneui/themed';
import AttachImages from '../AttachImages/AttachImages';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import AppTextInput from '../TextInput/AppTextInput';
import { useTranslation } from 'react-i18next';
import { Caption } from 'react-native-paper';
import { ApiCall } from '../../services/ServiceProvider';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../Button/AppButton';
import Toast from 'react-native-toast-message';

const data = [
  { label: 'Approved', value: 'Approved' },
  { label: 'Rejected', value: 'Reject' },
];
const SiteData = [
  { label: 'Lost', value: 'Lost' },
  { label: 'Win', value: 'Win' },
];

const EventStatus = ({
  modalVisible,
  setModalVisible,
  theme = 'Submit',
  type,
  eventDetail,
  handleSnackBar,
  navigation,
}) => {
  // const [images, setImages] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const activeTheme = useActiveTheme();
  const GlobelStyle = useGlobelStyle();
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const imageData = null;


  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: activeTheme.themeColor }]}>
        Status
      </Text>
    );
    return null;
  };
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

  const changeEventStatus = async payload => {
    try {
      setIsSubmit(true);

      if (type == 'Completed') {
        let completedPayload = {};
        completedPayload.billImages = payload.billImages.map(
          image => image.base64,
        );
        completedPayload.actual_expense = payload.actual_expense;
        completedPayload.data = {
          status: 'Completed',
          btl_type: '',
          btl: eventDetail?.participents,
          id: eventDetail?.id,
        };
        completedPayload.remark = payload.remark;
        payload = completedPayload;
      }

      const result = await ApiCall(payload, 'AppEvent/eventStatusChange');
      if (result.statusCode === 200) {
        setModalVisible(false);
        Toast.show({
          type: 'success',
          text1: t('Status Successfully Changed'),
          visibilityTime: 6000,
        });
        navigation.navigate('EventList');
        setIsSubmit(false);
      } else {
        setIsSubmit(false);
        setModalVisible(false);
        Toast.show({ type: 'error', text1: t('Status Change Failed'), visibilityTime: 6000 });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('Error occurred while fetching events data:' + error),
        visibilityTime: 6000,
      });
    }
  };

  const CancelStatusValidation = Yup.object().shape({
    remark: Yup.string()
      .matches(/^\S/, 'First character cannot be a space')
      .required('Remark is Required'),
  });

  const CompleteStatusValidation = Yup.object().shape({
    actual_expense: Yup.string().required('Required'),
    billImages: Yup.array().min(1, 'Atleast one bill Image is required'),
    remark: Yup.string()
      .matches(/^\S/, 'First character cannot be a space')
      .required('Required'),
  });

  const TeamStatusValidation = Yup.object().shape({
    remark:
      value == 'Reject'
        ? Yup.string()
          .matches(/^\S/, 'First character cannot be a space')
          .required('Required')
        : Yup.string().matches(/^\S/, 'First character cannot be a space'),
    status: Yup.string().required('Required'),
    approved_amount: Yup.number().required('Approved Amount is required'),
  });

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        animated={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: 20,
              }}>
              <Text style={{ color: '#333333', fontSize: 18, fontWeight: '600' }}>
                {t('Change Status')}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon
                  name="cancel"
                  type="material"
                  color={'#333333'}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            {type == 'Completed' && (
              <View>
                <Formik
                  initialValues={{
                    remark: '',
                    actual_expense: '',
                    billImages: imageData,
                  }}
                  validationSchema={CompleteStatusValidation}
                  onSubmit={values => {
                    changeEventStatus(values);
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
                        style={{
                          height: values.billImages.length ? 210 : 140,
                          zIndex: 100,
                        }}>
                        <AttachImages
                          onlyCamera={false}
                          isMultiple={true}
                          images={imageData}
                          setImages={value =>
                            setFieldValue('billImages', imageData)
                          }
                          navigation={navigation}
                          title={t('Upload Bill Images')}
                          style={{
                            alignSelf: 'center',
                            marginTop: 0,
                            width: '83%',
                            marginBottom: 0,
                            zIndex: 10,
                          }}
                          labelStyle={{
                            fontSize: 16,
                          }}
                        />
                        {errors.billImages && touched.billImages && (
                          <Caption
                            style={[
                              GlobelStyle.errorMsg,
                              {
                                marginTop: 0,
                                paddingTop: 0,
                                alignSelf: 'flex-start',
                                marginLeft: 40,
                                zIndex: 9,
                              },
                            ]}>
                            {errors.billImages}
                          </Caption>
                        )}
                      </View>
                      <View
                        style={[
                          GlobelStyle.mb16,
                          GlobelStyle.justifyContentCenter,
                        ]}>
                        <View
                          style={{
                            width: 320,
                            alignSelf: 'center',
                            marginBottom: 10,
                          }}>
                          <AppTextInput
                            label={t('Actual Expense') + ' *'}
                            mode="outlined"
                            placeholder="Actual Expense"
                            placeholderTextColor={activeTheme.Medium}
                            type="textInput"
                            value={values.actual_expense}
                            onChangeText={handleChange('actual_expense')}
                            autoCorrect={true}
                            keyboardType="numeric"
                          />
                          {errors.actual_expense && touched.actual_expense && (
                            <Caption style={[GlobelStyle.errorMsg]}>
                              {errors.actual_expense}
                            </Caption>
                          )}
                        </View>
                        <View
                          style={{
                            width: 320,
                            alignSelf: 'center',
                          }}>
                          <AppTextInput
                            label={t('Remark') + ' *'}
                            mode="outlined"
                            placeholderTextColor={activeTheme.Medium}
                            type="multiline"
                            value={values.remark}
                            onChangeText={handleChange('remark')}
                            autoCorrect={true}
                          />
                          {errors.remark && touched.remark && (
                            <Caption style={[GlobelStyle.errorMsg]}>
                              {errors.remark}
                            </Caption>
                          )}
                        </View>
                      </View>
                      <View style={styles.modalButtons}>
                        <TouchableOpacity
                          style={[
                            styles.modalButton,
                            {
                              backgroundColor: themes[theme]?.fill,
                              marginBottom: 8,
                            },
                          ]}
                          onPress={() => {
                            handleSubmit();
                          }}>
                          <Text
                            style={styles.modalButtonText2}
                            disabled={isSubmit}>
                            Update
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </Formik>
              </View>
            )}
            {type == 'Cancel' && (
              <View>
                <Formik
                  initialValues={{
                    remark: '',
                  }}
                  validationSchema={CancelStatusValidation}
                  onSubmit={values => {
                    changeEventStatus({
                      billImages: [],
                      data: {
                        status: 'Cancel',
                        btl_type: '',
                        btl: eventDetail?.participents,
                        id: eventDetail?.id,
                      },
                      remark: values.remark,
                    });
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
                            width: 320,
                            alignSelf: 'center',
                          }}>
                          <AppTextInput
                            label={t('Cancel Remark') + ' *'}
                            mode="outlined"
                            placeholderTextColor={activeTheme.Medium}
                            type="multiline"
                            value={values.remark}
                            onChangeText={handleChange('remark')}
                            autoCorrect={true}
                          />
                          {errors.remark && touched.remark && (
                            <Caption style={[GlobelStyle.errorMsg]}>
                              {errors.remark}
                            </Caption>
                          )}
                        </View>
                      </View>
                      <View style={styles.modalButtons}>
                        <TouchableOpacity
                          style={[
                            styles.modalButton,
                            {
                              backgroundColor: themes[theme]?.fill,
                              marginBottom: 8,
                            },
                          ]}
                          disabled={isSubmit}
                          onPress={() => {
                            handleSubmit();
                          }}>
                          <Text style={styles.modalButtonText2}>Update</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </Formik>
              </View>
            )}
            {type == 'TeamStatus' && (
              <View>
                <Formik
                  initialValues={{
                    remark: '',
                    status: '',
                    approved_amount: eventDetail?.total_budget.toString(),
                  }}
                  validationSchema={TeamStatusValidation}
                  onSubmit={values => {
                    changeEventStatus({
                      approved_amount: values.approved_amount,
                      billImages: [],
                      data: {
                        from: 'event_status',
                        id: eventDetail?.id,
                        tabActiveType: 'Pending',
                        total_budget: eventDetail?.total_budget,
                        opts: {
                          showBackdrop: true,
                          enableBackdropDismiss: true,
                        },
                        status: values.status,
                      },
                      remark: values.remark,
                    });
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
                        <View style={styles.container}>
                          {renderLabel()}
                          <Dropdown
                            style={[
                              styles.dropdown,
                              isFocus && { borderColor: activeTheme.themeColor },
                            ]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            data={data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={'Select Status'}
                            value={values.status}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                              setFieldValue('status', item.value);
                              setValue(item.value);
                              setIsFocus(false);
                            }}
                          />
                        </View>
                        {values.status == 'Reject' && (
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
                              value={values.remark}
                              onChangeText={handleChange('remark')}
                              autoCorrect={true}
                            />
                            {errors.remark && touched.remark && (
                              <Caption style={[GlobelStyle.errorMsg]}>
                                {errors.remark}
                              </Caption>
                            )}
                          </View>
                        )}
                        {values.status == 'Approved' && (
                          <View
                            style={{
                              width: 320,
                              alignSelf: 'center',
                            }}>
                            <AppTextInput
                              label={t('Approved Amount') + ' *'}
                              mode="outlined"
                              placeholder="Approved Amount"
                              placeholderTextColor={activeTheme.Medium}
                              type="textInput"
                              value={values.approved_amount}
                              onChangeText={handleChange('approved_amount')}
                              autoCorrect={true}
                              keyboardType="numeric"
                            />
                            {errors.approved_amount &&
                              touched.approved_amount && (
                                <Caption style={[GlobelStyle.errorMsg]}>
                                  {errors.approved_amount}
                                </Caption>
                              )}
                          </View>
                        )}
                      </View>
                      <View style={styles.modalButtons}>
                        <TouchableOpacity
                          style={[
                            styles.modalButton,
                            {
                              backgroundColor: themes[theme]?.fill,
                              marginBottom: 8,
                            },
                          ]}
                          onPress={() => {
                            if (
                              values.approved_amount > eventDetail.total_budget
                            ) {
                              handleSnackBar(
                                'Approved amount should be less then asked amount: ' +
                                eventDetail.total_budget,
                                activeTheme.Danger,
                              );
                              return;
                            } else {
                              handleSubmit();
                            }
                          }}>
                          <Text style={styles.modalButtonText2}>
                            {t('Update')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </Formik>
              </View>
            )}
          </View>
        </View>
        {/* </ScrollView> */}
      </Modal>
    </SafeAreaView>
  );
};

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

export default EventStatus;

export const ExpenseStatus = ({
  modalVisible,
  setModalVisible,
  theme = 'Submit',

  expenseDetail,
}) => {
  // const [images, setImages] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const activeTheme = useActiveTheme();
  const GlobelStyle = useGlobelStyle();
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: activeTheme.themeColor }]}>
        Status
      </Text>
    );
    return null;
  };
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

  const changeExpenseStatus = async payload => {
    try {
      setIsSubmit(true);
      const result = await ApiCall(payload, 'AppExpense/updateStatus');
      if (result.statusCode === 200) {
        Toast.show({
          type: 'success',
          text1: 'Status Successfully Changed',
          visibilityTime: 6000,
        });
        setIsSubmit(false);
        setModalVisible(false);

        navigation.navigate('ExpenseList');
      } else {
        setIsSubmit(false);
        Toast.show({
          type: 'error',
          text1: result.statusMsg,
          visibilityTime: 6000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error occurred while fetching events data:' + error,
        visibilityTime: 6000,
      });
    }
  };

  const TeamStatusValidation = Yup.object().shape({
    remark:
      value == 'Reject'
        ? Yup.string()
          .matches(/^\S/, 'First character cannot be a space')
          .required('This field is required')
        : Yup.string().matches(/^\S/, 'First character cannot be a space'),
    status: Yup.string().required('This field is required'),
  });

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        animated={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: 20,
              }}>
              <Text style={{ color: '#333333', fontSize: 18, fontWeight: '600' }}>
                {t('Change Status')}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon
                  name="close"
                  type="ant-design"
                  color={'#333333'}
                  size={25}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Formik
                initialValues={{
                  remark: '',
                  status: '',
                }}
                validationSchema={TeamStatusValidation}
                onSubmit={values => {
                  changeExpenseStatus({
                    id: expenseDetail?.id,
                    type: 'seniorStatus',
                    status: values.status,
                    reason: values.remark,
                  });
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
                      <View style={styles.container}>
                        {renderLabel()}
                        <Dropdown
                          style={[
                            styles.dropdown,
                            isFocus && { borderColor: activeTheme.themeColor },
                          ]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          data={data}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder={'Select Status'}
                          value={values.status}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setFieldValue('status', item.value);
                            setValue(item.value);
                            setIsFocus(false);
                          }}
                        />
                        {errors.status && touched.status && (
                          <Caption style={[GlobelStyle.errorMsg]}>
                            {errors.status}
                          </Caption>
                        )}
                      </View>
                      {values.status == 'Reject' && (
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
                            value={values.remark}
                            onChangeText={handleChange('remark')}
                            autoCorrect={true}
                          />
                          {errors.remark && touched.remark && (
                            <Caption style={[GlobelStyle.errorMsg]}>
                              {errors.remark}
                            </Caption>
                          )}
                        </View>
                      )}
                    </View>
                    <View style={styles.modalButtons}>
                      <AppButton
                        title={t('Update') + ''}
                        mode={'text'}
                        loading={isSubmit}
                        disabled={isSubmit}
                        color={activeTheme.themeColor}
                        onPress={() => handleSubmit()}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </Modal>
    </SafeAreaView>
  );
};

export const SiteStatus = ({ modalVisible, setModalVisible, siteDetail }) => {
  // const [images, setImages] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const activeTheme = useActiveTheme();
  const GlobelStyle = useGlobelStyle();
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();

  const renderLabel = () => {
    return (
      <Text style={[styles.label, isFocus && { color: activeTheme.themeColor }]}>
        {t('Status')}
      </Text>
    );
    return null;
  };

  const changeSiteStatus = async payload => {
    try {
      setIsSubmit(true);
      const result = await ApiCall(payload, 'AppEnquiry/siteStageChange');
      if (result.statusCode === 200) {
        Toast.show({
          type: 'success',
          text1: 'Status Successfully Changed',
          visibilityTime: 6000,
        });
        setIsSubmit(false);
        setModalVisible(false);
        navigation.navigate('SiteProjectList');
      } else {
        setIsSubmit(false);
        Toast.show({
          type: 'error',
          text1: result.statusMsg,
          visibilityTime: 6000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error occurred while fetching events data:' + error,
        visibilityTime: 6000,
      });
    }
  };

  const TeamStatusValidation = Yup.object().shape({
    requirement: Yup.string()
      .matches(/^\S/, 'First character cannot be a space')
      .required('This field is required'),
    lead_status: Yup.string().required('This field is required'),
  });

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        animated={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: 20,
              }}>
              <Text style={{ color: '#333333', fontSize: 18, fontWeight: '600' }}>
                {t('Change Status')}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon
                  name="cancel"
                  type="material"
                  color={'#333333'}
                  size={25}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Formik
                initialValues={{
                  requirement: '',
                  lead_status: '',
                }}
                validationSchema={TeamStatusValidation}
                onSubmit={values => {
                  changeSiteStatus({
                    dr_id: siteDetail?.id,
                    lead_status: values.lead_status,
                    requirement: values.requirement,
                  });
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
                      <View style={styles.container}>
                        {renderLabel()}
                        <Dropdown
                          style={[
                            styles.dropdown,
                            isFocus && { borderColor: activeTheme.themeColor },
                          ]}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          data={SiteData}
                          maxHeight={300}
                          labelField="label"
                          valueField="value"
                          placeholder={t('Select') + ' ' + t('Status')}
                          value={values.lead_status}
                          onFocus={() => setIsFocus(true)}
                          onBlur={() => setIsFocus(false)}
                          onChange={item => {
                            setFieldValue('lead_status', item.value);
                            setValue(item.value);
                            setIsFocus(false);
                          }}
                        />
                        {errors.lead_status && touched.lead_status && (
                          <Caption style={[GlobelStyle.errorMsg]}>
                            {t(errors.lead_status)}
                          </Caption>
                        )}
                      </View>
                      <View
                        style={{
                          width: 320,
                          alignSelf: 'center',
                        }}>
                        <AppTextInput
                          label={t('Remark') + ' *'}
                          mode="outlined"
                          placeholderTextColor={activeTheme.Medium}
                          type="multiline"
                          value={values.requirement}
                          onChangeText={handleChange('requirement')}
                          autoCorrect={true}
                        />
                        {errors.requirement && touched.requirement && (
                          <Caption style={[GlobelStyle.errorMsg]}>
                            {t(errors.requirement)}
                          </Caption>
                        )}
                      </View>
                    </View>
                    <View style={styles.modalButtons}>
                      <AppButton
                        title={t('Update') + ''}
                        mode={'text'}
                        loading={isSubmit}
                        disabled={isSubmit}
                        color={activeTheme.themeColor}
                        onPress={() => handleSubmit()}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </Modal>
    </SafeAreaView>
  );
};

export const ChangeShippingAddress = ({
  modalVisible,
  setModalVisible,
  trackRequestDetail,
}) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const activeTheme = useActiveTheme();
  const GlobelStyle = useGlobelStyle();
  const { t } = useTranslation();

  const submit = async payload => {
    try {
      setIsSubmit(true);

      const result = await ApiCall(
        payload,
        'AppGiftTracker/shippingAddressChange',
      );
      if (result.statusCode == 200) {
        Toast.show({
          type: 'success',
          text1: result.statusMsg,
          visibilityTime: 6000,
        });

        setIsSubmit(false);
        setModalVisible(false);
      } else {
        setModalVisible(false);
        setIsSubmit(false);
        Toast.show({ type: 'error', text1: result.statusMsg, visibilityTime: 6000 });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: t('Error occurred while fetching events data:') + error,
        visibilityTime: 6000,
      });
    }
  };

  const shippingAddressValidation = Yup.object().shape({
    shipping_address: Yup.string()
      .matches(/^\S/, 'First character cannot be a space')
      .required('This field is required'),
  });

  return (
    <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        animated={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: 20,
              }}>
              <Text style={{ color: '#333333', fontSize: 18, fontWeight: '600' }}>
                {t('Change Shipping Address')}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon
                  name="cancel"
                  type="material"
                  color={'#333333'}
                  size={25}
                />
              </TouchableOpacity>
            </View>

            <View>
              <Formik
                initialValues={{
                  shipping_address: trackRequestDetail.shipping_address,
                }}
                validationSchema={shippingAddressValidation}
                onSubmit={values => {
                  submit({
                    id: trackRequestDetail.id,
                    shipping_address: values.shipping_address,
                  });
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
                          width: '100%',
                          alignSelf: 'center',
                        }}>
                        <AppTextInput
                          label={t('Shipping address') + ' *'}
                          mode="outlined"
                          placeholderTextColor={activeTheme.Medium}
                          type="multiline"
                          value={values.shipping_address}
                          onChangeText={handleChange('shipping_address')}
                          autoCorrect={true}
                        />
                        {errors.shipping_address &&
                          touched.shipping_address && (
                            <Caption style={[GlobelStyle.errorMsg]}>
                              {t(errors.shipping_address)}
                            </Caption>
                          )}
                      </View>
                    </View>
                    <View style={styles.modalButtons}>
                      <AppButton
                        title={t('Update') + ''}
                        mode={'text'}
                        loading={isSubmit}
                        disabled={isSubmit}
                        color={activeTheme.themeColor}
                        onPress={() => handleSubmit()}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </View>
        {/* </ScrollView> */}
      </Modal>
    </SafeAreaView>
  );
};
