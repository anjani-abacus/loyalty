import React, { useState } from 'react';
import { TouchableOpacity, View, ActionSheet, Linking, Dimensions, ImageBackground, Text, StatusBar } from 'react-native';
import ThemedText from '../../components/ThemedText';
import Feather from 'react-native-vector-icons/Feather';
import { Images } from '../../assets';
import FastImage from 'react-native-fast-image';
import { useStyles } from './styles';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import Verified from '../../assets/icons/verified.svg';
import Camera from '../../assets/icons/Camera.svg';
import { UserProfileImage } from './UserProfile';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { LeftArrowIcon } from '../../assets/SVGs/svg';
import { StatusBarHeader } from '../../components/StatusBar/StatusBar';

const getInitials = (name) => {
  if (!name) {return '';}

  const words = name.trim().split(' ');

  if (words.length === 1) {
    return words[0][0].toUpperCase(); // Single word case
  }

  return (words[0][0] + '.' + words[1][0]).toUpperCase();
};

const UserInfo = ({ handleDocumentPick, selectedFile, handleLogout, loginData, navigation }) => {
    const styles = useStyles();
    const GlobelStyle = useGlobelStyle();
    const { name, influencerType, status } = loginData || {};

    return (
        <View style={styles.container}>

            {loginData?.profile_img ? <ImageBackground
                source={{ uri: loginData?.profile_img }}
                style={{ height: 350, width: '100%', backgroundColor: '#fff' }}
                resizeMode="cover" // or "contain", "stretch", "repeat", "center"
            >
                <StatusBarHeader height={StatusBar.currentHeight} />
                <TouchableOpacity style={{flexDirection:'row'}} onPress={() => navigation.goBack()}>
                    <View style={{
                    backgroundColor:'rgba(204, 204, 204, 0.8)',
                    marginLeft:5,
                    borderRadius:50,
                }}>
                        <LeftArrowIcon fill="#000" />
                    </View>
                </TouchableOpacity>
            </ImageBackground> :
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={['#3600C0', '#CE90FF']}
                    style={{ height: 350, alignItems: 'center', justifyContent: 'center' }}
                >

                    <Animatable.View animation="tada" easing="ease-out" duration={1000} delay={1000} style={{ textAlign: 'center' }}>
                        <View style={{ padding: 3, borderWidth: 2, borderColor: '#e4caf7ff', borderRadius: 100, borderStyle: 'dashed' }}>
                            <View style={{ padding: 3, borderWidth: 2, borderColor: '#d1c5f1ff', borderRadius: 100, borderStyle: 'dashed' }}>
                                <LinearGradient
                                    colors={['#eddcfbff', '#CE90FF']}
                                    style={{
                                        height: 100, borderWidth: 2, borderColor: '#fff', width: 100, borderRadius: 100, alignItems: 'center', justifyContent: 'center',
                                        shadowColor: '#4d1275ff',
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 4,
                                        elevation: 5,
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 32,
                                    }}>{getInitials(loginData?.name)}</Text>
                                </LinearGradient>
                            </View>
                        </View>
                    </Animatable.View>

                </LinearGradient>
            }
            {/* <View style={[GlobelStyle.flex, { gap: 10 }]}>
                <View style={styles.imageWrapper}>
                    <UserProfileImage style={{ width: 80, height: 80, borderRadius: 80 }} user={loginData} />
                    <TouchableOpacity onPress={handleDocumentPick} style={{position:'absolute', backgroundColor:'rgba(0,0,0,.2)', borderRadius:50, padding:4, top:0, right:0}}>
                        <Camera width={16} height={16} fill="#fff" />
                    </TouchableOpacity>
                </View>
                <View style={[{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }]}>
                    <View>
                        <ThemedText style={styles.userName}>{name}</ThemedText>
                        <ThemedText style={styles.designation}>{influencerType}</ThemedText>
                        <View style={[GlobelStyle.flex]}>
                            <View style={styles[status=='Approved'?'verified':'pending']}>
                                {status=='Approved' && <Verified width={18} height={18} fill="#0f0" />}
                                <ThemedText style={styles[status=='Approved'?'verifiedText':'pendingText']}>
                                    {status}
                                </ThemedText>
                            </View>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity onPress={handleLogout} >
                            <Feather
                                name="log-out"
                                style={{ color: '#fff' }}
                                size={22}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View> */}
        </View>
    );

};

export default UserInfo;
