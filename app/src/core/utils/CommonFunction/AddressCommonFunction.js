import {ToastAndroid} from 'react-native';
import {ApiCall} from '../../services/ServiceProvider';
import Toast from 'react-native-toast-message';
import {Icon} from '@rneui/themed';

export const getAddress = async (
  value,
  setFieldValue,
  setDistrictData,
  setCityData,
) => {
  if (value.length == 6) {
    try {
      await ApiCall({pincode: value}, 'AppInfluencerSignup/PinCodeWiseState')
        .then(result => {
          if (result.statusCode == 200) {
            if (result.all_State_district != null) {
              getDistrictList(
                result.all_State_district.state_name,
                setDistrictData,
              );
              getCityName(
                result.all_State_district.state_name,
                result.all_State_district.district_name,
                setCityData,
              );
              setFieldValue(
                'district',
                result.all_State_district.district_name,
              );
              setFieldValue('city', result.all_State_district.city_name);
              setFieldValue('state', result.all_State_district.state_name);
            }
          } else {
            Toast.show({
              type: 'error',
              text1: result.statusMsg,
              visibilityTime: 6000,
            });
            setFieldValue('district', '');
            setFieldValue('city', '');
            setFieldValue('state', '');
            setFieldValue('pincode', '');
          }
        })
        .catch(error => {});
    } catch {}
  }
};

export const getDistrictList = async (stateName, setDistrictData, search) => {
  try {
    await ApiCall(
      {state_name: stateName, search: search},
      'AppInfluencerSignup/getDistrict',
    )
      .then(result => {
        if (result.statusCode == 200) {
          setDistrictData(result.all_district);
        } else {
          Toast.show({
            type: 'error',
            text1: result.statusMsg,
            visibilityTime: 6000,
          });
        }
      })
      .catch(error => {});
  } catch {}
};
export const getCityName = async (
  stateName,
  districtName,
  setCityData,
  search,
) => {
  try {
    await ApiCall(
      {state_name: stateName, district_name: districtName, search: search},
      'AppTravelPlan/getCityTravel',
    )
      .then(result => {
        if (result.statusCode == 200) {
          setCityData(result.city);
        } else {
          Toast.show({
            type: 'error',
            text1: result.statusMsg,
            visibilityTime: 6000,
          });
        }
      })
      .catch(error => {});
  } catch {}
};

export const getstatelist = async (setStateData, search = '') => {
  try {
    await ApiCall({search: search}, 'AppInfluencerSignup/getStates')
      .then(result => {
        if (result.statusCode == 200) {
          setStateData(result.all_state);
        } else {
          Toast.show({
            type: 'error',
            text1: result.statusMsg,
            visibilityTime: 6000,
          });
        }
      })
      .catch(error => {
        ToastAndroid.show(
          JSON.stringify(error) || 'An Error Occured',
          ToastAndroid.LONG,
        );
      });
  } catch {}
};

export const getCustomers = async (
  drType,
  search = '',
  setCustomers,
  setCustomers2,
  setIsRefreshing,
) => {
  try {
    setIsRefreshing(true);
    await ApiCall(
      {dr_type: drType, search: search},
      'AppOrder/followupCustomer',
    )
      .then(response => {
        if (response.statusCode == 200) {
          setIsRefreshing(false);
          setCustomers(response.result);
          setCustomers2(response.result);
        } else {
          setIsRefreshing(false);
          Toast.show({
            type: 'error',
            text1: result.statusMsg,
            visibilityTime: 6000,
          });
        }
      })
      .catch(error => {
        setIsRefreshing(false);
        ToastAndroid.show(result.statusMsg, ToastAndroid.LONG);
      });
  } catch {}
};

export const getDealers = async (
  dr_id,
  search = '',
  setCustomers,
  setCustomers2,
  setIsRefreshing,
) => {
  try {
    setIsRefreshing(true);
    await ApiCall(
      {type: 3, dr_id: dr_id, search: search},
      'AppCustomerNetwork/assignDistributorsDealerList',
    )
      .then(response => {
        if (response.statusCode == 200) {
          setIsRefreshing(false);
          setCustomers(response.distributors);
          setCustomers2(response.distributors);
        } else {
          setIsRefreshing(false);
          Toast.show({
            type: 'error',
            text1: result.statusMsg,
            visibilityTime: 6000,
          });
        }
      })
      .catch(error => {
        setIsRefreshing(false);

        ToastAndroid.show(result.statusMsg, ToastAndroid.LONG);
      });
  } catch {}
};
