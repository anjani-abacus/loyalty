import React from 'react';
import {
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import useGlobelStyle from '../assets/Style/GlobelStyle';
import { TabBar } from 'react-native-tab-view';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTheme from '../components/Theme/useTheme';

export const LANGUAGE_LIST = [
    { id: '1', type: 'English', language: 'English', value: 'en' },
    { id: '2', type: 'Hindi', language: 'हिंदी', value: 'hn' },
    // { id: '4', type: 'Telegu', language: 'తెలుగు', value: 'tel' },
    // { id: '5', type: 'Tamil', language: 'தமிழ்', value: 'tml' },
    // { id: '6', type: 'Bengala', language: 'বাংলা', value: 'bng' },
    // { id: '7', type: 'Odia', language: 'ଓଡିଆ', value: 'od' },
    // { id: '8', type: 'Malayalam', language: 'മലയാളം', value: 'mal' },
    // { id: '9', type: 'Marathi', language: 'मराठी', value: 'marathi' },
    // { id: '10', type: 'Punjabi', language: 'ਪੰਜਾਬੀ', value: 'punjabi' },
    // { id: '11', type: 'Gujarati', language: 'ગુજરાતી', value: 'gujarati' },
  ];

export const MONTH_LIST = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const MONTH_LIST_EXPAND = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const TEAM = 'Team';
export const MY = 'My';
export const CARD_COLORS = {
  Present: { bgColor: '#e1fce5', titleColor: '#43BF57' },
  'Weekly Off': { bgColor: '#E3E3E3', titleColor: '#2B3348' },
  Absent: { bgColor: '#FDF2E1', titleColor: '#FF9F00' },
  Leave: { bgColor: '#FFE5E5', titleColor: '#E92828' },
  Holiday: { bgColor: '#E8EBFF', titleColor: '#004BAC' },
};
export const PRESENT = 'Present';
export const COUNT_TYPE_LIST = [
  {
    type: 'Working Days',
    progress: 0,
    total_working_days: 'total_working_days',
    strokeColor: '#0092FF',
  },
  { type: 'Present', progress: 0, present: 'present', strokeColor: '#43BF57' },
  { type: 'Absent', progress: 0, absent: 'absent', strokeColor: '#FEA535' },
  { type: 'Leave', progress: 0, leave: 'leave', strokeColor: '#E62552' },
  {
    type: 'Weekly Off',
    progress: 0,
    weekly_off: 'weekly_off',
    strokeColor: '#626B77',
  },
  { type: 'Holiday', progress: 0, holiday: 'holiday', strokeColor: '#6073F1' },
];

export const LIST_TYPE = [
  { key: 'My', title: 'My' },
  { key: 'Team', title: 'Team' },
];

export const LEAVE_TAB_TYPES = [
  { key: 'Pending', title: 'Pending' },
  { key: 'Approved', title: 'Approved' },
  { key: 'Reject', title: 'Reject' },
];

export const CUSTOMER_TYPE_LIST = [
  { key: 'Active', title: 'Active', payload: 'Active' },
  { key: 'Inactive', title: 'Inactive', payload: 'Inactive' },
  { key: 'Lead', title: 'Lead', payload: 'Lead' },
];
export const ORDER_TYPE_LIST = [
  { key: 'Draft', title: 'Draft', payload: 'Draft' },
  { key: 'Pending', title: 'Pending', payload: 'Pending' },
  { key: 'Approved', title: 'Approved', payload: 'Approved' },
  { key: 'Reject', title: 'Reject', payload: 'Reject' },
  { key: 'Hold', title: 'Hold', payload: 'Hold' },
  {
    key: 'dispatchPlanning',
    title: 'Dispatch Planning',
    payload: 'dispatchPlanning',
  },
  {
    key: 'partialDispatched',
    title: 'Partial Dispatched',
    payload: 'partialDispatched',
  },
  {
    key: 'completeDispatched',
    title: 'Complete Dispatched',
    payload: 'completeDispatched',
  },
  { key: 'orderPartial', title: 'Partial Order', paylod: 'orderPartial' },
  { key: 'Dispatched', title: 'Dispatched', payload: 'Dispatched' },
];
export const SECONDARY_ORDER_TYPE_LIST = [
  { key: 'Pending', title: 'Pending', payload: 'Pending' },
  { key: 'Approved', title: 'Approved', payload: 'Approved' },
  { key: 'Reject', title: 'Reject', payload: 'Reject' },
];
export const EVENT_TYPE_LIST = [
  { key: 'Pending', title: 'Pending', payload: 'Pending' },
  { key: 'Approved', title: 'Approved', payload: 'Approved' },
  { key: 'Completed', title: 'Completed', payload: 'Completed' },
  { key: 'Cancel', title: 'Canceled', payload: 'Cancel' },
  { key: 'Reject', title: 'Rejected', payload: 'Reject' },
];

export const TitleElem = ({ selectedUser }) => {
  const style = useGlobelStyle();
  return (
    <>
      <View style={style.flex}>
        <View style={style.thumbNail}>
          <Text style={style.thumbNailText}>
            {selectedUser?.name?.slice(0, 2).toUpperCase()}
          </Text>
        </View>
        <Text style={style.headerText}>{selectedUser?.name}</Text>
      </View>
    </>
  );
};

export const getOrderType = async () => {
  const response = await AsyncStorage.getItem('orderPriceWise');
  return response == '0';
};

export const TeamList = [
  {'id':214,'name':'aamir test user','user_type':'Sales User'},
  {'id':320,'name':'abacus test user','user_type':'Sales User'},
  {'id':398,'name':'ABC Test','user_type':'Sales User'},
];

export const TabBarLayout = React.memo(
  ({
    props,
    tabWidth,
    isBorderTab = false,
    isSecondaryTab = false,
    activeColor = '#0092FF',
    gap = 6,
    scrollEnabled = true,
    allCount = null,
    bgColor,
    indicatorStyle,
    onTabPress = () => { },
    tabPadding = 0,
  }) => {
    const style = useGlobelStyle();
    const divisionType = typeof tabWidth;
    const layout = useWindowDimensions();
    const activeTheme = useTheme();
    const { t } = useTranslation();

    if (indicatorStyle == undefined) {
      indicatorStyle = isBorderTab
        ? style.noUnderLineTabStyle
        : style.underLineTabStyle;
    }

    return (
      <TabBar
        {...props}
        style={{ backgroundColor: bgColor || activeTheme.section }}
        scrollEnabled={scrollEnabled}
        activeColor={activeColor}
        labelStyle={style.tabTextStyle}
        gap={gap}
        onTabPress={onTabPress}
        indicatorStyle={indicatorStyle}
        renderLabel={({ route, focused }) => (
          <Text
            style={[
              {marginHorizontal:10},
              isBorderTab
                ? style?.borderTabStyle(focused)
                : isSecondaryTab
                  ? style?.secondaryTabStyle(focused)
                  : null,
              {
                width:
                  divisionType == 'number' ? ((layout?.width / tabWidth) + tabPadding) : 'auto',
                textAlign: 'center',
                color: activeTheme.text,
                marginVertical: -10,
              },
            ]}>
            {t(route?.title)}{' '}
            {allCount !== null &&
              (allCount[route?.payload]
                ? '(' + allCount[route?.payload] + ')'
                : '(0)')}
          </Text>
        )}
        tabStyle={{
          width: divisionType == 'number' ? ((layout?.width / tabWidth) + tabPadding) : 'auto',

        }}
      />
    );
  },
);


export const PERMISSION_LIST = [
  {
    key: 'ACCESS_FINE_LOCATION',
    title: 'Access Precise Location',
    subtitle: 'To provide accurate location-based services',
    granted: false,
    icon: 'notification',
  },
  {
    key: 'ACCESS_COARSE_LOCATION',
    title: 'Access Approximate Location',
    subtitle: 'To estimate your location for basic features',
    granted: false,
    icon: 'notification',
  },
  {
    key: 'CAMERA',
    title: 'Use Camera',
    subtitle: 'To take photos and videos within the app',
    granted: false,
    icon: 'notification',
  },
  {
    key: 'READ_EXTERNAL_STORAGE',
    title: 'Access Files & Documents',
    subtitle: 'To read files, documents, and downloads from your device',
    granted: false,
    icon: 'notification',
  },
  {
    key: 'READ_MEDIA_IMAGES',
    title: 'Access Photos & Media',
    subtitle: 'To access images and media files for app features',
    granted: false,
    icon: 'notification',
  },
  // {
  //   key: 'RECORD_AUDIO',
  //   title: 'Record Audio',
  //   subtitle: 'To capture audio for recordings or voice messages',
  //   granted: false,
  //   icon: 'notification'
  // },
  // {
  //   key: 'CALL_PHONE',
  //   title: 'Make Phone Calls',
  //   subtitle: 'To initiate phone calls from the app if needed',
  //   granted: false,
  //   icon: 'notification'
  // }
  // {
  //   title: 'Access Phone Status',
  //   subtitle: 'To detect network status and call state',
  //   granted: false,
  //   icon: 'notification'
  // },
];
