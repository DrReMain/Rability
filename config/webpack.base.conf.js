const PATHS = require('./paths')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: require.resolve('eslint-loader'),
        include: PATHS.appSrc,
        exclude: /node_modules/,
      },
      {
        oneOf: [
          {
            test: /\.js$|\.jsx$/,
            loader: 'babel-loader',
            include: PATHS.appSrc,
            exclude: /node_modules/,
          },
          {
            test: /\.(jpe?g|png|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: 'images/[hash:8].[name].[ext]',
                },
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    quality: 65,
                  },
                  pngquant: {
                    quality: '65-90',
                    speed: 4,
                  },
                  svgo: {
                    plugins: [
                      {
                        removeViewBox: false,
                      },
                      {
                        removeEmptyAttrs: false,
                      },
                    ],
                  },
                  gifsicle: {
                    optimizationLevel: 7,
                    interlaced: false,
                  },
                  optipng: {
                    optimizationLevel: 7,
                    interlaced: false,
                  },
                },
              },
            ],
          },
          { test: /\.json$/, loader: 'json-loader' },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx'],
  },
}