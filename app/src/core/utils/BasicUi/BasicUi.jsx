import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './MyProfileStyle';

const BasicUi = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Icon name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity>
                    <Icon name="power" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Profile Section */}
            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/100' }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Tewatia Pvt. Ltd.</Text>
                <Text style={styles.profileStatus}>Active (Distributor) <Icon name="shield-checkmark" size={16} color="#4CAF50" /></Text>
            </View>

            {/* Details Section */}
            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Mobile</Text>
                    <Text style={styles.detailValue}>9876543210</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Email</Text>
                    <Text style={styles.detailValue}>sunil@gmail.com</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Date of Birth</Text>
                    <Text style={styles.detailValue}>N/A</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Date of Anniversary</Text>
                    <Text style={styles.detailValue}>N/A</Text>
                </View>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Address</Text>
                    <Text style={styles.detailValue}>5E/3, B.P Railway Road, N.I.T Faridabad</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};



export default BasicUi;
