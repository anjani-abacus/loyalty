import React from 'react';
import AppTheme from '../Theme/AppTheme';
import { Button, Text} from 'react-native-paper';
import { StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';

export default function UploadButton({mode, title, onPress, disabled, loading ,color,icon}) {
    return (
        <View style={style.uploadButton}>
            <Text style={{textAlign:'center'}} mode={mode} loading={loading} disabled={disabled} onPress={onPress}
            labelStyle={{ letterSpacing: 0 }} buttonColor={color} icon={icon}>
                <MaterialCommunityIcons name="file-image-plus" size={30} style={{width:20, height:20}} />
            </Text>
            <Text style={{textAlign:'center'}}>{title}</Text>
        </View>
    );
}

const style = StyleSheet.create({
        uploadButton:{
            padding:5,
            backgroundColor:'transparent',
            borderWidth:1,
            borderColor:'#999',
            borderStyle:'dashed',
            borderRadius:10,
            overflow:'hidden',
        },
});
