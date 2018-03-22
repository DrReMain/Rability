#!/usr/bin/env node
if (process.env.NODE_ENV !== 'production') {
  if (
    !require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json$)/i,
    })
  ) {
    return
  }
}

require('babel-register')(require('../config/babelRegisterConf'))
require('../api/api')