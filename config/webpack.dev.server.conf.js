const webpack = require('webpack')
const merge = require('webpack-merge')
const PATHS = require('./paths')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  name: 'server',
  target: 'node',
  entry: {
    server: [
      'babel-polyfill',
      PATHS.serverApp,
    ],
  },
  output: {
    path: PATHS.distSrc,
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.DefinePlugin({
      _DEVCLIENT: false,
      _DEVSERVER: true,
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
    new webpack.IgnorePlugin(/vertx/),
  ],
})