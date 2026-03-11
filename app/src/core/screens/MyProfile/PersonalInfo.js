import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Clipboard } from 'react-native';
import Camera from '../../assets/icons/Camera.svg';
import UploadImage from '../../assets/icons/uploadImage.svg';
import { sectionStyles as useStyles } from './styles';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import Edit from '../../assets/icons/Edit.svg';
import moment from 'moment';
import { CopyButton, ShieldCheckIcon } from '../../assets/SVGs/svg';
import { AppCamera } from '../../components/Camera/AppCamera';


const copyToClipboard = (phoneNumber) => {
    Clipboard.setString(phoneNumber);
};

const PersonalInfo = ({onRefresh, isLoading, updateProfileImageCamera, cameraPicker, handleDocumentPick, navigation, loginData }) => {
    const styles = useStyles();
    const { status_of_profile:status, influencer_type_name, id, name, mobile:mobileNo, referral_code:referralCode, birth_date:dob,
        country,
        state,
        district,
        city,
        pincode,
        address,
        area,
        work_anniversary_date:doa,
    } = loginData || {};
    const GlobelStyle = useGlobelStyle();
    const routeHandler = () => {
        navigation.navigate('Update Profile', { formType: 'BasicInformation' });
    };

    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [images, setImages] = useState([]);


    return <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}>
        <View style={styles.card}>
            <View style={[GlobelStyle.flex, GlobelStyle.alignItemsCenter, GlobelStyle.justifyContentBetween]}>
                <Text style={styles.heading}>Basic Information</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity style={styles.editIcon} onPress={routeHandler}>
                        <Edit width={22} height={22} />
                        {/* <Text style={styles.editIconText}>Edit Info</Text> */}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleDocumentPick}>
                        <UploadImage width={24} height={24} />
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.editIcon} onPress={cameraPicker}>
                        <Camera width={20} height={20} onPress={()=>{setIsCameraVisible(true)}} />
                    </TouchableOpacity> */}
                </View>
            </View>

            <Text style={styles.label}>Name</Text>
            <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                <View>
                    <Text style={[styles.value]}>{name ?? 'N/A'}</Text>
                </View>

                <View style={{
                    backgroundColor: status?.toLowerCase() == 'approved' ? '#BFF5DA' : 'rgba(248, 232, 232, 1)',
                    padding: 4,
                    borderRadius: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 30,
                    width: 30,
                }}>
                    {status?.toLowerCase() == 'approved' ?
                     <ShieldCheckIcon width={18} height={18} fill="#00AC56" /> :
                    <ShieldCheckIcon width={18} height={18} fill="#f00" />}

                </View>
            </View>
            <View style={[styles.ruler]} />

            <Text style={styles.label}>User Type & ID</Text>
            <Text style={[styles.value, styles.ruler]}>{influencer_type_name ?? 'N/A'} - {id}</Text>

            <Text style={styles.label}>Mobile Number</Text>
            <Text style={[styles.value, styles.ruler]}>{mobileNo ?? 'N/A'}</Text>

            <Text style={styles.label}>Date of Birth</Text>
            <Text style={[styles.value, styles.ruler]}>{(dob && moment(dob).format('DD MMM, yyyy')) ?? 'N/A'}</Text>

            {/* <Text style={styles.label}>Date of Anniversary</Text>
            <Text style={[styles.value, styles.ruler]}>{(doa && moment(doa).format('DD MMM, yyyy')) ?? 'N/A'}</Text> */}

            <Text style={styles.label}>Address</Text>
            <Text style={[styles.value, styles.ruler]}>
                {[address, area, district, city, state, pincode, country].filter(Boolean).join(', ') || 'N/A'}
            </Text>
        </View>

        {/* Referral Information */}
        <View style={[styles.card, { backgroundColor: '#F9EFFF', flexDirection: 'row' }]}>
            <View style={{ flex: 1 }}>
                <Text style={styles.referralHeading}>Referral Information</Text>
                <Text style={styles.referralLabel}>Referral Code {!referralCode ? 'Not Available' : null}</Text>
            </View>
            {referralCode && <TouchableOpacity  onPress={() => copyToClipboard((referralCode || ''))} style={[styles.row, { justifyContent: 'center', gap:5, alignItems: 'center', backgroundColor: '#003EEE', padding: 4, borderRadius: 6 }]}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>{referralCode || 'N/A'}</Text>
                <CopyButton fill="#fff" />
            </TouchableOpacity>}
        </View>

        <AppCamera
              modalVisible={isCameraVisible}
              setModalVisible={setIsCameraVisible}
              onlyCamera={true}
              isMultiple={false}
              setImages={updateProfileImageCamera}
              images={images}
            />
    </ScrollView>;
};

export default PersonalInfo;
