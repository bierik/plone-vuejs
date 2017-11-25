'use strict'
const utils = require('./utils')
const config = require('../config')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: config.dev.cssSourceMap,
    extract: false
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
