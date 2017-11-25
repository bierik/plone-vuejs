const path = require('path')

module.exports = {
  dev: {
    env: require('./dev.env'),
    port: 8090,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // proxy all requests starting with /api
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    cssSourceMap: false
  },
  test: {
    env: require('./test.env'),
    port: 9000,
    mockport: 3000,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // proxy all requests starting with /plone to mockserver
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    },
    cssSourceMap: false
  }
}
