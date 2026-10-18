import fs from 'node:fs';
import path from 'node:path';
const base='https://travelber.com';
const data=fs.readdirSync('content').filter(f=>/^page-\d+\.json$/.test(f)).sort().map(f=>JSON.parse(fs.readFileSync('content/'+f,'utf8')));
const esc=s=>s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const mark='<span class="mark" aria-hidden="true">↗</span>';
const logo='<a class="logo" href="/">'+mark+'Travelber<span class="dot">.</span></a>';
const links=[['Destinations','/destinations/'],['Weekend breaks','/guides/'],['Travel tips','/travel-tips/netherlands-public-transport/'],['About','/about/']];
for(const p of data){
 p.body=p.body.replace(/src="\/assets\/(amsterdam-canal|dutch-windmill)\.jpg"/g,(_,name)=>'src="/assets/'+name+'.jpg" srcset="/assets/'+name+'-small.jpg 720w, /assets/'+name+'.jpg '+(name==='amsterdam-canal'?1800:1200)+'w" sizes="(max-width: 700px) calc(100vw - 36px), (max-width: 1050px) 50vw, 700px"');
 const url=base+p.url;
 const schema=[{'@context':'https://schema.org','@type':'Organization','@id':base+'/#organization',name:'Travelber',url:base,email:'admin@travelber.com'}];
 if(p.url==='/')schema.push({'@context':'https://schema.org','@type':'WebSite',name:'Travelber',url:base,inLanguage:'en'});
 else if(!p.noindex)schema.push({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:base+'/'},{'@type':'ListItem',position:2,name:p.title,item:url}]});
 if(p.article)schema.push({'@context':'https://schema.org','@type':'Article',headline:p.title,description:p.description,datePublished:'2026-10-18T09:00:00+08:00',dateModified:'2026-10-18T09:00:00+08:00',inLanguage:'en',mainEntityOfPage:url,author:{'@type':'Organization',name:'Travelber Editorial',url:base+'/about/'},publisher:{'@id':base+'/#organization'},...(p.image?{image:[base+p.image]}:{})});
 const header='<a class="skip" href="#main">Skip to content</a><header class="header"><div class="nav-wrap">'+logo+'<button class="menu-toggle" aria-controls="navigation" aria-expanded="false">Menu ☰</button><nav id="navigation" aria-label="Main navigation">'+links.map(([label,href])=>'<a href="'+href+'"'+(p.url===href?' aria-current="page"':'')+'>'+label+'</a>').join('')+'</nav><a class="nav-cta" href="/guides/">Find your next escape ↗</a></div></header>';
 const footer='<footer><div class="footer-top wrap"><div>'+logo+'<p>European escapes,<br>thoughtfully planned.</p></div><div><h2>Explore</h2><a href="/destinations/">All destinations</a><a href="/destinations/netherlands/">The Netherlands</a><a href="/guides/">All guides</a><a href="/travel-tips/netherlands-public-transport/">Practical travel tips</a></div><div><h2>Travelber</h2><a href="/about/">About & editorial approach</a><a href="/privacy/">Privacy & cookies</a><a href="/about/#photography">Photo credits</a><a href="mailto:admin@travelber.com">Contact us</a></div></div><div class="footer-bottom wrap"><span>© 2026 Travelber</span><span>Independent guides. Not a booking service.</span><a href="#top">Back to top ↑</a></div></footer>';
 if(p.article){const crumb=schema.find(s=>s['@type']==='BreadcrumbList');crumb.itemListElement=[{'@type':'ListItem',position:1,name:'Home',item:base+'/'},{'@type':'ListItem',position:2,name:'The Netherlands',item:base+'/destinations/netherlands/'},{'@type':'ListItem',position:3,name:p.title,item:url}];}
 const photo=base+(p.image||'/assets/amsterdam-canal.jpg');
 const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+esc(p.title)+' | Travelber</title><meta name="description" content="'+esc(p.description)+'"><meta name="robots" content="'+(p.noindex?'noindex,follow':'index,follow,max-image-preview:large')+'"><link rel="canonical" href="'+url+'"><meta name="theme-color" content="#153a43"><meta property="og:site_name" content="Travelber"><meta property="og:type" content="'+(p.article?'article':'website')+'"><meta property="og:title" content="'+esc(p.title)+'"><meta property="og:description" content="'+esc(p.description)+'"><meta property="og:url" content="'+url+'"><meta property="og:image" content="'+photo+'"><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/svg+xml" href="/assets/favicon.svg"><link rel="stylesheet" href="/assets/site.css"><script defer src="/assets/site.js"></script><script type="application/ld+json">'+JSON.stringify(schema).replaceAll('<','\\u003c')+'</script></head><body id="top">'+header+'<main id="main">'+p.body+'</main>'+footer+'</body></html>';
 const file=path.join('dist',p.url.endsWith('.html')?p.url.slice(1):p.url.slice(1)+'index.html');
 fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,html);
}
fs.cpSync('assets','dist/assets',{recursive:true});
fs.writeFileSync('dist/robots.txt','User-agent: *\nAllow: /\nSitemap: '+base+'/sitemap.xml\n');
fs.writeFileSync('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+data.filter(p=>!p.noindex).map(p=>'<url><loc>'+base+p.url+'</loc><lastmod>2026-10-18</lastmod></url>').join('')+'</urlset>');
fs.writeFileSync('dist/_headers','/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: DENY\n');
fs.copyFileSync('dist/index.html','index.html');
fs.copyFileSync('dist/robots.txt','robots.txt');
console.log('Built '+data.length+' static pages.');

