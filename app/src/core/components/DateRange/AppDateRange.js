import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import moment from 'moment';
import AppTheme from '../Theme/AppTheme';

const AppDateRange = ({
  title,
  onDateChange,
  visible,
  handleDatePickerVisible,
}) => {
  const [openDateModal, setOpenDateModal] = useState(false);
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });

  const hideDatePicker = () => {
    handleDatePickerVisible();
  };

  return (
    <View style={{paddingVertical: 5}} />
  );
};

export default AppDateRange;
