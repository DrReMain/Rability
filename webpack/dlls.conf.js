const path = require('path')
const webpack = require('webpack')
const config = require('../config')

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',

  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-hot-loader',
    ],
  },
  output: {
    path: path.resolve(config.assetsDir, './dlls'),
    filename: 'dll_[name].js',
    library: 'DLL_[name]_[hash]',
  },

  performance: {
    hints: false,
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),

    new webpack.DllPlugin({
      path: path.join(config.rootDir, './webpack/dlls/[name].json'),
      name: 'DLL_[name]_[hash]',
    }),
  ],

}