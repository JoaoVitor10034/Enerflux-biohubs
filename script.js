(function(){
var K0='enerflux-demo-v1',$=function(i){return document.getElementById(i)},user='';try{user=localStorage.getItem(K0+':user')||''}catch(e){}
function KK(){return K0+':h:'+(user||'visitante')}
var MAXKG=1000,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var MATERIALS=[{nome:'Bagaço de cana',cat:'Vegetal',ico:'🌾',kwh:1.1,bg:.07},{nome:'Borra de café',cat:'Doméstico',ico:'☕',kwh:1.3,bg:.09},{nome:'Casca de arroz',cat:'Agroindustrial',ico:'🌱',kwh:1,bg:.06},{nome:'Podas e resíduos de jardim',cat:'Vegetal',ico:'🌿',kwh:.8,bg:.05},{nome:'Restos de alimentos',cat:'Doméstico',ico:'🍎',kwh:1.2,bg:.11},{nome:'Dejetos animais',cat:'Pecuária',ico:'🐄',kwh:.9,bg:.12},{nome:'Óleo de cozinha usado',cat:'Doméstico',ico:'🛢️',kwh:2.5,bg:.15},{nome:'Resíduos agroindustriais',cat:'Agroindustrial',ico:'🏭',kwh:1.1,bg:.08}];
var brl=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}),nf2=function(n){return n.toLocaleString('pt-BR',{maximumFractionDigits:2})};
function calc(o,kg){var e=kg*o.kwh,v=e*0.75;return{e:e,b:kg*o.bg,cr:v*0.7,f:v*0.3}}
var fmt=function(n){return n.toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1})};
var mem=[],store=true;
function load(){try{var r=localStorage.getItem(KK());var d=r?JSON.parse(r):[];return Array.isArray(d)?d.filter(function(x){return x&&typeof x.kg==='number'&&isFinite(x.kg)&&x.m}):[]}catch(e){store=false;return mem}}
function save(h){mem=h;try{localStorage.setItem(KK(),JSON.stringify(h));$('stmsg').textContent=''}catch(e){store=false;$('stmsg').textContent='Armazenamento local indisponível: os dados valem só enquanto esta página estiver aberta.'}}
var hist=load();

// menu
var mb=$('mb'),mn=$('menu');
mb.onclick=function(){var o=mn.classList.toggle('open');mb.setAttribute('aria-expanded',o);mb.textContent=o?'✕':'☰'};
function closeM(){mn.classList.remove('open');mb.setAttribute('aria-expanded','false');mb.textContent='☰'}
mn.addEventListener('click',function(e){if(e.target.closest('a'))closeM()});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&mn.classList.contains('open')){closeM();mb.focus()}});

