import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'

const rootEl = document.getElementById('root')

render(<AppContainer><App /></AppContainer>, rootEl)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default // eslint-disable-line
    render(<AppContainer><NextApp /></AppContainer>, rootEl)
  })
}

