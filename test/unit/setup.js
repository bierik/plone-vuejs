import Vue from 'vue';
import chai from 'chai';
import puppeteer from 'puppeteer';

Vue.config.productionTip = false;

chai.config.truncateThreshold = 0;
global.assert = chai.assert;

global.process.env = {
  NODE_ENV: 'test',
  API_ROOT: 'http://localhost:9000/',
  PLONE_ROOT: '/plone',
};

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
    args: [`--window-size=${width},${height}`],
  });
});

afterAll(() => {
  browser.close();
});
