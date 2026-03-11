import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {MD3Colors, IconButton, Title} from 'react-native-paper';
import {BottomSheet} from '@rneui/themed';
import AppTheme from '../Theme/AppTheme';
import useActiveTheme from '../Theme/useActiveTheme';
const AppBottomSheet = ({visible, handleBackdropPress}) => {
  const activeTheme = useActiveTheme();

  const setMode = value => {


  };
  const handlePress = () => {

    handleBackdropPress();
  };

  const styles = StyleSheet.create({
    containerStyle: {
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      backgroundColor: activeTheme.Light,
      borderTopLeftRadius: 22,
      borderTopRightRadius: 22,
    },
    touchableStyle: {
      flex: 1,
      alignItems: 'center',
    },
  });

  return (
    <BottomSheet onBackdropPress={handlePress} isVisible={visible}>
      <View style={styles.containerStyle}>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            setMode('My');
            handleBackdropPress();
          }}>
          <IconButton
            icon="account"
            iconColor={MD3Colors.neutral99}
            style={{backgroundColor: MD3Colors.neutral20}}
            size={28}
          />
          <Title>My</Title>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableStyle}
          onPress={() => {
            setMode('Team');
            handleBackdropPress();
          }}>
          <IconButton
            icon="account-multiple"
            iconColor={MD3Colors.neutral99}
            style={{backgroundColor: MD3Colors.neutral20}}
            size={28}
          />
          <Title>Team</Title>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};

export default AppBottomSheet;
