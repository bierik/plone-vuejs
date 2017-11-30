describe('Traverser link', () => {
  test('Target of traverser link', async () => {
    await page.goto('http://localhost:9000/');
    await page.waitForSelector('#plone-site');

    assert.isDefined(await page.evaluate(() => document.querySelector('.news').textContent));

    const documentLink = await page.evaluate(() => document.querySelector('.news').getAttribute('href'));
    assert.equal(documentLink, '/#/news');
  });

  test('Traverser link goes to the page', async () => {
    await page.goto('http://localhost:9000/');
    await page.waitForSelector('#plone-site');

    await page.click('.news');
    await page.waitForSelector('#folder');
    assert.equal(await page.evaluate(() => document.location.href), 'http://localhost:9000/#/news');

    await page.click('.newsitem');
    await page.waitForSelector('#newsitem');
    assert.equal(await page.evaluate(() => document.location.href), 'http://localhost:9000/#/news/newsitem');
  });
});
