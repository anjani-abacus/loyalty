import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, ScrollView} from 'react-native';
import {Formik} from 'formik';
import {ApiCall} from '../../../../services/ServiceProvider';
import {Caption} from 'react-native-paper';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import AppButton from '../../../../core/components/Button/AppButton';
import AppTextInput from '../../../../core/components/TextInput/AppTextInput';
import * as Yup from 'yup';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import ConfirmationModal from '../../../../core/components/ConfirmationModal/ConfirmationModal';
import AttachImages from '../../../../core/components/AttachImages/AttachImages';
import useGlobelStyle from '../../../assets/Style/GlobelStyle';
import Toast from 'react-native-toast-message';
import {Icon} from '@rneui/themed';
import AppDropdown from '../../../../core/components/AppDropdown';
import { AppLoader2 } from '../../../../core/components/Loader/AppLoader';
import useTheme from '../../../components/Theme/useTheme';
const TicketAdd = ({navigation, route}) => {
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useTheme();
  const {t} = useTranslation();
  const [ticketTypes, setTicketTypes] = useState([]);
  const [customerTypes, setCustomerTypes] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [customers2, setCustomers2] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [checkinId, setCheckinId] = useState('');
  const [images, setImages] = useState([]);

  const userData = {};

  useEffect(() => {
    getCustomerTypes();
    getTicketTypes();
    if (route.params?.checkin_id) {
      setCheckinId(route.params?.checkin_id);
      getCustomers(route.params?.dr_type);
    }
  }, []);

  const getTicketTypes = async () => {
    try {
      await ApiCall({}, 'AppSupport/getSupportcategory').then(response => {
        if (response.statusCode == 200) {
          setTicketTypes(response.data);
        } else {
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getCustomerTypes = async () => {
    try {
      await ApiCall({}, 'AppSupport/allNetworkModule')
        .then(response => {
          if (response.statusCode == 200) {
            setCustomerTypes(response.modules);
          } else {
          }
        })
        .catch(error => {});
    } catch (error) {
      console.error(error);
    }
  };

  const getCustomers = async drType => {
    try {
      await ApiCall({dr_type: drType}, 'AppOrder/followupCustomer')
        .then(response => {
          if (response.statusCode == 200) {
            setCustomers(response.result);
            setCustomers2(response.result);
          } else {
            Toast.show({
              type: 'error',
              text1: result.statusMsg,
              visibilityTime: 6000,
              icon: (
                <Icon
                  name="error"
                  type="material-community-icons"
                  color="white"
                  size={20}
                />
              ),
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
    } catch {}
  };

  const AddTicketValidation = Yup.object().shape({
    Customer_Type:
      checkinId != '' || userData.user_type == 'influencer'
        ? Yup.string()
        : Yup.string().required(t('This field is required')),
    Customer:
      checkinId != '' || userData.user_type == 'influencer'
        ? Yup.string()
        : Yup.number().required(t('This field is required')),
    Ticket_Type: Yup.string().required(t('This field is required')),
    Remark: Yup.string()
      .required(t('This field is required'))
      .matches(/^\S/, t('First character cannot be a space')),
  });

  const submitAddTicketForm = async values => {
    let drID = '';
    if (checkinId != '') {
      drID = route.params.dr_id;
    } else {
      drID = values.Customer;
    }

    // setButtonLoading(true);
    // setButtonDisable(true);

    const customerIndex = customers.findIndex(item => item.id == drID);
    const customer = customers[customerIndex];
    const ticketIndex = ticketTypes.findIndex(
      item => item.id == values.Ticket_Type,
    );
    const ticket = ticketTypes[ticketIndex];

    const formData = {
      customer_id: customer?.id,
      customer_name: customer?.display_name,
      customer_type: checkinId ? route.params.dr_type : values.Customer_Type,
      checkin_id: checkinId,
      remarks: values.Remark,
      module_name: values.Customer_Type,
      type: ticket.id.toString(),
      type_name: ticket.category_name,
      image: images.map(image => image.base64),
    };

    try {
      const response = await ApiCall({data: formData}, 'AppSupport/addSupport');
      if (response.statusCode == 200) {
        Toast.show({
          type: 'success',
          text1: response.statusMsg,
          visibilityTime: 6000,
          icon: (
            <Icon
              name="check"
              type="material-community-icons"
              color="white"
              size={20}
            />
          ),
        });
        setButtonLoading(false);
        setButtonDisable(false);
        navigation.pop();

      } else {
        setButtonLoading(false);
        setButtonDisable(false);
        Toast.show({
          type: 'error',
          text1: response.statusMsg,
          visibilityTime: 6000,
          icon: (
            <Icon
              name="error"
              type="material-community-icons"
              color="white"
              size={20}
            />
          ),
        });
      }
    } catch (error) {
      setButtonLoading(false);
      setButtonDisable(false);
      Toast.show({
        type: 'error',
        text1: 'Some error , try again',
        visibilityTime: 6000,
        icon: (
          <Icon
            name="error"
            type="material-community-icons"
            color="white"
            size={20}
          />
        ),
      });
    }
  };

  const setSearchTextFunction = val => {
    if (val != null) {
      const newVal = val.toLowerCase();

      const FilteredDistributor = customers2.filter(
        item =>
          item.company_name.toString().toLowerCase().includes(newVal) ||
          item.mobile.toString().includes(newVal),
      );
      setCustomers(FilteredDistributor);
    }
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[GlobelStyle.container]}>
        {buttonLoading ? (
          <AppLoader2 isLoading={buttonLoading} />
        ) : (
          <ScrollView style={{margin: 16}}>
            <Formik
              initialValues={{
                Customer_Type: '',
                Customer: '',
                Ticket_Type: '',
                Remark: '',
              }}
              validationSchema={AddTicketValidation}
              onSubmit={values => submitAddTicketForm(values)}>
              {({
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                setFieldValue,
                validateForm,
              }) => (
                <View style={{paddingVertical: 12}}>
                  <View
                    style={{
                      backgroundColor: activeTheme.White,
                      borderRadius: 8,
                      padding: 8,
                    }}>
                    {userData.user_type != 'influencer' && checkinId == '' && (
                      <>

                        {values.Customer_Type && (
                          <View style={[GlobelStyle.mb12]}>
                            <AppDropdown
                              name="Customer"
                              isRequired={true}
                              form={{setFieldValue, errors, touched, values}}
                              label={t('Select Customer')}
                              data={customers}
                              labelField="display_name"
                              valueField="id"
                              placeholder={t('Select Customer')}
                              search={true}
                              mode="modal"
                              dropDownType="underLine"
                              onChange={(
                                selectedValue,
                                setFieldValue,
                                item,
                              ) => {
                                handleChange('Customer');
                                setCustomers(customers2);
                              }}
                            />
                          </View>
                        )}
                      </>
                    )}
                    <View style={[GlobelStyle.mb12]}>
                      <AppDropdown
                        name="Ticket_Type"
                        isRequired={true}
                        form={{setFieldValue, errors, touched, values}}
                        label={t('Select Ticket Type')}
                        data={ticketTypes}
                        labelField="category_name"
                        valueField="id"
                        placeholder={t('Select Ticket Type')}
                        search={true}
                        mode="modal"
                        dropDownType="underLine"
                        onChange={(selectedValue, setFieldValue, item) => {
                          handleChange('Ticket_Type');
                        }}
                      />
                    </View>

                    <View style={[GlobelStyle.mb12]}>
                      <AppTextInput
                        label={t('Remark') + ' *'}
                        mode="outlined"
                        placeholderTextColor={activeTheme.Medium}
                        type="multiline"
                        value={values.Remark}
                        onChangeText={val => {
                          setFieldValue('Remark', val);
                        }}
                        autoCorrect={true}
                      />
                    </View>
                    {errors.Remark && touched.Remark && (
                      <Caption style={[GlobelStyle.errorMsg]}>
                        {t(errors.Remark)}
                      </Caption>
                    )}
                  </View>
                  <AttachImages
                    title={t('Attach Images')}
                    onlyCamera={false}
                    isMultiple={true}
                    images={images}
                    setImages={setImages}
                  />
                  <View>
                    <AppButton
                      title={t('Add Ticket')}
                      mode={'contained'}
                      loading={buttonLoading}
                      disabled={buttonDisable}
                      color={activeTheme.themeColor}
                      onPress={() =>
                        validateForm().then(errors => {
                          if (Object.keys(errors).length === 0) {
                            setModalVisible(!modalVisible);
                          } else {
                            handleSubmit();
                            Toast.show({
                              type: 'error',
                              text1: t('Please Fill Required Field'),
                              visibilityTime: 6000,
                            });
                          }
                        })
                      }
                    />
                  </View>
                  <ConfirmationModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    confirmSubmit={handleSubmit}
                    iconName="ticket-confirmation"
                    iconType="material-community"
                    title={t('Add Ticket')}
                    content={t('Are you sure you want to submit ticket ?')}
                    theme="Submit"
                  />
                </View>
              )}
            </Formik>
          </ScrollView>
        )}
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

export default TicketAdd;
