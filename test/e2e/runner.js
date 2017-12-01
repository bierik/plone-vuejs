const server = require('../../build/test-server.js');
const mockServer = require('./mock-server');
const { spawn } = require('child_process');
const spawnargs = require('spawn-args');

const opts = spawnargs('test/e2e/tests');

server.ready.then(() => {
  mockServer.ready.then(() => {
    const runner = spawn('jest', opts, { stdio: 'inherit' });
    runner.on('exit', (code) => {
      server.close();
      process.exit(code);
    });
    runner.on('error', (err) => {
      server.close();
      throw err;
    });
  });
});
