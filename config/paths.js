'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath =>
    path.resolve(appDirectory, relativePath);

module.exports = {
  root: resolveApp('/'),
  appSrc: resolveApp('src'),
  clientApp: resolveApp('src/client.js'),
  serverApp: resolveApp('src/server.js'),
  distSrc: resolveApp('dist'),
  favicon: resolveApp('src/favicon.ico'),
  html: resolveApp('src/index.html'),
};
