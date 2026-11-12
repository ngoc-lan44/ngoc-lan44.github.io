const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'content');
const asset=path.join(__dirname,'static/images/vietnam-it-job-market-architecture-proposal.png');
const dates=i=>{
 const fmt=d=>`${String(d.getUTCDate()).padStart(2,'0')}/${String(d.getUTCMonth()+1).padStart(2,'0')}/${d.getUTCFullYear()}`;
 return fmt(new Date(Date.UTC(2026,7,10+i*7)))+'–'+fmt(new Date(Date.UTC(2026,7,14+i*7)));
};
for(const lang of ['vi','en']){
 const filename=path.join(root,'2-Proposal',lang==='vi'?'_index.vi.md':'_index.md');let source=fs.readFileSync(filename,'utf8');
 const rows=Array.from({length:12},(_,i)=>{
  const worklog=fs.readFileSync(path.join(root,`1-Worklog/1.${i+1}-Week${i+1}`,lang==='vi'?'_index.vi.md':'_index.md'),'utf8');
  const title=JSON.parse(worklog.match(/^title: (.+)$/m)[1]).replace(/^(?:Tuần|Week) \d+: /,'');
  const outcomes=worklog.split(lang==='vi'?'## Kết quả đạt được':'## Learning outcomes')[1];
  if(!outcomes)throw Error('Missing outcomes for '+i);
  const result=outcomes.match(/^- (.+)$/m)[1];
  return `| ${i+1} | ${dates(i)} | ${title} | ${result} |`;
 }).join('\n');
 const heading=lang==='vi'?'### 5. Lộ trình & Mốc triển khai':'### 5. Roadmap and milestones';
 const table=lang==='vi'?'| Tuần | Thời gian | Nội dung | Kết quả đạt được |':'| Week | Period | Topic | Learning outcome |';
 const replacement=heading+'\n\n'+table+'\n| --- | --- | --- | --- |\n'+rows+'\n\n';
 if(lang==='vi')source=source.replace(/### 5\. Lộ trình & Mốc triển khai[\s\S]*?(?=### 6\.)/,replacement);
 else source=source.replace(/### 5\. Roadmap and milestones[\s\S]*?(?=### 6\.)/,replacement);
 if(fs.existsSync(asset))source=source.replace(/!\[([^\]]+)\]\(\/images\/clouddocs-architecture(?:\.en)?\.svg\)/,`![$1](/images/vietnam-it-job-market-architecture-proposal.png)`);
 fs.writeFileSync(filename,source);
}
console.log(JSON.stringify({proposalRoadmapWeeks:12,architectureImage:fs.existsSync(asset)?'updated':'pending original image file'}));
