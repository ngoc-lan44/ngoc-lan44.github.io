// Update only Proposal and Workshop in the existing standalone preview.
// Usage: node sync-project-preview.cjs <Hugo output directory>
const fs=require('fs'),path=require('path'),assert=require('assert');
const root=__dirname,build=process.argv[2];
if(!build)throw Error('Pass the compiled Hugo output directory');
const target=path.join(root,'vietnam-it-job-market-review.html');
let html=fs.readFileSync(target,'utf8');
const payload=/const reportPages=(\[[^\n]*\]);/;
const old=JSON.parse(html.match(payload)[1]);
const inScope=p=>p.slug==='2-Proposal'||p.slug==='4-Workshop'||p.slug.startsWith('4-Workshop/');
const unchanged=old.filter(p=>!inScope(p));
const slugs=[];
function scan(dir){slugs.push(path.relative(path.join(root,'content'),dir).replaceAll('\\','/'));for(const e of fs.readdirSync(dir,{withFileTypes:true}).filter(e=>e.isDirectory()).sort((a,b)=>a.name.localeCompare(b.name,'en',{numeric:true})))scan(path.join(dir,e.name));}
scan(path.join(root,'content/4-Workshop'));
const workshop=slugs.map((slug,i)=>({slug,id:old.find(p=>p.slug===slug)?.id||'w'+i}));
const descriptors=[{slug:'2-Proposal',id:'p14'},...workshop];
const merged=[];for(const p of old){if(p.slug==='2-Proposal')merged.push(descriptors[0]);else if(p.slug==='4-Workshop')merged.push(...workshop);else if(!inScope(p))merged.push(p);}
const ids=new Map(merged.map(p=>[p.slug.toLowerCase(),p.id]));
function extractInner(s){const marker='<div id="body-inner">',start=s.indexOf(marker)+marker.length;assert(start>=marker.length);let depth=1;const re=/<\/?div\b[^>]*>/g;re.lastIndex=start;let m;while(m=re.exec(s)){depth+=m[0].startsWith('</')?-1:1;if(!depth)return s.slice(start,m.index).trim();}throw Error('Unbalanced body-inner');}
function front(source){const m=source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);assert(m);return {title:JSON.parse(m[1].match(/^title:\s*(.+)$/m)[1]),text:source.slice(m[0].length)};}
function esc(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');}
for(const p of descriptors){p.labels={};for(const lang of ['vi','en']){
 const src=front(fs.readFileSync(path.join(root,'content',p.slug,`_index.${lang}.md`),'utf8'));
 const disk=path.join(build,lang==='en'?'en':'',p.slug.toLowerCase(),'index.html');
 let body=extractInner(fs.readFileSync(disk,'utf8'));
 body=body.replace(/href="([^"]+)"/g,(all,raw)=>{
  if(/^(https?:|mailto:|tel:|#)/.test(raw))return all;
  const dest=raw.split('#')[0].split('?')[0];
  let slug=dest.startsWith('/')?dest.replace(/^\/en\//,'/').replace(/^\//,''):path.posix.normalize(path.posix.join(p.slug.toLowerCase(),dest));
  slug=slug.replace(/\/$/,'');const id=ids.get(slug);return id?`href="#${id}"`:all;
 });
 p[lang]={title:src.title,text:src.text,html:body};
 const num=p.slug.split('/').at(-1).match(/^[\d.]+/)[0];p.labels[lang]=`<b>${num}.</b> ${esc(src.title)}`;
}}
function tree(parent){return merged.filter(p=>p.slug&&path.posix.dirname(p.slug)===(parent||'.')).map(p=>{const children=tree(p.slug);return `<li class="dd-item" data-page="${p.id}" data-slug="${esc(p.slug)}"><a href="#${p.id}" data-label="${p.id}">${p.labels.vi}<i class="fas fa-check read-icon"></i></a>${children?`<ul>${children}</ul>`:''}</li>`;}).join('');}
const navStart=html.indexOf('<ul class="topics">'),navEnd=html.indexOf('<section id="shortcuts">',navStart);assert(navStart>=0&&navEnd>navStart);
html=html.slice(0,navStart)+`<ul class="topics">${tree('')}</ul>`+html.slice(navEnd);
const start=html.indexOf('<article'),end=html.lastIndexOf('</article>')+'</article>'.length;assert(start>=0&&end>start);
html=html.slice(0,start)+merged.map(p=>`<article id="${p.id}">${p.vi.html}</article>`).join('\n')+html.slice(end);
const encoded=JSON.stringify(merged).replaceAll('<','\\u003c');
html=html.replace(payload,()=>`const reportPages=${encoded};`);
const after=JSON.parse(html.match(payload)[1]);assert.deepStrictEqual(after.filter(p=>!inScope(p)),unchanged);
assert.equal(new Set(after.map(p=>p.id)).size,after.length);
for(const p of descriptors)for(const lang of ['vi','en']){
 assert(!/Spring Boot|Cognito|MySQL|RDS|CloudDocs/.test(p[lang].html.replace(/[^<]*CloudDocs[^<]*/g,'')),'Unrelated tech in '+p.slug);
 for(const m of p[lang].html.matchAll(/href="#([pw]\d+)"/g))assert(after.some(x=>x.id===m[1]),'Broken '+m[0]);
}
fs.writeFileSync(target,html);
const behavior=path.join(root,'preview-behavior-check.js');fs.writeFileSync(behavior,fs.readFileSync(behavior,'utf8').replace(payload,()=>`const reportPages=${encoded};`));
let manifest=JSON.parse(fs.readFileSync(path.join(root,'content-manifest.json'),'utf8'));
manifest=manifest.filter(p=>!inScope(p));manifest.push(...descriptors.map(p=>({slug:p.slug,title:p.vi.title})));
fs.writeFileSync(path.join(root,'content-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
const images=descriptors.map(p=>({slug:p.slug,items:[...p.vi.text.matchAll(/\[CẦN ẢNH THỰC TẾ[^\]]*\]/g)].map(m=>m[0])}));
fs.writeFileSync(path.join(root,'ANH-CAN-BO-SUNG.md'),'# Ảnh cần bổ sung: Bản đề xuất và Workshop\n\nNội dung chữ đã được chuẩn bị trước; chưa thay bằng ảnh AWS hoặc ảnh ứng dụng dựng. Chụp theo trạng thái thực tế, kèm ngày/run/query ID khi thích hợp.\n\n'+images.filter(p=>p.items.length).map(p=>'## '+descriptors.find(x=>x.slug===p.slug).labels.vi.replace(/<[^>]+>/g,'')+'\n\n'+p.items.map(s=>'- '+s).join('\n')+'\n').join('\n'));
console.log(JSON.stringify({workshopPages:workshop.length,proposalPages:1,languages:2,previewPages:after.length,unrelatedPreviewPagesPreserved:unchanged.length,imageEntries:images.reduce((n,p)=>n+p.items.length,0)}));
