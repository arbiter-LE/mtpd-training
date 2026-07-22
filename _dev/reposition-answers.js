// Reposition correct answers to a balanced A/B/C/D spread (kills a "pick B" tell).
// Reorders option strings in place and re-derives the answer-key `c`; correct-answer
// TEXT is preserved byte-for-byte. Run node _dev/build-answer-keys.js afterward.
const vm=require("vm");const fs=require("fs");
const dept="egpd";const dir="js/modules/"+dept+"/";
const esc=s=>s.replace(/'/g,"\\'");
function files(){const a=[];for(let i=1;i<=12;i++){const f=dir+"module-"+dept+"-"+i+".js";if(fs.existsSync(f))a.push(f);}a.push(dir+"modules-"+dept+".js");return a;}
function load(){const ctx={startScenario(){},console};vm.createContext(ctx);
  for(let i=1;i<=12;i++){const f=dir+"module-"+dept+"-"+i+".js";if(fs.existsSync(f))vm.runInContext(fs.readFileSync(f,"utf8"),ctx);}
  const sc=dir+"scenarios-"+dept+".js";if(fs.existsSync(sc))vm.runInContext(fs.readFileSync(sc,"utf8"),ctx);
  vm.runInContext(fs.readFileSync(dir+"modules-"+dept+".js","utf8")+"\nglobalThis.__M=MODULES;",ctx);return ctx.__M;}

const CONFIG=[
  {id:"egpd-search-seizure",track:"patrol",     targets:[2,0,3,1,0,3,1,2]},
  {id:"egpd-search-seizure",track:"supervisor", targets:[3,1,0,2,0,3,1,2]},
  {id:"egpd-use-of-force",  track:"patrol",     targets:[2,0,3,1,0,3,1,2]},
  {id:"egpd-use-of-force",  track:"supervisor", targets:[3,1,0,2,0,3,1,2]},
];
const key=JSON.parse(fs.readFileSync("_dev/answer-keys/"+dept+".json","utf8"));
let M=load();
let fileContents={};files().forEach(f=>fileContents[f]=fs.readFileSync(f,"utf8"));
const correctSnapshot={};

for(const cfg of CONFIG){
  const m=M.find(x=>x.id===cfg.id);
  const set=cfg.track==="patrol"?m.questions:m.supervisorQuestions;
  const k=key[cfg.id][cfg.track];
  if(set.length!==cfg.targets.length){console.error("length mismatch",cfg.id,cfg.track);process.exit(1);}
  set.forEach((q,i)=>{
    const opts=q.options.slice();const c=k[i].c;const t=cfg.targets[i];
    correctSnapshot[cfg.id+"/"+cfg.track+"/"+i]=opts[c];
    // build new order: correct at t, distractors fill remaining slots in order
    const distr=opts.filter((_,j)=>j!==c);
    const newOpts=[];let di=0;
    for(let p=0;p<4;p++){ newOpts[p]= (p===t)?opts[c]:distr[di++]; }
    // build file blocks
    const oldBlock=opts.map(s=>"        '"+esc(s)+"'").join(",\n");
    const newBlock=newOpts.map(s=>"        '"+esc(s)+"'").join(",\n");
    // find the one file containing this block
    const f=files().find(f=>fileContents[f].includes(oldBlock));
    if(!f){console.error("BLOCK NOT FOUND",cfg.id,cfg.track,"Q"+i);process.exit(1);}
    const n=fileContents[f].split(oldBlock).length-1;
    if(n!==1){console.error("BLOCK NOT UNIQUE ("+n+")",cfg.id,cfg.track,"Q"+i);process.exit(1);}
    fileContents[f]=fileContents[f].replace(oldBlock,newBlock);
    k[i].c=t; // update key
  });
}
files().forEach(f=>fs.writeFileSync(f,fileContents[f]));
fs.writeFileSync("_dev/answer-keys/"+dept+".json",JSON.stringify(key,null,2)+"\n");

// verify: reload, correct text byte-identical at new c, report position spread
M=load();
let ok=true;
for(const cfg of CONFIG){
  const m=M.find(x=>x.id===cfg.id);const set=cfg.track==="patrol"?m.questions:m.supervisorQuestions;const k=key[cfg.id][cfg.track];
  const pos=[0,0,0,0];
  set.forEach((q,i)=>{
    const nowCorrect=q.options[k[i].c];
    if(nowCorrect!==correctSnapshot[cfg.id+"/"+cfg.track+"/"+i]){ok=false;console.error("MISMATCH",cfg.id,cfg.track,"Q"+i);}
    pos[k[i].c]++;
  });
  console.log(cfg.id+"/"+cfg.track+"  A:"+pos[0]+" B:"+pos[1]+" C:"+pos[2]+" D:"+pos[3]);
}
console.log(ok?"\n✓ all correct answers byte-identical at their new positions":"\n✗ VERIFICATION FAILED");
process.exit(ok?0:1);
