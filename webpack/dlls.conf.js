const path = require('path')
const webpack = require('webpack')
const config = require('../config')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  entry: {
    vendor: [
      'babel-polyfill',
      // </babel-runtime>
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

      'fastclick',
      'react',
      'react-dom',
      'react-helmet',
      'react-hot-loader',
      'redux',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'redux-auth-wrapper',
      'axios',
      'multireducer',
      'antd-mobile',
      'rc-animate',
      'rc-queue-anim',
      'rc-tween-one',
      'react-transition-group',
      'serialize-javascript',
      'classnames',
      'lodash',
      'nprogress',
      'currency.js',
      'moment'
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
