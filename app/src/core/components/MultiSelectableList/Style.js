import {StyleSheet} from 'react-native';

const Style = () => {
  return StyleSheet.create({
    optionsWrapper: {
      paddingHorizontal: 20,
      backgroundColor: '#fff',
    },
    modal: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      elevation: 10,
    },
    optionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderColor: '#E5EAF1',
      paddingVertical: 14,
    },
    optionIcon: {
      fontSize: 16,
      color: '#E5EAF1',
      marginRight: 10,
    },
    optionText: {
      color: '#000',
      fontSize: 12,
    },
    optionContact: {
      color: '#888',
      fontSize: 12,
    },
    activeOptionIcon: {
      color: '#23CE6B',
    },
    sheetCloseBtn: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 14,
    },
    titleText: {
      fontSize: 16,
      fontWeight: '700',
    },
    sheetCloseIcon: {
      fontSize: 24,
    },
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      backgroundColor: '#F8F8F8',
      padding: 10,
      borderRadius: 5,
    },
    searchInput: {
      backgroundColor: '#F8F8F8',
      padding: 0,
      flex: 1,
    },
    searchIcon: {
      fontSize: 20,
      marginRight: 10,
    },
    clearIcon: {
      marginRight: 10,
      color: '#ffff',
      backgroundColor: '#000',
      borderRadius: 4,
      padding: 6,
      fontSize: 14,
    },
  });
};

export default Style;
