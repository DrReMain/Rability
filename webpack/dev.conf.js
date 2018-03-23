const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const Loadable = require('react-loadable/webpack')
const config = require('../config')
const utils = require('./utils')

// universal-tools
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./isomorphic'))

const webpackConfig = module.exports = {
  devtool: 'inline-source-map',
  context: config.rootDir,
  entry: {
    'main': [
      `webpack-hot-middleware/client?path=http://${config.staticHOST}:${config.staticPORT}/__webpack_hmr`,
      'react-hot-loader/patch',
      './src/client.js',
    ],
  },
  output: {
    path: config.assetsDir,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://${config.staticHOST}:${config.staticPORT}/dist/`,
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=jsx',
        include: [config.srcDir],
      }, {
        test: /\.json$/,
        loader: 'happypack/loader?id=json',
        include: [config.srcDir],
      }, {
        test: /\.css$/,
        loader: 'happypack/loader?id=css',
        include: [config.srcDir],
      }, {
        test: /\.less$/,
        loader: 'happypack/loader?id=less',
        include: [config.srcDir],
      }, {
        test: /\.scss$/,
        loader: 'happypack/loader?id=sass',
        include: [config.srcDir],
      }, {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/font-woff',
        },
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'application/octet-stream',
        },
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          mimetype: 'image/svg+xml',
        },
      }, {
        test: /\.(jpeg|jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
        },
      },
    ],
  },
  resolve: {
    alias: {
      src: config.srcDir,
    },
    modules: [
      config.srcDir,
      'node_modules',
    ],
    extensions: ['.json', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
    }),

    webpackIsomorphicToolsPlugin.development(),

    new Loadable.ReactLoadablePlugin({
      filename: path.join(config.assetsDir, 'loadable-chunks.json'),
    }),

    utils.happyPlugin('jsx', [
      {
        loader: 'react-hot-loader/webpack',
      }, {
        loader: 'babel-loader',
        exclude: /node_modules(\/|\\)(?!(@feathersjs))/,
        options: utils.babelrcObject(),
      }, {
        loader: 'eslint-loader',
        options: { emitWarning: true },
      },
    ]),
    utils.happyPlugin('css', [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]',
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      },
    ]),
    utils.happyPlugin('less', [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]',
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'less-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
        },
      },
    ]),
    utils.happyPlugin('sass', [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      }, {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: '[local]___[hash:base64:5]',
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        },
      }, {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
        },
      },
    ]),

  ],
}

const validDlls = function(dllNames = 'vendor') {
  process.env.WEBPACK_DLLS = 'false'
  for (let dllName of [].concat(dllNames)) {
    try {
      const manifest = require(
        path.join(config.rootDir, `webpack/dlls/${dllName}.json`))
      const dll = fs.readFileSync(
        path.join(config.assetsDir, `dlls/dll_${dllName}.js`)).toString('utf-8')
      if (dll.indexOf(manifest.name) < 0) {
        console.warn(`Invalid dll: ${dllName}`)
        return false
      }
    }
    catch (e) {
      return false
    }
  }
  process.env.WEBPACK_DLLS = 'true'
  return true
}

if (process.env.WEBPACK_DLLS === 'true' && validDlls('vendor')) {
  utils.createDLL(webpackConfig, 'vendor')
}
