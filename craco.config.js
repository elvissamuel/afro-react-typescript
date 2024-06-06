const CracoAliasPlugin = require("craco-alias");

module.exports = {
  webpack: {
    alias: {},
    plugins: [],
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = { "crypto": require.resolve("crypto-browserify") };
      return webpackConfig;
    }
  },
};