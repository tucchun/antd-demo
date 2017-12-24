process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const Plugin = require("./app/lib/HashMapPlugin.js");
// const getClientEnvironment = require('./env');

const path = require('path');
// const publicUrl = '';
// const env = getClientEnvironment(publicUrl);
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
// Get environment variables to inject into our app.

module.exports = merge(CommonConfig, {
  devtool: 'cheap-module-source-map',
  plugins: [
    new CleanWebpackPlugin('./app/dev/'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // new webpack.DefinePlugin(env.stringified),
  ],
  devServer: {
    port: 8000,
    // host: '192.168.1.51',
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: '/',
    // contentBase: path.join(__dirname, './dist'),
    hot: true
  },
  output: {
    pathinfo: true,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
    // publicPath: './app/dev/',
    path: path.join(__dirname, './app/dev/')
  }
});
