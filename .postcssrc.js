module.exports = ({ file }) => ({
  plugins: {
    'postcss-import': { root: file.dirname },
    'postcss-url': [
      {
        filter: './**.*',
        url: asset => `./${asset.url}`,
      }, // [relative path](https://git.io/vplP2)
    ],
    'postcss-aspect-ratio-mini': {},
    'postcss-write-svg': { utf8: false },
    'postcss-cssnext': {
      browsers: ['> 5%'],
    },
    'cssnano': {
      preset: 'advanced',
      autoprefixer: false,
      'postcss-zindex': false,
    },
    // ...
    // and if you want to compress,
    // just use css-loader option that already use cssnano under the hood
    'postcss-browser-reporter': {},
    'postcss-reporter': {},
  },
});
