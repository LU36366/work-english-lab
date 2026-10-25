const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.md':'text/plain; charset=utf-8','.json':'application/json; charset=utf-8','.wav':'audio/wav','.mp3':'audio/mpeg','.ogg':'audio/ogg','.m4a':'audio/mp4'};
http.createServer((req,res)=>{
 try{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
  fs.stat(file,(err,stat)=>{
   if(err||!stat.isFile()){res.writeHead(404);res.end('Not found');return;}
   const headers={'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','Accept-Ranges':'bytes'};
   let start=0,end=stat.size-1,status=200;
   if(req.headers.range){
    const m=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
    if(!m||(!m[1]&&!m[2])){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}
    if(m[1]){start=Number(m[1]);end=m[2]?Math.min(Number(m[2]),end):end;}else{start=Math.max(0,stat.size-Number(m[2]));}
    if(start>end||start>=stat.size){res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});res.end();return;}
    headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;status=206;
   }
   headers['Content-Length']=Math.max(0,end-start+1);res.writeHead(status,headers);
   if(req.method==='HEAD'||stat.size===0){res.end();return;}
   const stream=fs.createReadStream(file,{start,end});stream.on('error',()=>res.destroy());stream.pipe(res);
  });
 }catch{res.writeHead(400);res.end('Bad request');}
}).listen(4387,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4387'));
