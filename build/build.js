require('./check-versions')();

const path = require('path')
const webpack = require('webpack');

webpack({
  context: path.resolve(__dirname, '../'),
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'plone-vue.js',
    library: 'plone-vue',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  },
});
