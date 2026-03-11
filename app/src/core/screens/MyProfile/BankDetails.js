import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Clipboard } from 'react-native';
import Toast from 'react-native-toast-message';
import { sectionStyles as useStyles } from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import Success from '../../assets/icons/Success.svg';
import Edit from '../../assets/icons/Edit.svg';
import Info from '../../assets/icons/Info.svg';
import useGlobelStyle from '../../assets/Style/GlobelStyle';

const BankDetails = ({isEditable = true, loginData = {}, navigation}) => {
    const styles = useStyles();
    const GlobelStyle = useGlobelStyle();

    const routeHandler = () => {
        navigation.navigate('Update Profile', {formType:'bankInfo'});
    };

    return <ScrollView style={styles.container}>
        <View style={styles.card}>
            <View style={[GlobelStyle.flex, GlobelStyle.alignItemsCenter, GlobelStyle.justifyContentBetween]}>
                <Text style={styles.heading}>Bank Information</Text>
                {isEditable && <TouchableOpacity style={styles.editIcon} onPress={routeHandler}>
                    <Edit width={16} height={16} fill="#004CAC" />
                    <Text style={styles.editIconText}>Edit Info</Text>
                </TouchableOpacity>}
            </View>

            <Text style={styles.label}>Account Holder Name</Text>
            <Text style={[styles.value, styles.ruler]}>{loginData?.account_holder_name || 'N/A'}</Text>

            <Text style={styles.label}>Bank Name</Text>
            <Text style={[styles.value, styles.ruler]}>{loginData?.bank_name || 'N/A'}</Text>

            <Text style={styles.label}>Bank Account Number</Text>
            <Text style={[styles.value, styles.ruler]}>{loginData?.account_no || 'N/A'}</Text>

            <Text style={styles.label}>Bank IFSC Code</Text>
            <Text style={[styles.value, styles.ruler]}>{loginData?.ifsc_code || 'N/A'}</Text>

            <Text style={styles.label}>UPI Id</Text>
            <Text style={[styles.value, styles.ruler]}>{loginData?.upi_id || 'N/A'}</Text>

            <Text style={styles.label}>Bank KYC Status</Text>
            <View style={styles.statusRow}>
                {loginData?.kyc_status?.toLowerCase() == 'approved' ? <><Success width={16} fill="green" height={16} />
                    <Text style={[styles.statusText, { color: 'green' }]}> {loginData?.kyc_status}</Text></> :
                    <>
                        <View style={styles.statusRow}>
                            <Info width={16} height={16} fill="#d97706" />
                            <Text style={[styles.statusText, { color: '#d97706' }]}> {loginData?.kyc_status} Verification</Text>
                        </View>
                    </>
                }
            </View>
        </View>
    </ScrollView>;
};

export default BankDetails;
