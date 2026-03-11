const Reanimated = require('react-native-reanimated/mock');

module.exports = {
  ...Reanimated,
  default: Reanimated, // fixes common usage
};
