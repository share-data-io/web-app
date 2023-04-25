// eslint-disable-next-line no-unused-vars
const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.alias || {};
  Object.assign(fallback, {
    // fs: false,
    os: require.resolve("os-browserify"),
    path: require.resolve("path-browserify"),
  });
  config.resolve.alias = fallback;
  //   config.plugins = (config.plugins || []).concat([
  //     new webpack.ProvidePlugin({
  //       process: "process/browser",
  //       Buffer: ["buffer", "Buffer"],
  //     }),
  //   ]);
  //   config.ignoreWarnings = [/Failed to parse source map/];

  return config;
};
