import {StyleSheet} from 'react-native';
import useTheme from '../Theme/useTheme';

const LanguageStyle = () => {
  const activeTheme = useTheme();
  return StyleSheet.create({
    LanguageContainer: {
      width: '100%',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textContainer: {
      width: '100%',
      flex: 1,
      // flexDirection: 'row',
      // flexWrap: 'wrap',
      paddingHorizontal: 10,
      // justifyContent: 'space-around',
      // alignItems: 'center',
    },

    SelectEnabledType: {
      marginVertical: 10,
      borderWidth: 2,
      paddingRight: 10,
      paddingLeft:20,
      paddingVertical:5,
      borderRadius: 28,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: activeTheme.lightPrimaryBg,
    },
  });
};
export default LanguageStyle;
