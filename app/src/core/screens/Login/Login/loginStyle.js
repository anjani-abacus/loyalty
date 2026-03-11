import {StyleSheet} from 'react-native';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';
const LoginStyle = () => {
  const activeTheme = useActiveTheme();
  return StyleSheet.create({
    loginContainer: {
      width: '100%',
      paddingHorizontal: 16,
    },
    loginHeader: {
      padding: 20,
      marginTop:150,
      textAlign: 'center',
    },
    TextInput: {
      width: '100%',
      borderRadius: 16,
      paddingHorizontal: 15,
      fontSize: 14,
      shadowColor: '#000',
    },
    LoginTypeContainer: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingHorizontal: 12,
      justifyContent: 'space-around',
    },
    SelectDisabledType: {
      width: 160,
      height: 160,
      marginVertical: 12,
      padding: 10,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: activeTheme.LightGrey,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    SelectEnabledType: {
      width: 160,
      height: 160,
      marginVertical: 12,
      padding: 10,
      borderRadius: 16,
      borderWidth: 2,
      borderColor: activeTheme.Primary,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    ImageStyle: {width: 100, height: 100},
  });
};
export default LoginStyle;
