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
    vendor: [
      'react',
      'react-dom',
      'antd'
    ]
  },

    // resolve: {
    //   extensions: ['.ts', '.js', '.json'],
    //   modules: [path.join(__dirname, 'src'), 'node_modules']
    // },

    module: {
      rules: [
        {
          test: /(\.js|\.jsx)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader'
          }
        }, {
          test: /\.less$/,
          loader: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        }, {
          test: /\.css$/,
          use:
          // ExtractTextPlugin.extract({
          //   use: ['css-loader', 'postcss-loader'],
          //   fallback: 'style-loader',
          // })
      ['style-loader', 'css-loader', 'postcss-loader']
          // {
          //   loader: 'style-loader'
          // }, {
          //   loader: 'css-loader',
          //   options: {
          //     modules: false
          //     // importLoaders: 1
          //   }
          // }, {
          //   loader: 'less-loader'
          // }, {
          //   loader: 'postcss-loader'
          // }
          // ]
        }
      ]
    },
    plugins: [
      // new ExtractTextPlugin('app.css'),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        inject: true,
        template: require.resolve('./src/index.html'),
        chunks: ['vendor', 'runtime', 'polyfills', 'index']
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor', minChunks: Infinity
        // filename: 'vendor.[chunkhash].js'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
        // filename: 'runtime.[chunkhash].js'
      }),
      // new ExamplePlugin()
    ]
  };
