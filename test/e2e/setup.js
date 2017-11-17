casper.options.apiroot = '/api';
casper.options.url = 'http://localhost:8080/';

casper.on('remote.message', (msg) => {
  casper.echo(msg);
});

// casper.on('resource.requested', (requestData) => {
//   casper.echo(JSON.stringify(requestData));
// });

// casper.on('resource.received', (resource) => {
//   casper.echo(JSON.stringify(resource));
// });
