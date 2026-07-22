// Apply authored distractor expansions safely.
// Usage: node _dev/length-tell-apply.js <dept> <editsJsonPath>
// edits JSON: [{ "old": "<exact current distractor>", "new": "<expanded distractor>" }, ...]
const vm=require("vm");const fs=require("fs");
const [,,dept,editsPath]=process.argv;
const dir="js/modules/"+dept+"/";
function files(){const a=[];for(let i=1;i<=12;i++){const f=dir+"module-"+dept+"-"+i+".js";if(fs.existsSync(f))a.push(f);}a.push(dir+"modules-"+dept+".js");return a;}
function loadDept(){
  const ctx={startScenario(){},console};vm.createContext(ctx);
  for(let i=1;i<=12;i++){const f=dir+"module-"+dept+"-"+i+".js";if(fs.existsSync(f))vm.runInContext(fs.readFileSync(f,"utf8"),ctx);}
  const sc=dir+"scenarios-"+dept+".js";if(fs.existsSync(sc))vm.runInContext(fs.readFileSync(sc,"utf8"),ctx);
  vm.runInContext(fs.readFileSync(dir+"modules-"+dept+".js","utf8")+"\nglobalThis.__M=MODULES;",ctx);
  return ctx.__M;
}
const key=require(process.cwd()+"/_dev/answer-keys/"+dept+".json");
const edits=JSON.parse(fs.readFileSync(editsPath,"utf8"));

// snapshot correct-answer texts BEFORE
const before=loadDept();
const correctTexts=new Set();
for(const m of before){for(const [tr,qs] of [["patrol",m.questions],["supervisor",m.supervisorQuestions]]){if(!qs||!key[m.id]||!key[m.id][tr])continue;qs.forEach((q,i)=>correctTexts.add(q.options[key[m.id][tr][i].c]));}}

// guard: no edit targets a correct answer; each old unique across files
// files store single-quoted JS strings, so apostrophes are escaped as \' — match file form.
const esc=s=>s.replace(/'/g,"\\'");
let fileContents={};files().forEach(f=>fileContents[f]=fs.readFileSync(f,"utf8"));
for(const e of edits){
  if(correctTexts.has(e.old)){console.error("REFUSE: 'old' is a CORRECT answer:\n  "+e.old);process.exit(1);}
  const fo=esc(e.old);
  const total=files().reduce((n,f)=>n+fileContents[f].split(fo).length-1,0);
  if(total!==1){console.error("REFUSE: 'old' occurs "+total+" times (need exactly 1):\n  "+e.old);process.exit(1);}
  if(e.new.length<=e.old.length){console.error("WARN: new not longer than old:\n  "+e.old);}
}
// apply
for(const e of edits){const fo=esc(e.old);const f=files().find(f=>fileContents[f].includes(fo));fileContents[f]=fileContents[f].replace(fo,esc(e.new));}
files().forEach(f=>fs.writeFileSync(f,fileContents[f]));

// verify: correct texts all still present byte-identical; recompute pick-longest
const after=loadDept();
const afterCorrect=new Set();
for(const m of after){for(const [tr,qs] of [["patrol",m.questions],["supervisor",m.supervisorQuestions]]){if(!qs||!key[m.id]||!key[m.id][tr])continue;qs.forEach((q,i)=>afterCorrect.add(q.options[key[m.id][tr][i].c]));}}
for(const t of correctTexts){if(!afterCorrect.has(t)){console.error("FAIL: a correct answer changed/vanished:\n  "+t);process.exit(1);}}
console.log("✓ applied "+edits.length+" edit(s); all correct answers byte-identical, order intact.");
// report pick-longest for touched modules
const touched=new Set();
for(const e of edits){for(const m of after){for(const [tr,qs] of [["patrol",m.questions],["supervisor",m.supervisorQuestions]]){if(qs&&qs.some(q=>q.options.includes(e.new)))touched.add(m.id+"/"+tr);}}}
for(const m of after){for(const [tr,qs] of [["patrol",m.questions],["supervisor",m.supervisorQuestions]]){if(!qs||!key[m.id]||!key[m.id][tr])continue;const id=m.id+"/"+tr;if(!touched.has(id))continue;const k=key[m.id][tr];let pl=0;qs.forEach((q,i)=>{const L=q.options.map(o=>o.length);if(L.indexOf(Math.max(...L))===k[i].c)pl++;});console.log("   "+id+": pick-longest now "+pl+"/"+qs.length);}}
