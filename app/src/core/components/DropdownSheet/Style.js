import React from 'react';
import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  mandetoryIcon: {
    // color: '#004BAC',
    color:'#f00',
  },
  dropdownBox: {
    height: 40,
    paddingHorizontal: 20,
    width: '100%',
    lineHeight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownBoxWrapper: {
    paddingVertical: 8,
  },
  activeLabel: {
    // width:120,
    top: -20,
    left: -20,
    // transform:[{translateX:-20}, {translateY:0}, {scale:0.8}],
    transform: [{scale: 0.8}],
    backgroundColor: '#fff',
    position: 'absolute',
  },
  labelBox: {
    flex: 1,
  },
  selectedOption: {
    left: -5,
  },
  outline: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  underline: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default Style;
