const environment = {
  development: {
    isProduction: false,
    assetsPath: `//${process.env.HOST || 'localhost'}:${+process.env.PORT +
    1 || 3001}/dist/`,
  },
  production: {
    isProduction: true,
    assetsPath: '/dist/',
  },
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
}, environment)
