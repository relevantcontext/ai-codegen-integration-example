import fs from 'node:fs'; import http from 'node:http'; import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const dist = new URL('../../dist', import.meta.url).pathname;
const MIME = { '.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2' };
const server = http.createServer((req,res)=>{ const u=decodeURIComponent(new URL(req.url,'http://x').pathname); let f=path.join(dist,u); if(!(fs.existsSync(f)&&fs.statSync(f).isFile())){ if(path.extname(u)){res.writeHead(404);return res.end();} f=path.join(dist,'index.html'); } res.writeHead(200,{'Content-Type':MIME[path.extname(f)]??'application/octet-stream'}); fs.createReadStream(f).pipe(res); });
await new Promise(r=>server.listen(0,'127.0.0.1',r)); const origin=`http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch(); const page = await (await browser.newContext({viewport:{width:1280,height:800}})).newPage();
const errors=[]; page.on('pageerror',e=>errors.push('pageerror: '+e.message)); page.on('console',m=>m.type()==='error'&&errors.push('console: '+m.text()));
const out={};
await page.goto(origin+'/shop',{waitUntil:'networkidle'}); await page.waitForSelector('.product-tile[data-source="shopify"]');
out.title = await page.title();
out.acquireAria = await page.$eval('.product-tile[data-product-id="osmium-bead"] .product-acquire', b=>b.getAttribute('aria-label'));
out.srOnlyWas = await page.$eval('.product-tile.is-on-sale .product-price--was', s=>s.textContent.replace(/\s+/g,' ').trim());
// click Acquire: capture states over time
await page.$eval('.product-tile[data-product-id="osmium-bead"] .product-acquire', b=>b.click());
await page.waitForTimeout(150);
out.afterClick = await page.$eval('.product-tile[data-product-id="osmium-bead"]', t=>({cls:t.className,label:t.querySelector('.product-acquire__label').textContent,busy:t.querySelector('.product-acquire').getAttribute('aria-busy'),disabled:t.querySelector('.product-acquire').disabled}));
await page.waitForFunction(()=>document.querySelector('.product-tile[data-product-id="osmium-bead"]').classList.contains('is-added'),{timeout:8000}).catch(()=>{});
out.added = await page.$eval('.product-tile[data-product-id="osmium-bead"]', t=>({cls:t.className,label:t.querySelector('.product-acquire__label').textContent}));
await page.waitForTimeout(2000);
out.settled = await page.$eval('.product-tile[data-product-id="osmium-bead"]', t=>({cls:t.className,label:t.querySelector('.product-acquire__label').textContent,disabled:t.querySelector('.product-acquire').disabled}));
out.navBadge = await page.$eval('a.nav[data-page-id="cart"]', a=>({badge:a.querySelector('.nav-cart-count')?.textContent,hidden:a.querySelector('.nav-cart-count')?.hidden,aria:a.getAttribute('aria-label')}));
// second add (same variant) then go to cart in-app
await page.$eval('.product-tile[data-product-id="iridium-nugget"] .product-acquire', b=>b.click());
await page.waitForFunction(()=>document.querySelector('a.nav[data-page-id="cart"] .nav-cart-count')?.textContent==='2',{timeout:8000}).catch(()=>{});
await page.$eval('a.nav[data-page-id="cart"]', a=>a.click()); await page.waitForSelector('.cart-line',{timeout:8000});
const readCart = ()=>page.$$eval('.cart-line', ls=>ls.map(l=>({id:l.dataset.lineId.slice(-6),title:l.querySelector('.cart-line__title').textContent,qty:l.querySelector('.cart-line__qty-value').textContent,price:l.querySelector('.cart-line__price').textContent,decDisabled:l.querySelector('[data-line-action=decrement]').disabled,removeAria:l.querySelector('.cart-line__remove').getAttribute('aria-label')})));
out.cart1 = { lines: await readCart(), subtotal: await page.$eval('.cart-total__value',e=>e.textContent), badge: await page.$eval('.nav-cart-count',e=>e.textContent) };
// increment first line
await page.$eval('.cart-line [data-line-action=increment]', b=>b.click());
await page.waitForFunction(()=>document.querySelector('.cart-line .cart-line__qty-value')?.textContent==='2',{timeout:8000}).catch(()=>{});
out.cartAfterInc = { lines: await readCart(), subtotal: await page.$eval('.cart-total__value',e=>e.textContent), badge: await page.$eval('.nav-cart-count',e=>e.textContent) };
// decrement back
await page.$eval('.cart-line [data-line-action=decrement]', b=>b.click());
await page.waitForFunction(()=>document.querySelector('.cart-line .cart-line__qty-value')?.textContent==='1',{timeout:8000}).catch(()=>{});
out.cartAfterDec = { lines: await readCart(), badge: await page.$eval('.nav-cart-count',e=>e.textContent) };
// remove second line
const n0 = (await readCart()).length;
await page.$eval('.cart-line:last-child .cart-line__remove', b=>b.click());
await page.waitForFunction((n)=>document.querySelectorAll('.cart-line').length===n-1,{timeout:8000},n0).catch(()=>{});
out.cartAfterRemove = { lines: await readCart(), badge: await page.$eval('.nav-cart-count',e=>e.textContent), isEmpty: await page.$eval('.cart-view',v=>v.classList.contains('is-empty')) };
// remove last line -> empty state
await page.$eval('.cart-line .cart-line__remove', b=>b.click());
await page.waitForFunction(()=>document.querySelectorAll('.cart-line').length===0,{timeout:8000}).catch(()=>{});
out.cartEmpty = { lines: await readCart(), isEmpty: await page.$eval('.cart-view',v=>v.classList.contains('is-empty')), badgeHidden: await page.$eval('.nav-cart-count',e=>e.hidden), emptyTextVisible: await page.$eval('.cart-empty',e=>getComputedStyle(e).display) };
// contact page submit label bound
await page.goto(origin+'/about/contact',{waitUntil:'networkidle'});
out.contactSubmit = await page.$eval('.contact-us__form button[type=submit]', b=>b.textContent.trim());
out.footer = await page.$eval('footer, .footer-content', f=>f.innerText.replace(/\s+/g,' ').trim().slice(0,80));
out.errors = errors;
console.log(JSON.stringify(out,null,1));
await browser.close(); server.close();
