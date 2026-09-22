// RECORD tooling — stage screenshots + route smoke test. Not app code.
//
//   node RECORD/tools/screenshot.mjs <stage>            e.g. A0
//   node RECORD/tools/screenshot.mjs <stage> --console  Behavior Console capture (A3+)
//   node RECORD/tools/screenshot.mjs <stage> --url <origin>  same captures + smoke against a
//                                                       deployed site (no build, no local server)
//
// 1. `npm run build` (production: dev-tools.js — CMS + Behavior Console — never loads,
//    so every capture shows the app as a visitor sees it; no app code is touched).
// 2. Serves dist/ with a history fallback on an ephemeral port.
// 3. Reads the routes from the nav the app renders from its ROUTE-channel navLinks
//    (nothing is hard-coded), captures each full-page at a 1280x800 viewport into
//    RECORD/screenshots/<stage>/, named from the href: / -> home.png,
//    /about/contact -> about-contact.png.
// 4. Smoke test: every route must load with no console errors, page errors, or failed
//    requests — first as a full page load per route, then as ONE session that walks
//    every nav link in-app (route swaps, replayed channels, views born late), which is
//    where lifecycle faults hide. Result goes to RECORD/verification/<stage>/
//    route-smoke.json; exit 1 on any failure.
//
// --console (option (a), ruled at A3): builds in DEVELOPMENT mode so dev-tools.js
// loads, serves it, removes the CMS panel from the page (nothing else), drives the
// shop page — pick a metal filter, click Acquire — and captures the Behavior Console
// after each: behavior-console-filter.png and behavior-console.png. The console's
// visible payload text is saved beside them. Run this BEFORE the production capture
// (it leaves a development build in dist/).

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const stage = process.argv[2];
const consoleMode = process.argv.includes('--console');
const urlFlag = process.argv.indexOf('--url');
const remoteOrigin = urlFlag > -1 ? process.argv[urlFlag + 1]?.replace(/\/$/, '') : null;
if (!stage) {
  console.error('usage: node RECORD/tools/screenshot.mjs <stage>');
  process.exit(2);
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const dist = path.join(root, 'dist');
const shotDir = path.join(root, 'RECORD/screenshots', stage);
const verifyDir = path.join(root, 'RECORD/verification', stage);
const VIEWPORT = { width: 1280, height: 800 };

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.ico': 'image/x-icon',
};

const serve = () =>
  new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let file = path.join(dist, urlPath);
      if (!file.startsWith(dist)) file = dist;
      const isFile = fs.existsSync(file) && fs.statSync(file).isFile();
      // history fallback: extension-less paths are app routes
      if (!isFile) {
        if (path.extname(urlPath)) {
          res.writeHead(404);
          return res.end();
        }
        file = path.join(dist, 'index.html');
      }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });

const nameFor = (href) => {
  const slug = href.replace(/^\/+|\/+$/g, '').replace(/[/?&=]+/g, '-');
  return `${slug || 'home'}.png`;
};

const watch = (page, errors) => {
  page.on('console', (m) => m.type() === 'error' && errors.push(`console: ${m.text()}`));
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => errors.push(`requestfailed: ${r.url()}`));
  page.on('response', (r) => r.status() >= 400 && errors.push(`http ${r.status()}: ${r.url()}`));
};

if (remoteOrigin) {
  console.log(`> remote: ${remoteOrigin} (no build)`);
} else if (consoleMode) {
  console.log('> development build (dev tools on)');
  execSync('npx webpack --mode development --env build', {
    cwd: root, stdio: 'inherit', env: { ...process.env, NODE_ENV: 'development' },
  });
} else {
  console.log('> npm run build');
  execSync('npm run build', { cwd: root, stdio: 'inherit' });
}

fs.mkdirSync(shotDir, { recursive: true });
fs.mkdirSync(verifyDir, { recursive: true });

