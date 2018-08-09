require('babel-polyfill')
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const Loadable = require('react-loadable/webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('../config')
const utils = require('./utils')
const antTheme = require('../package').antTheme

// universal-tools
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./isomorphic'))

const webpackConfig = module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
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
        include: config.srcDir,
      }, {
        test: /\.json$/,
        loader: 'happypack/loader?id=json',
        include: config.srcDir,
      }, {
        test: /\.css$/,
        loader: 'happypack/loader?id=css',
        exclude: /node_modules/,
        include: config.srcDir,
      }, {
        test: /\.css$/,
        loader: 'happypack/loader?id=nodecss',
        include: /node_modules/,
      }, {
        test: /\.less$/,
        loader: 'happypack/loader?id=less',
        exclude: /node_modules/,
        include: config.srcDir,
      }, {
        test: /\.less/,
        loader: 'happypack/loader?id=nodeless',
        include: /node_modules/,
      }, {
        test: /\.(scss|sass)$/,
        loader: 'happypack/loader?id=sass',
        exclude: /node_modules/,
        include: config.srcDir,
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
    extensions: ['.json', '.js', '.jsx', '.css', '.less', '.scss', '.sass'],
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

    new BundleAnalyzerPlugin(),

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
          minimize: false,
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
    utils.happyPlugin('nodecss', [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          sourceMap: true,
          minimize: false,
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
    utils.happyPlugin('nodeless', [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: true,
          minimize: false,
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
          javascriptEnabled: true,
          modifyVars: antTheme,
          outputStyle: 'expanded',
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
          modules: config.cssModules,
          importLoaders: 2,
          sourceMap: true,
          localIdentName: config.css,
          minimize: false,
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
          minimize: false,
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
};

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
