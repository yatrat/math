function showMode(i){
  document.querySelectorAll(".tabs button").forEach((b,j)=>b.classList.toggle("active",i===j));
  document.querySelectorAll(".mode").forEach((m,j)=>m.classList.toggle("active",i===j));
}
function calcChange(){
  let o=+old1.value,n=+new1.value;
  if(o<=0)return res1.innerText="Invalid input";
  let c=n-o,p=c/o*100;
  res1.innerText=`Change: ${c.toFixed(2)}, %: ${p.toFixed(2)}%`;
}
function calcAfter(){
  let o=+old2.value,p=+perc2.value;
  let n=o*(1+p/100);
  res2.innerText=`New: ${n.toFixed(2)}`;
}
function calcReverse(){
  let n=+new3.value,p=+perc3.value;
  let o=n/(1+p/100);
  res3.innerText=`Old: ${o.toFixed(2)}`;
}
function calcProfit(){
  let c=+cp.value,s=+sp.value;
  if(c<=0)return res4.innerText="Invalid CP";
  let d=s-c,p=d/c*100;
  res4.innerText=`${d>=0?"Profit":"Loss"}: ${d.toFixed(2)} (${p.toFixed(2)}%)`;
}
function calcMulti(){
  let v=+start.value;
  let a=steps.value.split(",").map(x=>+x.trim()).filter(x=>!isNaN(x));
  if(v<=0||!a.length)return res5.innerText="Invalid input";
  let c=v;a.forEach(p=>c*=1+p/100);
  let net=(c-v)/v*100;
  res5.innerText=`Final: ${c.toFixed(3)}, Net: ${net.toFixed(3)}%`;
}
function calcRecovery(){
  let l=+loss.value;
  if(l<=0||l>=100)return res6.innerText="Enter 0-100";
  let r=l/(100-l)*100;
  res6.innerText=`Recovery needed: ${r.toFixed(2)}%`;
}
function calcTarget(){
  let c=+current.value,t=+target.value;
  if(c<=0)return res7.innerText="Invalid input";
  let p=(t-c)/c*100;
  res7.innerText=`Required change: ${p.toFixed(2)}%`;
}
function calcCompound(){
  let s=+cstart.value,r=+crate.value,n=+period.value;
  if(s<=0||n<0)return res8.innerText="Invalid input";
  let f=s*Math.pow(1+r/100,n);
  let net=(f-s)/s*100;
  res8.innerText=`Final: ${f.toFixed(3)}, Net: ${net.toFixed(3)}%`;
}
