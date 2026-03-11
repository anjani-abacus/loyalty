
import { Icon, Skeleton } from '@rneui/themed';
import { useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';
import { Appbar, Button, Caption, Checkbox, Text, Title } from 'react-native-paper';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import AppTextInput from '../../components/TextInput/AppTextInput';
import AppTheme from '../Theme/AppTheme';
import useTheme from '../Theme/useTheme';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Success from '../../assets/icons/Success.svg';
import { useDealerBycode } from '../../../api/hooks/useMasters';
import ThemedText from '../ThemedText';
import Toast from 'react-native-toast-message';

const DealerForm = () => {
  const { values, handleChange, setFieldValue, errors, touched } = useFormikContext();
  const { isLoading, refetch, data: queryList, isFetching } = useDealerBycode(values?.dealerDetails?.dealer_code);
  const [isValidRefferralCode, setIsValidRefferralCode] = useState(false);
  const [checked, setChecked] = useState(false);

  const { t } = useTranslation();
  const GlobelStyle = useGlobelStyle();
  const activeTheme = useTheme();

  const handleFetchDealer = async () => {
    const res = await refetch();
    if (res?.data) {
      Toast.show({ type: 'success', text1: 'Dealer fetched', visibilityTime: 5000 });
      const dealer = res.data?.data?.dealer;
      setIsValidRefferralCode(true);
      setFieldValue('dealerDetails.dealer_name', dealer?.dealer_name);
      setFieldValue('dealerDetails.dealer_mobile', dealer?.dealer_mobile);
      setFieldValue('dealerDetails.dealer_id', dealer?.id);
    } else {
      console.log('Dealer not found!');
      Toast.show({ type: 'error', text1: 'Dealer not found', visibilityTime: 5000 });
      setFieldValue('dealerDetails.dealer_name', '');
      setFieldValue('dealerDetails.dealer_mobile', '');
      setFieldValue('dealerDetails.dealer_id', '');
    }
  };

  return (
    <>
      <View style={[GlobelStyle.AdressHeader]}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            gap: 10,
          }}
        >
          <Icon name="person" color={activeTheme.text} />
          <Title style={[GlobelStyle.largeFont]}>
            {t('Dealer Detail')}
          </Title>
        </View>

        {values?.dealerDetails?.dealer_name &&
          values?.dealerDetails?.dealer_mobile &&

          !errors?.dealerDetails?.dealer_name &&
          !errors?.dealerDetails?.dealer_mobile && (
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
      <View style={[{ position: 'relative', flexDirection: 'row', alignItems: 'center' }]}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
          color={activeTheme.TextColor}
        />
        <Text style={{ fontSize: 14 }}>Do you have dealer code?</Text>
      </View>
      {checked && <><View style={[{ position: 'relative' }]}>
        <AppTextInput
          label={t('Dealer Code')}
          mode="outlined"
          placeholderTextColor={AppTheme.Medium}
          type="textInput"
          maxLength={3}
          value={values?.dealerDetails?.dealer_code}
          onChangeText={handleChange('dealerDetails.dealer_code')}
          autoCorrect={true}
        />
        {(values?.dealerDetails?.dealer_code && isValidRefferralCode) ? <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: '80%', position: 'absolute', right: 10, top: '10%' }}
        onPress={() => {
          setFieldValue('dealerDetails.dealer_code', '');
          setIsValidRefferralCode(false);
        }}>
          <Text style={{ color: '#316bf3ff', fontWeight: 'bold', textDecorationLine: 'underline' }}>
            {isFetching ? 'Fetching...' : 'Change'}
          </Text>
        </TouchableOpacity> :
          <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: '80%', position: 'absolute', right: 10, top: '10%' }} onPress={() => {
            !values?.dealerDetails?.dealer_code ? Toast.show({ type: 'error', text1: 'Enter code first!' }) : handleFetchDealer();
          }}>
            <Text style={{ color: '#316bf3ff', fontWeight: 'bold', textDecorationLine: 'underline' }}>
              {isFetching ? 'Fetching...' : 'Apply'}
            </Text>
          </TouchableOpacity>
        }
      </View>
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderRadius: 12,
            padding: 12,
            marginVertical: 10,
          }}
        >
          <ThemedText style={{ fontSize: 16, fontWeight: '600', marginBottom: 6, color: '#333' }}>
            Fetched Dealer
          </ThemedText>


          {values?.dealerDetails?.dealer_id
            ? <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
            }}>
              <View style={{
                borderRadius: 4,
                backgroundColor: '#fff',
                padding: 4,
                flex: 1,
              }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{values?.dealerDetails?.dealer_name}</Text>
                <Text style={{ fontSize: 10 }}>Dealer Name</Text>
              </View>
              <View style={{
                borderRadius: 4,
                backgroundColor: '#fff',
                padding: 4,
                flex: 1,
              }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{values?.dealerDetails?.dealer_mobile}</Text>
                <Text style={{ fontSize: 10 }}>Dealer Mobile</Text>
              </View>
              <View style={{
                borderRadius: 4,
                backgroundColor: '#fff',
                padding: 4,
                flex: 1,
              }}>
                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{values?.dealerDetails?.dealer_id}</Text>
                <Text style={{ fontSize: 10 }}>Dealer ID</Text>
              </View>
            </View>
            : <Text style={{color:'rgba(235, 64, 64, 1)'}}>No dealer available. Try again.</Text>}

          {(
            (errors?.dealerDetails?.dealer_name && touched?.dealerDetails?.dealer_name) ||
            (errors?.dealerDetails?.dealer_mobile && touched?.dealerDetails?.dealer_mobile) ||
            (errors?.dealerDetails?.delaer_id && touched?.dealerDetails?.delaer_id)
          ) && (
              <>
                <Caption style={[GlobelStyle.errorMsg]}>
                  {errors?.basicInfo?.dealerDetails?.dealer_name ||
                    errors?.basicInfo?.dealerDetails?.dealer_mobile ||
                    errors?.basicInfo?.dealerDetails?.delaer_id}
                </Caption>
                <Caption style={[GlobelStyle.errorMsg]}>Re-try!</Caption>
              </>

            )}
        </View>
      </>}

      {!checked && <View style={[{ position: 'relative' }]}>
        <AppTextInput
          label={t('Dealer Name')}
          mode="outlined"
          placeholderTextColor={AppTheme.Medium}
          type="textInput"
          value={values?.dealerDetails?.dealer_name}
          onChangeText={handleChange('dealerDetails.dealer_name')}
          autoCorrect={true}
        />
      </View>}
      {/* <TouchableOpacity

          onPress={handleFetchDealer}
          style={{
            marginTop: 4,
            alignSelf: 'flex-start',
          }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={(isFetching ? ["#9d9ea1ff", "#818283ff"] : ["#316bf3ff", "#9dbbf7ff"])}
            style={{
              borderRadius: 4,
              paddingVertical: 6,
              paddingHorizontal: 14,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#E5D7FF",
            }}
          >
            <Text
              style={{
                color: isFetching ? '#fff' : '#fff',
                fontWeight: '600',
                fontSize: 13,
              }}
            >
              {isFetching ? "Fetching..." : 'Fetch Dealer'}
            </Text></LinearGradient>
        </TouchableOpacity> */}
      {errors?.dealerDetails?.dealer_code &&
        touched?.dealerDetails?.dealer_code && (
          <Caption style={[GlobelStyle.errorMsg]}>
            {errors?.dealerDetails?.dealer_code}
          </Caption>
        )}
    </>
  );
};


export default DealerForm;
