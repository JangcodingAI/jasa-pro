
const $=id=>document.getElementById(id),Q=s=>document.querySelectorAll(s);
const num=n=>new Intl.NumberFormat('id-ID').format(n||0),rp=n=>'Rp '+num(n);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const br=s=>esc(s).replace(/\n/g,'<br>');
const isoDate=d=>{const x=d||new Date(),p=n=>String(n).padStart(2,'0');return x.getFullYear()+'-'+p(x.getMonth()+1)+'-'+p(x.getDate())};
const today=isoDate();
const fd=d=>d?new Date(d+'T00:00').toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'}):'-';
function terb(n){n=Math.floor(n);const s=["","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"];const t=(a,b)=>a?" "+terb(a):"";
 if(n<12)return s[n];if(n<20)return terb(n-10)+" belas";if(n<100)return terb(Math.floor(n/10))+" puluh"+(n%10?" "+terb(n%10):"");
 if(n<200)return "seratus"+(n%100?" "+terb(n%100):"");if(n<1e3)return terb(Math.floor(n/100))+" ratus"+(n%100?" "+terb(n%100):"");
 if(n<2e3)return "seribu"+(n%1e3?" "+terb(n%1e3):"");if(n<1e6)return terb(Math.floor(n/1e3))+" ribu"+(n%1e3?" "+terb(n%1e3):"");
 if(n<1e9)return terb(Math.floor(n/1e6))+" juta"+(n%1e6?" "+terb(n%1e6):"");if(n<1e12)return terb(Math.floor(n/1e9))+" miliar"+(n%1e9?" "+terb(n%1e9):"");
 return terb(Math.floor(n/1e12))+" triliun"+(n%1e12?" "+terb(n%1e12):"")}
const ym=today.slice(0,4)+'/'+today.slice(5,7);
const blankS=()=>({company:"",compAddr:"",client:"",clientAddr:"",project:"",title:"RAB HARGA JASA TENAGA KERJA",subtitle:"",date:today,t1:"",t2:"",notes:"",
 invNo:"INV/"+ym+"/001",invDate:today,due:today,status:"BELUM DIBAYAR",ppn:0,dp:0,bank:"",rek:"",an:"",invNotes:"",signer:"",rows:[]});
const SMP={company:"Nama Perusahaan Anda",compAddr:"Alamat perusahaan\nTelp. 08xx-xxxx-xxxx",project:"Modifikasi Pipa Cooling Tower",subtitle:"PEKERJAAN MODIFIKASI PIPA COOLING TOWER",t1:"Kerja dengan Profesional",t2:"Hasil yang Memuaskan",bank:"Bank BCA",rek:"1234567890",an:"Nama Perusahaan Anda",signer:"Nama Penanggung Jawab"};
function cleanSample(o){o=Object.assign({},o);for(const k in SMP)if(o[k]===SMP[k])o[k]='';if(/^Harga merupakan jasa tenaga kerja\./.test(o.notes||''))o.notes='';if(/^Mohon pembayaran dilakukan sebelum/.test(o.invNotes||''))o.invNotes='';
 if(Array.isArray(o.rows)&&o.rows.length===9&&/galvanis 10/.test((o.rows[0]||{}).d||''))o.rows=[];return o}
let S=blankS();
let photos=[];
const DS={brand:'Jasa Pro',tag:'RAB & Invoice Maker',mode:'auto',app:'#0b5cb8',doc:'',tpl:'classic',font:'Inter',logoH:true,logoF:true,logo:''};
let ST=Object.assign({},DS);try{Object.assign(ST,JSON.parse(localStorage.getItem('rabinv-set')||'{}'))}catch(e){}
const DEFLOGO=LOGO;if(ST.logo)LOGO=ST.logo;let LH=ST.logoH!==false,LF=ST.logoF!==false;
const mixc=(h,t,p)=>{const f=x=>[1,3,5].map(i=>parseInt(x.slice(i,i+2),16)),a=f(h),b=f(t);return '#'+a.map((v,i)=>Math.round(v+(b[i]-v)*p).toString(16).padStart(2,'0')).join('')};
const pal=h=>({'--a0':mixc(h,'#000000',.22),'--a1':h,'--a2':mixc(h,'#ffffff',.1),'--a3':mixc(h,'#ffffff',.38),'--l1':mixc(h,'#ffffff',.9),'--l2':mixc(h,'#ffffff',.95),'--l3':mixc(h,'#ffffff',.82)});
const cfgNow=()=>({tpl:ST.tpl,col:ST.doc||ST.app,font:ST.font,logoH:ST.logoH!==false,logoF:ST.logoF!==false,logo:ST.logo||''});
const entryCfg=e=>Object.assign({tpl:'classic',col:'#0b5cb8',font:'Inter',logoH:true,logoF:true,logo:''},e.cfg||{});
function deco(el,c){el.className='sheet t-'+c.tpl;const v=pal(c.col);for(const k in v)el.style.setProperty(k,v[k]);el.style.setProperty('--df',`"${c.font}",Inter,"Segoe UI",Arial,sans-serif`)}
function applyApp(){const r=document.documentElement,v=pal(ST.app);r.style.setProperty('--pri',ST.app);r.style.setProperty('--sa',mixc(ST.app,'#000000',.6));r.style.setProperty('--sb',mixc(ST.app,'#000000',.2));
 ST.mode==='auto'?r.removeAttribute('data-theme'):r.dataset.theme=ST.mode;
 document.querySelector('.brand div').firstChild.textContent=ST.brand;document.querySelector('.brand small').textContent=ST.tag;document.querySelector('.blogo').src=LOGO}
function saveST(){LH=ST.logoH!==false;LF=ST.logoF!==false;try{localStorage.setItem('rabinv-set',JSON.stringify(ST))}catch(e){}kvSave('settings');applyApp();render()}

