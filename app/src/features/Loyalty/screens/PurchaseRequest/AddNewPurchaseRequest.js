import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Formik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Dropdown } from 'react-native-element-dropdown';
import { Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import AppButton from '../../../../core/components/Button/AppButton';
import ConfirmationModal from '../../../../core/components/ConfirmationModal/ConfirmationModal';
import AppTextInput from '../../../../core/components/TextInput/AppTextInput';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import { ApiCall } from '../../../../services/ServiceProvider';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { BottomSheet, Button, ListItem } from '@rneui/themed';
import AppBoldText from '../../../../core/components/BoldText/AppBoldText';
import { titleCase } from '../../../../core/utils/TextUtils';

import { Icon } from '@rneui/themed';

import { PurchaseRequestAddValidation } from '../../../../core/components/ValidationSchema/SchemaProfile';
import moment from 'moment';
import AttachImages, { AttachImages2 } from '../../../../core/components/AttachImages/AttachImages';
import { useIsFocused } from '@react-navigation/native';
import AppLoader, { AppLoader2 } from '../../../../core/components/Loader/AppLoader';

const AddNewPurchaseRequest = ({ navigation }) => {
  const GlobelStyle = useGlobelStyle();
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [pdf, setPdf] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [startOpen, setStartOpen] = useState(false);
  const activeTheme = useActiveTheme();
  const [productItem, setproductItem] = useState([]);
  const { itemList, total_sqft, total_point_value } = {};
  const isFocused = useIsFocused();

  const getItems = useCallback(async search => {
    try {
      setIsRefreshing(true);

      const result = await ApiCall(
        {
          search: search,
        },
        'AppPurchase/productListing',
      );

      if (result.statusCode === 200) {
        setproductItem(result.products);
      }

      setIsRefreshing(false);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error occurred while fetching data',
        visibilityTime: 6000,
      });
      console.error(':', error);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {

    if (isFocused == true) {


      getItems('');
    }

  }, [isFocused]);

  const renderLabel = (value, label, required) => {
    if (value) {
      return <Text style={[GlobelStyle.label]}>{t(label)} {required && '*'}</Text>;
    }
    return null;
  };
  const hideDatePicker = () => {
    setStartOpen(false);
  };
  const submit = async values => {
    let formData = {};
    formData = values;

    formData.item_list = itemList;
    formData.total_item = itemList.length;
    formData.total_sqft = total_sqft;
    formData.total_point_value = total_point_value;

    formData.billPdf = pdf;
    if (images.length > 0) {
      formData.billImage = images.map(r => {
        return r.base64;
      });
    }

    try {
      setButtonLoading(true);
      const response = await ApiCall(
        { data: formData },
        'AppPurchase/addPurchase',
      );

      if (response.statusCode == 200) {
        Toast.show({ type: 'success', text1: response.statusMsg, visibilityTime: 6000 });
        navigation.navigate('PurchaseRequest');
      } else {
        setButtonLoading(false);
        Toast.show({ type: 'error', text1: response.statusMsg, visibilityTime: 6000 });
      }
    } catch (error) {
      setButtonLoading(false);

      Toast.show({ type: 'error', text1: error.message, visibilityTime: 6000 });
    }
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[GlobelStyle.container]}>
        {
          buttonLoading ? <AppLoader2 isLoading={buttonLoading} /> : (
            <ScrollView
              style={{ margin: 16 }}
              showsVerticalScrollIndicator={false}
              refreshControl={
                // isRefreshing && <AppLoader loading={isRefreshing} color={activeTheme.themeColor} size={30} />
                <RefreshControl refreshing={isRefreshing} />
              }>
              <Formik
                initialValues={{
                  product: '',
                  product_name: '',
                  point_value: '',
                  sqft: '',
                  invoice_date: '',
                  invoice_number: '',
                  purchase_from: '',
                  purchase_from_name: '',
                  amount: '',
                  specification: '',
                  remark: '',
                }}
                validationSchema={PurchaseRequestAddValidation}
                onSubmit={values => submit(values)}>
                {({
                  values,
                  handleChange,
                  setFieldValue,
                  handleSubmit,
                  validateForm,
                  errors,
                  touched,
                }) => (
                  <View style={{ paddingVertical: 16 }}>
                    <View>
                      {renderLabel(values.product, 'Products', false)}
                      <Dropdown
                        style={[GlobelStyle.dropdown, { borderColor: '#f0f0f0', borderWidth: 1 }]}
                        placeholderStyle={GlobelStyle.placeholderStyle}
                        selectedTextStyle={GlobelStyle.selectedTextStyle}
                        inputSearchStyle={GlobelStyle.inputSearchStyle}
                        iconStyle={GlobelStyle.iconStyle}
                        data={productItem}
                        search
                        maxHeight={300}
                        name="product"
                        labelField="display_name"
                        valueField="product_code"
                        placeholder={t('Products') + ''}
                        searchPlaceholder="Search..."
                        value={values.product}
                        onChange={item => {

                          setFieldValue('product', item.product_code);
                          setFieldValue('product_name', item.product_name);
                          setFieldValue('product_code', item.product_code);
                          setFieldValue(
                            'point_value',
                            item.point == null ? '0' : item.point.toString(),
                          );
                        }}
                        onChangeText={search => getItems(search)}
                      />
                      {errors.product && touched.product && (
                        <Animatable.Text
                          animation="shake"
                          style={[GlobelStyle.error]}>
                          {t(errors.product)}
                        </Animatable.Text>
                      )}
                    </View>
                    <View style={[GlobelStyle.mt10]}>
                      <AppTextInput
                        label={t('Product Name') + ''}
                        mode="outlined"
                        placeholderTextColor={activeTheme.Medium}
                        type="textInput"
                        placeholder={t('Product Name') + ''}
                        value={values.product_name}
                        onChangeText={handleChange('product_name')}
                        autoCorrect={true}
                        readOnly={true}
                      />
                      {errors.product_name && touched.product_name && (
                        <Animatable.Text
                          animation="shake"
                          style={[GlobelStyle.error]}>
                          {t(errors.product_name)}
                        </Animatable.Text>
                      )}
                    </View>
                    <View style={[GlobelStyle.mt10]}>
                      <AppTextInput
                        label={t('Point Per SQFT') + ''}
                        mode="outlined"
                        placeholderTextColor={activeTheme.Medium}
                        type="textInput"
                        placeholder={t('Point Per SQFT') + ''}
                        value={values.point_value}
                        onChangeText={handleChange('point_value')}
                        autoCorrect={true}
                        readOnly={true}
                      />
                      {errors.point_value && touched.point_value && (
                        <Animatable.Text
                          animation="shake"
                          style={[GlobelStyle.error]}>
                          {t(errors.point_value)}
                        </Animatable.Text>
                      )}
                    </View>
                    <View style={[GlobelStyle.mt10]}>
                      <AppTextInput
                        label={t('SQFT') + ''}
                        mode="outlined"
                        placeholderTextColor={activeTheme.Medium}
                        type="textInput"
                        placeholder={t('SQFT') + ''}
                        value={values.sqft}
                        onChangeText={handleChange('sqft')}
                        keyboardType={'numeric'}
                      />
                      {errors.sqft && touched.sqft && (
                        <Animatable.Text
                          animation="shake"
                          style={[GlobelStyle.error]}>
                          {t(errors.sqft)}
                        </Animatable.Text>
                      )}
                    </View>

                    <View style={GlobelStyle.mt10}>
                      <AppButton
                        title={t('Add To List')}
                        mode={'contained'}
                        loading={false}
                        disabled={false}
                        color={activeTheme.Progress}
                        onPress={() => {
                          if (!values.product) {
                            Toast.show({
                              type: 'error',
                              text1: 'Select Product',
                              visibilityTime: 6000,
                            });
                            return;
                          }
                          if (!Number(values.sqft)) {
                            Toast.show({
                              type: 'error',
                              text1: 'Invalid Sqft',
                              visibilityTime: 6000,
                            });
                            return;
                          }
                          if (Number(values.sqft) < 1) {
                            Toast.show({
                              type: 'error',
                              text1: 'Minimum qty 1 is required',
                              visibilityTime: 6000,
                            });
                            return;
                          }

                          setFieldValue('product_name', '');
                          setFieldValue('product_code', '');
                          setFieldValue('points', '');
                          setFieldValue('product', '');
                          setFieldValue('sqft', '');
                          setFieldValue('point_value', '');
                          Toast.show({
                            type: 'success',
                            text1: 'Item Added',
                            visibilityTime: 6000,
                          });
                        }}
                      />
                    </View>

                    <View style={GlobelStyle.mt10}>
                      {itemList.length > 0 &&
                        itemList.map((row, i) => {
                          return (
                            <>
                              <View style={styles.container}>
                                <View style={styles.header}>
                                  <Text style={styles.title}>
                                    <Text style={styles.number}>#{i + 1}. </Text>
                                    {row.product_name
                                      ? titleCase(row.product_name)
                                      : ''}{' '}
                                    <Text style={styles.productId}>
                                      {row.product_code ? row.product_code : ''}
                                    </Text>
                                  </Text>
                                  <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => {

                                      Toast.show({
                                        type: 'success',
                                        text1: 'Item Removed',
                                        visibilityTime: 6000,
                                      });
                                    }}>
                                    <Text style={styles.deleteButtonText}>
                                      <Icon
                                        name="delete"
                                        color={activeTheme.Danger}
                                        type="material"
                                      />
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                                <View style={styles.inputRow}>
                                  <View>
                                    <Text style={styles.totalPoint}>
                                      <AppBoldText>{t('SQFT')}</AppBoldText>
                                    </Text>
                                    <Text>{row.sqft ? row.sqft : '0'}</Text>
                                  </View>
                                  <View>
                                    <Text style={styles.totalPoint}>
                                      <AppBoldText>
                                        {t('Point Per SQFT')}
                                      </AppBoldText>
                                    </Text>
                                    <Text>
                                      {row.per_sqft
                                        ? row.per_sqft + ' Points'
                                        : '---'}
                                    </Text>
                                  </View>
                                  <View>
                                    <Text style={styles.totalPoint}>
                                      <AppBoldText>{t('Total Point')}</AppBoldText>
                                    </Text>
                                    <Text>
                                      {row.total_points
                                        ? row.total_points + ' Points'
                                        : '---'}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </>
                          );
                        })}
                      {itemList.length > 0 && (
                        <>
                          <View
                            style={[
                              styles?.infoRow,
                              { backgroundColor: '#E5F1FF', marginHorizontal: 16 },
                            ]}>
                            <Text style={[styles?.infoLabel]}>
                              {t('Total Item')}
                            </Text>
                            <Text style={[styles?.infoValue]}>
                              {itemList.length}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles?.infoRow,
                              {
                                backgroundColor: '#E5F1FF',
                                marginHorizontal: 16,
                                marginVertical: 3,
                              },
                            ]}>
                            <Text style={[styles?.infoLabel]}>
                              {t('Total SQFT')}
                            </Text>
                            <Text style={[styles?.infoValue]}>
                              {total_sqft ? total_sqft : 0}
                            </Text>
                          </View>
                          <View
                            style={[
                              styles?.infoRow,
                              {
                                backgroundColor: '#E5F1FF',
                                marginHorizontal: 16,
                                marginVertical: 3,
                              },
                            ]}>
                            <Text style={[styles?.infoLabel]}>
                              {t('Total Points')}
                            </Text>
                            <Text style={[styles?.infoValue]}>
                              {total_point_value ? total_point_value : '0'}
                            </Text>
                          </View>
                        </>
                      )}
                    </View>

                    <View style={[GlobelStyle.mt10]}>
                      <AppTextInput
                        label={t('Invoice Date') + '*'}
                        mode="outlined"
                        placeholderTextColor={activeTheme.Medium}
                        type="textInput"
                        placeholder={t('Invoice Date') + '*'}
                        value={
                          values.invoice_date
                            ? moment(values.invoice_date).format('DD MMM YYYY')
                            : values.invoice_date
                        }
                        onChangeText={handleChange('invoice_date')}
                        autoCorrect={true}
                        // readOnly={true}
                        onPress={() => setStartOpen(true)}
                        right={
                          <TextInput.Icon
                            icon="calendar"
                            onPress={() => setStartOpen(true)}
                          />
                        }
                      />

                      <DateTimePickerModal
                        isVisible={startOpen}
                        mode="date"
                        maximumDate={new Date()}
                        onConfirm={date => {
                          let formateDate = moment(date).format('YYYY-MM-DD');
                          setFieldValue('invoice_date', formateDate);

                          hideDatePicker();
                        }}
                        onCancel={hideDatePicker}
                      />
                      {errors.invoice_date && touched.invoice_date && (
                        <Animatable.Text
                          animation="shake"
                          style={[GlobelStyle.error]}>
                          {t(errors.invoice_date)}
                        </Animatable.Text>
                      )}
                    </View>

                    <View style={[GlobelStyle.mt10]}>
                      <AppTextInput
                        label={t('Invoice Number') + ' *'}
                        mode="outlined"
                        placeholderTextColor={activeTheme.Medium}
                        type="textInput"
                        placeholder={t('Invoice Number') + ' *'}
                        value={values.invoice_number}
                        onChangeText={handleChange('invoice_number')}
                      />
                      {errors.invoice_number && touched.invoice_number && (
                        <Animatable.Text
                          animation="shake"
                          style={[GlobelStyle.error]}>
                          {t(errors.invoice_number)}
                        </Animatable.Text>
                      )}
                    </View>

                    <View style={[GlobelStyle.mt10]}>
                      {renderLabel(
                        values.purchase_from,
                        'Material Purchase From',
                        true
                      )}
                      <Dropdown
                        style={[GlobelStyle.dropdown, { borderColor: '#f0f0f0', borderWidth: 1 }]}
                        placeholderStyle={GlobelStyle.placeholderStyle}
                        selectedTextStyle={GlobelStyle.selectedTextStyle}
                        inputSearchStyle={GlobelStyle.inputSearchStyle}
                        iconStyle={GlobelStyle.iconStyle}
                        data={[
                          { display_name: 'Dealer', value: 'Dealer' },
                          { display_name: 'Distributor', value: 'Distributor' },
                          { display_name: 'Branch', value: 'Branch' },
                          { display_name: 'Factory', value: 'Factory' },
                        ]}
                        search
                        maxHeight={300}
                        name="purchase_from"
                        labelField="display_name"
                        valueField="value"
                        placeholder={t('Material Purchase From') + ' *'}
                        searchPlaceholder="Search..."
                        value={values.purchase_from}
                        onChange={item => {

                          setFieldValue('purchase_from', item.value);
                        }}
                      />
                      {errors.purchase_from && touched.purchase_from && (
                        <Animatable.Text
                          animation="shake"
                          style={[GlobelStyle.error]}>
                          {t(errors.purchase_from)}
                        </Animatable.Text>
                      )}
                    </View>

                    {values.purchase_from !== 'Factory' && values.purchase_from && (
                      <View style={[GlobelStyle.mt10]}>
                        <AppTextInput
                          label={`${t(values.purchase_from)} ${t('Name')} *`}
                          mode="outlined"
                          placeholderTextColor={activeTheme.Medium}
                          type="textInput"
                          placeholder={`${values.purchase_from} ${t('Name')} *`}
                          value={values.purchase_from_name}
                          onChangeText={handleChange('purchase_from_name')}
                          autoCorrect={true}
                        />
                        {errors.purchase_from_name &&
                          touched.purchase_from_name && (
                            <Animatable.Text
                              animation="shake"
                              style={[GlobelStyle.error]}>
                              {t(errors.purchase_from_name)}
                            </Animatable.Text>
                          )}
                      </View>
                    )}

                    <View style={[GlobelStyle.mt10]}>
                      <AppTextInput
                        label={`${t('Value')} (${t('Without GST')}) *`}
                        mode="outlined"
                        placeholderTextColor={activeTheme.Medium}
                        type="textInput"
                        placeholder={`${t('Value')} (${t('Without GST')}) *`}
                        value={values.amount}
                        onChangeText={handleChange('amount')}
                        autoCorrect={true}
                        keyboardType={'numeric'}

                      />
                      {errors.amount && touched.amount && (
                        <Animatable.Text
                          animation="shake"
                          style={[GlobelStyle.error]}>
                          {t(errors.amount)}
                        </Animatable.Text>
                      )}
                    </View>

                    <View style={[GlobelStyle.mt10]}>
                      {renderLabel(values.specification, 'specification', true)}
                      <Dropdown
                        style={[GlobelStyle.dropdown, { borderColor: '#f0f0f0', borderWidth: 1 }]}
                        placeholderStyle={GlobelStyle.placeholderStyle}
                        selectedTextStyle={GlobelStyle.selectedTextStyle}
                        inputSearchStyle={GlobelStyle.inputSearchStyle}
                        iconStyle={GlobelStyle.iconStyle}
                        data={[
                          { display_name: 'Fr', value: 'Fr' },
                          { display_name: 'Non FR', value: 'Non FR' },
                        ]}
                        search
                        maxHeight={300}
                        name="specification"
                        labelField="display_name"
                        valueField="value"
                        placeholder={t('Specification') + ' *'}
                        searchPlaceholder="Search..."
                        value={values.specification}
                        onChange={item => {
                          setFieldValue('specification', item.value);
                        }}
                      />
                      {errors.specification && touched.specification && (
                        <Animatable.Text
                          animation="shake"
                          style={[GlobelStyle.error]}>
                          {t(errors.specification)}
                        </Animatable.Text>
                      )}
                    </View>

                    <View style={[GlobelStyle.mt10]}>
                      <AppTextInput
                        label={t('Remark')}
                        mode="outlined"
                        placeholderTextColor={activeTheme.Medium}
                        type="multiline"
                        placeholder={t('Remark')}
                        value={values.remark}
                        onChangeText={handleChange('remark')}
                        autoCorrect={true}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: '#FFF',
                        marginTop: 20,
                        paddingHorizontal: 20,
                        borderRadius: 10,
                      }}>
                      <AttachImages2
                        title={t('Attach Images')}
                        images={images}
                        setImages={setImages}
                        isMultiple={true}
                        onlyCamera={false}
                        camera={false}
                        pdfUpload={true}
                        pdf={pdf}

                        setPdf={setPdf}
                      />
                    </View>

                    {itemList.length > 0 && (
                      <View style={GlobelStyle.mt10}>
                        <AppButton
                          title={t('Submit')}
                          mode={'contained'}
                          loading={buttonLoading}
                          disabled={buttonLoading}
                          color={activeTheme.buttonColor}
                          onPress={() => {
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
                            });
                          }}
                        />
                      </View>
                    )}

                    <ConfirmationModal
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      confirmSubmit={handleSubmit}
                      iconName="clipboard-text-search"
                      iconType="material-community"
                      title={t('Save Purchase Request')}
                      content={t('Are you sure you want to submit ?')}
                      theme="Submit"
                    />
                  </View>
                )}
              </Formik>
            </ScrollView>
          )
        }

      </SafeAreaView>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  number: {
    color: '#f39c12',
  },
  productId: {
    fontWeight: 'normal',
    color: '#7f8c8d',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 18,
    color: '#e74c3c',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    textAlign: 'center',
  },
  totalPoint: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#7f8c8d',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 3,
    alignItems: 'center',
  },
  infoLabel: {
    fontWeight: '400',
    fontSize: 12,
  },
  infoValue: {
    fontWeight: '700',
    color: 'black',
  },
});

export default AddNewPurchaseRequest;
