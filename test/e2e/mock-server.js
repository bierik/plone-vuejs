const mockServer = require('node-mock-server');
const config = require('../../config');
const path = require('path');

const port = config.test.mockport;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = config.test.env.NODE_ENV;
}

let _resolve;
const readyPromise = new Promise((resolve) => {
  _resolve = resolve;
});

mockServer({
  dirName: __dirname,
  restPath: path.join(__dirname, 'mocks'),
  urlBase: `http://localhost:${port}/`,
  open: false,
  port,
  urlPath: '/api',
  onServerStarted: _resolve,
});

module.exports = {
  ready: readyPromise,
};
