require('babel-polyfill');
require('babel-register')(require('../config/babelRegisterConf'));

const config = require('../config');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__DLLS__ = process.env.WEBPACK_DLLS === 'true';

if (__DEVELOPMENT__) {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.css$|\.less$|\.scss$|\.sass$)/i,
  })) {
    return
  }
}

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools =
  new WebpackIsomorphicTools(require('../webpack/isomorphic')).server(
    config.rootDir, () => {
      require('../src/server')
    });
