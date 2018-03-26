const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const config = require('../config')

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',

  entry: {
    vendor: [
      'babel-polyfill',

      // <babel-runtime>
      'babel-runtime/core-js/array/from',
      'babel-runtime/core-js/get-iterator',
      'babel-runtime/core-js/is-iterable',
      'babel-runtime/core-js/json/stringify',
      'babel-runtime/core-js/number/is-integer',
      'babel-runtime/core-js/number/is-safe-integer',
      'babel-runtime/core-js/object/assign',
      'babel-runtime/core-js/object/create',
      'babel-runtime/core-js/object/define-property',
      'babel-runtime/core-js/object/entries',
      'babel-runtime/core-js/object/get-own-property-names',
      'babel-runtime/core-js/object/get-prototype-of',
      'babel-runtime/core-js/object/keys',
      'babel-runtime/core-js/object/set-prototype-of',
      'babel-runtime/core-js/object/values',
      'babel-runtime/core-js/promise',
      'babel-runtime/core-js/symbol',
      'babel-runtime/core-js/symbol/iterator',
      'babel-runtime/helpers/asyncToGenerator',
      'babel-runtime/helpers/classCallCheck',
      'babel-runtime/helpers/createClass',
      'babel-runtime/helpers/defineProperty',
      'babel-runtime/helpers/extends',
      'babel-runtime/helpers/inherits',
      'babel-runtime/helpers/objectWithoutProperties',
      'babel-runtime/helpers/possibleConstructorReturn',
      'babel-runtime/helpers/slicedToArray',
      'babel-runtime/helpers/toConsumableArray',
      'babel-runtime/helpers/typeof',
      'babel-runtime/regenerator/index',
      // </babel-runtime>

      'axios',
      'multireducer',
      'react',
      'react-dom',
      'react-helmet',
      'react-hot-loader',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-form',
      'serialize-javascript',
      'socket.io-client',
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

    new UglifyJsPlugin(),

    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
}
