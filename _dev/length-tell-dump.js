// Dump flagged questions for a module set so distractors can be authored.
// Usage: node _dev/length-tell-dump.js <dept> <moduleId>
const vm=require("vm");const fs=require("fs");
const [,,dept,modId]=process.argv;
function loadDept(dept){
  const dir="js/modules/"+dept+"/";
  const ctx={startScenario(){},console};vm.createContext(ctx);
  for(let i=1;i<=12;i++){const f=dir+"module-"+dept+"-"+i+".js";if(fs.existsSync(f))vm.runInContext(fs.readFileSync(f,"utf8"),ctx);}
  const sc=dir+"scenarios-"+dept+".js";if(fs.existsSync(sc))vm.runInContext(fs.readFileSync(sc,"utf8"),ctx);
  vm.runInContext(fs.readFileSync(dir+"modules-"+dept+".js","utf8")+"\nglobalThis.__M=MODULES;",ctx);
  return ctx.__M;
}
const key=require(process.cwd()+"/_dev/answer-keys/"+dept+".json");
const M=loadDept(dept);
const m=M.find(x=>x.id===modId);
if(!m){console.error("no module",modId);process.exit(1);}
for(const [track,qs] of [["patrol",m.questions],["supervisor",m.supervisorQuestions]]){
  if(!qs||!key[modId][track])continue;
  const k=key[modId][track];
  // per question compute gap = correctLen - maxDistractorLen
  const rows=qs.map((q,i)=>{
    const L=q.options.map(o=>o.length); const c=k[i].c;
    const dIdx=L.map((l,j)=>[l,j]).filter(x=>x[1]!==c).sort((a,b)=>a[0]-b[0]); // distractors asc by len
    return {i,c,cLen:L[c],maxD:Math.max(...L.filter((_,j)=>j!==c)),shortest:dIdx[0][1],shortestLen:dIdx[0][0]};
  });
  // leave the 2 questions where correct-is-longest by smallest margin (or already not-longest)
  const longestQs=rows.filter(r=>r.cLen>r.maxD).sort((a,b)=>(a.cLen-a.maxD)-(b.cLen-b.maxD));
  const leave=new Set(longestQs.slice(0,2).map(r=>r.i)); // keep 2 with correct longest
  console.log("\n#### "+dept+" / "+modId+" / "+track+"  (correct-is-longest "+rows.filter(r=>r.cLen>r.maxD).length+"/"+qs.length+")");
  rows.forEach(r=>{
    const need = r.cLen>r.maxD && !leave.has(r.i);
    if(!need){console.log("Q"+r.i+"  [OK/leave] correct(idx"+r.c+") len="+r.cLen+" maxDistr="+r.maxD);return;}
    console.log("Q"+r.i+"  EXPAND distractor idx"+r.shortest+" (len "+r.shortestLen+") past correctLen "+r.cLen);
    console.log("   correct(idx"+r.c+"): "+qs[r.i].options[r.c]);
    console.log("   expand (idx"+r.shortest+"): "+qs[r.i].options[r.shortest]);
  });
}
