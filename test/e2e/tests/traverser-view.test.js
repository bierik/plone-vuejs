casper.test.begin('integration', (test) => {
  casper.start(casper.options.url, () => {
    test.assertHttpStatus(200, 'http status is 200');
  });

  casper.waitForSelector('#folder', () => {
    test.assertExists('#folder');
  });

  casper.run(() => {
    test.done();
  });
});
