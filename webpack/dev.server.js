import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import _debug from 'debug'

import webpackDevConfig from './dev.config'
import projectConfig from '../config'

const debug = _debug('app:webpack:dev:server')

new WebpackDevServer(webpack(webpackDevConfig), {
  publicPath: webpackDevConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  }
}).listen(projectConfig.WEBPACK_DEV_SERVER_PORT, 'localhost', (err) => {
  if (err) {
    debug(err)
  }

  debug(`Listening at localhost:${projectConfig.WEBPACK_DEV_SERVER_PORT}`)
})
