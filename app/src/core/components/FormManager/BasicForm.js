
import { Icon, Skeleton } from '@rneui/themed';
import { useFormikContext } from 'formik';
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { Caption, Text, Title, TextInput } from 'react-native-paper';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AppTextInput from '../../components/TextInput/AppTextInput';
import AppTheme from '../Theme/AppTheme';
import { Dropdown } from 'react-native-element-dropdown';
import { RenderLabel } from './utils';
import influencerList from '../../utils/data/influencers.json';
import moment from 'moment';
import useTheme from '../Theme/useTheme';
import { useInfluencerList } from '../../../api/hooks/useCommon';
import Success from '../../assets/icons/Success.svg';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';


const BasicForm = ({ formType = 'registration' }) => {
  const { values, handleChange, handleSubmit, setFieldValue, errors, touched, validateForm } = useFormikContext();
  const { t } = useTranslation();
  const GlobelStyle = useGlobelStyle();
  const [isDobVisible, setDobVisible] = useState(false);
  const activeTheme = useTheme();

  const { isLoading, refetch, data: influencerListData, isFetching } = useInfluencerList({ filter: {} });

  const dropdownData = influencerListData?.data?.result?.map(item => ({
    label: item.module_name || item,
    value: item.module_name || item,
  })) || [];

  return <>
    <View style={[GlobelStyle.AdressHeader]}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        gap: 10,
      }}>
        <Icon name="account-circle" color={activeTheme.text} />
        <Title style={[GlobelStyle.largeFont]}>{t('Basic Information')}</Title>
      </View>

      {
        //  && values?.basicInfo?.email
        //  && !errors?.basicInfo?.email
        (values?.basicInfo?.influencer_type_name && values?.basicInfo?.name && values?.basicInfo?.birth_date) &&
        (!errors?.basicInfo?.influencer_type_name && !errors?.basicInfo?.name && !errors?.basicInfo?.birth_date) &&
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

    {formType != 'update' && <>
      <View style={GlobelStyle.mt8}>
        <RenderLabel value={values?.basicInfo?.influencer_type_name} label="Select Your Trade / Profession" />
        <Dropdown
          style={[GlobelStyle.dropdown]}
          placeholderStyle={GlobelStyle.placeholderStyle}
          selectedTextStyle={[GlobelStyle.selectedTextStyle]}
          inputSearchStyle={GlobelStyle.inputSearchStyle}
          iconStyle={GlobelStyle.iconStyle}
          itemTextStyle={GlobelStyle.selectedTextStyle}
          disable={formType == 'update'}
          data={dropdownData}
          containerStyle={GlobelStyle.DropDowncontainer}
          itemContainerStyle={GlobelStyle.itemContainerStyle}
          search
          maxHeight={300}
          name="influencer_type_name"
          labelField="label"
          valueField="value"
          placeholder={t('Select Your Trade / Profession') + ' *'}
          searchPlaceholder="Search..."
          value={values?.basicInfo?.influencer_type_name}
          onChange={item => {
            setFieldValue('basicInfo.influencer_type_name', item?.value);
          }}
        />
      </View>

      {errors?.basicInfo?.influencer_type_name && touched.basicInfo?.influencer_type_name && (
        <Caption style={[GlobelStyle.errorMsg]}>
          {errors.basicInfo?.influencer_type_name}
        </Caption>
      )}
    </>}

    <View style={[GlobelStyle.mt8]}>
      <AppTextInput
        label={t('Name') + ' *'}
        mode="outlined"
        placeholderTextColor={AppTheme.Medium}
        type="textInput"
        value={values?.basicInfo?.name}
        onChangeText={handleChange('basicInfo.name')}
        autoCorrect={true}
      />
    </View>
    {errors.basicInfo?.name && touched.basicInfo?.name && (
      <Caption style={[GlobelStyle.errorMsg]}>
        {errors.basicInfo?.name}
      </Caption>
    )}

    {/* <View style={[GlobelStyle.mt8]}>
      <TouchableOpacity onPress={() => setDobVisible(true)}>
        <AppTextInput
          label="Date of Birth *"
          mode="outlined"
          type="textInput"
          value={
            values?.basicInfo?.birth_date
              ? moment(values?.basicInfo?.birth_date).format('DD MMM YYYY')
              : values?.basicInfo?.birth_date
          }
          onChangeText={handleChange('basicInfo.birth_date')}
          autoCorrect={true}
          readOnly={true}
          right={
            <TextInput.Icon
              color={activeTheme.text}
              icon="calendar"
              onPress={() => setDobVisible(true)}
            />
          }
        />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDobVisible}
        mode="date"
        themeVariant="light"
        maximumDate={new Date()}
        date={
          values?.basicInfo?.birth_date
            ? new Date(values?.basicInfo?.birth_date)
            : new Date()
        }
        onConfirm={date => {
          let formateDate = moment(date).format('YYYY-MM-DD');
          setFieldValue('basicInfo.birth_date', formateDate);
          setDobVisible(false);
        }}
        onCancel={() => setDobVisible(false)}
      />
    </View>
    {errors?.basicInfo?.birth_date && touched?.basicInfo?.birth_date && (
      <Caption style={[GlobelStyle.errorMsg]}>
        {errors?.basicInfo?.birth_date}
      </Caption>
    )} */}

    {/* <View style={[GlobelStyle.mt8]}>
      <AppTextInput
        label='Email'
        mode="outlined"
        placeholderTextColor={AppTheme.Medium}
        type="textInput"
        value={values?.basicInfo?.email}
        onChangeText={handleChange('basicInfo.email')}
        autoCorrect={true}
      />
    </View>
    {errors?.basicInfo?.email && touched?.basicInfo?.email && (
      <Caption style={[GlobelStyle.errorMsg]}>
        {errors?.basicInfo?.email}
      </Caption>
    )} */}
  </>;
};

export default BasicForm;
