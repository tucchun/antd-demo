// const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const modules = require('./app/modules.js');
// const ExamplePlugin = require("./app/lib/ExamplePlugin.js");

const publicUrl = '';
const env = getClientEnvironment(publicUrl);
module.exports = {
  entry: {
    polyfills: require.resolve('./polyfills'),
    index: require.resolve('./src/index.js'),
    vendor: ['react', 'react-dom', 'antd']
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(process.env.NODE_PATH.split(path.delimiter).filter(Boolean)),
    extensions: [
      '.web.js',
      '.mjs',
      '.js',
      '.json',
      '.web.jsx',
      '.jsx'
    ],
    alias: {
      'babel-runtime': path.dirname(require.resolve('babel-runtime/package.json')),
      'react-native': 'react-native-web'
    },
    plugins: [new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])]
  },
  module: {
    strictExportPresence: true,
    rules: [

      {
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              baseConfig: {
                extends: [require.resolve('eslint-config-react-app')]
              },
              ignore: false,
              useEslintrc: false
            },
            loader: require.resolve('eslint-loader')
          }
        ],
        include: paths.appSrc
      }, {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      }, {

        oneOf: [

          {
            test: [
              /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/
            ],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }, {
            test: /\.(js|jsx|mjs)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            // options: {

              // babelrc: true,
              // presets: [require.resolve('babel-preset-react-app')],

              // cacheDirectory: true
            // }
          }, {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'), {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1
                }
              }, {
                loader: require.resolve('postcss-loader'),
                options: {

                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              }
            ]
          }, {

            exclude: [
              /\.js$/, /\.html$/, /\.json$/
            ],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: require.resolve('./src/index.html'),
      chunks: ['vendor', 'runtime', 'polyfills', 'index']
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', minChunks: Infinity}),
    new webpack.optimize.CommonsChunkPlugin({name: 'runtime'}),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: {
    hints: false
  }
};
