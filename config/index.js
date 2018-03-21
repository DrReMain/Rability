const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  assetsDir: path.resolve(__dirname, '../static/dist'),
  srcDir: path.resolve(__dirname, '../src'),

  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 3000,
  staticHOST: process.env.HOST || '127.0.0.1',
  staticPORT: process.env.PORT ? Number(process.env.PORT) + 1 : 3001,
  apiHOST: '',
  apiPORT: '',
}
