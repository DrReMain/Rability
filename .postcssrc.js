/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');

// PostCSS filters
const postcssNested = require('postcss-nested');

// CSSNext is our PostCSS plugin of choice, that will allow us to use 'future'
// stylesheet syntax like it's available today.
const cssnext = require('postcss-cssnext');

// CSSNano will optimise our stylesheet code
const cssnano = require('cssnano');

const postcssBrowserReporter = require('postcss-browser-reporter');
const postcssReporter = require('postcss-reporter');

module.exports = {
  plugins: [
    postcssImport(),
    postcssUrl(),
    postcssNested(),
    cssnext({
      warnForDuplicates: false
    }),
    cssnano(),
    postcssBrowserReporter(),
    postcssReporter()
  ],
};