const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const pages=JSON.parse(fs.readFileSync('content-manifest.json','utf8'));
const errors=[];let tables=0,rows=0;
function shape(text){
 const body=text.replace(/^---\n[\s\S]*?\n---\n/,'');
 const code=[...body.matchAll(/~~~[^\n]*\n([\s\S]*?)~~~/g)].map(m=>m[1]);
 const prose=body.replace(/~~~[\s\S]*?~~~/g,'');
 const headings=[...prose.matchAll(/^(#{1,6}) /gm)].map(m=>m[1].length);
 const tableBlocks=[...prose.matchAll(/(?:^\|.*\n)+/gm)].map(m=>m[0].trim().split('\n').map(r=>r.split('|').length));
 const links=[...prose.matchAll(/\]\(([^)]+)\)/g)].map(m=>m[1].replace('vietnam-it-job-market-architecture.en.svg','vietnam-it-job-market-architecture.svg')).sort();
 const ordered=(prose.match(/^\d+\. /gm)||[]).length;
 const bullets=(prose.match(/^- /gm)||[]).length;
 return{headings,tableBlocks,links,code,ordered,bullets};
}
for(const p of pages){
 const vi=fs.readFileSync(path.join('content',p.slug,'_index.vi.md'),'utf8');
 const en=fs.readFileSync(path.join('content',p.slug,'_index.md'),'utf8');
 const a=shape(vi),b=shape(en);
 for(const k of Object.keys(a))try{assert.deepEqual(b[k],a[k]);}catch{errors.push(`${p.slug||'Home'}: ${k} differs`);}
 tables+=a.tableBlocks.length;rows+=a.tableBlocks.reduce((n,t)=>n+t.length-2,0);
 const words=en.replaceAll('Trần Hải Lương','').replaceAll('Cát Linh','');
 if(/\p{M}/u.test(words.normalize('NFD')))errors.push(`${p.slug||'Home'}: untranslated Vietnamese characters`);
 if(/Tuần|Nội dung|Ngày viết|Kết quả|Tìm hiểu|Thứ Bảy|Tự đánh giá/.test(words))errors.push(`${p.slug||'Home'}: Vietnamese label remains`);
}
const svg=fs.readFileSync('static/images/vietnam-it-job-market-architecture.en.svg','utf8');
for(const m of svg.matchAll(/<text[^>]*>([^<]+)<\/text>/g))if(/\p{M}/u.test(m[1].normalize('NFD')))errors.push('English architecture diagram contains Vietnamese');
const summary={languagePairs:pages.length,tablesInEachLanguage:tables,dataRowsInEachLanguage:rows,checks:['heading structure','table rows and columns','ordered and unordered lists','code blocks','link targets','remaining Vietnamese','English diagram'],errors};
fs.writeFileSync('validation-bilingual.json',JSON.stringify(summary,null,2));console.log(JSON.stringify(summary,null,2));if(errors.length)process.exitCode=1;