const server = remoteOrigin ? { close() {} } : await serve();
const origin = remoteOrigin ?? `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: VIEWPORT, colorScheme: 'light' });

// discover routes from the rendered nav (the DOM projection of navLinks)
const probe = await context.newPage();
await probe.goto(origin, { waitUntil: 'networkidle' });
const hrefs = await probe.evaluate(() => {
  const internal = [...document.querySelectorAll('nav a[href], header a[href], aside a[href]')]
    .map((a) => new URL(a.getAttribute('href'), location.origin))
    .filter((u) => u.origin === location.origin)
    .map((u) => u.pathname + u.search);
  return [...new Set(internal)];
});
await probe.close();
if (!hrefs.includes('/')) hrefs.unshift('/');

if (consoleMode) {
  const page = await context.newPage();
  const errors = [];
  watch(page, errors);
  await page.goto(`${origin}/shop`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.product-tile[data-source="shopify"]', { timeout: 15000 });

  // the CMS panel is the one development plugin that is not part of the receipt;
  // its body class narrows the page, so it goes too. The console panel is
  // enlarged for legibility — a capture-time size, nothing in the app.
  await page.evaluate(() => {
    document.querySelector('#spyne-plugin-json-cms')?.remove();
    document.body.classList.remove('spyne-plugin-cms-mode');
    const panel = document.querySelector('#spyne-plugin-console > div');
    if (panel) { panel.style.width = '640px'; panel.style.height = '780px'; }
  });
  await page.waitForTimeout(500);

  const showTab = (name) =>
    page.evaluate((label) => {
      const tab = [...document.querySelectorAll('#spyne-plugin-console p')]
        .find((p) => p.textContent.trim() === label);
      tab?.click();
      return Boolean(tab);
    }, name);
  const consoleText = () =>
    page.evaluate(() => document.querySelector('#spyne-plugin-console')?.innerText ?? '');
  const notes = [];
  const capture = async (tab, file, note) => {
    await showTab(tab);
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(shotDir, file) });
    notes.push(`# ${note} — console tab ${tab} -> ${file}\n\n${await consoleText()}\n\n`);
  };

  // 1. the filter: UI event in, domain event out
  await page.selectOption('.products-filter__select[data-filter-key="metal"]', { index: 1 });
  await page.waitForTimeout(800);
  await capture('UI', 'behavior-console-filter-ui.png', 'after selecting the first metal option');
  await capture('SHOPIFY', 'behavior-console-filter.png', 'after selecting the first metal option');

  // 2. add-to-cart: UI event in, cart event out (the click is dispatched in
  //    page — the console panel overlaps the grid in this viewport)
  await page.$eval('.product-tile:not(.is-filtered-out) .product-acquire', (btn) => btn.click());
  await page.waitForTimeout(3500);
  await capture('UI', 'behavior-console-acquire-ui.png', 'after clicking Acquire on the visible tile');
  await capture('CART', 'behavior-console.png', 'after clicking Acquire on the visible tile');

  fs.writeFileSync(path.join(verifyDir, 'behavior-console.txt'), notes.join(''));
  console.log(`ok    console captures -> ${fs.readdirSync(shotDir).filter((f) => f.startsWith('behavior-console')).join(', ')}${errors.length ? ` (page errors: ${errors.length})` : ''}`);
  await page.close();
  await browser.close();
  server.close();
  process.exit(0);
}

const results = [];
for (const href of hrefs) {
  const errors = [];
  const page = await context.newPage();
  watch(page, errors);
  await page.goto(origin + href, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const file = nameFor(href);
  await page.screenshot({ path: path.join(shotDir, file), fullPage: true });
  const title = await page.title();
  await page.close();
  results.push({ href, file, title, ok: errors.length === 0, errors });
  console.log(`${errors.length ? 'FAIL' : 'ok  '}  ${href} -> ${file}`);
}

// in-app navigation pass: one page, every nav link clicked in order, twice
const navErrors = [];
const navPage = await context.newPage();
watch(navPage, navErrors);
await navPage.goto(origin, { waitUntil: 'networkidle' });
const walked = [];
for (let round = 0; round < 2; round += 1) {
  for (const href of hrefs.filter((h) => h !== '/')) {
    const clicked = await navPage.evaluate((target) => {
      const a = [...document.querySelectorAll('nav a[href], header a[href], aside a[href]')]
        .find((el) => new URL(el.getAttribute('href'), location.origin).pathname === target);
      a?.click();
      return Boolean(a);
    }, href);
    await navPage.waitForTimeout(1500);
    walked.push({ round: round + 1, href, clicked, landed: await navPage.evaluate(() => location.pathname) });
  }
}
await navPage.close();
const inApp = { ok: navErrors.length === 0, walked, errors: navErrors };
console.log(`${inApp.ok ? 'ok  ' : 'FAIL'}  in-app navigation (${walked.length} clicks)${navErrors.length ? `: ${navErrors[0]}` : ''}`);

await browser.close();
server.close();

const ok = results.every((r) => r.ok) && inApp.ok;
fs.writeFileSync(
  path.join(verifyDir, 'route-smoke.json'),
  JSON.stringify({ stage, viewport: VIEWPORT, build: remoteOrigin ? `remote ${remoteOrigin}` : 'production (dist/)', ok, routes: results, inAppNavigation: inApp }, null, 2) + '\n',
);
process.exit(ok ? 0 : 1);
