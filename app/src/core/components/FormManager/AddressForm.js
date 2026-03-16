
import { Icon, Skeleton } from '@rneui/themed';
import { useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Appbar, Caption, Text, Title } from 'react-native-paper';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import Success from '../../assets/icons/Success.svg';
import AppTextInput from '../../components/TextInput/AppTextInput';
import AppTheme from '../Theme/AppTheme';
import LinearGradient from 'react-native-linear-gradient';
import { useAddressDetails, useDistrictList, useStateList } from '../../../api/hooks/useMasters';
import useTheme from '../Theme/useTheme';
import * as Animatable from 'react-native-animatable';
import ThemedText from '../ThemedText';

const AddressForm = ({ formParent = 'basicInfo.addressInfo', formTitle = 'Address Information' }) => {
  const { values, handleChange, handleSubmit, setFieldValue, setValues, errors, touched, validateForm } = useFormikContext();
  const activeTheme = useTheme();

  const { data: stateList } = useStateList();
  const { mutateAsync: mutateDistrict, data: districtList } = useDistrictList();
  const { mutateAsync: mutateAddressInfo, isPending, isSuccess, isError, error } = useAddressDetails();
  const isFirstRender = useRef(true);

  const [isRefreshing, setIsRefreshing] = useState();
  const { t } = useTranslation();
  const GlobelStyle = useGlobelStyle();

  const getDistrictList = async (state) => {
    await mutateDistrict({ 'state_name': state });
  };

  // const handleAddressInfo = (pincode, setValues) => {
  //   mutateAddressInfo({ pincode }, {
  //     onSuccess: (resp) => {
  //       mutateDistrict({ "state_name": resp?.data?.result?.state_name }, {
  //         onSuccess: () => {
  //           alert("adsf")
  //           const address = resp?.data?.result
  //           setValues((prev) => {
  //             const fetchedAddress = { ...prev }
  //             fetchedAddress.basicInfo.addressInfo = {
  //               // address: fetchedAddress.basicInfo.addressInfo.address,
  //               pincode: String(address.pincode),
  //               state: address.state_name,
  //               district: address.district_name,
  //               city: address.city,
  //               area: address.area,
  //               country: address.country
  //             }
  //             return fetchedAddress
  //           })
  //         }
  //       })
  //     }
  //   })
  // }

  const handleAddressInfo = async (pincode, setValues) => {
    try {
      // step 1: fetch address info
      const resp = await mutateAddressInfo({ pincode });

      // step 2: fetch district using state_name
      await mutateDistrict({ state_name: resp?.data?.result?.state_name });

      // step 3: update values
      const address = resp?.data?.result;
      setValues((prev) => ({
        ...prev,
        basicInfo: {
          ...prev.basicInfo,
          addressInfo: {
            ...prev.basicInfo.addressInfo,
            state: address.state_name,
            district: address.district_name,
            city: address.city,
            area: address.area,
            country: address.country,
          },
        },
      }));
    } catch (error) {
      // local error handling (optional)
      setValues((prev) => ({
        ...prev,
        basicInfo: {
          ...prev.basicInfo,
          addressInfo: {
            ...prev.basicInfo.addressInfo,
            state: '',
            district: '',
            city: '',
            area: '',
            country: '',
          },
        },
      }));
      // console.error("Error in handleAddressInfo:", error);
      // global onError from useMutationWithError will also fire (Toast)
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else if (values?.basicInfo?.addressInfo?.state) {
      getDistrictList(values?.basicInfo?.addressInfo?.state);
    }
  }, [stateList]);

  return <>
    <View style={[GlobelStyle.AdressHeader]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: 40, gap: 10 }}>
        <Icon name="home-work" color={activeTheme.text} />
        <Title style={[GlobelStyle.largeFont]}>{formTitle}</Title>
      </View>

      {
        (
          // values?.basicInfo?.addressInfo?.address &&
          values?.basicInfo?.addressInfo?.pincode &&
          values?.basicInfo?.addressInfo?.state &&
          values?.basicInfo?.addressInfo?.district &&
          values?.basicInfo?.addressInfo?.city &&
          values?.basicInfo?.addressInfo?.area) &&
        (
          // !errors?.basicInfo?.addressInfo?.address &&
          !errors?.basicInfo?.addressInfo?.pincode &&
          !errors?.basicInfo?.addressInfo?.state &&
          !errors?.basicInfo?.addressInfo?.district &&
          !errors?.basicInfo?.addressInfo?.city &&
          !errors?.basicInfo?.addressInfo?.area) &&
        <View style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}>
          {/* Animated ripple */}
          <Animatable.View
            animation={{
              0: { scale: 0, opacity: 0.5 },
              1: { scale: 1, opacity: 0 },
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

    {/* Address */}
    {/* <View>
      <AppTextInput
        label={t('Address') + ' *'}
        mode="outlined"
        placeholder={t('Address')}
        placeholderTextColor={AppTheme.Medium}
        type="textInput"
        value={values?.basicInfo?.addressInfo?.address}
        autoCorrect={true}
        onChangeText={handleChange(`${formParent}.address`)}
      />
    </View>
    {errors?.basicInfo?.addressInfo?.address && touched?.basicInfo?.addressInfo?.address && (
      <Caption style={[GlobelStyle.errorMsg]}>{errors?.basicInfo?.addressInfo?.address}</Caption>
    )} */}

    {/* Pincode */}
    <View style={[GlobelStyle.mt8]}>
      <AppTextInput
        label={t('Pincode') + ' *'}
        mode="outlined"
        minLength={6}
        maxLength={6}
        placeholderTextColor={AppTheme.Medium}
        type="textInput"
        value={values?.basicInfo?.addressInfo?.pincode}
        onChangeText={(value) => {
          handleChange(`${formParent}.pincode`)(value);
          // if (value?.length == 6) {handleAddressInfo(value, setValues);}
        }}
        autoCorrect={true}
        keyboardType="numeric"
      />
    </View>
    {errors?.basicInfo?.addressInfo?.pincode && touched?.basicInfo?.addressInfo?.pincode && (
      <Caption style={[GlobelStyle.errorMsg]}>{errors?.basicInfo?.addressInfo?.pincode}</Caption>
    )}



    {/* City */}
    <View style={[GlobelStyle.mt8]}>
      {
        (isRefreshing || isPending) ? (
          <Skeleton
            style={[GlobelStyle.skeltonPickerDataStyle]}
            LinearGradientComponent={LinearGradient}
            animation="wave"
            variant="text"
            width={80}
            height={50}
          />
        ) : (
          <AppTextInput
            label={t('City') + ' *'}
            mode="outlined"
            placeholder={t('City')}
            placeholderTextColor={AppTheme.Medium}
            type="textInput"
            value={values?.basicInfo?.addressInfo?.city}
            onChangeText={handleChange(`${formParent}.city`)}
            autoCorrect={true}
          />
        )}
    </View>
    {errors?.basicInfo?.addressInfo?.city && touched?.basicInfo?.addressInfo?.city && (
      <Caption style={[GlobelStyle.errorMsg]}>{errors?.basicInfo?.addressInfo?.city}</Caption>
    )}

    {/* Area */}
    <View style={[GlobelStyle.mt8]}>
      {
        (isRefreshing || isPending) ? (
          <Skeleton
            style={[GlobelStyle.skeltonPickerDataStyle]}
            LinearGradientComponent={LinearGradient}
            animation="wave"
            variant="text"
            width={80}
            height={50}
          />
        ) : (
          <AppTextInput
            label={'Area *'}
            mode="outlined"
            placeholder={'Area'}
            placeholderTextColor={AppTheme.Medium}
            type="textInput"
            value={values?.basicInfo?.addressInfo?.area}
            onChangeText={handleChange(`${formParent}.area`)}
            autoCorrect={true}
          />
        )}
    </View>
    {errors?.basicInfo?.addressInfo?.area && touched?.basicInfo?.addressInfo?.area && (
      <Caption style={[GlobelStyle.errorMsg]}>{errors?.basicInfo?.addressInfo?.area}</Caption>
    )}

    {/* <View
      style={{
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 12,
        padding: 12,
        marginVertical: 10,
      }}
    >
      <ThemedText style={{ fontSize: 16, fontWeight: '600', marginBottom: 6, color: '#333' }}>
        Fetched Address
      </ThemedText>
...
      {(
        (errors?.basicInfo?.addressInfo?.state && touched?.basicInfo?.addressInfo?.state) ||
        (errors?.basicInfo?.addressInfo?.district && touched?.basicInfo?.addressInfo?.district) ||
        (errors?.basicInfo?.addressInfo?.country && touched?.basicInfo?.addressInfo?.country)
      ) && (
        <>
          <Caption style={[GlobelStyle.errorMsg]}>
            {errors?.basicInfo?.addressInfo?.state ||
              errors?.basicInfo?.addressInfo?.district ||
              errors?.basicInfo?.addressInfo?.country}
          </Caption>
          <Caption style={[GlobelStyle.errorMsg]}>Re-enter pincode!</Caption>
        </>

        )}
    </View> */}
  </>;
};

export default AddressForm;
