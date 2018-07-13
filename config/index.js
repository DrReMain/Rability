const path = require('path');

const environment = {
  development: {
    isProduction: false,
    assetsPath: `http://${process.env.HOST || 'localhost'}:${+process.env.PORT + 1 || 3001}/dist/`, // 开发环境内的静态资源路径
  },
  production: {
    isProduction: true,
    assetsPath: '/dist/', // 生产环境内的静态资源路径
  },
}[process.env.NODE_ENV || 'development'];

const apiHOST = process.env.APIHOST || '127.0.0.1';
const apiPORT = process.env.APIPORT || 3030;

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

    dynamicRoutes: false, // 是否从数据库获取路由
    routesAPI: '', // 获取路由的接口地址

    proxyUrl: `http://${apiHOST}:${apiPORT}`,

    cssModules: true,
    css: '[name]_[local]__[hash:base64:5]',
  },
  environment,
);
