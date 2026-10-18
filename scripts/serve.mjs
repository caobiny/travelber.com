import http from 'node:http';import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('dist');const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.jpg':'image/jpeg','.xml':'application/xml','.txt':'text/plain'};
http.createServer((req,res)=>{let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}
let f=path.resolve(root,'.'+pathname);if(!f.startsWith(root+path.sep)&&f!==root){res.writeHead(403).end();return}
if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');
let status=200;if(!fs.existsSync(f)){f=path.join(root,'404.html');status=404}
res.writeHead(status,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(res)}).listen(4173,'127.0.0.1',()=>console.log('Local: http://localhost:4173'));

