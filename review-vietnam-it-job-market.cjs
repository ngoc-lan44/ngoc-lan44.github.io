const fs=require('fs'),path=require('path');
const modules=path.resolve(path.dirname(process.execPath),'../node_modules');
const {marked}=require(path.join(modules,'marked'));
const pages=JSON.parse(fs.readFileSync('content-manifest.json','utf8'));
pages.sort((a,b)=>{
 const keys=p=>p.slug?p.slug.split('/').flatMap(s=>s.match(/^[\d.]+/)[0].split('.').map(Number)):[];
 const x=keys(a),y=keys(b);for(let i=0;i<Math.min(x.length,y.length);i++)if(x[i]!==y[i])return x[i]-y[i];return x.length-y.length;
});
const ids=new Map(pages.map((p,i)=>[p.slug.toLowerCase(),`p${i}`]));
const svg=fs.readFileSync('static/images/vietnam-it-job-market-architecture.svg').toString('base64');
const svgEn=fs.readFileSync('static/images/vietnam-it-job-market-architecture.en.svg').toString('base64');
const failures=[]; let totalLinks=0;
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const articles=pages.map((p,i)=>{
 const file=path.join('content',p.slug,'_index.vi.md');
 const md=fs.readFileSync(file,'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'');
 let html=marked.parse(md);
 html=html.replace(/href="([^"]+)"/g,(all,target)=>{
  if (/^(https?:|#|mailto:|tel:)/.test(target))return all;
  totalLinks++;
  const absolute=path.posix.normalize(path.posix.join(p.slug,target)).replace(/\/$/,'');
  const slug=absolute==='.'?'':absolute;
  const id=ids.get(slug.toLowerCase());
  if(!id){failures.push(`${file}: ${target}`);return all;}
  return `href="#${id}"`;
 });
 html=html.replaceAll('src="/images/vietnam-it-job-market-architecture.svg"',`src="data:image/svg+xml;base64,${svg}"`);
 html=html.replaceAll('src="/images/vietnam-it-job-market-architecture.en.svg"',`src="data:image/svg+xml;base64,${svgEn}"`);
 html=html.replaceAll('src="/images/tran-hai-luong.png"',`src="data:image/png;base64,${fs.readFileSync('static/images/tran-hai-luong.png').toString('base64')}"`);
 if(fs.existsSync('static/images/vietnam-it-job-market-architecture-proposal.png'))html=html.replaceAll('src="/images/vietnam-it-job-market-architecture-proposal.png"',`src="data:image/png;base64,${fs.readFileSync('static/images/vietnam-it-job-market-architecture-proposal.png').toString('base64')}"`);
 html=html.replace(/<table>/g,'<div class="table-wrap"><table>').replace(/<\/table>/g,'</table></div>');
 return `<article id="p${i}">${html}</article>`;
}).join('\n');
const nav=pages.map((p,i)=>`<li class="dd-item"><a href="#p${i}">${esc(p.title)}</a></li>`).join('');
/* Legacy preview CSS is retained as source history only; rendered output uses the original theme below. */
const legacyHtml=`<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>CloudDocs · Xem nội dung báo cáo</title><style>
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#f3f6fb;color:#23394c;font:16px/1.7 'Segoe UI',Arial,sans-serif}aside{position:fixed;inset:0 auto 0 0;width:285px;background:#152a43;color:white;padding:28px 18px;overflow:auto}aside strong{display:block;font-size:25px;color:#fff}aside small{display:block;color:#b5c5dc;margin:6px 0 24px}nav a{display:block;color:#dce7f5;text-decoration:none;font-size:14px;line-height:1.45;padding:10px;border-radius:6px}nav a:hover{background:#294763}nav a.child{font-size:13px;padding-left:22px;color:#bdcee3}main{margin-left:285px;padding:42px 52px 80px;max-width:1500px}header{padding:0 0 30px}header h1{font-size:36px;margin:0;color:#142e4b}header p{margin:8px 0;color:#627489}.badge{display:inline-block;background:#dfeaf9;color:#254b77;font-size:13px;padding:4px 12px;border-radius:20px}article{scroll-margin-top:24px;background:white;border:1px solid #dbe3ee;border-radius:12px;padding:36px;margin-bottom:30px;box-shadow:0 5px 18px #19365706}article h1{font-size:29px;line-height:1.3;color:#142f50}h2{font-size:23px;color:#183d64;margin-top:30px}h3{font-size:20px;color:#183d64;margin-top:30px}.section-label{font-size:12px;color:#617d9c;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #e3eaf2;padding-bottom:12px;margin-bottom:24px}p,li{max-width:100%}a{color:#1263a3}blockquote{margin:22px 0;border-left:4px solid #d5a146;background:#fff8e9;padding:10px 18px;color:#5e4a2d}blockquote p{margin:5px 0}.table-wrap{overflow:auto;margin:22px 0}table{border-collapse:collapse;width:100%;font-size:14px;line-height:1.6}th{text-align:left;background:#edf3fb;color:#183d64}td,th{padding:11px 13px;border:1px solid #dce5f0;vertical-align:top}tr:nth-child(even){background:#fafcff}pre{background:#152b43;color:#e0eafb;border-radius:8px;padding:20px;overflow:auto;font-size:13px;line-height:1.7}code{font-family:Consolas,monospace}img{max-width:100%;height:auto}article>:last-child{margin-bottom:0}@media(max-width:900px){aside{position:relative;width:100%;max-height:320px}main{margin:0;padding:22px 15px}article{padding:22px}header h1{font-size:28px}}@media print{aside,header{display:none}main{margin:0;padding:0}article{box-shadow:none;border:0;padding:0;break-before:page}pre{white-space:pre-wrap}a{color:inherit}}
</style></head><body><aside><strong>CloudDocs</strong><small>Báo cáo thực tập cá nhân<br>Trần Hải Lương · 687703</small><nav>${nav}</nav></aside><main><header><span class="badge">Bản xem nội dung · 07/11/2026</span><h1>Worklog & Workshop</h1><p>12 tuần · Bản đề xuất · Sự kiện · Hướng dẫn triển khai AWS</p></header>${articles}</main></body></html>`;
const theme=path.resolve('themes/hugo-theme-learn/static');
function inlineCss(file,seen=new Set()){
 if(seen.has(file))return '';seen.add(file);
 return fs.readFileSync(file,'utf8').replace(/@import\s+["']([^"']+)["'];/g,(_,url)=>inlineCss(path.resolve(path.dirname(file),url),seen)).replace(/url\(["']?([^)'"?#]+)(?:[?#][^)'" ]*)?["']?\)/g,(all,url)=>{
  if(/^(data:|https?:|#)/.test(url))return all;
  const f=path.resolve(path.dirname(file),url);if(!fs.existsSync(f))return all;
  const types={'.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf','.eot':'application/vnd.ms-fontobject','.svg':'image/svg+xml','.png':'image/png','.gif':'image/gif'};
  return `url("data:${types[path.extname(f)]||'application/octet-stream'};base64,${fs.readFileSync(f).toString('base64')}")`;
 });
}
const styles=['nucleus.css','fontawesome-all.min.css','hybrid.css','theme.css','hugo-theme.css'].map(n=>inlineCss(path.join(theme,'css',n))).join('\n')+'\n'+inlineCss(path.resolve('static/css/theme-workshop.css'));
const logo=fs.readFileSync('layouts/partials/logo.html','utf8').replace('href="/"','href="#p0"');
const html=`<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Báo cáo thực tập — Tòng Văn Tâm</title><style>${styles}</style></head><body><nav id="sidebar" class="showVisitedLinks"><div id="header-wrapper"><div id="header">${logo}</div></div><div class="highlightable"><ul class="topics">${nav}</ul><section id="shortcuts"><h3>Liên kết</h3><ul><li><a class="padding" href="https://cloudjourney.awsfcaj.com/">First Cloud AI Journey</a></li><li><a class="padding" href="https://awsstudygroup.com">AWS Study Group</a></li></ul></section></div></nav><section id="body"><div class="padding highlightable">${articles}</div></section><script>function show(){const id=location.hash.slice(1)||'p0';document.querySelectorAll('article').forEach(a=>a.style.display=a.id===id?'block':'none');document.querySelectorAll('#sidebar li').forEach(l=>l.classList.toggle('active',l.querySelector('a').hash==='#'+id));window.scrollTo(0,0);}addEventListener('hashchange',show);show();</script></body></html>`;
fs.writeFileSync('vietnam-it-job-market-review.html',require('./render-sidebar.cjs')(html,pages));
const allMd=pages.flatMap(p=>['_index.md','_index.vi.md'].map(f=>path.join('content',p.slug,f)));
for(const file of allMd){const txt=fs.readFileSync(file,'utf8');if(/WebFood|webfood|Nguyễn Nhật Minh|17\/04\/2026|dh9xhc3jrccu4/.test(txt))failures.push(`Inherited content: ${file}`);if((txt.match(/^~~~/gm)||[]).length%2)failures.push(`Unbalanced code fence: ${file}`);}
const summary={pages:pages.length,markdownFiles:allMd.length,checkedInternalLinks:totalLinks,errors:failures,hugoBuild:'Not run: Hugo is unavailable on this host; network download is unavailable.',review:'vietnam-it-job-market-review.html is rendered from Markdown with marked; it is not a Hugo theme build.'};
fs.writeFileSync('validation-vietnam-it-job-market.json',JSON.stringify(summary,null,2));console.log(JSON.stringify(summary,null,2));if(failures.length)process.exitCode=1;
