module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // ... some other plugins
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          "@": "./src"
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
      },
    ],
  ],
};
