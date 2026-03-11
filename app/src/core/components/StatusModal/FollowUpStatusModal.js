import React, {useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {MD3Colors, Caption} from 'react-native-paper';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import AppTextInput from '../TextInput/AppTextInput';
import useActiveTheme from '../Theme/useActiveTheme';
import SnackbarComponent from '../Snackbar/Snackbar';
import {ApiCall} from '../../services/ServiceProvider';
import {useTranslation} from 'react-i18next';

const FollowUpStatusModal = ({visible, handleModalVisible, ID, data}) => {
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useActiveTheme();
  const {t} = useTranslation();
  const [snackMessage, setSnackMessage] = useState('');
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [bgColor, setBgColor] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const handlePress = () => {
    handleModalVisible();
  };

  const submitStatus = async values => {
    let statusData = {};
    statusData.Id = ID;
    statusData.Status = values?.status;
    statusData.followup_date = data?.next_follow_date;
    statusData.followup_remark = values?.followup_remark;
    try {
      await ApiCall(statusData, 'AppFollowup/followupUpdate')
        .then(result => {
          if (result.statusCode == 200) {
            setSnackMessage(result.statusMsg);
            setShowSnackBar(true);
            setBgColor(activeTheme.Success);
            setTimeout(() => {
              setShowSnackBar(false);
              handleModalVisible();
            }, 1000);
          } else {
            setSnackMessage(result.statusMsg);
            setShowSnackBar(true);
            setIsRefreshing(false);
            setBgColor(activeTheme.Danger);
            setTimeout(() => {
              setShowSnackBar(false);
            }, 1000);
          }
        })
        .catch(error => {});
    } catch {}
  };
  const AddFollowupValidation = Yup.object().shape({
    status: Yup.string().required(t('This field is required')),
    followup_remark: Yup.string().required(t('This field is required')),
  });

  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: activeTheme.Dark,
      opacity: 0.9,
    },
    ModuleList: {
      borderBottomColor: MD3Colors.primary90,
      borderBottomWidth: 1,
      height: 50,
      width: '100%',
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    modalView: {
      width: '80%',
      backgroundColor: activeTheme.Light,
      borderRadius: 10,
      padding: 16,
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
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: MD3Colors.error50,
    },
    buttonSubmit: {
      width: '100%',
      borderRadius: 10,
      padding: 10,
      color: activeTheme.Success,
      marginVertical: 8,
      borderColor: activeTheme.Success,
      borderWidth: 1,
    },
    cancleTextStyle: {
      color: 'white',
      fontWeight: '700',
      textAlign: 'center',
    },
    successTextStyle: {
      color: activeTheme.Success,
      fontWeight: '700',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        handlePress();
      }}>
      <Formik
        initialValues={{
          status: '',
          followup_remark: '',
        }}
        validationSchema={AddFollowupValidation}
        onSubmit={values => submitStatus(values)}>
        {({values, handleChange, handleSubmit, errors, touched}) => (
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{width: '100%'}}>
                <View style={[GlobelStyle.PickerStyle]}>
                  <Picker
                    itemStyle={{height: Platform.OS == 'ios' ? 44 : 0}}
                    mode="dropdown"
                    selectedValue={values.status}
                    onValueChange={value => {
                      handleChange('status')(value);
                      value == 'Complete'
                        ? setIsDisabled(false)
                        : setIsDisabled(true);
                    }}>
                    {/* <Picker.Item label="Pending" value="Pending" /> */}
                    <Picker.Item label="Complete" value="Complete" />
                  </Picker>
                </View>
                {errors.status && touched.status && (
                  <Caption style={[GlobelStyle.errorMsg]}>
                    {errors.status}
                  </Caption>
                )}
                <View style={[GlobelStyle.mt16, GlobelStyle.mb16]}>
                  <AppTextInput
                    label={t('Remark') + ' *'}
                    mode="outlined"
                    placeholder="Enter remark"
                    placeholderTextColor={activeTheme.Medium}
                    type="multiline"
                    value={values.followup_remark}
                    onChangeText={handleChange('followup_remark')}
                    autoCorrect={true}
                  />
                  {errors.followup_remark && touched.followup_remark && (
                    <Caption style={[GlobelStyle.errorMsg]}>
                      {errors.followup_remark}
                    </Caption>
                  )}
                </View>
              </View>
              {values.status == 'Complete' && (
                <TouchableOpacity
                  disabled={isDisabled}
                  style={[styles.buttonSubmit]}
                  onPress={() => handleSubmit()}>
                  <Text style={styles.successTextStyle}>{t('Submit')}</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => handlePress()}>
                <Text style={styles.cancleTextStyle}>{t('Cancel')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
      <SnackbarComponent
        visible={showSnackBar}
        message={snackMessage}
        backgroundColor={bgColor}
      />
    </Modal>
  );
};

export default FollowUpStatusModal;
