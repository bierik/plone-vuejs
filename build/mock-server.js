const config = require('../config');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.test.env.NODE_ENV);
}

const express = require('express');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.test.mockport;
const app = express();

app.get('/api', function (req, res) {
  res.header("Content-Type", 'application/json');
  res.send(JSON.stringify({ '@type': 'Folder', title: 'title' }));
});

const uri = `http://localhost:${port}`;

let _resolve;
const readyPromise = new Promise((resolve) => {
  _resolve = resolve;
});

let server;

function listen() {
  console.log('> Starting mock server...');
  process.env.PORT = port;
  console.log(`> Listening at ${uri} \n`);
  server = app.listen(port);
  _resolve();
}

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  },
  listen,
};
