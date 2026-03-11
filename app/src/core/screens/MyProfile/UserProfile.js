import FastImage from 'react-native-fast-image';
import { Images } from '../../assets';
import { ImageModal } from '../../components/ConfirmationModal/ConfirmationModal';
import { useContext, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../../auth/AuthContext';
import { View } from 'react-native';

export const UserProfileImage = ({ style = {}, resize = 'cover', enablePreview = true }) => {
    const { loginData: user } = useContext(AuthContext);
    const [visible, setvisible] = useState(false);

    const words = user?.name.trim().split(/\s+/);
    const initials = words?.filter((_, i)=>i < 2)?.map(word => word.charAt(0)).join('.');

    return <>
        {(enablePreview && user?.profile_img) ? <TouchableOpacity onPress={() => setvisible(true)}>
            {
                user?.profile_img ? <FastImage
                    style={{ ...style }}
                    resizeMode={FastImage.resizeMode[resize]}
                    source={{ uri: `${user?.profile_img}` }}
                /> : <FastImage
                    style={{ ...style }}
                    resizeMode={FastImage.resizeMode[resize]}
                    source={Images.default}
                />
            }
        </TouchableOpacity> :
            user?.profile_img ? <FastImage
                style={{ ...style }}
                resizeMode={FastImage.resizeMode[resize]}
                source={{ uri: `${user?.profile_img}` }}
            /> :
                <View style={{ backgroundColor: '#f5c970ff', borderWidth:2, borderColor:'#f5c970ff', justifyContent: 'center', alignItems: 'center', borderRadius: 40, height: 30, width: 30, ...style }}>
                    <Text style={{
                        color: '#ab7507ff',
                        fontSize: 18,
                        fontWeight: 'bold',
                    }}>{initials?.toUpperCase()}</Text>
                </View>
            // <FastImage
            //     style={{ ...style }}
            //     resizeMode={FastImage.resizeMode[resize]}
            //     source={Images.default}
            // />
        }


        <ImageModal modalVisible={visible} setModalVisible={setvisible} url={user?.profile_img || Images.default} />
    </>;
};
