/* eslint-disable no-unused-vars */
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = withCSS({
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ['@svgr/webpack'],
    });

    config.module.rules.forEach(function (rule, index, array) {
      const test = (rule.test && rule.test.toString()) || '';
      if (test.includes('css')) {
        array[index] = {
          ...rule,
          exclude: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
        };
      } else if (test.includes('svg')) {
        array[index] = {
          ...rule,
          exclude: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/,
        };
      }
    });

    config.module.rules.push({
      test: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
      use: [
        {
          loader: 'style-loader',
          options: {
            injectType: 'singletonStyleTag',
          },
        },
        {
          loader: 'postcss-loader',
          options: styles.getPostCssConfig({
            themeImporter: {
              themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
            },
            minify: true,
          }),
        },
      ],
    });

    config.module.rules.push({
      test: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/,
      use: ['raw-loader'],
    });

    return config;
  },
});

// module.exports = {
//   webpack(config, options) {
//     config.module.rules.push({
//       test: /\.svg$/,
//       issuer: {
//         test: /\.(js|ts)x?$/,
//       },
//       use: ['@svgr/webpack'],
//     });

//     config.module.rules.forEach(function (rule, index, array) {
//       const test = (rule.test && rule.test.toString()) || '';
//       if (test.includes('css')) {
//         array[index] = {
//           ...rule,
//           exclude: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
//         };
//       } else if (test.includes('svg')) {
//         array[index] = {
//           ...rule,
//           exclude: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/,
//         };
//       }
//     });

//     config.module.rules.push({
//       test: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
//       use: [
//         {
//           loader: 'style-loader',
//           options: {
//             injectType: 'singletonStyleTag',
//           },
//         },
//         {
//           loader: 'postcss-loader',
//           options: styles.getPostCssConfig({
//             themeImporter: {
//               themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
//             },
//             minify: true,
//           }),
//         },
//       ],
//     });

//     config.module.rules.push({
//       test: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/,
//       use: ['raw-loader'],
//     });

//     return config;
//   },
// };
