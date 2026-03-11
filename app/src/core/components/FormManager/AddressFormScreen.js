// AddressFormScreen.js
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, Alert, StatusBar, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AddressForm from './AddressForm';
import AppButton from '../Button/AppButton';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import useTheme from '../Theme/useTheme';
import { View } from 'react-native';
import AppTheme from '../Theme/AppTheme';
import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StatusBarHeader } from '../StatusBar/StatusBar';
import { HelpIcon, LeftArrowIcon } from '../../assets/SVGs/svg';

const addressSchema = Yup.object({
    basicInfo: Yup.object({
        addressInfo: Yup.object().shape({
            country: Yup.string()
                .required('Country is required')
                .matches(/^[A-Za-z\s]+$/, 'Country must only contain alphabets'),

            pincode: Yup.string()
                .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits')
                .required('Pincode is required'),

            state: Yup.string()
                .required('State is required')
                .matches(/^[A-Za-z\s]+$/, 'State must only contain alphabets'),

            district: Yup.string()
                .required('District is required')
                .matches(/^[A-Za-z\s]+$/, 'District must only contain alphabets'),

            city: Yup.string()
                .required('City is required')
                .matches(/^[A-Za-z\s]+$/, 'City must only contain alphabets'),

            area: Yup.string()
                .required('Area is required')
                .max(100, 'Area must not exceed 100 characters'),
        }).required('Address info is required'),
    }),
});

const defaultInitialValues = {
    basicInfo: {addressInfo: { country: '', pincode: '', state: '', district: '', city: '', area: '' }},
};

const AddressFormScreen = ({ navigation, route }) => {
    console.log('address screen - Route params:', route?.params);
    const {itemInfo} = route?.params || {};
    const GlobelStyle = useGlobelStyle();
    const [initialValues, setInitialValues] = useState(defaultInitialValues);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSavedAddress = async () => {
            try {
                const value = await AsyncStorage.getItem('@user_address');
                if (value) {
                    const savedAddress = JSON.parse(value);
                    setInitialValues({
                        basicInfo: {
                            addressInfo: savedAddress, // pre-fill with saved data
                        },
                    });
                }
            } catch (error) {
                console.error('Error loading saved address:', error);
            } finally {
                setLoading(false);
            }
        };

        loadSavedAddress();
    }, []);

    const handleSubmit = async (values) => {
        try {
            const address = values.basicInfo.addressInfo;

            // Save to AsyncStorage
            await AsyncStorage.setItem('@user_address', JSON.stringify(address));
            console.log('Address Saved to AsyncStorage:', address);
            Toast.show({ type: 'success', text1: 'Address saved successfully', visibilityTime: 2000 });
            setTimeout(() => {
                navigation.navigate('LoyaltyGiftGallery', { keepSheetOpen: true, item:itemInfo });
            }, 300);
        } catch (error) {
            console.error('Error saving address:', error);
            Toast.show({ type: 'error', text1: 'Failed to save address', visibilityTime: 2000 });
        }
    };

    if (loading) {return null;} // or show loader

    return (
        <SafeAreaView style={[GlobelStyle.container]}>
            <LinearGradient start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={['#F5E6FF', '#e1caf0ff']}
                style={[{ flexGrow: 1, justifyContent: 'center', paddingHorizontal:10 }]}>
                <StatusBarHeader height={StatusBar.currentHeight} />
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    enableOnAndroid={true}
                    extraScrollHeight={200} // pushes input above keyboard
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ flexDirection: 'row', marginBottom:20, justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <LeftArrowIcon fill="#000" />
                        </TouchableOpacity>
                        <Text style={{
                            flex: 0.8,
                            textAlign: 'center',
                            color: '#000',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>Registration</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
                            <HelpIcon
                                style={{ marginRight: 10 }}
                                width={30}
                                height={30}
                                fill="#000"
                                stroke="#000"
                                strokeWidth={0.1}
                            />
                        </TouchableOpacity>
                    </View>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize={true}
                        validationSchema={addressSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleSubmit }) => (
                            <>
                                <View style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', borderWidth: 1, borderColor: '#fff', padding: 5, borderRadius: 4, marginBottom: 10 }}>
                                    <AddressForm formParent="basicInfo.addressInfo" />
                                </View>

                                <View style={[GlobelStyle.mt8]}>
                                    <AppButton
                                        title="Submit"
                                        mode={'contained'}
                                        type="submit"
                                        // loading={isPending}
                                        // disabled={isPending}
                                        color={AppTheme.light.themeColor}
                                        onPress={handleSubmit} // ✅ Call Formik's handleSubmit
                                    />
                                </View>
                            </>
                        )}
                    </Formik>
                </KeyboardAwareScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default AddressFormScreen;


export const useSavedAddress = () => {
    const [address, setAddress] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const fetchAddress = useCallback(async () => {
        try {
            console.log('Fetching saved address...');
            const value = await AsyncStorage.getItem('@user_address');
            if (value) {
                const parsedAddress = JSON.parse(value);
                console.log('Found saved address:', parsedAddress);
                setAddress(parsedAddress);
            } else {
                console.log('No saved address found');
                setAddress(null);
            }
        } catch (error) {
            console.error('Error reading address:', error);
            setAddress(null);
        }
    }, [refreshTrigger]);

    const deleteAddress = useCallback(async () => {
        try {
            console.log('Deleting saved address...');
            await AsyncStorage.removeItem('@user_address');
            setAddress(null);
            setRefreshTrigger(prev => prev + 1); // Force refresh
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    }, []);

    const refreshAddress = useCallback(() => {
        console.log('Manually refreshing address...');
        setRefreshTrigger(prev => prev + 1);
    }, []);

    useEffect(() => {
        fetchAddress();
    }, [fetchAddress]);

    return {
        address,
        fetchAddress: refreshAddress,
        deleteAddress,
        refreshAddress,
    };
};
