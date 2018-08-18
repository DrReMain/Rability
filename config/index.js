const path = require('path');

const apiHOST = process.env.APIHOST || '127.0.0.1';
const apiPORT = process.env.APIPORT || 3030;

const environment = {
  development: {
    isProduction: false,
    assetsPath: `http://${process.env.HOST || 'localhost'}:${+process.env.PORT + 1 || 3001}/dist/`, // 开发环境内的静态资源路径
    proxyUrl: `http://${apiHOST}:${apiPORT}`, // 开发环境api
  },
  production: {
    isProduction: true,
    assetsPath: '/dist/', // 生产环境内的静态资源路径
    proxyUrl: 'https://xxx.xxx.xxx.xxx:xxx/xxx'
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    rootDir: path.resolve(__dirname, '../'), // 项目根目录在本机的绝对路径
    assetsDir: path.resolve(__dirname, '../static/dist'), // 项目dist文件夹在本机的绝对路径
    srcDir: path.resolve(__dirname, '../src'), // 项目src文件夹在本机的绝对路径

    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 3000,
    staticHOST: process.env.HOST || '127.0.0.1',
    staticPORT: process.env.PORT ? Number(process.env.PORT) + 1 : 3001,
    apiHOST,
    apiPORT,

    cssModules: true,
    css: '[name]_[local]__[hash:base64:5]',

    // token有效期(s)
    tokenExpiration: 6 * 60 * 60
  },
  environment,
);
