import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Icon, Skeleton } from '@rneui/themed';
import { useFormikContext } from 'formik';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Appbar, Caption, Text, Title } from 'react-native-paper';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import AppTextInput from '../../components/TextInput/AppTextInput';
import AppTheme from '../Theme/AppTheme';
import { Dropdown } from 'react-native-element-dropdown';
import { RenderLabel } from './utils';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Success from '../../assets/icons/Success.svg';
import useTheme from '../Theme/useTheme';

const BankInfoForm = () => {
    const { values, handleChange, handleSubmit, setFieldValue, errors, touched, validateForm } = useFormikContext();
    const { t } = useTranslation();
    const GlobelStyle = useGlobelStyle();
    const activeTheme = useTheme();
    return <><View style={[GlobelStyle.AdressHeader]}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        gap: 10,
      }}>
        <Icon name="home-work" color={activeTheme.text} />
        <Title style={[GlobelStyle.largeFont]}>Bank Information</Title>
      </View>

      {
        (values?.bankDetails?.account_holder_name && values?.bankDetails?.account_no && values?.bankDetails?.bank_name && values?.bankDetails?.upi_id) &&
        (!errors?.bankDetails?.account_holder_name && !errors?.bankDetails?.account_no && !errors?.bankDetails?.bank_name && !errors?.bankDetails?.upi_id) &&
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
      }
    </View>

        {/* <View style={[GlobelStyle.AdressHeader, GlobelStyle.mt16]}>
            <FontAwesome
                name="bank"
                style={{color:'#000'}}
                size={22}
            />
            <Text style={[GlobelStyle.largeFont]}>
                Bank Information
            </Text>
        </View> */}

        {/* <View style={[GlobelStyle.mt8]}>
              <RenderLabel value={values?.otherInformation?.redemptionPreference} label='Select Document Type *' />
              <Dropdown
                style={[GlobelStyle.dropdown]}
                placeholderStyle={GlobelStyle.placeholderStyle}
                selectedTextStyle={GlobelStyle.selectedTextStyle}
                inputSearchStyle={GlobelStyle.inputSearchStyle}
                iconStyle={GlobelStyle.iconStyle}
                data={[{redemptionPreference:'Via Bank'}, {redemptionPreference:'Via UPI'}]}
                search
                maxHeight={300}
                name="redemptionPreference"
                labelField="redemptionPreference"
                valueField="redemptionPreference"
                placeholder={'Select Redemption Preference *'}
                searchPlaceholder="Search..."
                value={values?.otherInformation?.redemptionPreference}
                onChange={item => {
                  setFieldValue('otherInformation.redemptionPreference', item.redemptionPreference);
                }}
              />
            </View> */}



        {/* {values?.otherInformation?.redemptionPreference=='Via Bank' &&  */}
        <>
        <View style={[GlobelStyle.mt8]}>
            <AppTextInput
                label="Name"
                mode="outlined"
                placeholder={'Name'}
                placeholderTextColor={AppTheme.Medium}
                type="textInput"
                value={values?.bankDetails?.account_holder_name}
                onChangeText={handleChange('bankDetails.account_holder_name')}
                autoCorrect={true}
            />
        </View>
        {errors.bankDetails?.account_holder_name && touched.bankDetails?.account_holder_name && (
            <Caption style={[GlobelStyle.errorMsg]}>
                {errors.bankDetails?.account_holder_name}
            </Caption>
        )}

        <View style={[GlobelStyle.mt8]}>
            <AppTextInput
                label="Account Number"
                mode="outlined"
                placeholder={'Account Number'}
                placeholderTextColor={AppTheme.Medium}
                type="textInput"
                value={values?.bankDetails?.account_no}
                onChangeText={handleChange('bankDetails.account_no')}
                autoCorrect={true}
            />
        </View>
        {errors.bankDetails?.account_no && touched.bankDetails?.account_no && (
            <Caption style={[GlobelStyle.errorMsg]}>
                {errors.bankDetails?.account_no}
            </Caption>
        )}

        <View style={[GlobelStyle.mt8]}>
            <AppTextInput
                label="Bank Name"
                mode="outlined"
                placeholder={'Bank Name'}
                placeholderTextColor={AppTheme.Medium}
                type="textInput"
                value={values?.bankDetails?.bank_name}
                onChangeText={handleChange('bankDetails.bank_name')}
                autoCorrect={true}
            />
        </View>
        {errors.bankDetails?.bank_name && touched.bankDetails?.bank_name && (
            <Caption style={[GlobelStyle.errorMsg]}>
                {errors.bankDetails?.bank_name}
            </Caption>
        )}

        <View style={[GlobelStyle.mt8]}>
            <AppTextInput
                label="IFSC Code"
                mode="outlined"
                placeholder={'IFSC Code'}
                placeholderTextColor={AppTheme.Medium}
                type="textInput"
                value={values?.bankDetails?.ifsc_code}
                onChangeText={handleChange('bankDetails.ifsc_code')}
                autoCorrect={true}
            />
        </View>
        {errors.bankDetails?.ifsc_code && touched.bankDetails?.ifsc_code && (
            <Caption style={[GlobelStyle.errorMsg]}>
                {errors.bankDetails?.ifsc_code}
            </Caption>
        )}


        {/* <View style={[GlobelStyle.mt8]}>
            <AppTextInput
                label="Cheque Book"
                mode="outlined"
                placeholder={'Cheque Book'}
                placeholderTextColor={AppTheme.Medium}
                type="textInput"
                value={values?.otherInformation?.bankInformation?.chequeBook}
                onChangeText={handleChange('otherInformation.bankInformation.chequeBook')}
                autoCorrect={true}
            />
        </View>
        {errors.otherInformation?.bankInformation?.chequeBook && touched.otherInformation?.bankInformation?.chequeBook && (
            <Caption style={[GlobelStyle.errorMsg]}>
                {errors.otherInformation?.bankInformation?.chequeBook}
            </Caption>
        )}

        <View style={[GlobelStyle.mt8]}>
            <AppTextInput
                label="Passbook"
                mode="outlined"
                placeholder={'Passbook'}
                placeholderTextColor={AppTheme.Medium}
                type="textInput"
                value={values?.otherInformation?.bankInformation?.passBook}
                onChangeText={handleChange('otherInformation.bankInformation.passBook')}
                autoCorrect={true}
            />
        </View>
        {errors.otherInformation?.bankInformation?.passBook && touched.otherInformation?.bankInformation?.passBook && (
            <Caption style={[GlobelStyle.errorMsg]}>
                {errors.otherInformation?.bankInformation?.passBook}
            </Caption>
        )} */}
        </>
        {/* } */}

         {/* {values?.otherInformation?.redemptionPreference=='Via UPI' &&  */}
        <>
        <View style={[GlobelStyle.mt8]}>
            <AppTextInput
                label="UPI Id"
                mode="outlined"
                placeholder={'UPI Id'}
                placeholderTextColor={AppTheme.Medium}
                type="textInput"
                value={values?.bankDetails?.upi_id}
                onChangeText={handleChange('bankDetails.upi_id')}
                autoCorrect={true}
            />
        </View>
        {errors.bankDetails?.upi_id && touched.bankDetails?.upi_id && (
            <Caption style={[GlobelStyle.errorMsg]}>
                {errors.bankDetails?.upi_id}
            </Caption>
        )}
        </>
        {/* } */}

    </>;
};

export default BankInfoForm;
