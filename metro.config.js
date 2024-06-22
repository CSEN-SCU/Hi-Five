// const crypto = require('crypto');
// const fs = require('fs');

// let hash = crypto.createHash('sha256');
// hash.update(fs.readFileSync('.env'));
// const cacheVersion = hash.digest('hex');

// module.exports = { // eslint-disable-line import/no-commonjs
//   ...
//   cacheVersion,
// };



const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
}

config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
};

config.resetCache = true;

module.exports = config;