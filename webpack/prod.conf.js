const path = require('path')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const Loadable = require('react-loadable/webpack')
const config = require('../config')

// universal-tools
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./isomorphic'))

module.exports = {
  devtool: 'source-map',
  context: config.rootDir,
  entry: {
    main: [
      './src/client.js',
    ],
  },
  output: {
    path: config.assetsDir,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/dist/',
  },
  performance: {
    hints: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules(\/|\\)(?!(@feathersjs))/
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
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
              },
            },
          ],
        }),
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
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
              },
            }, {
              loader: 'less-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true,
              },
            },
          ],
        }),
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
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
              },
            }, {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: true,
                sourceMapContents: true,
              },
            },
          ],
        }),
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

    new CleanPlugin([config.assetsDir], {root: config.rootDir}),

    new ExtractTextPlugin({
      filename: '[name]-[contenthash].css',
      allChunks: true,
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __DLLS__: false,
    }),

    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    new UglifyJsPlugin(),

    webpackIsomorphicToolsPlugin,

    new Loadable.ReactLoadablePlugin({
      filename: path.join(config.assetsDir, 'loadable-chunks.json'),
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/pwa.js',
    }),

    new SWPrecacheWebpackPlugin({
      cacheId: 'appName',
      filename: 'service-worker.js',
      minify: true,
    }),

  ],
}
