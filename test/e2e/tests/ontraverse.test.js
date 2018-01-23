describe('onTraverse hook', () => {
  test('onTraverse hook is called on component update', async () => {
    await page.goto('http://localhost:9000/#/document');
    await page.waitForSelector('#document');

    const sharingText = await page.evaluate(() => document.querySelector('#sharing').textContent);
    assert.equal(sharingText, 'sharing');
  });
});
