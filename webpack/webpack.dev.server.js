const express = require('express')
const webpack = require('webpack')

const { host, port } = require('../config')
const webpackConfig = require('./dev.conf')
const compiler = webpack(webpackConfig)

const serverOptions = {
  contentBase: `http://${host}:${Number(port) + 1}/`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
}

const app = express()

app.use(require('webpack-dev-middleware')(compiler, serverOptions))
app.use(require('webpack-hot-middleware')(compiler))

app.use('*', (req, res, next) => {
  res.send('static server!')
})

app.listen(Number(port) + 1, function (err) {
  if (err) {
    console.error(err)
  }
  else {
    console.info(
      `==> 🚧  Webpack development server listening on ${host}:${Number(port) + 1}`)
  }
})
