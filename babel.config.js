module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel",
      ["module:react-native-dotenv", {
        "photosPermission": "Allow to generate floor plans." // This is correct now
      }]
    ]
  };
};
