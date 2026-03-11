import FastImage from 'react-native-fast-image';
import { Images } from '../../assets';
import { ImageModal } from '../../components/ConfirmationModal/ConfirmationModal';
import { useContext, useRef, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../auth/AuthContext';
import { View } from 'react-native';
import Edit from '../../assets/icons/Edit.svg';

export const UserProfileImage = ({
    openBottomSheet,
    selectedFile,
    style = {}, resize = 'cover', enablePreview = true }) => {

    let imageUri = selectedFile?.uri || '';

    if (imageUri.startsWith('file://')) {}
    else if (imageUri.startsWith('data:')) {}
    else {imageUri = 'file://' + imageUri;}

    return <>
        <View style={{ position: 'relative' }}>
            {selectedFile ? <FastImage
                style={{ ...style }}
                resizeMode={FastImage.resizeMode[resize]}
                source={{ uri: `${imageUri}` }}
            /> :
                <FastImage
                    style={{ ...style }}
                    resizeMode={FastImage.resizeMode[resize]}
                    source={Images.default}
                />}
            <TouchableOpacity onPress={openBottomSheet} style={{ padding: 5, borderRadius: 80, backgroundColor: 'rgba(211, 222, 243, 1)', position: 'absolute', top: 0, right: 0 }}>
                <Edit width={18} height={18} />
            </TouchableOpacity>
        </View>
    </>;
};

