casper.options.apiroot = '/';
casper.options.url = 'http://localhost:9000/';

casper.on('started', function() {
  this.page.customHeaders = {
    'Cache-Control': 'no-cache',
  };
});

// Bypass all `console.log` statements
casper.on('remote.message', (msg) => {
  casper.echo(msg);
});

// casper.on('resource.requested', (requestData) => {
//   casper.echo(JSON.stringify(requestData));
// });
