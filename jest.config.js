/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|expo-router|react-navigation|@react-navigation/.*|nativewind|react-native-css-interop)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^expo-router$': '<rootDir>/__mocks__/expo-router.js',
    '^expo-linear-gradient$': '<rootDir>/__mocks__/expo-linear-gradient.js',
    '^expo-localization$': '<rootDir>/__mocks__/expo-localization.js',
    '^expo-image-picker$': '<rootDir>/__mocks__/expo-image-picker.js',
    '^react-native-safe-area-context$': '<rootDir>/__mocks__/react-native-safe-area-context.js',
    '^@/i18n$': '<rootDir>/__mocks__/i18n.js',
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
};
