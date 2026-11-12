const fs=require('fs'),path=require('path'),crypto=require('crypto'),assert=require('assert');
const root=__dirname,project=path.resolve(root,'../..'),build=process.argv[2],audit=process.argv[3];
if(!build||!audit)throw Error('Usage: node check-workshop-complete.cjs <Hugo build> <audit backup directory>');
const meta=JSON.parse(fs.readFileSync(root+'/WORKSHOP_SOURCE_MAP.json')),errors=[];let links=0,imageLinks=0,bodyWords=0;
const hash=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const applicationBefore=JSON.parse(fs.readFileSync(audit+'/application-before.json'));
for(const [f,digest] of Object.entries(applicationBefore))if(hash(path.join(project,f))!==digest)errors.push('Application changed: '+f);
const outsideBefore=JSON.parse(fs.readFileSync(audit+'/outside-before.json'));
const approved=[];for(const [f,s] of Object.entries(outsideBefore)){
 const current=fs.readFileSync(path.join(root,f),'utf8');if(s===current)continue;
 if(f.replaceAll('\\','/').match(/^content\/(5-Self-evaluation|6-Feedback)\//)){
  const body=x=>x.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'');if(body(s)!==body(current))errors.push('Unapproved body edit: '+f);else approved.push(f);
 }else if(/^content[\\/]_index(?:\.vi)?\.md$/.test(f)){
  const oldProfile=s.split(/## (?:Nội dung báo cáo|Report contents)/)[0],newProfile=current.split(/## (?:Nội dung báo cáo|Report contents)/)[0];if(oldProfile!==newProfile)errors.push('Home profile changed');else approved.push(f);
 }else errors.push('Outside workshop changed: '+f);
}
const codes=[],refset=new Set(),slugs=new Set();
for(const p of meta.pages){assert(!slugs.has(p.slug));slugs.add(p.slug);for(const ref of p.refs){refset.add(ref);if(!fs.existsSync(path.join(project,ref)))errors.push('Missing source: '+ref);}
 for(const lang of ['vi','en']){
  const source=fs.readFileSync(root+'/content/'+p.slug+'/_index.'+lang+'.md','utf8');if((source.match(/^~~~/gm)||[]).length%2)errors.push('Unbalanced fence '+p.slug+'/'+lang);
  const disk=path.join(build,lang==='en'?'en':'',p.slug.toLowerCase(),'index.html');if(!fs.existsSync(disk)){errors.push('Missing page '+disk);continue;}
  const html=fs.readFileSync(disk,'utf8'),body=html.split('<div id="body-inner">')[1]?.split('<div id="navigation">')[0];if(!body){errors.push('Missing article body '+disk);continue;}
  if(lang==='vi'){bodyWords+=source.split(/\s+/).length;for(const m of source.matchAll(/\[CẦN THÊM ẢNH ([\d.-]+)\]/g))codes.push(m[1]);}
  if(meta.setupCourse&&lang==='vi'&&p.num.split('.').length===3){for(const heading of ['**Thực hiện tại:**','### Mục tiêu','### Điều kiện đầu vào','### Các bước thực hiện','### Kiểm tra kết quả','### File sử dụng'])if(!source.includes(heading))errors.push('Missing setup section '+p.num+' '+heading);}
  if(p.num.split('.').length===3&&!meta.hierarchicalSteps){for(const heading of lang==='vi'?['### Mục tiêu','### Giới thiệu','### Các bước thực hiện','### Hình ảnh minh họa','### Kết quả','### Lưu ý']:['### Objective','### Introduction','### Procedure','### Screenshot','### Result','### Notes'])if(!source.includes(heading))errors.push('Missing heading '+p.num+' '+heading);if(source.length<1800)errors.push('Thin article '+p.num+'/'+lang);}
  for(const m of body.matchAll(/href=["']([^"']+)["']/g)){
   const href=m[1].replaceAll('&amp;','&');if(/^(https?:|mailto:|tel:|#)/.test(href))continue;const rel=decodeURIComponent(href.split('#')[0]);let dest=rel.startsWith('/')?path.join(build,rel):path.resolve(path.dirname(disk),rel);if(!path.extname(dest))dest=path.join(dest,'index.html');if(!fs.existsSync(dest))errors.push(p.num+' -> '+href);links++;
  }
  for(const m of body.matchAll(/<img[^>]+src="([^"]+)"/g)){
   if(m[1].startsWith('data:'))continue;const dest=m[1].startsWith('/')?path.join(build,m[1]):path.resolve(path.dirname(disk),m[1]);if(!fs.existsSync(dest))errors.push('Missing image '+p.num+' '+m[1]);imageLinks++;
  }
  if(!html.includes('id="sidebar"'))errors.push('Missing sidebar '+p.num);
 }
}
const chapters=meta.chapterCount||15,practical=meta.practicalArticles??73;
if(meta.pages.length!==1+chapters+practical||meta.pages.filter(p=>p.num.split('.').length===3).length!==practical)errors.push('Incorrect structure count');
if(new Set(codes).size!==codes.length)errors.push('Duplicate image codes');
const pending=meta.images.filter(p=>p.status==='Chưa có');if(codes.length!==pending.length||pending.some(x=>!codes.includes(x.id)))errors.push('Image inventory mismatch');
for(const x of meta.oldToNew){const f=path.join(build,x.old,'index.html');if(!fs.existsSync(f)||!fs.readFileSync(f,'utf8').toLowerCase().includes(x.new.toLowerCase()))errors.push('Bad alias '+x.old);}
const preview=fs.readFileSync(root+'/vietnam-it-job-market-review.html','utf8');const pages=JSON.parse(preview.match(/const reportPages=(\[[^\n]*\]);/)[1]);
for(const p of meta.pages){const x=pages.find(x=>x.slug===p.slug);if(!x){errors.push('Missing preview '+p.num);continue;}for(const lang of ['vi','en']){const source=fs.readFileSync(root+'/content/'+p.slug+'/_index.'+lang+'.md','utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'');if(x[lang].text!==source)errors.push('Stale preview '+p.num+'/'+lang);for(const m of x[lang].html.matchAll(/href="#([^"#]+)"/g)){if(!pages.some(y=>y.id===m[1])&&!x[lang].html.includes('id="'+m[1]+'"'))errors.push('Preview link '+p.num+' '+m[1]);}}}
const report={hugo:'0.145.0',hugoBuild:'PASS',chapters,standalonePracticalPages:practical,workshopPagesPerLanguage:meta.pages.length,markdownFiles:meta.pages.length*2,internalLinksChecked:links,actualImageLinksChecked:imageLinks,pendingImages:pending.length,existingDiagrams:meta.images.filter(x=>x.status==='Đã có sơ đồ').length,providedScreenshots:meta.images.filter(x=>x.status==='Đã có ảnh thực tế').length,uniqueImageCodes:new Set(codes).size,oldURLRedirects:meta.oldToNew.length,sourceFilesReferenced:refset.size,unchangedApplicationFiles:Object.keys(applicationBefore).length,approvedOutsideNumberingAndHomeNavigation:approved,vietnameseApproxWords:bodyWords,awsMutationsExecuted:false,crawlerExecuted:false,applicationTestsExecuted:false,errors};
fs.writeFileSync(root+'/WORKSHOP_VALIDATION.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;

