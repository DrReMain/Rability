const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PATHS = require('./paths');
const baseWebpackConfig = require('./webpack.base.conf');

module.exports = merge(baseWebpackConfig, {
  devtool: 'cheap-module-source-map',
  name: 'client',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router-redux',
      'react-router-dom',
      'react-router-config'],
    bundle: [
      PATHS.clientApp,
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    ],
  },
  output: {
    path: PATHS.distSrc,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin({
      _DEVCLIENT: true,
      _DEVSERVER: false,
      _DEVLOGGER: true,
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity //Infinity
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: false, allChunks: true,
    }),
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: 'css-loader',
            }),
          },
          {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'fonts/[hash:8].[name].[ext]',
                },
              }],
          },
        ],
      },
    ],
  },
});