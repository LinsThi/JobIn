module.exports = function (api) {
  api.cache(true);

  const plugins = ["react-native-reanimated/plugin"];

  // Strips console.* calls from production bundles only — dev/test builds keep them.
  // Checked via process.env directly (not api.env()) because api.cache(true) above
  // already pins the config to "forever" caching; api.env() would try to add its
  // own env-based cache invalidation and babel throws on the conflict.
  if (process.env.NODE_ENV === "production") {
    plugins.push("transform-remove-console");
  }

  return {
    presets: ["babel-preset-expo"],
    plugins,
  };
};
