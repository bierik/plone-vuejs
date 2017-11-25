casper.test.begin('Test rendering of plone site component', (test) => {
  casper.start(casper.options.url, () => {
    test.assertHttpStatus(200, 'http status is 200');
  });

  casper.waitForSelector('#plone-site', () => {
    test.assertExists('#plone-site');
  });

  casper.run(() => {
    test.done();
  });
});

casper.test.begin('Test rendering of document component', (test) => {
  casper.start(`${casper.options.url}#/document`, () => {
    test.assertHttpStatus(200, 'http status is 200');
  });

  casper.waitForSelector('#document', () => {
    test.assertExists('#document');
  });

  casper.run(() => {
    test.done();
  });
});

casper.test.begin('Test rendering of news component', (test) => {
  casper.start(`${casper.options.url}#/news`, () => {
    test.assertHttpStatus(200, 'http status is 200');
  });

  casper.waitForSelector('#folder', () => {
    test.assertExists('#folder');
  });

  casper.run(() => {
    test.done();
  });
});

casper.test.begin('Test rendering of events component', (test) => {
  casper.start(`${casper.options.url}#/events`, () => {
    test.assertHttpStatus(200, 'http status is 200');
  });

  casper.waitForSelector('#folder', () => {
    test.assertExists('#folder');
  });

  casper.run(() => {
    test.done();
  });
});

casper.test.begin('Test rendering of news item component', (test) => {
  casper.start(`${casper.options.url}#/news/newsitem`, () => {
    test.assertHttpStatus(200, 'http status is 200');
  });

  casper.waitForSelector('#newsitem', () => {
    test.assertExists('#newsitem');
    casper.test.assertEquals(casper.getHTML('.title'), 'newsitem');
    casper.test.assertEquals(casper.getHTML('.description'), 'description of newsitem');
  });

  casper.run(() => {
    test.done();
  });
});

casper.test.begin('Test rendering of event component', (test) => {
  casper.start(`${casper.options.url}#/events/event`, () => {
    test.assertHttpStatus(200, 'http status is 200');
  });

  casper.waitForSelector('#event', () => {
    test.assertExists('#event');
    casper.test.assertEquals(casper.getHTML('.title'), 'event');
    casper.test.assertEquals(casper.getHTML('.description'), 'description of event');
  });

  casper.run(() => {
    test.done();
  });
});
