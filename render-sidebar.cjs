const fs=require('fs'),path=require('path');
const {marked}=require(path.resolve(path.dirname(process.execPath),'../node_modules/marked'));
module.exports=function enhanceSidebar(html,pages){
 const ids=new Map(pages.map((p,i)=>[p.slug.toLowerCase(),'p'+i]));
 const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
 const svg=fs.readFileSync('static/images/vietnam-it-job-market-architecture.svg').toString('base64');
 const svgEn=fs.readFileSync('static/images/vietnam-it-job-market-architecture.en.svg').toString('base64');
 const data=pages.map((p,i)=>{
  const contents={};for(const lang of ['vi','en']){
   const source=fs.readFileSync(path.join('content',p.slug,lang==='vi'?'_index.vi.md':'_index.md'),'utf8');
   const md=source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'');
   let body=marked.parse(md).replace(/href="([^"]+)"/g,(all,target)=>{
    if(/^(https?:|#|mailto:|tel:)/.test(target))return all;
    const normalized=path.posix.normalize(path.posix.join(p.slug,target)).replace(/\/$/,'');
    const id=ids.get((normalized==='.'?'':normalized).toLowerCase());return id?`href="#${id}"`:all;
   }).replaceAll('src="/images/vietnam-it-job-market-architecture.svg"',`src="data:image/svg+xml;base64,${svg}"`).replaceAll('src="/images/vietnam-it-job-market-architecture.en.svg"',`src="data:image/svg+xml;base64,${svgEn}"`).replaceAll('src="/images/tran-hai-luong.png"',`src="data:image/png;base64,${fs.readFileSync('static/images/tran-hai-luong.png').toString('base64')}"`);
   if(fs.existsSync('static/images/vietnam-it-job-market-architecture-proposal.png'))body=body.replaceAll('src="/images/vietnam-it-job-market-architecture-proposal.png"',`src="data:image/png;base64,${fs.readFileSync('static/images/vietnam-it-job-market-architecture-proposal.png').toString('base64')}"`);
   contents[lang]={title:JSON.parse(source.match(/^title: (.+)$/m)[1]),html:body,text:md};
  }
  return {...p,id:'p'+i,...contents};
 });
 function label(p,lang){
  const w=p.slug.match(/1-Worklog\/1\.(\d+)-Week/);
  if(w)return `<b>1.${w[1]}.</b> ${lang==='vi'?'Worklog Tuần':'Worklog Week'} ${w[1]}`;
  const n=p.slug.split('/').at(-1).match(/^[\d.]+/)[0];return `<b>${n}.</b> ${esc(p[lang].title)}`;
 }
 function tree(parent){return data.filter(p=>p.slug&&path.posix.dirname(p.slug)===(parent||'.')).map(p=>{
  const children=tree(p.slug);return `<li class="dd-item" data-page="${p.id}" data-slug="${esc(p.slug)}"><a href="#${p.id}" data-label="${p.id}">${label(p,'vi')}<i class="fas fa-check read-icon"></i></a>${children?`<ul>${children}</ul>`:''}</li>`;
 }).join('');}
 const logo=fs.readFileSync('layouts/partials/logo.html','utf8').replace('href="/"','href="#p0"');
 const footer=fs.readFileSync('layouts/partials/menu-footer.html','utf8').replace(/{{ now.Format "02-01-2006" }}/g,'07-11-2026').replace(/<script[\s\S]*?<\/script>/g,'');
 const sidebar=`<nav id="sidebar" class="showVisitedLinks"><div id="header-wrapper"><div id="header">${logo}</div><div class="searchbox"><label for="search-by"><i class="fas fa-search"></i></label><input data-search-input id="search-by" type="search" placeholder="Search..."><span data-search-clear role="button" tabindex="0" aria-label="Clear search"><i class="fas fa-times"></i></span></div></div><div class="highlightable"><ul class="topics">${tree('')}</ul><section id="shortcuts"><h3>More</h3><ul><li><a class="padding" href="http://awsstudygroup.com"><i class="fab fa-aws"></i> AWS Study Group - Blog</a></li><li><a class="padding" href="https://www.facebook.com/groups/awsstudygroupfcj"><i class="fab fa-facebook"></i> <span id="fb-link-label">AWS Study Group - Nhóm FB</span></a></li></ul></section><section id="prefooter"><hr><ul><li><a class="padding"><i class="fas fa-language fa-fw"></i><div class="select-style"><select id="select-language" aria-label="Language"><option value="vi">Tiếng Việt</option><option value="en">English</option></select><svg xmlns="http://www.w3.org/2000/svg" width="255" height="255" viewBox="0 0 255 255"><path d="M0 63.75 127.5 191.25 255 63.75Z"/></svg></div></a></li><li><a id="clear-history" class="padding" href="#" data-clear-history-toggle><i class="fas fa-history fa-fw"></i> Clear History</a></li></ul></section><section id="footer">${footer}</section></div></nav>`;
 const payload=JSON.stringify(data.map(p=>({id:p.id,slug:p.slug,vi:p.vi,en:p.en,labels:{vi:p.slug?label(p,'vi'):'',en:p.slug?label(p,'en'):''}}))).replaceAll('<','\\u003c');
 const script=`
const reportPages=${payload};
let language='vi';let visited=new Set();
try{language=localStorage.getItem('clouddocs-report-language')||'vi';visited=new Set(JSON.parse(localStorage.getItem('clouddocs-report-history')||'[]'));}catch{}
if(!['vi','en'].includes(language))language='vi';
const nav=document.querySelector('.topics');
const search=document.getElementById('search-by');
function current(){return reportPages.find(p=>p.id===location.hash.slice(1))||reportPages[0];}
function save(){try{localStorage.setItem('clouddocs-report-history',JSON.stringify([...visited]));localStorage.setItem('clouddocs-report-language',language);}catch{}}
function updateHistory(){document.querySelectorAll('[data-page]').forEach(li=>li.classList.toggle('visited',visited.has(li.dataset.page)));}
function filter(){
 const q=search.value.trim().toLocaleLowerCase();nav.classList.toggle('searched',!!q);
 document.querySelectorAll('[data-page]').forEach(li=>{
  const slug=li.dataset.slug;
  const match=reportPages.some(p=>(p.slug===slug||p.slug.startsWith(slug+'/'))&&(!q||(p[language].title+' '+p[language].text).toLocaleLowerCase().includes(q)));
  li.style.display=match?'':'none';
 });
}
function show(){
 const page=current();visited.add(page.id);save();document.documentElement.lang=language;
 document.querySelectorAll('article').forEach(a=>{a.style.display=a.id===page.id?'block':'none';if(a.id===page.id)a.innerHTML=page[language].html;});
 document.querySelectorAll('[data-page]').forEach(li=>{
  li.classList.toggle('active',li.dataset.page===page.id);
  li.classList.toggle('parent',page.slug.startsWith(li.dataset.slug+'/'));
 });
 reportPages.forEach(p=>{const a=document.querySelector('[data-label="'+p.id+'"]');if(a)a.innerHTML=p.labels[language]+'<i class="fas fa-check read-icon"></i>';});
 document.getElementById('select-language').value=language;
 document.getElementById('fb-link-label').textContent=language==='vi'?'AWS Study Group - Nhóm FB':'AWS Study Group - FB Group';
 document.title=page[language].title+' — Tòng Văn Tâm';updateHistory();filter();window.scrollTo(0,0);
}
document.getElementById('select-language').addEventListener('change',e=>{language=e.target.value;show();});
document.getElementById('clear-history').addEventListener('click',e=>{e.preventDefault();visited.clear();save();updateHistory();});
document.querySelector('[data-search-clear]').addEventListener('click',()=>{search.value='';filter();search.focus();});
search.addEventListener('input',filter);
search.addEventListener('keydown',e=>{if(e.key==='Escape'){search.value='';filter();}if(e.key==='Enter'){const q=search.value.trim().toLocaleLowerCase();if(q){const hit=reportPages.find(p=>(p[language].title+' '+p[language].text).toLocaleLowerCase().includes(q));if(hit){location.hash=hit.id;show();}}}});
addEventListener('hashchange',show);show();
`;
 fs.writeFileSync('preview-behavior-check.js',script);
 return html.replace(/<nav id="sidebar"[\s\S]*?<\/nav>/,sidebar).replace(/<script>function show\(\)[\s\S]*?<\/script>/,()=>`<script>${script}</script>`);
};
