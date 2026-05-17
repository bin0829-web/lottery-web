const PASSWORD="nm4dj2026";

function requireAuth(){
  if(sessionStorage.getItem("nm4dj_auth")!=="yes"){
    location.href="../";
  }
}

function login(){
  const input=document.getElementById("passwordInput");
  const msg=document.getElementById("passwordMsg");
  if(input.value===PASSWORD){
    sessionStorage.setItem("nm4dj_auth","yes");
    document.getElementById("lock").classList.add("hidden");
  }else{
    msg.textContent="密碼錯誤";
  }
}

function initLogin(){
  if(sessionStorage.getItem("nm4dj_auth")==="yes"){
    const lock=document.getElementById("lock");
    if(lock)lock.classList.add("hidden");
  }
  const input=document.getElementById("passwordInput");
  if(input) input.addEventListener("keydown",e=>{if(e.key==="Enter")login()});
}

function logout(){
  sessionStorage.removeItem("nm4dj_auth");
  location.href="/";
}

function makeId(){return"p_"+Date.now()+"_"+Math.floor(Math.random()*999999)}
function normalizeAngle(a){return((a%360)+360)%360}
function easeOutCubic(t){return 1-Math.pow(1-t,3)}
function escapeAttr(str){return String(str??"").replaceAll("&","&amp;").replaceAll('"',"&quot;").replaceAll("<","&lt;").replaceAll(">","&gt;")}
function escapeHtml(str){return String(str??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function makeVerifyCode(str){
  let h1=0xdeadbeef,h2=0x41c6ce57;
  for(let i=0;i<str.length;i++){const ch=str.charCodeAt(i);h1=Math.imul(h1^ch,2654435761);h2=Math.imul(h2^ch,1597334677)}
  h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);
  h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);
  return"V-"+(4294967296*(2097151&h2)+(h1>>>0)).toString(36).toUpperCase();
}
function weightedPick(pool){
  const total=pool.reduce((s,x)=>s+x.weight,0);let r=Math.random()*total;
  for(const p of pool){r-=p.weight;if(r<=0)return p}
  return pool[pool.length-1];
}
function defaultPrizes(){return[{id:makeId(),name:"一獎",quota:1,drawn:0},{id:makeId(),name:"二獎",quota:3,drawn:0},{id:makeId(),name:"三獎",quota:10,drawn:0}]}

function unlockAudio(data){
  try{if(!data.audio)data.audio=new(window.AudioContext||window.webkitAudioContext)();if(data.audio.state==="suspended")data.audio.resume()}catch(e){}
}
function playTickSound(data){
  try{unlockAudio(data);const osc=data.audio.createOscillator(),gain=data.audio.createGain();osc.type="square";osc.frequency.setValueAtTime(950,data.audio.currentTime);gain.gain.setValueAtTime(.035,data.audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,data.audio.currentTime+.035);osc.connect(gain);gain.connect(data.audio.destination);osc.start();osc.stop(data.audio.currentTime+.04)}catch(e){}
}
function playGachaSound(data){
  try{unlockAudio(data);let t=data.audio.currentTime;for(let i=0;i<9;i++){const osc=data.audio.createOscillator(),gain=data.audio.createGain();osc.type="square";osc.frequency.setValueAtTime(240+Math.random()*260,t+i*.11);gain.gain.setValueAtTime(.035,t+i*.11);gain.gain.exponentialRampToValueAtTime(.001,t+i*.11+.05);osc.connect(gain);gain.connect(data.audio.destination);osc.start(t+i*.11);osc.stop(t+i*.11+.06)}}catch(e){}
}