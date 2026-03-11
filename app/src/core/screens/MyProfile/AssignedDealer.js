import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Clipboard } from 'react-native';
import Toast from 'react-native-toast-message';
import { sectionStyles as useStyles } from './styles';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import Success from '../../assets/icons/Success.svg';
import Edit from '../../assets/icons/Edit.svg';
import useGlobelStyle from '../../assets/Style/GlobelStyle';

const AssignedDealer = ({onRefresh, isLoading, loginData = {}, navigation}) => {
    const styles = useStyles();
    const GlobelStyle = useGlobelStyle();
    const phoneNumber = '9876543210';

    const routeHandler = () => {
        navigation.navigate('Update Profile', {formType:'dealerInfo'});
    };

    return <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}>
        <View style={styles.card}>
            <View style={[GlobelStyle.flex, GlobelStyle.alignItemsCenter, GlobelStyle.justifyContentBetween]}>
                <Text style={styles.heading}>Dealer Information</Text>
                {/* <TouchableOpacity style={styles.editIcon} onPress={routeHandler}>
                    <Edit width={16} height={16} fill="#004CAC" />
                    <Text style={styles.editIconText}>Edit Info</Text>
                </TouchableOpacity> */}
            </View>

            <Text style={styles.label}>Dealer Name</Text>
            <Text style={[styles.value, styles.ruler]}>{loginData?.dealer_name || 'N/A'}</Text>

            <Text style={styles.label}>Dealer Code</Text>
            <Text style={[styles.value, styles.ruler]}>{loginData?.dealer_code || 'N/A'}</Text>

            <Text style={styles.label}>Mobile Number</Text>
            <Text style={[styles.value, styles.ruler]}>{loginData?.dealer_mobile || 'N/A'}</Text>
        </View>
    </ScrollView>;
};

export default AssignedDealer;
