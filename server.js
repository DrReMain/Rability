const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const favicon = require('serve-favicon')
const serverRender = require('./dist/server')

const isDev = process.env.NODE_ENV === 'development'

const LISTEN_PORT = process.env.PORT || (isDev ? 3000 : 8300)

const app = express()
app.use(express.static(path.join(__dirname, 'dist')))
if (isDev) {
  const config = require('./config/webpack.dev.client.conf')
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    hot: true,
    inline: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
    },
  }))
  app.use(webpackHotMiddleware(compiler))
}
else {
  app.use(favicon(path.join(__dirname, 'dist', 'favicon.ico')))
  app.set('views', path.join(__dirname, 'dist'))
  app.set('view engine', 'ejs')
}

app.get('*', function(req, res, next) {
  serverRender.default(req, res)
})

app.listen(LISTEN_PORT, function(err) {
  if (err) console.log(err)
  console.log(
    '==> 🌎  Server is running on port %s. Open up http://localhost:%s/ in your browser.',
    LISTEN_PORT,
    LISTEN_PORT,
  )
})