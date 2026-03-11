module.exports = {
  preset: 'react-native',
  testEnvironment: 'node',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Transpile ALL RN-related ESM modules
transformIgnorePatterns: [
  'node_modules/(?!((react-native(-.*)?|@react-native|@react-navigation|@react-native-firebase|@notifee|@gorhom|@shopify)[/]))',
],


  moduleNameMapper: {
     'react-native-reanimated': '<rootDir>/__mocks__/react-native-reanimated.js',
    'react-native-gesture-handler': '<rootDir>/__mocks__/react-native-gesture-handler.js',
    'react-native-safe-area-context': '<rootDir>/__mocks__/react-native-safe-area-context.js',
    '@react-native-async-storage/async-storage': '<rootDir>/__mocks__/@react-native-async-storage.js',
    // 🔥 Add this line
    '^src/(.*)$': '<rootDir>/src/$1',

    // Existing mapping
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
