const server = require('../../build/test-server.js');
const mockServer = require('./mock-server');
const { spawn } = require('child_process');
const spawnargs = require('spawn-args');

const opts = spawnargs('test test/e2e/tests/ --includes=test/e2e/setup.js');

server.ready.then(() => {
  mockServer.ready.then(() => {
    const runner = spawn('./node_modules/casperjs/bin/casperjs', opts, { stdio: 'inherit' });
    runner.on('exit', (code) => {
      server.close();
      process.exit(code);
    });
    runner.on('error', (err) => {
      server.close();
      throw err;
    });
  });
  mockServer.listen();
});
