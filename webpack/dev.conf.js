require('babel-polyfill')
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
  mode: 'development',
  devtool: 'inline-source-map',
  context: config.rootDir,
  entry: {
    'main': [
      `webpack-hot-middleware/client?path=http://${config.staticHOST}:${config.staticPORT}/__webpack_hmr`,
      './src/client.js',
    ],
  },
  output: {
    path: config.assetsDir,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
    // publicPath: `http://${config.staticHOST}:${config.staticPORT}/dist/`,
    publicPath: config.assetsPath,
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
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: 'happypack/loader?id=antd',
        include: /node_modules(\/|\\)(antd-mobile|normalize\.css)/,
      }, {
        test: /\.less$/,
        loader: 'happypack/loader?id=less',
        exclude: /node_modules/,
      }, {
        test: /\.scss$/,
        loader: 'happypack/loader?id=sass',
        exclude: /node_modules/,
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
        loader: 'babel-loader',
        exclude: /node_modules/,
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
          modules: config.cssModules,
          importLoaders: 1,
          sourceMap: true,
          localIdentName: config.css,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: '.postcssrc.js',
          },
        },
      },
    ]),
    utils.happyPlugin('antd', [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: true,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: '.postcssrc.js',
          },
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
          modules: config.cssModules,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: config.css,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: '.postcssrc.js',
          },
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
          modules: config.cssModules,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: config.css,
        },
      }, {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: '.postcssrc.js',
          },
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

const validDlls = function (dllNames = 'vendor') {
  process.env.WEBPACK_DLLS = 'false'
  for (let dllName of [].concat(dllNames)) {
    try {
      const manifest = require(
        path.join(config.rootDir, `webpack/dlls/${dllName}.json`))
      const dll = fs.readFileSync(
        path.join(config.assetsDir, `dlls/dll_${dllName}.js`))
        .toString('utf-8')
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



