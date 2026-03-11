import React from 'react';
import { Text } from 'react-native-paper';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import { View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = ({title, subText}) => {
    const GlobelStyle = useGlobelStyle();
  return (
    <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <Text style={GlobelStyle.Header} >{title}</Text>
        {
        subText && (
            <Text style={GlobelStyle.subHeader} >{subText}<MaterialIcons name="arrow-forward-ios"/></Text>

        )
        }
    </View>
  );
};

export default Header;
