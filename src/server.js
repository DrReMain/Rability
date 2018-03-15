import fs from 'fs'
import path from 'path'
import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import morgan from 'morgan'
import favicon from 'serve-favicon'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import httpProxy from 'http-proxy'
import PrettyError from 'pretty-error'
import http from 'http'
// import { StaticRouter } from 'react-router'
// import { ConnectedRouter } from 'react-router-redux'
// import { renderRoutes } from 'react-router-config'
// import createMemoryHistory from 'history/createMemoryHistory'
// import Loadable from 'react-loadable'
// import { getBundles } from 'react-loadable/webpack'
import { trigger } from 'redial'
import config from 'config'
// import createStore from 'redux/create'
// import apiClient from 'helpers/apiClient'
// import Html from 'helpers/Html'
// import routes from 'routes'
// import { createApp } from 'app'
// import getChunks, { waitChunks } from 'utils/getChunks'
// import asyncMatchRoutes from 'utils/asyncMatchRoutes'
// import { ReduxAsyncConnect, Provider } from 'components'

const chunkPath = path.join(__dirname, '..', 'static', 'dist', 'loadable-chunks.json')

process.on('unhandleRejection', error => console.error(error))


