
import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8080';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should add do something', async () => {
    await page.goto(baseUrl);
  });

  test('should determine paysystem', async () => {
    await page.goto(baseUrl);
    const input = await page.$('#card_number');
    await input.type('6011');

    await page.$('.discover:not(.inactive)');
    await page.$('.visa.inactive');
  });

  test('should check test luna', async () => {
    await page.goto(baseUrl);
    const input = await page.$('#card_number');
    const submit = await page.$('.submit');
    await input.type('5572427015897327');

    await submit.click();
    await page.$('.validation-success');
  });
});
