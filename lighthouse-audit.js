import * as lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import fs from 'fs';

const urls = [
  'http://localhost:5173/',
  'http://localhost:5173/about',
  'http://localhost:5173/services',
  'http://localhost:5173/projects',
  'http://localhost:5173/contact'
];

const run = async () => {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const opts = {port: chrome.port, output: 'html', onlyCategories: ['performance', 'accessibility', 'best-practices']};

  for (const url of urls) {
    const runnerResult = await lighthouse.default(url, opts);
    const page = url.split('/').filter(Boolean).pop() || 'home';
    fs.writeFileSync(`lighthouse-${page}.html`, runnerResult.report);
    console.log(`Lighthouse report for ${url} generated as lighthouse-${page}.html`);
  }
  await chrome.kill();
};

run(); 