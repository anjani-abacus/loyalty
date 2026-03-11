import React from 'react';
import {StyleSheet} from 'react-native';

const Style = StyleSheet.create({
  sheetHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'red',
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

  flex: {
    flexDirection: 'row',
  },
  flexStretch: {
    flex: 1,
  },
  headerWrapper: {
    height: '100%',
    paddingTop: 10,
  },
  skeletonFlatList: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  dataFlatList: {
    paddingHorizontal: 20,
  },
  thumbNail: {
    backgroundColor: 'white',
    marginRight: 10,
    height: 28,
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: '#E5F1FF',
  },
  thumbNailText: {
    fontWeight: '700',
    color: '#004BAC',
  },
  headerText: {
    color: '#fff',
  },
  backButton: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 12,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E5EAF1',
    paddingVertical: 18,
  },
  optionIcon: {
    fontSize: 16,
    color: '#E5EAF1',
    marginRight: 10,
  },
  optionText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
  },
  optionContact: {
    color: '#888',
    fontSize: 12,
  },
  activeOptionIcon: {
    color: '#23CE6B',
  },
  goIcon: {
    color: '#0092FF',
    fontSize: 24,
  },
});

export default Style;
