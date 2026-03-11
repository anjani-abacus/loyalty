
import { useFormikContext } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Caption, Icon, Title } from 'react-native-paper';
import ThemedText from '../ThemedText';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppTextInput from '../TextInput/AppTextInput';
import AppTheme from '../Theme/AppTheme';
import Document from './Document';
import { Dropdown } from 'react-native-element-dropdown';
import { RenderLabel } from './utils';
import useTheme from '../Theme/useTheme';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Success from '../../assets/icons/Success.svg';

const DocumentForm = ({ formParent = '', formTitle = 'Document Information' }) => {
  const { values, handleChange, handleSubmit, setFieldValue, errors, touched, validateForm } = useFormikContext();
  const { t } = useTranslation();
  const [isDobVisible, setDobVisible] = useState(false);
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useTheme();
  return <>
    <View style={[GlobelStyle.AdressHeader]}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        gap: 10,
      }}>
        <Icon name="home-work" color={activeTheme.text} />
        <Title style={[GlobelStyle.largeFont]}>{formTitle}</Title>
      </View>

      {
        (values?.documentDetails?.kyc_document_type && values?.documentDetails?.document_no && values?.documentDetails?.pan_no) &&
        (!errors?.documentDetails?.kyc_document_type && !errors?.documentDetails?.document_no && !errors?.documentDetails?.pan_no) &&
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
      <Ionicons
        name="information-circle"
        style={{ color: activetheme.text }}
        size={24}
      />
      <ThemedText style={[GlobelStyle.largeFont]}>
        {formTitle}
      </ThemedText>
    </View> */}

    {/* <View style={[GlobelStyle.mt8]}>
      <RenderLabel value={values?.documentDetails?.kyc_document_type} label='Select Document Type *' />
      <Dropdown
        style={[GlobelStyle.dropdown]}
        placeholderStyle={GlobelStyle.placeholderStyle}
        selectedTextStyle={GlobelStyle.selectedTextStyle}
        inputSearchStyle={GlobelStyle.inputSearchStyle}
        iconStyle={GlobelStyle.iconStyle}
        data={[{ kyc_document_type: 'AADHAAR' }, { kyc_document_type: 'VOTERID' }, { kyc_document_type: 'DRIVINGLICENCE' }]}
        search
        maxHeight={300}
        name="kyc_document_type"
        labelField="kyc_document_type"
        valueField="kyc_document_type"
        placeholder={'Select Document Type *'}
        searchPlaceholder="Search..."
        value={values?.documentDetails?.kyc_document_type}
        onChange={item => {
          setFieldValue('documentDetails.kyc_document_type', item.kyc_document_type);
        }}
      />
    </View> */}

    {values?.documentDetails?.kyc_document_type && <View style={[GlobelStyle.mt8]}>
      <AppTextInput
        label={values?.documentDetails?.kyc_document_type || 'Select Document'}
        mode="outlined"
        maxLength={12}
        placeholderTextColor={AppTheme.Medium}
        type="textInput"
        value={values?.documentDetails?.document_no}
        onChangeText={handleChange('documentDetails.document_no')}
        autoCorrect={true}
      />
      {errors.documentDetails?.document_no && touched.documentDetails?.document_no && (
      <Caption style={[GlobelStyle.errorMsg]}>
        {errors?.documentDetails?.document_no}
      </Caption>
    )}
      <Document document="AADHAAR" title="Front" documentKey={'document_img_front'} setFieldValue={setFieldValue} uploadedUrl={(values?.documentDetails?.document_img_front || '')} />
      <Document document="AADHAAR" title="Back" documentKey={'document_img_back'} setFieldValue={setFieldValue} uploadedUrl={(values?.documentDetails?.document_img_back || '')} />
    </View>}



    {/* <View style={[GlobelStyle.mt8]}>
      <AppTextInput
        label='PAN Card'
        mode="outlined"
        maxLength={40}
        placeholderTextColor={AppTheme.Medium}
        type="textInput"
        value={values?.documentDetails?.pan_no}
        onChangeText={(text) => handleChange('documentDetails.pan_no')(text)}
        autoCorrect={false}
        autoCapitalize="characters"
      />
      {errors?.documentDetails?.pan_no && touched?.documentDetails?.pan_no && (
      <Caption style={[GlobelStyle.errorMsg]}>
        {errors?.documentDetails?.pan_no}
      </Caption>
    )}
      <Document document="PAN Card" title={'PAN Card Image'} documentKey={'document_pan_img'} setFieldValue={setFieldValue} uploadedUrl={(values?.documentDetails?.document_pan_img || '')} />
    </View> */}

  </>;
};
export default DocumentForm;
