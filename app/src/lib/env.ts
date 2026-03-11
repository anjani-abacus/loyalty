import Config from 'react-native-config';

export const ENV = {
  NAME: Config.APP_NAME,
  API_URL: Config.API_URL,
  FEATURE_NEW_FLOW: Config.FEATURE_NEW_FLOW === 'true',
};
