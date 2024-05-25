// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['module:metro-react-native-babel-preset'],
//     plugins: [
//       'module:react-native-dotenv',
//       ['@babel/plugin-transform-private-methods', { loose: true }],
//       ['@babel/plugin-transform-class-properties', { loose: true }],
//       ['@babel/plugin-transform-private-property-in-object', { loose: true }]
//     ],
//   };
// };




module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      'module:react-native-dotenv',
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }]
    ],
  };
};

// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['module:metro-react-native-babel-preset'],
//     plugins: [
//       'module:react-native-dotenv',
//       '@babel/plugin-transform-private-methods'
//     ],
//   };
// };





// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['module:metro-react-native-babel-preset'], // 'babel-preset-expo'
//     plugins: [
//       ['module:react-native-dotenv', '@babel/plugin-transform-private-methods']
//     ],
//   };
// };
