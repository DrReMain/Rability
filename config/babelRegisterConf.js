const fs = require('fs');
const path = require('path');

const babelrc = fs.readFileSync(path.resolve(__dirname, '../.babelrc'), 'utf-8');
const babelConf = JSON.parse(babelrc);

if (Array.isArray(babelConf.plugins)) {
  babelConf.plugins.push('dynamic-import-node')
}

module.exports = babelConf;
