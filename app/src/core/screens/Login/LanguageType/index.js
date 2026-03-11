import {View, Text} from 'react-native';
import React from 'react';
import Language from '../../../../core/components/Language';

const LanguageType = ({navigation, route}) => {
  const type = route?.params?.type;
  return <Language navigation={navigation} type={type} />;
};

export default LanguageType;
