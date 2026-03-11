import {StyleSheet} from 'react-native';
import useActiveTheme from '../../../core/components/Theme/AppTheme';
import useTheme from '../../components/Theme/useTheme';

const AnnouncementStyle = () => {
  const activeTheme = useTheme();
  return StyleSheet.create({
    announcelist:{
     borderColor:'#808080',
     borderBottomWidth:1,
     padingHorizontal:1,
     paddingVertical:16,
    },

  });
};
export default AnnouncementStyle;
