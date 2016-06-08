import webpack from 'webpack'
import path from 'path'
import _debug from 'debug'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import projectConfig, { paths } from '../config'

const debug = _debug('app:webpack:config:dev')
const srcDev = paths('dev')
const {
  VENDOR_DEPENDENCIES,
  WEBPACK_DEV_SERVER_PORT,
  __CLIENT__,
  __SERVER__,
  __DEV__,
  __PROD__,
  __TEST__
} = projectConfig

debug('Create configuration.')
const webpackConfig = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      `webpack-dev-server/client?http://localhost:${WEBPACK_DEV_SERVER_PORT}`,
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      paths('entryAppDev')
    ],
    vendors: VENDOR_DEPENDENCIES
  },
  output: {
    path: '/',
    filename: '[name]-[hash].js',
    publicPath: `http://localhost:${WEBPACK_DEV_SERVER_PORT}/`
  },
  resolve: {
    root: [srcDev],
    extensions: ['', '.js', '.jsx']
  },
  module: {
    preLoaders: [
      {
        test: /\.js[x]?$/,
        loader: 'eslint',
        include: [srcDev]
      }
    ],
    loaders: [
      {
        test: /\.js[x]?$/,
        include: [srcDev],
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__,
      __SERVER__,
      __DEV__,
      __PROD__
    })
  ]
}

if (!__TEST__) {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      title: 'React Video',
      hash: true,
      inject: 'body',
      template: path.resolve(srcDev, 'index.tpl.html')
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendors', '[name].[hash].js'),
    new webpack.optimize.DedupePlugin()
  )
}


export default webpackConfig
