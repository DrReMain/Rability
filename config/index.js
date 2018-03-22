const path = require('path')

const environment = {
  development: {
    isProduction: false,
    assetsPath: `http://${process.env.HOST || 'localhost'}:${+process.env.PORT +
    1 || 3001}/dist/`,
  },
  production: {
    isProduction: true,
    assetsPath: '/dist/',
  },
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign(
  {
    rootDir: path.resolve(__dirname, '../'),
    assetsDir: path.resolve(__dirname, '../static/dist'),
    srcDir: path.resolve(__dirname, '../src'),

    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 3000,
    staticHOST: process.env.HOST || '127.0.0.1',
    staticPORT: process.env.PORT ? Number(process.env.PORT) + 1 : 3001,
    apiHOST: process.env.APIHOST || 'localhost',
    apiPORT: process.env.APIPORT,
  },
  environment,
)
