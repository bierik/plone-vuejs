describe('Traverser view', () => {
  test('Plone Site', async () => {
    await page.goto('http://localhost:9000/');
    await page.waitForSelector('#plone-site');
    const title = await page.evaluate(() => document.querySelector('h1').textContent);
    assert.equal(title, 'plone site');
  });

  test('Document', async () => {
    await page.goto('http://localhost:9000/#/document');
    await page.waitForSelector('#document');
    const title = await page.evaluate(() => document.querySelector('h1').textContent);
    assert.equal(title, 'document');
  });

  test('News', async () => {
    await page.goto('http://localhost:9000/#/news');
    await page.waitForSelector('#folder');
    const title = await page.evaluate(() => document.querySelector('h1').textContent);
    assert.equal(title, 'news');
  });

  test('Events', async () => {
    await page.goto('http://localhost:9000/#/events');
    await page.waitForSelector('#folder');
    const title = await page.evaluate(() => document.querySelector('h1').textContent);
    assert.equal(title, 'events');
  });

  test('Newsitem', async () => {
    await page.goto('http://localhost:9000/#/news/newsitem');
    await page.waitForSelector('#newsitem');
    const title = await page.evaluate(() => document.querySelector('h1').textContent);
    assert.equal(title, 'News Item');

    const newsTitle = await page.evaluate(() => document.querySelector('.title').textContent);
    const newsDescription = await page.evaluate(() => document.querySelector('.description').textContent);
    assert.equal(newsTitle, 'newsitem');
    assert.equal(newsDescription, 'description of newsitem');
  });

  test('Eventitem', async () => {
    await page.goto('http://localhost:9000/#/events/event');
    await page.waitForSelector('#event');
    const title = await page.evaluate(() => document.querySelector('h1').textContent);
    assert.equal(title, 'Event Item');

    const newsTitle = await page.evaluate(() => document.querySelector('.title').textContent);
    const newsDescription = await page.evaluate(() => document.querySelector('.description').textContent);
    assert.equal(newsTitle, 'event');
    assert.equal(newsDescription, 'description of event');
  });
});
