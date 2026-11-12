// Read-only verification of report sources and compiled pages.
const fs=require('fs'),path=require('path'),assert=require('assert');
const root=__dirname,project=path.resolve(root,'../..'),site=process.argv[2];
if(!site)throw Error('Pass Hugo output directory');
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
const files=[...walk(path.join(root,'content/2-Proposal')),...walk(path.join(root,'content/4-Workshop'))].filter(f=>/\.md$/.test(f));
const errors=[],references=new Set();let links=0,steps=0;
for(const f of files){
 const s=fs.readFileSync(f,'utf8');const slug=path.relative(path.join(root,'content'),path.dirname(f)).replaceAll('\\','/');const en=f.endsWith('.en.md');
 const built=path.join(site,en?'en':'',slug.toLowerCase(),'index.html');
 if(!fs.existsSync(built)){errors.push('Missing output: '+built);continue;}
 const html=fs.readFileSync(built,'utf8');
 const body=html.split('<div id="body-inner">')[1]?.split('<footer')[0];if(!body){errors.push('Missing body: '+slug);continue;}
 for(const m of body.matchAll(/href="([^"]+)"/g)){
  const href=m[1].replaceAll('&amp;','&');if(/^(https?:|mailto:|tel:|#)/.test(href))continue;
  const dest=href.startsWith('/')?path.join(site,href):path.resolve(path.dirname(built),href.split('#')[0]);
  const check=dest.endsWith('.html')?dest:path.join(dest,'index.html');
  if(!fs.existsSync(check))errors.push(slug+' -> '+href);links++;
 }
 // Only project-relative file references; no private configuration is opened.
 for(const m of s.matchAll(/`((?:collectors|processors|dashboard|deploy\/ec2|sql|docs|config)\/[\w./-]+\.(?:py|sh|sql|json|md|timer|service))`/g)){
  references.add(m[1]);if(!fs.existsSync(path.join(project,m[1])))errors.push('Missing source reference: '+m[1]);
 }
 if(!en&&/4\.\d+\.\d+-/.test(path.basename(path.dirname(f)))){
  steps++;for(const marker of ['#### Mục tiêu thực hành','#### Thành phần trong project','#### Các bước thực hiện','#### Câu lệnh và giải thích','#### Kết quả mong đợi','#### Kết quả đã kiểm chứng','[CẦN ẢNH THỰC TẾ:'])if(!s.includes(marker))errors.push(slug+' missing '+marker);
 }
 if(/!\[[^\]]*\]\([^)]*(?:architecture|clouddocs)/i.test(s))errors.push('Template diagram included: '+slug);
}
const preview=fs.readFileSync(path.join(root,'vietnam-it-job-market-review.html'),'utf8');const data=JSON.parse(preview.match(/const reportPages=(\[[^\n]*\]);/)[1]);
assert.equal(data.filter(p=>p.slug==='4-Workshop'||p.slug.startsWith('4-Workshop/')).length,43);
assert.equal(data.filter(p=>p.slug==='2-Proposal').length,1);
const articleIDs=[...preview.matchAll(/<article id="([^"]+)"/g)].map(m=>m[1]);assert.equal(articleIDs.length,data.length);
for(const p of data){assert(articleIDs.includes(p.id));assert(preview.includes('data-page="'+p.id+'"')||p.slug==='');}
const report={hugoBuild:'PASS',markdownFiles:files.length,workshopPagesPerLanguage:43,stepArticlesVietnamese:steps,compiledBodyLinksChecked:links,projectSourceReferencesChecked:references.size,previewArticles:data.length,images:'Placeholders only in Proposal/Workshop',applicationTestsRun:false,awsActionsExecuted:false,errors};
fs.writeFileSync(path.join(root,'validation-project-content.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
