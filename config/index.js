import path from 'path'

const NODE_ENV = process.env.NODE_ENV || 'development'

const config = {

  // Environment
  __CLIENT__: true,
  __SERVER__: false,
  __DEV__: NODE_ENV === 'development',
  __PROD__: NODE_ENV === 'production',

  // Webpack Configuration
  WEBPACK_DEV_SERVER_PORT: 3000,
  VENDOR_DEPENDENCIES: [
    'react',
    'react-dom',
    'classnames'
  ],

  // Project Structure
  PATH_BASE: path.resolve(__dirname, '../'),
  ENTRY_APP: 'index',
  DIR_SRC: 'src',
  DIR_DEV: 'dev',
  DIR_BUILD: 'build',
  DIR_NODE_MODULES: 'node_modules'
}

const paths = (dir = 'base') => {
  const resolve = path.resolve
  const base = (...args) => (
    resolve.apply(resolve, [config.PATH_BASE, ...args])
  )
  const _paths = {
    base: base(),
    entryAppDev: base(config.DIR_DEV, config.ENTRY_APP),
    src: base(config.DIR_SRC),
    dev: base(config.DIR_DEV),
    build: base(config.DIR_BUILD),
    nodeModules: base(config.DIR_NODE_MODULES)
  }

  return _paths[dir]
}

export { config as default, paths }
