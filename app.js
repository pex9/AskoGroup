const C={ind:'Via Circonvallazione 20, 12040 Montanera (CN)',email:'Info@askogroup.it',
tel:[['Vendita e noleggio','347 373 7723','+393473737723'],['Ufficio','340 641 0762','+393406410762'],['Ufficio (fisso)','0171 472 365','+390171472365']],
wa:['366 345 3727','https://wa.me/393663453727'],
social:[['Facebook','https://www.facebook.com/'],['LinkedIn','https://www.linkedin.com/'],['X','https://x.com/']], // TODO link reali
form:'https://formspree.io/f/INSERISCI_ID'}; // TODO id Formspree
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const eur=n=>n?Number(n).toLocaleString('it-IT',{minimumFractionDigits:2})+' €':'Prezzo su richiesta';
const ST={disponibile:'Disponibile','in-arrivo':'In arrivo',venduto:'Venduto',occasione:'Occasione del mese'};
const nav=[['index.html','Home'],['negozio.html','Negozio'],['noleggio.html','Noleggio'],['contatti.html','Contatti']];
const here=location.pathname.split('/').pop()||'index.html';
$('#h').innerHTML=`<a class="brand" href="index.html">ASKO GROUP</a><nav aria-label="Principale">${nav.map(([h,l])=>`<a href="${h}"${h===here?' aria-current="page"':''}>${l}</a>`).join('')}</nav>`;
$('#f').innerHTML=`<div><p>© 2026 Asko Group · ${C.ind} · P. IVA 03251660043</p><p><a href="mailto:${C.email}">${C.email}</a> · <a href="tel:${C.tel[0][2]}">${C.tel[0][1]}</a> · <a href="${C.wa[1]}">WhatsApp ${C.wa[0]}</a></p></div><ul aria-label="Social">${C.social.map(([n,u])=>`<li><a href="${u}" target="_blank" rel="noopener">${n}</a></li>`).join('')}</ul><a class="admin" href="admin/" rel="nofollow">Pannello di controllo</a>`;
const card=m=>`<a class="plate ${esc(m.stato)}" href="mezzo.html?id=${encodeURIComponent(m.id)}">${m.foto&&m.foto[0]?`<img src="${esc(m.foto[0])}" alt="${esc(m.titolo)}" loading="lazy">`:'<div class="ph">Foto in arrivo</div>'}<span class="tag">${ST[m.stato]||''}</span><h3>${esc(m.titolo)}</h3><dl>${m.anno?`<div><dt>Anno</dt><dd>${esc(m.anno)}</dd></div>`:''}${m.ore?`<div><dt>Ore</dt><dd>${Number(m.ore).toLocaleString('it-IT')}</dd></div>`:''}<div><dt>Categoria</dt><dd>${esc(m.categoria)}</dd></div></dl><p class="price">${eur(m.prezzo)}</p></a>`;
const load=()=>fetch('data/mezzi.json',{cache:'no-store'}).then(r=>r.json());
const g=$('#grid');
if(g)load().then(all=>{const t=g.dataset.tipo,l=+g.dataset.limit||999;const v=all.filter(m=>!t||m.tipo===t).reverse();
  const a=v.filter(m=>m.stato!=='venduto').slice(0,l),s=g.dataset.venduti?v.filter(m=>m.stato==='venduto'):[];
  g.innerHTML=a.length?a.map(card).join(''):'<p>Nessun mezzo al momento: contattaci.</p>';
  if(s.length)$('#sold').innerHTML='<h2>Venduti di recente</h2><div class="grid">'+s.map(card).join('')+'</div>'}).catch(()=>g.innerHTML='<p>Impossibile caricare i mezzi.</p>');
const D=$('#detail');
if(D)load().then(all=>{const m=all.find(x=>x.id===new URLSearchParams(location.search).get('id'));
  if(!m){D.innerHTML='<h1>Mezzo non trovato</h1><p><a href="negozio.html">Torna al negozio</a></p>';return}
  document.title=m.titolo+' – ASKO GROUP';
  D.innerHTML=`<h1>${esc(m.titolo)}</h1><span class="tag">${ST[m.stato]||''}</span><div class="gal">${(m.foto||[]).map(s=>`<img src="${esc(s)}" alt="${esc(m.titolo)}">`).join('')||'<div class="ph">Foto in arrivo</div>'}</div><p class="price big">${eur(m.prezzo)}</p><p>${esc(m.descrizione).replace(/\n/g,'<br>')}</p><p><a class="btn" href="${C.wa[1]}?text=${encodeURIComponent('Info su: '+m.titolo)}">Chiedi info su WhatsApp</a></p>`});
const I=$('#info');
if(I){I.innerHTML=`<h2>Dove siamo</h2><p>${C.ind}<br><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(C.ind)}">Apri su Google Maps</a></p><h2>Telefono</h2><ul class="lst">${C.tel.map(([l,t,u])=>`<li>${l}: <a href="tel:${u}">${t}</a></li>`).join('')}<li>WhatsApp: <a href="${C.wa[1]}">${C.wa[0]}</a></li></ul><h2>Email</h2><p><a href="mailto:${C.email}">${C.email}</a></p>`;
  $('#cf').action=C.form;$('#map').src='https://www.google.com/maps?q='+encodeURIComponent(C.ind)+'&output=embed'}
