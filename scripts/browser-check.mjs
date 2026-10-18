import {chromium} from 'playwright-core';
import fs from 'node:fs';import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const routes=['/','/destinations/netherlands/','/guides/','/guides/amsterdam-weekend/','/guides/where-to-stay-amsterdam/','/travel-tips/netherlands-public-transport/','/about/','/privacy/'];
fs.mkdirSync('.codex/qa',{recursive:true});
try{
for(const width of [390,768,1440]){
await page.setViewportSize({width,height:960});
for(const route of routes){
await page.goto('http://localhost:4173'+route);await page.waitForLoadState('networkidle');
assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Overflow '+width+' '+route);
assert(await page.locator('h1').count()===1);
for(const image of await page.locator('img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate(i=>i.decode());}
assert(await page.evaluate(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0)),'Broken image '+route);
}
await page.goto('http://localhost:4173/');for(const image of await page.locator('img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate(i=>i.decode());}await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'.codex/qa/home-'+width+'.png',fullPage:true});
if(width===390){await page.getByRole('button',{name:'Menu'}).click();assert(await page.locator('#navigation').isVisible());await page.keyboard.press('Escape');assert(await page.locator('#navigation').isHidden());}
}
await page.goto('http://localhost:4173/guides/');
await page.getByLabel('Find a guide').fill('transport');assert.equal(await page.locator('.guide-card:visible').count(),1);
await page.getByLabel('Find a guide').fill('no-such-guide');assert(await page.locator('#empty-search').isVisible());
await page.getByLabel('Find a guide').fill('');assert.equal(await page.locator('.guide-card:visible').count(),3);
await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:4173/guides/amsterdam-weekend/');await page.screenshot({path:'.codex/qa/article-mobile.png',fullPage:true});
const missing=await page.goto('http://localhost:4173/not-a-real-page/');assert.equal(missing.status(),404);
assert.deepEqual(errors,[]);
const nojs=await browser.newContext({javaScriptEnabled:false});const plain=await nojs.newPage();await plain.goto('http://localhost:4173/guides/amsterdam-weekend/');assert(await plain.locator('article').innerText());await nojs.close();
console.log('PASS: 24 responsive route checks, images, mobile menu, Escape, search/results/reset, 404, no-JS article, no page errors.');
}finally{await browser.close();}

