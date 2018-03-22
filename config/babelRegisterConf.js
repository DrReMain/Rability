const babelrc = require('../package.json').babel

if (Array.isArray(babelrc.plugins)) {
  babelrc.plugins.push('dynamic-import-node')
}

module.exports = babelrc