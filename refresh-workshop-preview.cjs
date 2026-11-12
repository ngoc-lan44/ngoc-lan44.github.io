// Refresh this report's existing standalone preview from a successful Hugo build.
// No application imports, network calls, crawler, deployment or AWS operations.
const fs=require('fs'),path=require('path'),assert=require('assert');
const root=__dirname,build=process.argv[2];if(!build)throw Error('Pass the Hugo build directory');
const meta=JSON.parse(fs.readFileSync(root+'/WORKSHOP_SOURCE_MAP.json','utf8'));
const target=root+'/vietnam-it-job-market-review.html',rx=/const reportPages=(\[[^\n]*\]);/;
let html=fs.readFileSync(target,'utf8');const old=JSON.parse(html.match(rx)[1]);
const isWorkshop=p=>/^[45]-Workshop(?:\/|$)/.test(p.slug);
const unchanged=old.filter(p=>!isWorkshop(p)&&!['p0','p27','p28'].includes(p.id));
const alias=new Map(meta.oldToNew.map(x=>[x.old.replace(/^\/|\/$/g,''),x.new.replace(/^\/|\/$/g,'')]));
const oldIDs=new Map();for(const p of old.filter(isWorkshop)){const dest=alias.get(p.slug.toLowerCase())||p.slug.toLowerCase();if(!oldIDs.has(dest))oldIDs.set(dest,p.id);}
const workshop=meta.pages.map(p=>({...p,id:oldIDs.get(p.slug.toLowerCase())||(p.num==='5'?'p17':'ws-'+p.num.replaceAll('.','-'))}));
const allocatedIDs=new Set(old.filter(p=>!isWorkshop(p)).map(p=>p.id));
for(const p of workshop){const base=p.id;let suffix=2;while(allocatedIDs.has(p.id))p.id=base+'-v'+suffix++;allocatedIDs.add(p.id);}
const pages=[];let inserted=false;for(const p of old){if(isWorkshop(p)){if(!inserted){pages.push(...workshop);inserted=true;}}else pages.push(p);}assert(inserted);
const ids=new Map(pages.map(p=>[p.slug.toLowerCase(),p.id]));for(const [a,b] of alias)if(ids.has(b))ids.set(a,ids.get(b));
function inner(s){const marker='<div id="body-inner">',start=s.indexOf(marker)+marker.length;assert(start>=marker.length);let depth=1,m;const re=/<\/?div\b[^>]*>/g;re.lastIndex=start;while(m=re.exec(s)){depth+=m[0].startsWith('</')?-1:1;if(!depth)return s.slice(start,m.index).trim();}throw Error('Unbalanced body-inner');}
function esc(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');}
function render(p,lang){const source=fs.readFileSync(root+'/content/'+p.slug+'/_index.'+lang+'.md','utf8'),m=source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);assert(m);const title=JSON.parse(m[1].match(/^title:\s*(.+)$/m)[1]);let body=inner(fs.readFileSync(path.join(build,lang==='en'?'en':'',p.slug.toLowerCase(),'index.html'),'utf8'));
 body=body.replace(/href="([^"]+)"/g,(all,raw)=>{if(raw.includes("#step-"))return `href="#${raw.split("#").pop()}"`;if(/^(https?:|mailto:|tel:|#)/.test(raw))return all;let dest=raw.startsWith('/')?raw.replace(/^\/en\//,'/').replace(/^\//,''):path.posix.normalize(path.posix.join(p.slug.toLowerCase(),raw.split('#')[0]));dest=dest.replace(/\/$/,'');const id=ids.get(dest);return id?`href="#${id}"`:all;});
 body=body.replace(/src="([^"]+)"/g,(all,raw)=>{if(raw.startsWith('data:'))return all;const parsed=new URL(raw,'http://report/'+(lang==='en'?'en/':'')+p.slug.toLowerCase()+'/').pathname;const rel=parsed.replace(/^\//,'');const file=path.join(build,rel);if(!fs.existsSync(file))throw Error('Missing preview image '+file);const ext=path.extname(file).toLowerCase(),mime={'.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'}[ext];assert(mime);return `src="data:${mime};base64,${fs.readFileSync(file).toString('base64')}"`;});
 return {title,text:source.slice(m[0].length),html:body};
}
for(const p of workshop){p.labels={};for(const lang of ['vi','en']){p[lang]=render(p,lang);p.labels[lang]=`<b>${p.num}.</b> ${esc(p[lang].title)}`;const homeText=lang==='vi'?'Báo cáo thực tập':'Internship report';const menuText=lang==='vi'?'Mục lục':'Contents';p[lang].html=`<div class="workshop-preview"><div class="workshop-preview-tools"><button type="button" data-workshop-menu aria-label="${menuText}">☰ ${menuText}</button><a href="#p0">${homeText}</a><span>›</span><a href="#p17">Workshop</a><span>› ${p.num}</span></div>${p[lang].html}</div>`;}}
for(const p of pages.filter(p=>p.id==='p27'||p.id==='p28')){p.labels={};const n=p.id==='p27'?6:7;for(const lang of ['vi','en']){const source=fs.readFileSync(root+'/content/'+p.slug+'/_index.'+lang+'.md','utf8');p[lang].text=source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'');p.labels[lang]=`<b>${n}.</b> ${p[lang].title}`;}}
const home=pages.find(p=>p.id==='p0');for(const lang of ['vi','en']){const file=lang==='vi'?'_index.vi.md':'_index.md',source=fs.readFileSync(root+'/content/'+file,'utf8');home[lang].text=source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'');const list=source.match(/<ol class="report-contents">[\s\S]*?<\/ol>/)[0].replace(/href="([^"]+)"/g,(all,url)=>{const id=ids.get(url.replace(/\/$/,'').toLowerCase());return id?`href="#${id}"`:all;});home[lang].html=home[lang].html.replace(/<ol(?: class="report-contents")?>[\s\S]*?<\/ol>/,()=>list);}
function tree(parent){return pages.filter(p=>p.slug&&path.posix.dirname(p.slug)===(parent||'.')).map(p=>{const children=tree(p.slug);return `<li class="dd-item" data-page="${p.id}" data-slug="${esc(p.slug)}"><a href="#${p.id}" data-label="${p.id}">${p.labels.vi}<i class="fas fa-check read-icon"></i></a>${children?`<ul>${children}</ul>`:''}</li>`;}).join('');}
const begin=html.indexOf('<ul class="topics">'),end=html.indexOf('<section id="shortcuts">',begin);assert(begin>=0&&end>begin);html=html.slice(0,begin)+`<ul class="topics">${tree('')}</ul>`+html.slice(end);
const a=html.indexOf('<article'),b=html.lastIndexOf('</article>')+10;assert(a>=0&&b>a);html=html.slice(0,a)+pages.map(p=>`<article id="${p.id}">${p.vi.html}</article>`).join('\n')+html.slice(b);
const payload=JSON.stringify(pages).replaceAll('<','\\u003c');html=html.replace(rx,()=>`const reportPages=${payload};`);
const css=fs.readFileSync(root+'/static/css/workshop-content.css','utf8');html=html.replace(/<style id="workshop-content-style">[\s\S]*?<\/style>/,'');html=html.replace('</head>','<style id="workshop-content-style">'+css+'</style></head>');
html=html.replace('const page=current();visited.add(page.id);','const page=current();document.body.classList.toggle("workshop-active",page.slug.startsWith("5-Workshop"));document.body.classList.remove("workshop-menu-open");visited.add(page.id);');
let behavior=fs.readFileSync(root+'/preview-behavior-check.js','utf8').replace(rx,()=>`const reportPages=${payload};`).replace('const page=current();visited.add(page.id);','const page=current();document.body.classList.toggle("workshop-active",page.slug.startsWith("5-Workshop"));document.body.classList.remove("workshop-menu-open");visited.add(page.id);');
if(!behavior.includes('// Workshop mobile menu'))behavior+='\n// Workshop mobile menu\ndocument.addEventListener("click",e=>{if(e.target.closest("[data-workshop-menu]"))document.body.classList.toggle("workshop-menu-open");});\n';
const payloadStart=html.indexOf('const reportPages=');const scriptStart=html.lastIndexOf('<script>',payloadStart);const scriptEnd=html.indexOf('</script>',payloadStart);assert(scriptStart>=0&&scriptEnd>scriptStart);html=html.slice(0,scriptStart)+'<script>\n'+behavior.trimStart()+html.slice(scriptEnd);
assert.deepStrictEqual(pages.filter(p=>!isWorkshop(p)&&!['p0','p27','p28'].includes(p.id)),unchanged);
assert(new Set(pages.map(p=>p.id)).size===pages.length);
fs.writeFileSync(target,html);fs.writeFileSync(root+'/preview-behavior-check.js',behavior);
fs.writeFileSync(root+'/content-manifest.json',JSON.stringify(pages.filter(p=>p.slug).map(p=>({slug:p.slug,title:p.vi.title})),null,2)+'\n');
console.log(JSON.stringify({workshopPages:workshop.length,previewPages:pages.length,unchangedOtherArticles:unchanged.length,approvedRenumbering:'Workshop 5, Self-evaluation 6, Feedback 7'}));
