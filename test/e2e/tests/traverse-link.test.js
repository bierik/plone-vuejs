casper.test.begin('Test traverse link component', (test) => {
  casper.start(casper.options.url, () => {
    test.assertHttpStatus(200, 'http status is 200');
  });

  casper.then(() => {
    casper.waitForSelector('#plone-site', () => {
      test.assertExists('#plone-site');
      test.assertExists('a.document');
      test.assertEquals(casper.getElementAttribute('a.document', 'href'), '/#/document');
    });
  });

  casper.thenClick('.news', () => {
    casper.waitForSelector('#folder', () => {
      test.assertExists('#folder');
    });
  });

  casper.thenClick('.newsitem', () => {
    casper.waitForSelector('#newsitem', () => {
      test.assertExists('#newsitem');
      casper.test.assertEquals(casper.getHTML('.title'), 'newsitem');
      casper.test.assertEquals(casper.getHTML('.description'), 'description of newsitem');
    });
  });

  casper.run(() => {
    test.done();
  });
});
