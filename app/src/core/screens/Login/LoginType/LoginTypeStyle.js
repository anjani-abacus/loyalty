import {StyleSheet} from 'react-native';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';

const LoginTypeStyle = () => {
  const activeTheme = useActiveTheme();
  return StyleSheet.create({
    Button: {
      width: '100%',
      backgroundColor: activeTheme.TextColor,
      borderRadius: 5,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },

    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '700',
      letterSpacing: 1,
    },
    LoginTypeContainer: {
      width: '100%',
      flex: 1,
      // paddingHorizontal: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    keyboardAvoidingContainer: {
      flex: 1,
    },

    SelectEnabledType: {
      width:330,
      height: 80,
      marginVertical: 5,
      padding: 10,
      borderRadius: 6,
      backgroundColor: activeTheme.LinkBlue,
      borderWidth: 2,
      borderColor: activeTheme.Primary,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    iconStyle: {
      padding: 6,
      borderRadius: 6,
      marginRight: 6,
    },
  });
};
export default LoginTypeStyle;
