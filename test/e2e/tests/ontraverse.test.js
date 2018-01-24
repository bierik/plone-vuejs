describe('onTraverse hook', () => {
  test('onTraverse hook is called on component update', async () => {
    await page.goto('http://localhost:9000/#/document/@sharing');
    await page.waitForSelector('#sharing');

    const sharingText = await page.evaluate(() => document.querySelector('#sharing-content').textContent);
    assert.equal(sharingText, 'sharing');
  });
});
