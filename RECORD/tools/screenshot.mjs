// RECORD tooling — stage screenshots + route smoke test. Not app code.
//
//   node RECORD/tools/screenshot.mjs <stage>        e.g. A0
//
// 1. `npm run build` (production: dev-tools.js — CMS + Behavior Console — never loads,
//    so every capture shows the app as a visitor sees it; no app code is touched).
// 2. Serves dist/ with a history fallback on an ephemeral port.
// 3. Reads the routes from the nav the app renders from its ROUTE-channel navLinks
//    (nothing is hard-coded), captures each full-page at a 1280x800 viewport into
//    RECORD/screenshots/<stage>/, named from the href: / -> home.png,
//    /about/contact -> about-contact.png.
// 4. Smoke test: every route must load with no console errors, page errors, or failed
//    requests. Result goes to RECORD/verification/<stage>/route-smoke.json; exit 1 on
//    any failure.

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const stage = process.argv[2];
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

console.log('> npm run build');
execSync('npm run build', { cwd: root, stdio: 'inherit' });

fs.mkdirSync(shotDir, { recursive: true });
fs.mkdirSync(verifyDir, { recursive: true });

const server = await serve();
const origin = `http://127.0.0.1:${server.address().port}`;
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

await browser.close();
server.close();

const ok = results.every((r) => r.ok);
fs.writeFileSync(
  path.join(verifyDir, 'route-smoke.json'),
  JSON.stringify({ stage, viewport: VIEWPORT, build: 'production (dist/)', ok, routes: results }, null, 2) + '\n',
);
process.exit(ok ? 0 : 1);
