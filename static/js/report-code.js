
(function(){
 function decorate(){document.querySelectorAll('#body-inner code, article code').forEach(code=>{
 if(code.querySelector('code')||code.closest('td.lntd')||code.dataset.reportCopy)return;
 code.dataset.reportCopy='true';const b=document.createElement('button');b.type='button';b.className='report-copy';b.title='Sao chép';b.setAttribute('aria-label','Sao chép mã');b.textContent='⎘';
 b.addEventListener('click',async()=>{const value=code.textContent.replace(/^\$\s/gm,'');let ok=false;
 try{if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value);ok=true;}}catch(e){}
 if(!ok){const t=document.createElement('textarea');t.value=value;t.style.cssText='position:fixed;left:-9999px';document.body.append(t);t.select();ok=document.execCommand('copy');t.remove();}
 b.textContent=ok?'✓':'⎘';b.title=ok?'Đã sao chép':'Không sao chép được';if(ok)b.dataset.copied='true';setTimeout(()=>{b.textContent='⎘';b.title='Sao chép';delete b.dataset.copied;},1600);
 });code.after(b);
 });}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate);else decorate();
 new MutationObserver(decorate).observe(document.body,{childList:true,subtree:true});
})();