// fluxo BioATM
var sel=-1,filt='Todos',FILT=['Todos','Doméstico','Vegetal','Agroindustrial','Pecuária'];
function drawMats(){var ch=$('chips');ch.innerHTML='';FILT.forEach(function(f){var b=document.createElement('button');b.type='button';b.className='fb'+(f===filt?' on':'');b.textContent=f;b.setAttribute('aria-pressed',f===filt);b.onclick=function(){filt=f;drawMats()};ch.appendChild(b)});
var m=$('mats');m.innerHTML='';MATERIALS.forEach(function(x,i){if(filt!=='Todos'&&x.cat!==filt)return;var l=document.createElement('label');l.className='opt';l.innerHTML='<input type="radio" name="mat" value="'+i+'"'+(i===sel?' checked':'')+'><span><span aria-hidden="true" style="font-size:1.5rem;display:block">'+x.ico+'</span><b></b><small class="muted" style="display:block;font-weight:400"></small></span>';l.querySelector('b').textContent=x.nome;l.querySelector('small').textContent=x.cat;l.querySelector('input').onchange=function(){sel=i};m.appendChild(l)})}
drawMats();
var cur={m:null,kg:null},panels=['p1','p2','p3','p4'];
function go(n){panels.forEach(function(p,i){$(p).hidden=(i+1)!==n});$('msgc').hidden=true;
document.querySelectorAll('.steps li').forEach(function(li){var s=+li.dataset.s;li.className=s<n?'done':'';if(s===n)li.setAttribute('aria-current','step');else li.removeAttribute('aria-current')});
var f=$(panels[n-1]).querySelector('input,button');if(f)f.focus({preventScroll:true})}
go(1);
$('h2').textContent='Limites da demonstração: de 0,1 kg a '+MAXKG+' kg.';
$('p1').onsubmit=function(e){e.preventDefault();var c=document.querySelector('input[name=mat]:checked');if(!c){$('e1').textContent='Selecione um material para continuar.';return}$('e1').textContent='';cur.m=MATS[+c.value];go(2)};
$('p2').onsubmit=function(e){e.preventDefault();var v=$('kg').value.trim().replace(',','.');var n=Number(v);
if(!v){$('e2').textContent='Informe a massa em kg.';return}
if(!isFinite(n)||isNaN(n)){$('e2').textContent='Digite apenas números, por exemplo 2,5.';return}
if(n<0.1||n>MAXKG){$('e2').textContent='Valor fora do limite da demonstração (0,1 a '+MAXKG+' kg).';return}
$('e2').textContent='';cur.kg=Math.round(n*10)/10;$('rm').textContent=cur.m;$('rk').textContent=fmt(cur.kg)+' kg';go(3)};
document.querySelectorAll('[data-back]').forEach(function(b){b.onclick=function(){go(+b.dataset.back)}});
$('cancel').onclick=function(){cur={m:null,kg:null};$('kg').value='';document.querySelectorAll('input[name=mat]').forEach(function(r){r.checked=false});go(1);$('msgc').hidden=false};
$('reg').onclick=function(){var b=$('reg');b.disabled=true;b.textContent='Registrando…';
setTimeout(function(){try{var now=new Date(),id='DEMO-'+now.getTime().toString(36).toUpperCase();
var rec={id:id,m:cur.m,kg:cur.kg,t:now.toISOString()};hist.unshift(rec);save(hist);
$('oid').textContent=id;$('om').textContent=rec.m;$('ok').textContent=fmt(rec.kg)+' kg';$('ot').textContent=now.toLocaleString('pt-BR');
render();go(4)}catch(x){$('e3').textContent='Falha ao registrar. Tente novamente.'}
b.disabled=false;b.textContent='Registrar depósito simulado'},500)};
$('novo').onclick=function(){cur={m:null,kg:null};$('kg').value='';document.querySelectorAll('input[name=mat]').forEach(function(r){r.checked=false});go(1)};

