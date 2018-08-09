const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });
const config = require('../config');

function happyPlugin(id, loaders) {
  return new HappyPack({
    id,
    loaders,
    threadPool: happyThreadPool,

    verbose: false,
  })
}

function createDLL(conf, dllName) {
  let manifest
  try {
    manifest = require(
      path.join(config.rootDir, `webpack/dlls/${dllName}.json`))
  }
  catch (e) {
    process.env.WEBPACK_DLLS = 'false'
  }
  if (manifest) {
    console.log(`WEBPACK --> [ will be using the ${dllName} DLL. ]`)

    conf.plugins.push(new webpack.DllReferencePlugin({
      context: config.rootDir,
      manifest,
    }))
  }
}

function babelrcObject() {
  const babelrc = fs.readFileSync(path.resolve(__dirname, '../.babelrc'), 'utf-8');
  const babelConf = JSON.parse(babelrc);
  const babelrcDevPlugins = babelConf.env && babelConf.env.development &&
    babelConf.env.development.plugins

  const babelLoaderQuery = Object.assign(
    {},
    babelConf,
    {
      plugins: [...babelConf.plugins, ...babelrcDevPlugins],
    },
  );
  delete babelLoaderQuery.env;

  return babelLoaderQuery
}

module.exports = { happyPlugin, createDLL, babelrcObject };
