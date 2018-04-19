const express = require('express')
const webpack = require('webpack')

const {staticHOST, staticPORT} = require('../config')
const webpackConfig = require('./dev.conf')
const compiler = webpack(webpackConfig)

const serverOptions = {
  contentBase: `http://${staticHOST}:${staticPORT}`,
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

app.listen(staticPORT, function (err) {
  if (err) {
    console.error(err)
  }
  else {
    console.info(
      '==> 🚧  Webpack development server listening on port %s', staticPORT)
  }
})
