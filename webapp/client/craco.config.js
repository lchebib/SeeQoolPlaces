const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};



// const CracoAntDesignPlugin = require("craco-antd");
// const path = require("path");


// module.exports = {
//   plugins: [
//     {
//       plugin: CracoAntDesignPlugin,
//       options: {
//         customizeThemeLessPath: path.join(
//           __dirname,
//           "src/style/customAntDesign.less"
//         ),
//       },
//     },
//   ],
// };