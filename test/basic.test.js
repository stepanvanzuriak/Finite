const puppeteer = require('puppeteer');
const httpServer = require('http-server');
const fs = require('fs');
const path = require('path');

fs.copyFileSync(
  path.resolve(__dirname, '../dist/finite.js'),
  path.resolve(__dirname, './finite.js'),
);

let browser;
let page;
const server = httpServer.createServer({ root: __dirname });
server.listen(8080);

beforeAll(async () => {
  browser = await puppeteer.launch({
    args: ['--no-sandbox'],
  });
}, 20000);

afterAll(() => {
  server.close();
  browser.close();
}, 20000);

test('basic page', async () => {
  page = await browser.newPage();
  await page.goto('http://localhost:8080/test.html');

  let html = await page.$eval('.test', (e) => e.innerHTML);
  expect(html).toBe('Hello!');
}, 20000);

test('on click', async () => {
  page = await browser.newPage();
  await page.goto('http://localhost:8080/onclick.html');
  await page.click('#inc');
  let html = await page.$eval('#count', (e) => e.innerHTML);
  expect(html).toBe('1');
}, 20000);
