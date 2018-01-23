import puppeteer from 'puppeteer';
import '../setup';

global.page = {};
let browser;
const width = 1920;
const height = 1080;

beforeEach(async () => {
  global.page = await browser.newPage();
  await global.page.setViewport({ width, height });
});

afterEach(async () => {
  global.page.close();
});

beforeAll(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: [`--window-size=${width},${height}`, '--no-sandbox'],
  });
});

afterAll(() => {
  browser.close();
});
