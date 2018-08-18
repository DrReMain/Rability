const isDev = process.env.NODE_ENV === 'development';

module.exports = ({ file }) => ({
  plugins: {
    'postcss-import': { root: file.dirname },
    'postcss-url': [
      {
        filter: './**.*',
        url: asset => `./${asset.url}`,
      }, // [relative path](https://git.io/vplP2)
    ],
    // 'postcss-aspect-ratio-mini': {},
    // 'postcss-write-svg': { utf8: false },
    'postcss-preset-env': {
      stage: 0,
      browsers: ['> 5%'],
    },
    'autoprefixer':{},
    'cssnano': isDev ? false : {
      preset: 'default',
    },
    // ...
    'postcss-browser-reporter': {},
    'postcss-reporter': {},
  },
});
