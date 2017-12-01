const { spawn } = require('child_process');
const server = require('../../build/test-server.js');
const mockServer = require('./mock-server');

server.ready.then(() => {
  mockServer.ready.then(() => {
    const runner = spawn('jest', [
      'test/e2e/tests',
      '--setupTestFrameworkScriptFile',
      "'<rootDir>/test/e2e/setup.js'",
    ], { stdio: 'inherit', shell: true });

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
