const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJSPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const PATHS = require('./paths')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = [
  merge(baseWebpackConfig, {
    name: 'client',
    devtool: 'hidden-source-map',
    entry: {
      vendor: [
        'react',
        'react-dom',
        'redux',
        'react-redux',
        'react-router-redux',
        'react-router-dom',
        'react-router-config'],
      bundle: PATHS.clientApp,
    },
    output: {
      path: PATHS.distSrc,
      filename: '[hash:8].[name].js',
      publicPath: '/',
    },
    plugins: [
      new webpack.DefinePlugin({
        _DEVCLIENT: false,
        _DEVSERVER: false,
        _DEVLOGGER: false,
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity //Infinity
      }),
      new ExtractTextPlugin({
        filename: '[hash:8].style.css',
        disable: false,
        allChunks: true,
      }),
      new HtmlWebpackPlugin({
        favicon: PATHS.favicon,
        title: 'DOCUMENT',
        template: PATHS.html,
        filename: 'index.ejs',
        inject: 'body',
        htmlContent: '<%- __html__ %>',
        initialData: 'window.__INITIAL_STATE__ = <%- __state__ %>',
        hash: false,
        minify: {
          removeComments: false,
          collapseWhitespace: false,
        },
      }),
      new UglifyJSPlugin({
        compress: { warnings: false },
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
  }),
  merge(baseWebpackConfig, {
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
        _DEVSERVER: false,
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
        },
      }),
      new UglifyJSPlugin({
        compressor: { warnings: false },
      }),
      new webpack.IgnorePlugin(/vertx/),
    ],
  }),
]
