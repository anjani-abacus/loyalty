import LinearGradient from 'react-native-linear-gradient';
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, Image } from 'react-native';
import useLanguageStyle from './LanguageStyle';
import useGlobelStyle from '../../assets/Style/GlobelStyle';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from '@rneui/themed';
import * as Animatable from 'react-native-animatable';
import { Title } from 'react-native-paper';
import i18n from '../../screens/Language/i18n/i18n.config';
import { AuthContext } from '../../../auth/AuthContext';
import useTheme from '../Theme/useTheme';
import { LANGUAGE_LIST } from '../../utils/Constant';
import { StatusBarHeader } from '../StatusBar/StatusBar';
import { Images } from '../../assets';

const Language = ({ navigation, type }) => {


  console.log(type);
  const { loginToken } = useContext(AuthContext);
  const LanguageStyle = useLanguageStyle();
  const GlobelStyle = useGlobelStyle();
  useEffect(() => {
    LaguageFunction();
  }, []);

  const LaguageFunction = async () => {
    await AsyncStorage.getItem('language').then(value => {
      if (value) {
        setLanguageType(value);
      } else {
        setLanguageType('en');
      }
    });
  };
  const activeTheme = useTheme();
  const { t } = useTranslation();
  const [languageType, setLanguageType] = useState('en');

  const selectionChange = (type, value) => {
    setLanguageType(value);
    i18n.changeLanguage(value);
    AsyncStorage.setItem('language', value);
  };

  return (
    <>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#FDEBEB', '#bf8ef3ff']}
        style={[{ flexGrow: 1, justifyContent: 'center' }]}
      >
        <StatusBarHeader height={StatusBar.currentHeight} />

      <View style={{ flexGrow: 1, alignItems: 'center', padding: 10, paddingTop: 120 }}>


        <Animatable.View animation="fadeInUp" easing="ease-out" duration={500} delay={1000} style={{ textAlign: 'center' }}>
          <View style={{
            height: 250,
            width: 250,
            borderRadius: 200,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}>
            <Image
              source={Images.languages} // replace with your illustration
              style={{ height: 250, width: 250 }}
              resizeMode="cover"
            />
          </View>
        </Animatable.View>
        <View style={[{ flex: 1, justifyContent: 'space-between' }]}>
          <View style={{
            padding: 10,
          }}>
            <Text style={{
              fontSize: 24, fontWeight:'bold', color: activeTheme.text,
            }}>{t('Use_this_application_in_your_preffered_language')}</Text>
          </View>
          <ScrollView>
            <View style={[LanguageStyle.textContainer]}>
              {LANGUAGE_LIST?.map(row => {
                return (
                  <TouchableOpacity
                    key={row.id}
                    style={[
                      LanguageStyle.SelectEnabledType,
                      {
                        borderColor: (languageType === row.value) ? activeTheme.themeColor : 'transparent',
                      },
                    ]}
                    onPress={() => selectionChange(row.type, row.value)}>
                    <View>
                      <Text style={{ color: activeTheme.text }}>{row.language}</Text>
                      <Text style={{ fontSize: 12, color: activeTheme.text }}>{row.type}</Text>
                    </View>
                    {languageType === row.value && (
                      <Icon
                        name="check-circle"
                        color={activeTheme.themeColor}
                        size={25}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <View style={{ padding: 10, flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                type == 'innerPage' ? navigation.goBack() : navigation.navigate('Login');

              }}
              style={[
                GlobelStyle.bottomButton,
                {
                  backgroundColor:
                    languageType === ''
                      ? activeTheme.Medium
                      : activeTheme.themeColor,
                },
              ]}>
              <Text style={[GlobelStyle.ContactlargeFont]}>{t('Next')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default Language;
