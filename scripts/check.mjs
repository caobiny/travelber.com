import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
import {countryPages,countryData} from './country-pages.mjs';
const pages=[...fs.readdirSync('content').filter(n=>/^page-\d+\.json$/.test(n)).map(n=>JSON.parse(fs.readFileSync('content/'+n))),...countryPages];
const titles=new Set(),descs=new Set();let links=0;
for(const p of pages){
const file=path.join('dist',p.url.endsWith('.html')?p.url.slice(1):p.url.slice(1)+'index.html');
const h=fs.readFileSync(file,'utf8');assert.equal((h.match(/<h1[ >]/g)||[]).length,1,p.url+' H1');
assert(!titles.has(p.title));titles.add(p.title);assert(!descs.has(p.description));descs.add(p.description);
assert(h.includes('href="https://travelber.com'+p.url+'"'),p.url+' canonical');
assert(h.includes('<html lang="en">'));assert.equal(h.includes('content="noindex,follow"'),!!p.noindex);
for(const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(m[1]);
for(const m of h.matchAll(/(?:href|src)="([^"]+)"/g)){
const href=m[1];if(!href.startsWith('/')&&!href.startsWith('#'))continue;
const u=new URL(href,'https://travelber.com'+p.url);let target=path.join('dist',u.pathname);
if(u.pathname.endsWith('/'))target=path.join(target,'index.html');
assert(fs.existsSync(target),'Missing link '+href+' on '+p.url);
if(u.hash){const targetHtml=fs.readFileSync(target,'utf8');assert(targetHtml.includes('id="'+u.hash.slice(1)+'"'),'Missing anchor '+href)}
links++;
}
assert(!h.includes('source.unsplash')&&!h.includes('picsum.photos'));
if(!p.noindex)assert(fs.readFileSync('dist/sitemap.xml','utf8').includes('https://travelber.com'+p.url+'</loc>'));
}
assert.equal(pages.length,129);assert(!fs.existsSync('dist/data.js'),'Old site data remains');
assert.equal(new Set(pages.map(p=>p.url)).size,pages.length,'Duplicate route');
for(const c of countryData){
 assert.equal(c.cities.length,10,c.code+' cities');
 const collection=countryPages.filter(p=>p.country===c.slug);assert.equal(collection.length,16);
 for(const p of collection.filter(p=>p.article)){
  const h=fs.readFileSync(path.join('dist',p.url.slice(1),'index.html'),'utf8');
  const schema=JSON.parse(h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(schema.find(s=>s['@type']==='BreadcrumbList').itemListElement[1].name,c.name);
  assert(h.includes(c.tourism)&&h.includes(c.rail),'Missing official sources '+p.url);
 }
}
console.log('PASS: '+pages.length+' pages, '+links+' local links/anchors, unique metadata, single H1, JSON-LD, canonical URLs, sitemap and retired content.');

