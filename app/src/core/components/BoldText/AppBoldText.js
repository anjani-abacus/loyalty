import React from 'react';
import {Text} from 'react-native';

const AppBoldText = props => {
  return <Text style={{fontWeight: '700'}}>{props.children}</Text>;
};

export default AppBoldText;
