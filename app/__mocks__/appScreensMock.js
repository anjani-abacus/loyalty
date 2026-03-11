// ---------------------------------------
// SIMPLE & SAFE REACT-NATIVE MOCK
// ---------------------------------------
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  return {
    ...RN,
    Platform: {
      OS: 'android',
      select: (spec) => spec.android,
    },
    View: 'View',
    Text: 'Text',
    TextInput: 'TextInput',
    TouchableOpacity: 'TouchableOpacity',
    StyleSheet: { create: (styles) => styles },
  };
});

// ---------------------------------------
// i18n MOCK
// ---------------------------------------
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (k) => k }),
}));

// ---------------------------------------
// PAPER MOCK
// ---------------------------------------
jest.mock('react-native-paper', () => ({
  MD3Colors: {},
  TextInput: 'TextInput',
  Button: 'Button',
  Provider: ({ children }) => children,
}));

// ---------------------------------------
// ANIMATABLE MOCK
// ---------------------------------------
jest.mock('react-native-animatable', () => ({
  View: ({ children }) => children,
  Text: ({ children }) => children,
  createAnimatableComponent: (C) => C,
}));

// ---------------------------------------
// STATUS BAR MOCK
// ---------------------------------------
jest.mock('../src/core/components/StatusBar/StatusBar', () => {
  const React = require('react');
  return () => <React.Fragment />;
});

// ---------------------------------------
// THEME CONTEXT MOCK
// ---------------------------------------
jest.mock('../src/context/ThemeContext', () => {
  const React = require('react');
  return {
    ThemeContext: React.createContext({ theme: 'light' }),
  };
});

// ---------------------------------------
// THEME HOOK MOCK
// ---------------------------------------
jest.mock('../src/core/components/Theme/useTheme', () => {
  return jest.fn(() => ({
    themeColor: '#000',
    Lightest: '#ccc',
    TextColor: '#000',
    Light: '#fff',
    Danger: 'red',
  }));
});

// ---------------------------------------
// OTP HOOK MOCK
// ---------------------------------------
jest.mock('../src/api/hooks/useVerifyMobile', () => ({
  useRequestMobileOtp: jest.fn(),
}));
