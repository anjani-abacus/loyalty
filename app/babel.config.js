module.exports = function(api) {
  api.cache(() => process.env.ENVFILE);

  const envFile = process.env.ENVFILE || '.env';

  return {
    presets: [
      'module:@react-native/babel-preset', // correct for RN 0.75
    ],
    plugins: [
      [
        'react-native-reanimated/plugin',
        {
          relativeSourceLocation: true,
        },
      ],
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: envFile,
          allowUndefined: true,
        },
      ],
    ],
  };
};
