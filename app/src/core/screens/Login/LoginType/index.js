import { React, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import useGlobalStyle from '../../../assets/Style/GlobelStyle';
import { Appbar, Title } from 'react-native-paper';
import useLoginTypeStyle from './LoginTypeStyle';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
import { useTranslation } from 'react-i18next';
import { Icon } from '@rneui/themed';
import { ApiCall } from '../../../../services/ServiceProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DeviceInfo from 'react-native-device-info';
import AppBoldText from '../../../../core/components/BoldText/AppBoldText';
import { FlatList } from 'react-native';

function SelectLoginType({ navigation }) {
  const { t } = useTranslation();
  const LoginTypeStyle = useLoginTypeStyle();
  const [getInfluncerList, setInfluncerList] = useState([]);
  const GlobelStyle = useGlobalStyle();
  const activeTheme = useActiveTheme();
  const [loginType, setLoginType] = useState('');

  useEffect(() => {
    getInfluencer();
  }, []);

  useEffect(() => {
    if (getInfluncerList.length > 0 && !loginType) {
      selectionChange(getInfluncerList[0].module_name);
    }
  }, [getInfluncerList]);
  const loginTypeArr = [
    // {
    //   id: '1',
    //   type: 'Sales Executive',
    //   value: 'Employee',
    //   icon: 'account-outline',
    //   color: activeTheme.Green,
    //   backgroundColor: activeTheme.backgroundGreen,
    // },
    // {
    //   id: '2',
    //   type: 'Distributor / Dealer',
    //   value: 'DrLogin',
    //   icon: 'account-supervisor-outline',
    //   color: activeTheme.Tertiary,
    //   backgroundColor: activeTheme.backgroundTertiary,
    // },
    // {
    //   id: '3',
    //   type: 'Service Engineer',
    //   value: 'service-engineer',
    //   icon: 'account-wrench-outline',
    //   color: activeTheme.Primary,
    //   backgroundColor: activeTheme.backgroundPrimary,
    // },
    {
      id: '4',
      type: 'Influencer',
      value: 'Other',
      icon: 'account-hard-hat',
      color: activeTheme.Warning,
      backgroundColor: activeTheme.backgroundWarning,
    },
  ];

  // useEffect(() => {
  //   if (getInfluncerList && getInfluncerList.length > 0) {
  //     selectionChange(getInfluncerList[0].module_name);
  //   }
  // }, [getInfluncerList]);

  const getInfluencer = async () => {
    try {
      await ApiCall(

        { influncer_type: 1, 'package_name': DeviceInfo.getBundleId() },
        'AppInfluencerSignup/influencerListSignUp',
      )
        .then(result => {
          if (result.statusCode == 200) {
            setInfluncerList(result.result);
          } else {
          }
        });

    } catch (error) {

    }
  };

  const selectionChange = buttonType => {

    setLoginType(buttonType);
  };
  const GotoLoginPage = () => {
    if (loginType != '') {
      let loginTypeValue = getInfluncerList.find(row => row.module_name == loginType);


      navigation.navigate('Login', { login_type: 'Other', influencer_type: loginTypeValue.type });
    }
  };
  return (
    <View style={[GlobelStyle.container, { backgroundColor: activeTheme.bgSecondary }]}>
      <Appbar.Header
        style={{ paddingLeft: 16 , backgroundColor: activeTheme.bgSecondary }}>
        <Appbar.BackAction
          color={activeTheme.TextColor}
          size={22}
          onPress={() => navigation.goBack()}

        />
      </Appbar.Header>
      <View style={[LoginTypeStyle.LoginTypeContainer]}>
        <Title style={{ color: activeTheme.TextColor }}>{t('SelectLogin')}</Title>
        <FlatList
          data={getInfluncerList}
          keyExtractor={({ item }) => item}
          contentContainerStyle={{ padding: 10, margin: 0 }}
          ListFooterComponent={() => !getInfluncerList.length && <ActivityIndicator />}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={item.id}
              style={[
                LoginTypeStyle.SelectEnabledType,
                {
                  borderColor:
                    loginType == item.module_name
                      ? activeTheme.LightGrey
                      : 'transparent',
                  backgroundColor: activeTheme.Light,
                },
              ]}
              onPress={() => selectionChange(item.module_name)}>
              <View style={[LoginTypeStyle.textContainer]}>
                <View>
                  <MaterialCommunityIcons
                    name={item.icon}
                    color={item.color}
                    style={[
                      LoginTypeStyle.iconStyle,
                      {
                        backgroundColor: item.backgroundColor,
                      },
                    ]}
                    size={25}
                  />
                </View>
                <AppBoldText>
                  <Text style={{ color: activeTheme.Dark }}>{t(item.module_name)}</Text>
                </AppBoldText>
              </View>
              {loginType == item.module_name && (
                <Icon name="check-circle" color={activeTheme.Green} size={25} />
              )}
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity
          onPress={GotoLoginPage}
          style={[
            GlobelStyle.bottomButton,
            GlobelStyle.paddingHorizontal16,
            {
              backgroundColor: activeTheme.themeColor,
              width:'90%',
            },
          ]}
          disabled={!loginType}
        >
          <Text style={[GlobelStyle.ContactlargeFont]}>{t('Next')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SelectLoginType;
