const React = require('react');

module.exports = {
  Platform: {
    OS: 'android',
    select: (spec) => spec.android,
  },

  View: 'View',
  Text: 'Text',
  TextInput: 'TextInput',
  TouchableOpacity: 'TouchableOpacity',
  Image: 'Image',
  ScrollView: 'ScrollView',

  StyleSheet: { create: (styles) => styles },

  // Safe no-op modules
  NativeModules: {
    SettingsManager: {},
    UIManager: {},
    StatusBarManager: {},
  },

  Dimensions: {
    get: () => ({ width: 390, height: 844 }),
  },

  Appearance: {
    getColorScheme: () => 'light',
  },

  // Required for many components
  PixelRatio: { get: () => 2 },

  // Required for SafeAreaView
  SafeAreaView: 'SafeAreaView',

  // Required for FlatList / VirtualizedList
  VirtualizedList: 'VirtualizedList',
  FlatList: 'FlatList',
  SectionList: 'SectionList',
};
