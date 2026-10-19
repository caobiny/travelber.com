import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {countryData} from './country-pages.mjs';
const origin=process.env.PREVIEW_ORIGIN || 'http://127.0.0.1:4173';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();
const errors=[];page.on('pageerror',error=>errors.push(error.message));
let checks=0;
try {
 for(const width of [390,1440]){
  await page.setViewportSize({width,height:960});
  for(const c of countryData){
   for(const route of [`/destinations/${c.slug}/`,`/destinations/${c.slug}/cities/`,`/destinations/${c.slug}/cities/${c.cities[0].slug}/`,`/guides/${c.slug}-planning/`,`/travel-tips/${c.slug}-public-transport/`]){
    const response=await page.goto(origin+route);assert.equal(response.status(),200,route);
    await page.waitForLoadState('networkidle');
    assert.equal(await page.locator('h1').count(),1);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow ${width} ${route}`);
    checks++;
   }
   await page.goto(origin+`/destinations/${c.slug}/`);
   assert.equal(await page.locator('.country-grid .country-card').count(),10);
  }
 }
 await page.goto(origin+'/guides/');
 await page.getByLabel('Find a guide').fill('France');
 assert.equal(await page.locator('[data-search]:visible').count(),4);
 await page.getByLabel('Find a guide').fill('no-such-guide');
 assert(await page.locator('#empty-search').isVisible());
 await page.getByLabel('Find a guide').fill('');
 assert.equal(await page.locator('[data-search]:visible').count(),27);
 await page.goto(origin+'/destinations/');
 assert.equal(await page.locator('section.country-grid > a').count(),8);
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'Menu'}).click();
 assert(await page.locator('#navigation').isVisible());
 for(const c of countryData)assert.equal(await page.locator(`.nav-dropdown-menu a[href="/destinations/${c.slug}/"]`).count(),1);
 await page.keyboard.press('Escape');assert(await page.locator('#navigation').isHidden());
 fs.mkdirSync('.codex/qa',{recursive:true});
 await page.goto(origin+'/destinations/france/');await page.screenshot({path:'.codex/qa/france-mobile.png',fullPage:true});
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'.codex/qa/france-desktop.png',fullPage:true});
 const context=await browser.newContext({javaScriptEnabled:false});const plain=await context.newPage();
 await plain.goto(origin+'/destinations/switzerland/cities/');assert.equal(await plain.locator('.country-grid a').count(),10);await context.close();
 assert.deepEqual(errors,[]);
 console.log(`PASS: ${checks} responsive route checks, six ten-city grids, eight country links, country search, mobile navigation, no-JS access.`);
}finally{await browser.close();}
