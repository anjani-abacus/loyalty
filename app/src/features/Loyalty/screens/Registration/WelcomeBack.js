import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import useGlobelStyle from '../../../../core/assets/Style/GlobelStyle';
import { useTranslation } from 'react-i18next';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';

const SuccessScreen = ({ route }) => {
    const GlobelStyle = useGlobelStyle();
    const { t } = useTranslation();
    const activeTheme = useActiveTheme();

    return (
        <SafeAreaView style={GlobelStyle.container}>
            <View style={[styles.container, { backgroundColor: activeTheme.themeColor }]}>
                <View style={[styles.circle, { backgroundColor: activeTheme.Primary }]}>
                    <Icon name={'check'} size={70} color="white" type="material" />
                    {/* <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        style={{ width: 200 }}
                        source={require('../../../assets/Images/BasiqFooter.png')}

                    /> */}
                </View>
                <Text style={styles.title}>{t('You Are Ready To Go')}!</Text>
                <Text style={styles.message}>{t('Thanks For Taking Your Time To Create Account With Us. Now This Is The Fun Part, Let"s Explore The App')}.</Text>

                <TouchableOpacity style={[styles.button, { backgroundColor: activeTheme.Primary }]}>
                    <Text style={styles.buttonText}>{t('Get Started')}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
};
export default SuccessScreen;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#004BAC',
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        // backgroundColor: '#008000',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff',
    },
    message: {
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        paddingHorizontal: 24,
        textAlign: 'center',

    },
    button: {
        // backgroundColor: '#008000',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
});

