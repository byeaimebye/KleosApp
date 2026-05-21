module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      // Debe ir último — requerido por react-native-reanimated
      'react-native-reanimated/plugin',
    ],
  };
};
