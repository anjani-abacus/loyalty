import React from 'react';
import {View, StyleSheet} from 'react-native';
import {SearchBar} from '@rneui/themed';
import useActiveTheme from '../Theme/useActiveTheme';
import useTheme from '../Theme/useTheme';

export default function AppSearchBar({term, onChangeTerm, placeHolder, style}) {
  const activeTheme = useTheme();
  return (
    <View style={[styles.searchBar, style]}>
      <SearchBar
        platform="android"
        placeholder={placeHolder}
        onChangeText={onChangeTerm}
        searchIcon={{color:activeTheme.text}}

        onClear={() => onChangeTerm('')}
        value={term}
        containerStyle={{paddingTop: 0, paddingBottom: 0, borderRadius: 10}}
        selectionColor={activeTheme.Secondary}
        inputContainerStyle={{
          backgroundColor: activeTheme.maincontainer,
          borderRadius: 6,
          elevation: 4,
          height: 40,
        }}
        inputStyle={{
          fontSize: 15,
          marginLeft: 10,
          color:activeTheme.text,
        }}
        leftIconContainerStyle={{
          width: 30,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal:5,
    flex: 1,
  },
});
