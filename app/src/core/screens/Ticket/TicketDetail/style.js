import {View, Text, StyleSheet} from 'react-native';
import useActiveTheme from '../../../../core/components/Theme/useActiveTheme';

const TktDetailStyle = () => {
  const activeTheme = useActiveTheme();

  return StyleSheet.create({
    heading: {
      color: activeTheme.Secondary,
      fontSize: 18,
      fontWeight: '600',
      marginLeft: 5,
      marginVertical: 12,
    },
    container: {
      flex: 1,
      paddingLeft: 16,
      paddingRight: 16,
    },
    uploadDocContainer: {
      marginTop: 16,
      marginHorizontal: 5,
    },
    uploadDocTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 8,
    },
    imageList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    uploadedImage: {
      width: 100,
      height: 100,
      margin: 8,
    },
    imgContainer: {
      padding: 2,
      margin: 4,
      borderRadius: 10,
      backgroundColor: '#EDEDED',
    },
  });
};

export default TktDetailStyle;
