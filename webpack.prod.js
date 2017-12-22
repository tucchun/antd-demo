const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const Plugin = require("./app/lib/HashMapPlugin.js");

module.exports = Merge(CommonConfig, {
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'postcss-loader'
      ]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['./app/dist']),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: false,
        keep_fnames: true
      },
      compress: {
        screw_ie8: false
      },
      comments: false
    }),
    new webpack.HashedModuleIdsPlugin(),
    // new webpack.NamedModulesPlugin()
    new Plugin()
  ],
  // output: {
  //   filename: '[name].[chunkhash].js',
  //   chunkFilename: '[name].[chunkhash].js',
  //   publicPath: './dist/',
  //   path: path.join(__dirname, './app/dist')
  // },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: './app/dist/',
    path: path.join(__dirname, './app/dist')
  }
});
