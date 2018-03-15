import React from 'react'
import { hydrate } from 'react-dom'

import './client.less'
import './client.scss'

hydrate(<h1>Hello world</h1>, document.getElementById('content'))

