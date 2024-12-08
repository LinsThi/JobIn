// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
// eslint-disable-next-line no-undef
// const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(
  () => {
    const config = getDefaultConfig(__dirname);

    const { transformer, resolver } = config;

    config.transformer = {
      ...transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
    };
    config.resolver = {
      ...resolver,
      assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
      sourceExts: [...resolver.sourceExts, 'svg'],
    };

    return config;
  },
  { input: './global.css' }
);