try{const x=JSON.parse(localStorage.getItem('rabinv')||'null');if(x)S=Object.assign(S,cleanSample(x))}catch(e){}
const fld=(k,l,t='text',ex='')=>`<label>${l}</label><input data-s="${k}" type="${t}" ${ex}>`;
const area=(k,l,r=3)=>`<label>${l}</label><textarea data-s="${k}" rows="${r}"></textarea>`;
$('fData').innerHTML=`<div class="card"><h2>Perusahaan (Penyedia Jasa)</h2>${fld('company','Nama perusahaan')}${area('compAddr','Alamat & kontak')}</div>
<div class="card"><h2>Klien</h2>${fld('client','Nama klien / perusahaan')}${area('clientAddr','Alamat klien')}${fld('project','Nama proyek / pekerjaan')}</div>`;
$('fRabT').innerHTML=fld('title','Judul')+fld('subtitle','Sub judul')+fld('date','Tanggal penawaran','date');
$('fInv').innerHTML=fld('invNo','Nomor invoice')+`<div class="two"><div>${fld('invDate','Tanggal invoice','date')}</div><div>${fld('due','Jatuh tempo','date')}</div></div>
<label>Status</label><select data-s="status"><option>BELUM DIBAYAR</option><option>LUNAS</option></select>
<div class="two"><div>${fld('ppn','PPN (%)','number','min="0" step="0.1"')}</div><div>${fld('dp','Uang muka / DP (Rp)','number','min="0"')}</div></div>${fld('signer','Nama penanda tangan')}`;
$('fPay').innerHTML=fld('bank','Nama bank')+fld('rek','Nomor rekening')+fld('an','Atas nama')+area('invNotes','Catatan invoice',3);
const PH={company:'Nama perusahaan Anda',compAddr:'Alamat lengkap & nomor telepon',client:'Nama klien / perusahaan',clientAddr:'Alamat klien',project:'mis. Modifikasi pipa cooling tower',subtitle:'mis. Pekerjaan modifikasi pipa',notes:'Satu catatan per baris',bank:'mis. Bank BCA',rek:'Nomor rekening',an:'Nama pemilik rekening',signer:'Nama penanggung jawab',invNotes:'Satu catatan per baris',t1:'Slogan baris 1 (opsional)',t2:'Slogan baris 2 (opsional)'};
function bind(){Q('[data-s]').forEach(e=>{e.value=S[e.dataset.s]??'';const p=PH[e.dataset.s];if(p)e.placeholder=p})}
const total=()=>S.rows.reduce((s,r)=>s+(Number(r.p)||0),0);
function renderRows(){$('rows').innerHTML=!S.rows.length?'<div class="empty-h" style="padding:22px 12px;margin-bottom:10px">Belum ada pekerjaan.<br>Klik “+ Tambah pekerjaan” di bawah.</div>':S.rows.map((r,i)=>`<div class="row"><div class="top"><span class="n">${i+1}</span><input data-i="${i}" data-k="d" value="${esc(r.d)}" placeholder="Uraian pekerjaan"><button class="del" data-del="${i}" aria-label="Hapus pekerjaan ${i+1}" title="Hapus pekerjaan">✕</button></div>
<div class="two" style="margin-top:6px"><div><label>Qty</label><input data-i="${i}" data-k="q" value="${esc(r.q)}"></div><div><label>Harga jasa (Rp)</label><input data-i="${i}" data-k="p" type="number" min="0" inputmode="numeric" value="${r.p||''}"></div></div></div>`).join('')}
const ICONF=()=>LH?`<img class="ic" src="${LOGO}">`:'';
const head=(a,b)=>`<div class="hd">${ICONF()}<div><h1>${esc(a)}</h1>${b?`<h2>${esc(b)}</h2>`:''}</div></div>`;
const foot=(lab,val)=>`<div class="ft"><div class="l">${LF?`<img class="flogo" src="${LOGO}">`:''}<span>${esc(S.t1)}<br>${esc(S.t2)}</span></div><div class="tt">${lab}<div class="pill">${val}</div></div></div><div class="wave"></div>`;
const table=()=>`<table><thead><tr><th style="width:52px">No</th><th>Uraian Pekerjaan</th><th style="width:96px">Qty</th><th style="width:150px">Harga Jasa<small>(Rp)</small></th></tr></thead>
<tbody>${!S.rows.length?'<tr><td colspan="4" style="color:#8aa0bf;padding:28px 10px">Belum ada uraian pekerjaan</td></tr>':S.rows.map((r,i)=>`<tr><td><b>${i+1}</b></td><td>${esc(r.d)}</td><td>${esc(r.q)}</td><td class="r">${num(Number(r.p))}</td></tr>`).join('')}</tbody>
<tfoot><tr><td colspan="3" style="text-align:center;letter-spacing:.1em">TOTAL</td><td class="r">${rp(total())}</td></tr></tfoot></table>`;
const li=t=>t.split("\n").filter(x=>x.trim());
function buildRab(){const n=li(S.notes);
return head(S.title,S.subtitle)+`<div class="bd">${table()}
${n.length?`<div class="note"><div class="nic"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 12h6M9 16h4"/></svg></div><div><b>Catatan:</b><ul>${n.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></div>`:''}
<div class="doc"><span class="tab"><span class="cam"></span>DOKUMENTASI PEKERJAAN</span>
${photos.length?photoHtml(photos):'<div class="box full"><div class="empty">Unggah foto dokumentasi pekerjaan</div></div>'}</div></div>`+foot('Total Penawaran Harga:',rp(total()))}
const PR=new Map();
function pr(p){let r=PR.get(p);if(r)return r;if(!PR.has(p)){PR.set(p,0);const im=new Image();im.onload=()=>{PR.set(p,im.naturalWidth/im.naturalHeight||4/3);render()};im.onerror=()=>PR.set(p,4/3);im.src=p}return 4/3}
const ensureRatio=p=>PR.get(p)?Promise.resolve():new Promise(ok=>{const im=new Image();im.onload=()=>{PR.set(p,im.naturalWidth/im.naturalHeight||4/3);ok()};im.onerror=()=>{PR.set(p,4/3);ok()};im.src=p});
const photoHtml=ps=>{
 /* kelompokkan sesuai urutan upload: potret=1/4 baris, lanskap=1/2 baris (maks 4 potret / 2 lanskap) */
 const rows=[];let cur=[],w=0;
 ps.forEach(p=>{const r=Math.min(2.4,Math.max(.4,pr(p)));const wt=r>=1?.5:.25;
  if(cur.length&&w+wt>1.0001){rows.push(cur);cur=[];w=0}
  cur.push({p,r});w+=wt;if(w>=.9999){rows.push(cur);cur=[];w=0}});
 if(cur.length)rows.push(cur);
 let n=0;const CAP=300;/* tinggi maksimum per baris (px) agar baris tidak terlalu raksasa */
 return '<div class="box">'+rows.map(row=>{const sum=row.reduce((a,x)=>a+x.r,0);
  const maxW=Math.min(sum*CAP+(row.length-1)*6,728).toFixed(1)+'px';
  return '<div class="prow" style="width:'+maxW+'">'+row.map(x=>`<div class="pf" style="flex:${x.r.toFixed(4)} 1 0;aspect-ratio:${x.r.toFixed(4)}"><span class="pn">${++n}</span><img src="${x.p}"></div>`).join('')+'</div>'}).join('')+'</div>'};
function renderRab(){const e=$('poster');e.innerHTML=buildRab();deco(e,cfgNow())}
function renderInv(){const e=$('invoice');e.innerHTML=buildInv();deco(e,cfgNow())}
function calc(){const sub=total(),pp=Math.round(sub*(S.ppn||0)/100),tot=sub+pp,sisa=Math.max(0,tot-(S.dp||0));return{sub,pp,tot,sisa}}
function buildInv(){const c=calc(),lunas=S.status==='LUNAS';
return head('INVOICE','Pelunasan'+(S.project?' '+S.project:''))+`<div class="bd"><div class="info"><div><h4>Dari</h4><b>${esc(S.company||'-')}</b><br>${br(S.compAddr)}<h4 style="margin-top:10px">Ditagihkan kepada</h4><b>${esc(S.client||'-')}</b><br>${br(S.clientAddr)}</div>
<div class="meta"><div><span>No. Invoice</span><b>${esc(S.invNo)}</b></div><div><span>Tanggal</span><b>${fd(S.invDate)}</b></div><div><span>Jatuh Tempo</span><b>${fd(S.due)}</b></div><div><span>Status</span><b style="color:${lunas?'#1a9a55':'#c2410c'}">${esc(S.status)}</b></div></div></div>
${table().replace(/<tfoot>.*<\/tfoot>/,'')}
<div class="sum"><div><span>Subtotal</span><span>${rp(c.sub)}</span></div>${S.ppn>0?`<div><span>PPN ${S.ppn}%</span><span>${rp(c.pp)}</span></div>`:''}<div><span>Total Tagihan</span><b>${rp(c.tot)}</b></div>
${S.dp>0?`<div><span>Uang Muka (DP)</span><span>- ${rp(S.dp)}</span></div>`:''}<div class="big"><span>${lunas?'Total Dibayar':'Sisa Pelunasan'}</span><span>${rp(c.sisa)}</span></div></div>
${lunas?'<div class="stamp">LUNAS</div>':''}
<div class="terb">Terbilang: ${esc(c.sisa?terb(c.sisa).replace(/^./,m=>m.toUpperCase()):'Nol')} rupiah</div>
<div class="pay"><div><b>Informasi Pembayaran</b><br>${esc(S.bank||'-')}<br>No. Rek: <b>${esc(S.rek||'-')}</b><br>a.n. ${esc(S.an||'-')}${li(S.invNotes).length?'<br><br>'+li(S.invNotes).map(esc).join('<br>'):''}</div>
<div class="sign" style="background:none;padding:0">Hormat kami,<br>${esc(S.company)}<u>${esc(S.signer||'( ........................ )')}</u></div></div></div>
<div style="height:18px"></div>`+foot(lunas?'Status Pembayaran:':'Sisa Pelunasan:',lunas?'LUNAS':rp(c.sisa))}
function renderMisc(){$('totTxt').textContent=rp(total());$('stats').innerHTML=`<div class="stat">Total Penawaran<b>${rp(total())}</b></div><div class="stat">Item Pekerjaan<b>${S.rows.length}</b></div><div class="stat">Foto Dokumentasi<b>${photos.length}</b></div><div class="stat">Sisa Pelunasan<b>${rp(calc().sisa)}</b></div>`;
$('thumbs').innerHTML=photos.map((p,i)=>`<div class="th"><img src="${p}"><button data-rp="${i}" aria-label="Hapus foto ${i+1}" title="Hapus foto">✕</button></div>`).join('')}
function fit(){Q('.stage').forEach(s=>{const p=s.firstElementChild,w=s.clientWidth;if(!w)return;const k=Math.min(1,w/800);p.style.transform=`scale(${k})`;s.style.height=p.offsetHeight*k+'px'})}
function render(){try{localStorage.setItem('rabinv',JSON.stringify(S))}catch(e){}kvSave('draft');renderRab();renderInv();renderMisc();renderSet();fit()}
document.addEventListener('input',e=>{const t=e.target,k=t.dataset.s;if(k){S[k]=t.type==='number'?(Number(t.value)||0):t.value;render()}
 else if(t.dataset.i!=null){S.rows[t.dataset.i][t.dataset.k]=t.value;render()}});
document.addEventListener('click',e=>{const d=e.target.closest('[data-del]'),r=e.target.closest('[data-rp]'),g=e.target.closest('[data-go]');
 if(d){S.rows.splice(d.dataset.del,1);renderRows();render()}if(r){photos.splice(r.dataset.rp,1);render()}if(g)go(g.dataset.go)});
$('addRow').onclick=()=>{S.rows.push({d:'',q:'1 lot',p:0});renderRows();render();const L=Q('#rows [data-k="d"]');L.length&&L[L.length-1].focus()};
$('clrP').onclick=()=>{photos=[];render()};
const shrink=f=>new Promise(res=>{const fr=new FileReader();fr.onload=()=>{const i=new Image();i.onload=()=>{const k=Math.min(1,1400/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);{const u=c.toDataURL('image/jpeg',.85);PR.set(u,c.width/c.height);res(u)}};i.onerror=()=>res(null);i.src=fr.result};fr.readAsDataURL(f)});
$('photo').onchange=async e=>{for(const f of e.target.files){const u=await shrink(f);if(u)photos.push(u)}e.target.value='';render()};
const titles={bud:'Budget Pekerjaan',data:'Data Proyek',rab:'Penawaran (RAB)',inv:'Invoice Pelunasan',his:'Riwayat',set:'Pengaturan'};
function go(p){Q('.page').forEach(x=>x.classList.toggle('on',x.id==='pg-'+p));Q('.nav').forEach(x=>x.classList.toggle('on',x.dataset.p===p));$('topT').textContent=titles[p];if(p==='bud')renderBud();if(p==='set')refreshStorage();$('side').classList.remove('open');scrollTo(0,0);fit()}
Q('.nav').forEach(b=>b.onclick=()=>go(b.dataset.p));$('burger').onclick=()=>$('side').classList.toggle('open');
addEventListener('resize',fit);addEventListener('orientationchange',()=>setTimeout(fit,250));$('scrim').onclick=()=>$('side').classList.remove('open');

/* ===== Riwayat ===== */
let H=[],hf='all',hq='',cur=null,dbp=null,bf='all',dpId=null,B=[];try{B=JSON.parse(localStorage.getItem('rabinv-bud')||'[]')||[]}catch(e){B=[]}
const idb=()=>dbp||(dbp=new Promise((ok,no)=>{try{const r=indexedDB.open('rabinv-hist',2);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains('h'))d.createObjectStore('h',{keyPath:'id'});if(!d.objectStoreNames.contains('kv'))d.createObjectStore('kv',{keyPath:'k'})};r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)}catch(e){no(e)}}));
const tx=async(m,f,st='h')=>{const d=await idb();return new Promise((ok,no)=>{const t=d.transaction(st,m),q=f(t.objectStore(st));t.oncomplete=()=>ok(q&&q.result);t.onerror=()=>no(t.error)})};
const kvGet=k=>tx('readonly',s=>s.get(k),'kv').then(r=>r&&r.v,()=>undefined);
const kvPut=(k,v)=>tx('readwrite',s=>s.put({k,v}),'kv');
let KVR=false;const kvT={};
function kvSave(k){if(!KVR)return;const src={draft:()=>({S,photos}),settings:()=>ST,budget:()=>B}[k];clearTimeout(kvT[k]);kvT[k]=setTimeout(()=>kvPut(k,src()).catch(()=>toast('Gagal menyimpan ke database browser')),350)}
let tmr;const toast=m=>{const t=$('toast');t.textContent=m;t.classList.add('show');clearTimeout(tmr);tmr=setTimeout(()=>t.classList.remove('show'),2600)};
async function loadH(){try{H=(await tx('readonly',s=>s.getAll()))||[]}catch(e){H=[]}H.sort((a,b)=>b.at-a.at);renderHist()}
async function saveH(type){if(!S.rows.length)return toast('Tambahkan minimal satu pekerjaan sebelum menyimpan');const c=calc(),e={id:Date.now()+'-'+Math.random().toString(36).slice(2,6),type,at:Date.now(),snap:JSON.parse(JSON.stringify(S)),photos:type==='rab'?[...photos]:[],cfg:cfgNow(),
 label:type==='rab'?(S.title||'Penawaran'):(S.invNo||'Invoice'),total:type==='rab'?total():c.sisa};
 H.unshift(e);if(type==='rab')ensureBud(e);if(type==='inv'&&S.budId){const b=B.find(x=>x.id===S.budId);if(b){b.inv={no:S.invNo,at:Date.now()};saveB()}}try{await tx('readwrite',s=>s.put(e));toast(type==='rab'?'✔ Tersimpan · Budget Pekerjaan dibuat, kontrak '+rp(e.total):'✔ Tersimpan ke Riwayat')}catch(x){toast('Tersimpan sementara — penyimpanan browser tidak tersedia')}renderHist()}
function htmlOf(e){const oS=S,oP=photos,oL=LOGO,oh=LH,of=LF,c=entryCfg(e);S=e.snap;photos=e.photos||[];if(c.logo)LOGO=c.logo;LH=c.logoH;LF=c.logoF;try{return e.type==='rab'?buildRab():buildInv()}finally{S=oS;photos=oP;LOGO=oL;LH=oh;LF=of}}
const slug=t=>String(t||'').replace(/[^\w]+/g,'-').replace(/^-|-$/g,'').slice(0,40);
const fname=(e,x='jpg')=>(e.type==='rab'?'Penawaran-':'Invoice-')+(slug(e.snap.client||e.snap.project)||'dokumen')+'-'+new Date(e.at).toISOString().slice(0,10)+'.'+x;
async function saveFile(blob,filename){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=filename;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},2000)}
const libLoads={};
const loadScript=src=>libLoads[src]||(libLoads[src]=new Promise((ok,no)=>{const s=document.createElement('script');s.src=src;s.async=true;s.onload=ok;s.onerror=()=>{delete libLoads[src];no(new Error('library'))};document.head.appendChild(s)}));
const toBlob=(c,t,q)=>new Promise(r=>c.toBlob(r,t,q));
async function snap(node){if(!window.html2canvas)await loadScript('./html2canvas.min.js');node.setAttribute('data-cap','1');
 try{return await html2canvas(node,{scale:2,backgroundColor:'#ffffff',useCORS:true,onclone:d=>{const el=d.querySelector('[data-cap]');if(el)el.style.transform='none'}})}
 finally{node.removeAttribute('data-cap')}}
async function saveJpg(node,filename){const c=await snap(node);await saveFile(await toBlob(c,'image/jpeg',.95),filename)}
async function savePdf(node,filename,title){
 if(!window.jspdf)await loadScript('./jspdf.umd.min.js');
 if(!window.jspdf)throw Object.assign(new Error('nolib'),{code:'nolib'});
 const c=await snap(node),{jsPDF}=window.jspdf,pdf=new jsPDF({unit:'mm',format:'a4',orientation:'portrait',compress:true}),PW=210,PH=297,k=PW/c.width,pagePx=Math.floor(PH/k);
 let y=0,first=true;
 while(y<c.height-2){const h=Math.min(pagePx,c.height-y),s=document.createElement('canvas');s.width=c.width;s.height=h;const x=s.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,s.width,h);x.drawImage(c,0,y,c.width,h,0,0,c.width,h);
  if(!first)pdf.addPage();pdf.addImage(s.toDataURL('image/jpeg',.92),'JPEG',0,0,PW,h*k);first=false;y+=h}
 pdf.setProperties({title:title||filename.replace(/\.pdf$/,''),creator:'Jasa Pro'});
 await saveFile(pdf.output('blob'),filename)}
async function dlEntry(e,btn,fmt='jpg'){const old=btn.innerHTML;btn.disabled=true;btn.textContent='Memproses…';await Promise.all((e.photos||[]).map(ensureRatio));const g=$('ghost');
 g.innerHTML='<div class="sheet" style="position:relative">'+htmlOf(e)+'</div>';deco(g.firstChild,entryCfg(e));
 try{try{await document.fonts.load('700 16px "'+entryCfg(e).font+'"')}catch(x){}await Promise.all([...g.querySelectorAll('img')].map(i=>i.decode?i.decode().catch(()=>{}):0));
  if(fmt==='pdf')await savePdf(g.firstChild,fname(e,'pdf'),e.label);else await saveJpg(g.firstChild,fname(e));toast(fmt==='pdf'?'✔ PDF siap disimpan':'✔ Gambar siap disimpan')}
 catch(x){toast(x&&x.code==='declined'?'Unduhan dibatalkan':x&&x.code==='nolib'?'Pustaka PDF belum termuat — muat ulang aplikasi':'Gagal membuat file, coba lagi')}
 g.innerHTML='';btn.disabled=false;btn.innerHTML=old}
function renderHist(){syncBud();const q=hq.toLowerCase(),cnt=t=>H.filter(e=>t==='all'||e.type===t).length;
 ['all','rab','inv'].forEach(t=>$('c-'+t).textContent=cnt(t));Q('.chip').forEach(c=>c.classList.toggle('on',c.dataset.hf===hf));
 const L=H.filter(e=>(hf==='all'||e.type===hf)&&(!q||[e.label,e.snap.client,e.snap.project].join(' ').toLowerCase().includes(q)));
 $('hList').innerHTML=L.length?L.map(e=>`<div class="hc"><div class="hm"><span class="hb ${e.type}">${e.type==='rab'?'Penawaran':'Invoice'}</span><b>${esc(e.label)}</b><span>${esc([e.snap.client||'Tanpa nama klien',e.snap.project].filter(Boolean).join(' · '))}</span><small>Disimpan ${new Date(e.at).toLocaleString('id-ID',{dateStyle:'medium',timeStyle:'short'})}</small></div>
 <div class="ha"><div class="hp"><small>${e.type==='rab'?'Total Penawaran':'Sisa Pelunasan'}</small>${rp(e.total)}</div><div class="hbtn"><button class="ghost" data-a="view" data-id="${e.id}">Lihat</button><button class="ghost" data-a="load" data-id="${e.id}">Edit</button><div class="dlg"><button class="btn pdf" data-a="dlpdf" data-id="${e.id}">⬇ PDF</button><button class="btn" data-a="dl" data-id="${e.id}">⬇ JPG</button></div><button class="del" data-a="del" data-id="${e.id}">Hapus</button></div></div></div>`).join('')
 :`<div class="empty-h"><b>${H.length?'Tidak ada hasil':'Belum ada riwayat'}</b>${H.length?'Coba kata kunci atau filter lain.':'Klik “Simpan ke Riwayat” di halaman Penawaran atau Invoice.'}</div>`}
const closeM=()=>Q('.mask').forEach(m=>m.classList.remove('show'));
document.addEventListener('click',async e=>{const t=e.target,sv=t.closest('[data-save]'),a=t.closest('[data-a]'),c=t.closest('.chip'),cl=t.closest('[data-close]');
 if(sv)return saveH(sv.dataset.save);if(c){hf=c.dataset.hf;return renderHist()}
 if(cl||t.classList.contains('mask'))return closeM();
 if(!a)return;const en=H.find(x=>x.id===a.dataset.id);if(!en)return;cur=en;
 if(a.dataset.a==='dl'||a.dataset.a==='dlpdf')dlEntry(en,a,a.dataset.a==='dlpdf'?'pdf':'jpg');
 else if(a.dataset.a==='view'){await Promise.all((en.photos||[]).map(ensureRatio));$('mvT').textContent=en.label+' — '+(en.snap.client||en.snap.project);$('viewSheet').innerHTML=htmlOf(en);deco($('viewSheet'),entryCfg(en));$('mView').classList.add('show');requestAnimationFrame(fit)}
 else if(a.dataset.a==='load'){S=JSON.parse(JSON.stringify(en.snap));photos=[...(en.photos||[])];bind();renderRows();render();go(en.type);toast('Dimuat ke editor')}
 else if(a.dataset.a==='del'){$('mdT').textContent=en.label+' ('+(en.snap.client||en.snap.project)+') akan dihapus permanen.';$('mDel').classList.add('show')}});
$('mvDl').onclick=()=>cur&&dlEntry(cur,$('mvDl'));$('mvPdf').onclick=()=>cur&&dlEntry(cur,$('mvPdf'),'pdf');
$('mdOk').onclick=async()=>{if(!cur)return;const id=cur.id;try{await tx('readwrite',s=>s.delete(id))}catch(x){}H=H.filter(x=>x.id!==id);B=B.filter(x=>x.id!==id);saveB();renderBud();closeM();renderHist();toast('Dihapus dari riwayat')};
$('hq').oninput=e=>{hq=e.target.value;renderHist()};
loadH();
document.querySelector('.blogo').src=LOGO;
$('closeSide').onclick=()=>{document.body.classList.add('collapsed');$('side').classList.remove('open');setTimeout(fit,300)};
$('openSide').onclick=()=>{document.body.classList.remove('collapsed');setTimeout(fit,300)};
bind();renderRows();render();

/* ===== Pengaturan ===== */
function renderSet(){
 Q('[data-st]').forEach(e=>{if(e===document.activeElement)return;const k=e.dataset.st;e.type==='checkbox'?e.checked=ST[k]!==false:e.value=ST[k]||(k==='doc'?ST.app:'')});
 Q('.sw').forEach(b=>b.classList.toggle('on',b.dataset.c.toLowerCase()===(ST[b.dataset.k]||'').toLowerCase()));
 Q('.tpc').forEach(b=>b.classList.toggle('on',b.dataset.tpl===ST.tpl));Q('[data-mode]').forEach(b=>b.classList.toggle('on',b.dataset.mode===ST.mode));
 $('setLogo').src=LOGO;const sh=$('setSheet');sh.innerHTML=buildRab();deco(sh,cfgNow())}
function readLogo(f){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,320/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.max(1,Math.round(im.width*k));c.height=Math.max(1,Math.round(im.height*k));c.getContext('2d').drawImage(im,0,0,c.width,c.height);ST.logo=c.toDataURL('image/png');LOGO=ST.logo;saveST();toast('✔ Logo diperbarui')};im.onerror=()=>toast('File bukan gambar yang valid');im.src=r.result};r.readAsDataURL(f)}
document.addEventListener('input',e=>{const t=e.target,k=t.dataset.st;if(!k)return;ST[k]=t.type==='checkbox'?t.checked:t.value;saveST()});
document.addEventListener('click',e=>{const t=e.target,sw=t.closest('.sw'),tp=t.closest('.tpc'),md=t.closest('[data-mode]');
 if(sw){ST[sw.dataset.k]=sw.dataset.c;saveST()}else if(tp){ST.tpl=tp.dataset.tpl;saveST()}else if(md){ST.mode=md.dataset.mode;saveST()}
 else if(t.closest('#logoReset')){ST.logo='';LOGO=DEFLOGO;saveST();toast('Logo dikembalikan ke default')}
 else if(t.closest('#setReset')){const b=$('setReset');if(b.dataset.c){ST=Object.assign({},DS);LOGO=DEFLOGO;saveST();b.textContent='Reset Pengaturan';delete b.dataset.c;toast('Pengaturan direset')}else{b.dataset.c=1;b.textContent='Ketuk lagi untuk reset';setTimeout(()=>{delete b.dataset.c;b.textContent='Reset Pengaturan'},3000)}}});
$('logoIn').onchange=e=>{const f=e.target.files[0];if(f)readLogo(f);e.target.value=''};
applyApp();render();

/* ===== Budget Pekerjaan ===== */
const dpSum=b=>b.dps.reduce((s,d)=>s+d.amt,0);
function saveB(){try{localStorage.setItem('rabinv-bud',JSON.stringify(B))}catch(e){}kvSave('budget')}
function ensureBud(e){if(B.some(b=>b.id===e.id))return;B.push({id:e.id,at:e.at,label:e.label,client:e.snap.client||'',project:e.snap.project||'',contract:e.total,dps:[],inv:null});saveB()}
function syncBud(){H.filter(e=>e.type==='rab').forEach(ensureBud);renderBud()}
function renderBud(){if(!$('bList'))return;const q=($('bq').value||'').toLowerCase(),A=B.slice().sort((a,b)=>b.at-a.at);
 const sisaOf=b=>b.contract-dpSum(b),kt=A.reduce((s,b)=>s+b.contract,0),dt=A.reduce((s,b)=>s+dpSum(b),0);
 $('bSum').innerHTML=[['Total Nilai Kontrak',rp(kt),'#0b5cb8'],['Total DP Diterima',rp(dt),'#12a06b'],['Sisa Belum Ditagih',rp(kt-dt),'#d97706'],['Jumlah Proyek',A.length,'#6d28d9']].map(x=>`<div class="bs" style="--ac:${x[2]}"><small>${x[0]}</small><b>${x[1]}</b></div>`).join('');
 const run=A.filter(b=>sisaOf(b)>0).length;$('bc-all').textContent=A.length;$('bc-run').textContent=run;$('bc-done').textContent=A.length-run;
 Q('.bchip').forEach(c=>c.classList.toggle('on',c.dataset.bf===bf));
 const L=A.filter(b=>(bf==='all'||(bf==='run')===(sisaOf(b)>0))&&(!q||[b.label,b.client,b.project].join(' ').toLowerCase().includes(q)));
 $('bList').innerHTML=L.length?L.map(b=>{const dp=dpSum(b),sisa=sisaOf(b),pc=b.contract?Math.min(100,dp/b.contract*100):0,pt=Math.round(pc*10)/10,n=b.dps.length;
  const st=sisa<=0?['s2','Terbayar penuh']:b.inv?['s3','Invoice dibuat']:n?['s1','DP berjalan']:['s0','Belum ada DP'];
  return `<article class="bc"><div class="bc-h"><div><span class="hb rab">Penawaran</span><span class="bst ${st[0]}">${st[1]}</span><h3>${esc(b.label)}</h3><p>${esc([b.client||'Tanpa nama klien',b.project].filter(Boolean).join(' · '))}</p><small>Disimpan ${new Date(b.at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})}</small></div>
  <div class="bc-k"><small>Nilai Kontrak</small><b>${rp(b.contract)}</b><i>🔒 otomatis dari penawaran</i></div></div>
  <div class="bm"><div><small>DP Diterima</small><b>${rp(dp)}</b></div><div class="sisa"><small>Sisa Penawaran</small><b>${rp(sisa)}</b></div></div>
  <div><div class="bar"><i style="width:${pc}%"></i></div></div><div class="bpl"><span>${pt}% terbayar</span><span>${n} DP</span></div>
  <div class="dpl">${b.dps.map((d,i)=>`<div class="dpr"><span class="dpn">DP ${i+1}</span><div><b>${rp(d.amt)}</b><small>${fd(d.date)}${d.note?' · '+esc(d.note):''}</small></div>${i===n-1?`<button class="del" data-bdd="${b.id}" title="Hapus DP terakhir">✕</button>`:''}</div>`).join('')}
  <div class="dpr pel"><span class="dpn">Pelunasan</span><div><b>${rp(sisa)}</b><small>${b.inv?'Invoice '+esc(b.inv.no)+' dibuat':sisa>0?'Sisa yang ditagih di invoice pelunasan':'Tidak ada sisa tagihan'}</small></div></div></div>
  <div class="bc-a"><button class="btn" data-bdp="${b.id}" ${sisa<=0?'disabled':''}>＋ Ambil DP ${n+1}</button><button class="ghost" data-binv="${b.id}">Buat Invoice Pelunasan</button></div></article>`}).join('')
 :`<div class="empty-h" style="grid-column:1/-1"><b>${B.length?'Tidak ada hasil':'Belum ada Budget Pekerjaan'}</b>${B.length?'Coba kata kunci atau filter lain.':'Buka halaman Penawaran lalu klik “Simpan ke Riwayat”. Nilai kontrak langsung terisi di sini.'}${B.length?'':'<br><br><button class="btn" data-go="rab">Buka Penawaran →</button>'}</div>`}
function dpPrev(){const b=B.find(x=>x.id===dpId);if(!b)return;const a=Math.round(Number($('dpAmt').value)||0),s=b.contract-dpSum(b);$('dpPrev').textContent=a>0?`= ${Math.round(a/b.contract*1000)/10}% dari kontrak · sisa setelah DP: ${rp(Math.max(0,s-a))}`:'';$('dpErr').textContent=''}
function openDp(id){const b=B.find(x=>x.id===id);if(!b)return;const s=b.contract-dpSum(b);if(s<=0)return toast('Penawaran ini sudah terbayar penuh');dpId=id;
 $('dpT').textContent='Ambil DP '+(b.dps.length+1);$('dpInfo').innerHTML=`<div><small>Nilai kontrak</small><b>${rp(b.contract)}</b></div><div><small>Sisa penawaran</small><b>${rp(s)}</b></div>`;
 $('dpAmt').value='';$('dpDate').value=today;$('dpNote').value='';dpPrev();$('mDp').classList.add('show');if(innerWidth>900)setTimeout(()=>$('dpAmt').focus(),60)}
function saveDp(){const b=B.find(x=>x.id===dpId);if(!b)return;const a=Math.round(Number($('dpAmt').value)||0),s=b.contract-dpSum(b);
 if(a<=0){$('dpErr').textContent='Masukkan nominal DP.';return}if(a>s){$('dpErr').textContent='Nominal melebihi sisa penawaran ('+rp(s)+').';return}
 b.dps.push({amt:a,date:$('dpDate').value||today,note:$('dpNote').value.trim()});saveB();closeM();renderBud();toast('✔ DP '+b.dps.length+' dicatat · sisa '+rp(s-a))}
function makeInv(id){const b=B.find(x=>x.id===id),en=H.find(x=>x.id===id);if(!b)return;if(!en)return toast('Data penawaran tidak ditemukan di Riwayat');
 S=JSON.parse(JSON.stringify(en.snap));photos=[...(en.photos||[])];
 Object.assign(S,{invNo:'INV/'+ym+'/'+String(H.filter(x=>x.type==='inv').length+1).padStart(3,'0'),invDate:today,due:isoDate(new Date(Date.now()+12096e5)),status:'BELUM DIBAYAR',dp:dpSum(b),budId:id});
 if(calc().sisa<=0)S.status='LUNAS';bind();renderRows();render();go('inv');toast('✔ Invoice pelunasan dibuat · sisa '+rp(calc().sisa))}
document.addEventListener('click',e=>{const t=e.target,p=t.closest('[data-bdp]'),i=t.closest('[data-binv]'),x=t.closest('[data-bdd]'),f=t.closest('[data-bf]'),c=t.closest('[data-pct]');
 if(p)openDp(p.dataset.bdp);else if(i)makeInv(i.dataset.binv);else if(f){bf=f.dataset.bf;renderBud()}
 else if(c){const b=B.find(y=>y.id===dpId);if(!b)return;const s=b.contract-dpSum(b);$('dpAmt').value=c.dataset.pct==='rest'?s:Math.min(s,Math.round(b.contract*c.dataset.pct/100));dpPrev()}
 else if(x){if(x.dataset.c){const b=B.find(y=>y.id===x.dataset.bdd);if(b){b.dps.pop();saveB();renderBud();toast('DP terakhir dihapus')}}else{x.dataset.c=1;x.textContent='Hapus?';setTimeout(()=>{if(x.isConnected){delete x.dataset.c;x.textContent='✕'}},3000)}}});
$('bq').oninput=renderBud;$('dpAmt').oninput=dpPrev;$('dpOk').onclick=saveDp;$('dpAmt').onkeydown=e=>{if(e.key==='Enter')saveDp()};
renderBud();

/* ===== Penyimpanan besar (IndexedDB), cadangan, dokumen baru ===== */
const fmtB=n=>n>=1073741824?(n/1073741824).toFixed(2)+' GB':n>=1048576?(n/1048576).toFixed(1)+' MB':Math.max(1,Math.round(n/1024))+' KB';
async function refreshStorage(){
 $('stH').textContent=H.length;$('stB').textContent=B.length;
 try{const e=await navigator.storage.estimate(),u=e.usage||0,q=e.quota||0;$('stTxt').textContent=fmtB(u)+' terpakai'+(q?' dari ±'+fmtB(q):'');const p=q?Math.max(u?1:0,Math.min(100,u/q*100)):0;$('stBar').style.width=p+'%';$('stPct').textContent=q?(p<1?'<1%':p.toFixed(1)+'%')+' terpakai':''}
 catch(x){$('stTxt').textContent='Estimasi kapasitas tidak tersedia di browser ini'}
 try{const ok=await navigator.storage.persisted(),el=$('stPst');el.classList.toggle('ok',!!ok);el.lastElementChild.textContent=ok?'Penyimpanan permanen aktif — browser tidak akan menghapus data otomatis.':'Browser dapat menghapus data bila ruang perangkat penuh. Buat cadangan secara berkala.'}catch(x){$('stPst').lastElementChild.textContent='Status penyimpanan permanen tidak tersedia'}}
async function bootKV(){
 try{const[d,st,bd]=await Promise.all([kvGet('draft'),kvGet('settings'),kvGet('budget')]);
  if(st&&typeof st==='object'){ST=Object.assign({},DS,st);LOGO=ST.logo||DEFLOGO}
  if(d&&d.S){S=Object.assign(blankS(),cleanSample(d.S));photos=Array.isArray(d.photos)?d.photos:[]}
  if(Array.isArray(bd))B=bd}catch(e){}
 KVR=true;LH=ST.logoH!==false;LF=ST.logoF!==false;
 applyApp();bind();renderRows();render();syncBud();kvSave('settings');kvSave('budget');
 try{navigator.storage&&navigator.storage.persist&&await navigator.storage.persist()}catch(e){}
 refreshStorage();document.body.classList.add('app-ready')}
setTimeout(()=>document.body.classList.add('app-ready'),2500);
$('bkExp').onclick=async()=>{const b=$('bkExp'),old=b.innerHTML;b.disabled=true;b.textContent='Menyiapkan…';
 try{const blob=new Blob([JSON.stringify({app:'rabinv',v:2,at:Date.now(),S,photos,ST,B,H})],{type:'application/json'});await saveFile(blob,'Cadangan-JasaPro-'+today+'.json');toast('✔ Cadangan siap disimpan ('+fmtB(blob.size)+')')}
 catch(x){toast(x&&x.code==='declined'?'Unduhan dibatalkan':'Gagal membuat cadangan')}b.disabled=false;b.innerHTML=old};
$('bkImp').onchange=async e=>{const f=e.target.files[0];e.target.value='';if(!f)return;
 try{const d=JSON.parse(await f.text());if(d.app!=='rabinv')throw 0;let n=0;
  for(const x of(d.H||[])){if(!x||!x.id)continue;try{await tx('readwrite',s=>s.put(x))}catch(_){}if(!H.some(h=>h.id===x.id)){H.push(x);n++}}
  H.sort((a,b)=>b.at-a.at);(d.B||[]).forEach(b=>{if(b&&b.id&&!B.some(y=>y.id===b.id))B.push(b)});saveB();
  if(d.ST){ST=Object.assign({},DS,d.ST);LOGO=ST.logo||DEFLOGO;saveST()}
  if(d.S&&!S.rows.length&&!S.client){S=Object.assign(blankS(),cleanSample(d.S));photos=Array.isArray(d.photos)?d.photos:[];bind();renderRows()}
  render();renderHist();refreshStorage();toast('✔ Cadangan dipulihkan · '+n+' dokumen ditambahkan')}
 catch(x){toast('File cadangan tidak valid')}};
$('newDoc').onclick=()=>{const b=$('newDoc');
 if(!b.dataset.c){b.dataset.c=1;b.textContent='Ketuk lagi untuk kosongkan';setTimeout(()=>{delete b.dataset.c;b.textContent='Dokumen Baru'},3000);return}
 delete b.dataset.c;b.textContent='Dokumen Baru';const k=blankS();['company','compAddr','bank','rek','an','signer','invNotes','t1','t2','notes','title'].forEach(f=>k[f]=S[f]);
 k.invNo='INV/'+ym+'/'+String(H.filter(x=>x.type==='inv').length+1).padStart(3,'0');S=k;photos=[];bind();renderRows();render();toast('Formulir dikosongkan · data perusahaan & rekening dipertahankan')};
document.addEventListener('click',e=>{const b=e.target.closest('[data-cur]');if(!b)return;const type=b.dataset.cur;
 if(!S.rows.length)return toast('Tambahkan minimal satu pekerjaan dulu');
 dlEntry({type,at:Date.now(),snap:JSON.parse(JSON.stringify(S)),photos:[...photos],cfg:cfgNow(),label:type==='rab'?(S.title||'Penawaran'):(S.invNo||'Invoice')},b,b.dataset.fmt||'jpg')});
bootKV();