// impacto + comunidade
function render(){
var tot=hist.reduce(function(s,h){return s+h.kg},0);$('kn').textContent=hist.length;$('kt').textContent=fmt(tot);
var by={};hist.forEach(function(h){by[h.m]=(by[h.m]||0)+h.kg});var CS=['#176B4D','#E6A23C','#175CD3','#B42318','#6941C6'];var ks=Object.keys(by),c=$('chart');c.innerHTML='';$('donut').innerHTML='';
if(!ks.length){c.innerHTML='<div class="empty">Ainda não há registros. Faça um depósito simulado no BioATM para ver o gráfico.</div>';$('chartsum').textContent=''}
else{var txt=[];ks.forEach(function(k,ix){var p=by[k]/tot*100;var d=document.createElement('div');d.style.marginBottom='10px';
d.innerHTML='<div style="display:flex;justify-content:space-between;font-size:.9rem"><span></span><b>'+fmt(by[k])+' kg · '+Math.round(p)+'%</b></div><div class="bar"><i style="width:'+p+'%"></i></div>';d.querySelector('span').textContent=k;d.querySelector('i').style.background=CS[ix%5];c.appendChild(d);txt.push(k+': '+fmt(by[k])+' kg ('+Math.round(p)+'%)')});
var R=40,C=2*Math.PI*R,off=0,sv='<svg viewBox="0 0 100 100" width="150" height="150" role="img" aria-label="Gráfico de rosca da massa simulada por categoria"><circle cx="50" cy="50" r="40" fill="none" stroke="var(--gl)" stroke-width="16"/>';
ks.forEach(function(k,ix){var l=by[k]/tot*C;sv+='<circle cx="50" cy="50" r="40" fill="none" stroke="'+CS[ix%5]+'" stroke-width="16" stroke-dasharray="'+l+' '+(C-l)+'" stroke-dashoffset="'+(-off)+'" transform="rotate(-90 50 50)"/>';off+=l});
sv+='<text x="50" y="54" text-anchor="middle" font-size="11" font-weight="800" fill="currentColor">'+fmt(tot)+' kg</text></svg>';$('donut').innerHTML=sv;
$('chartsum').textContent='Resumo em texto — valores simulados: '+txt.join('; ')+'.'}
var h=$('hist');
if(!hist.length)h.innerHTML='<div class="empty">Nenhum registro neste navegador.</div>';
else{var t=document.createElement('table');t.innerHTML='<thead><tr><th>ID</th><th>Material</th><th>kg</th><th>Horário</th><th>Status</th></tr></thead><tbody></tbody>';
hist.slice(0,8).forEach(function(r){var tr=document.createElement('tr');[r.id,r.m,fmt(r.kg),new Date(r.t).toLocaleString('pt-BR'),'Simulado'].forEach(function(v){var td=document.createElement('td');td.textContent=v;tr.appendChild(td)});t.tBodies[0].appendChild(tr)});h.innerHTML='';h.appendChild(t)}
meta()}
function meta(){var m=Number($('meta').value);var tot=hist.reduce(function(s,h){return s+h.kg},0);
if(!isFinite(m)||m<1){$('mp').textContent='—';return}
var p=Math.min(100,tot/m*100);$('mp').textContent=Math.round(p)+'%';$('mt').textContent=fmt(tot);$('mbar').setAttribute('aria-valuenow',Math.round(p));$('mbar').firstChild.style.width=p+'%'}
$('meta').oninput=meta;
$('clr').onclick=function(){if(!hist.length||!confirm('Apagar todos os registros simulados deste navegador?'))return;hist=[];save(hist);render()};
function sess(){$('mout').hidden=!!user;$('min').hidden=!user;$('mn').textContent=user}
$('mf').onsubmit=function(e){e.preventDefault();var v=$('ap').value.trim();
if(!/^[A-Za-zÀ-ÿ0-9 ._-]{2,30}$/.test(v)){$('eap').textContent='Use de 2 a 30 caracteres: letras, números, espaços, ponto, hífen ou _.';return}
$('eap').textContent='';user=v;try{localStorage.setItem(K0+':user',v)}catch(x){}hist=load();sess();render()};
$('sair').onclick=function(){user='';try{localStorage.removeItem(K0+':user')}catch(x){}hist=load();sess();render()};
function sleep(ms){return new Promise(function(r){setTimeout(r,RM?20:ms)})}
var STEPS=['Material identificado','Massa informada registrada','Calculando potencial energético (estimativa)','Estimando biogás (estimativa)','Registrando depósito simulado'];
async function stab(){var kg=parseFloat($('kg').value.replace(',','.')),r=$('scV');if(!(kg>0)){r.textContent='0,0';$('scT').textContent='AGUARDANDO PESO';return}$('scT').textContent='LENDO VALOR…';for(var i=0;i<5;i++){r.textContent=fmt(kg*(1+(Math.random()-.5)*.2*(4-i)/4));await sleep(90)}r.textContent=fmt(kg);$('scT').textContent='VALOR INFORMADO · SIMULAÇÃO'}
var tmr;$('kg').addEventListener('input',function(){clearTimeout(tmr);tmr=setTimeout(stab,400)});
$('p1').onsubmit=function(e){e.preventDefault();if(sel<0){$('e1').textContent='Selecione um material para continuar.';return}$('e1').textContent='';cur.o=MATERIALS[sel];cur.m=cur.o.nome;go(2);stab()};
['cancel','novo'].forEach(function(i){$(i).addEventListener('click',function(){sel=-1;drawMats()})});
$('reg').onclick=async function(){var bs=$('p3').querySelectorAll('button');bs.forEach(function(x){x.disabled=true});$('e3').textContent='';var ul=$('proc'),pb=$('pb');ul.hidden=false;pb.hidden=false;ul.innerHTML='';STEPS.forEach(function(s){var li=document.createElement('li');li.textContent=s;ul.appendChild(li)});
try{for(var i=0;i<STEPS.length;i++){await sleep(500);ul.children[i].className='done';pb.firstChild.style.width=((i+1)/STEPS.length*100)+'%'}
var now=new Date(),id='DEMO-'+now.getTime().toString(36).toUpperCase(),c=calc(cur.o,cur.kg),rec={id:id,m:cur.m,kg:cur.kg,t:now.toISOString(),e:c.e,b:c.b,cr:c.cr,f:c.f};hist.unshift(rec);save(hist);
$('oid').textContent=id;$('om').textContent=rec.m;$('ok').textContent=fmt(rec.kg)+' kg';$('ot').textContent=now.toLocaleString('pt-BR');
var d=document.createElement('dl');[['Potencial energético estimado',nf2(c.e)+' kWh'],['Biogás estimado',nf2(c.b)+' m³'],['Crédito conceitual (ilustrativo)',brl.format(c.cr)],['Fundo BioHub (ilustrativo)',brl.format(c.f)],['Equivalência didática',nf2(c.e*100)+' h de LED de 10 W']].forEach(function(r){var a=document.createElement('dt'),z=document.createElement('dd');a.textContent=r[0];z.textContent=r[1];d.appendChild(a);d.appendChild(z)});$('calc').innerHTML='';$('calc').appendChild(d);
render();go(4)}catch(x){$('e3').textContent='Falha ao registrar. Tente novamente.'}
bs.forEach(function(x){x.disabled=false});ul.hidden=true;pb.hidden=true;pb.firstChild.style.width='0'};
function countTo(el,to,dec){var f=el._v||0;el._v=to;var fm=function(v){return v.toLocaleString('pt-BR',{minimumFractionDigits:dec,maximumFractionDigits:dec})};if(RM){el.textContent=fm(to);return}var t0=performance.now();(function s(n){var p=Math.min(1,(n-t0)/700);el.textContent=fm(f+(to-f)*p);if(p<1)requestAnimationFrame(s)})(t0)}
var _r=render;render=function(){_r();var s=function(k){return hist.reduce(function(t,h){return t+(h[k]||0)},0)};countTo($('ke'),s('e'),1);countTo($('kb'),s('b'),2);countTo($('kl'),s('e')*100,0);$('kc').textContent=brl.format(s('cr'))};
var ct=$('catalog');MATERIALS.forEach(function(x){var d=document.createElement('div');d.textContent=x.ico+' '+x.nome+' · '+x.cat+' · ~'+x.kwh.toLocaleString('pt-BR')+' kWh/kg (estimativa educacional)';ct.appendChild(d)});var rj=document.createElement('div');rj.textContent='✖ Não são biomassa: plástico, vidro, metal, resíduos perigosos';ct.appendChild(rj);
document.querySelectorAll('a[href="#metodo"]').forEach(function(a){a.addEventListener('click',function(){$('metodo').open=true})});
$('pres').onclick=function(){var o=document.body.classList.toggle('pres');this.setAttribute('aria-pressed',o);this.textContent=o?'Sair do modo apresentação':'Modo apresentação'};
sess();hist=load();
render();
})();
