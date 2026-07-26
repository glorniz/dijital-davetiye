/* =========================================================
   YÖNETİCİ YAPILANDIRMASI (CONFIG)
========================================================= */
const invitation = {
  theme: "classic", // classic | champagne | olive | royal | mono | dustyrose

  brideName: "Ayşe",
  groomName: "Osman",

  quote: "\u201CVe Allah, onların kalplerinin arasını sevgi ile birleştirdi.\u201D",
  quoteSource: "\u2014 Enfal Suresi, 63.Ayet",

  parents: {
    brideFather: "Hakkı",
    brideMother: "Nazire TOKGÖZ",
    groomFather: "Mehmet Ali(merhum)",
    groomMother: "Rabia TÜRKYILMAZ"
  },

  weddingDate: "2026-08-09T19:00:00",
  metaLine: "Pazar \u00B7 9 Ağustos 2026 \u00B7 Kütahya/Tavşanlı, T\u00FCrkiye",

  countdown: true,

  henna: {
    label: "Kına Gecesi",
    date: "7 AĞUSTOS 2026",
    day: "Cuma",
    time: "19:00",
    venue: "Maviay Düğün Salonu \u2014 Topkapı",
    location: "Kütahya/Tavşanlı, T\u00FCrkiye",
    mapsUrl: "https://maps.app.goo.gl/JXXigp5A3HS7QsgD6"
  },
  wedding: {
    label: "Düğün Töreni",
    date: "9 AĞUSTOS 2026",
    day: "Pazar",
    time: "19:00",
    venue: "Maviay Düğün Salonu \u2014 Çırağan",
    location: "Kütahya/Tavşanlı, T\u00FCrkiye",
    mapsUrl: "https://maps.app.goo.gl/JXXigp5A3HS7QsgD6"
  },

  convoyEnabled: true,
  convoy: {
    time: "17:00",
    point: "Başköy düğün salonu önünden Hareket Edilecektir"
  },

  galleryEnabled: true,
  // Fotoğrafları images klasörüne bağladığımız kısım burası:
  gallery: [
    "images/foto1.jpg",
    "images/foto2.jpg",
    "images/foto3.jpg",
    "images/foto4.jpg"
  ],

  musicEnabled: true,
  musicFile: "music/muzik.mp3",

  rsvpEnabled: true,
  wishesEnabled: true
};

/* ---------------------------------------------------------
   Tema uygulama + opsiyonel modülleri açma/kapatma
--------------------------------------------------------- */
document.documentElement.setAttribute('data-theme', invitation.theme);

function setText(id, value){ const el=document.getElementById(id); if(el) el.textContent = value; }

setText('brideNameEl', invitation.brideName);
setText('groomNameEl', invitation.groomName);
setText('quoteEl', invitation.quote);
setText('quoteSourceEl', invitation.quoteSource);
setText('brideParents', invitation.parents.brideFather + ' & ' + invitation.parents.brideMother);
setText('groomParents', invitation.parents.groomFather + ' & ' + invitation.parents.groomMother);
setText('weddingMetaEl', invitation.metaLine);
setText('convoyTime', invitation.convoy.time);
setText('convoyPoint', invitation.convoy.point);

document.getElementById('introNames').textContent = invitation.brideName + ' & ' + invitation.groomName;

if(!invitation.countdown){ document.getElementById('countdownSection').style.display='none'; }
if(!invitation.convoyEnabled){ document.getElementById('convoySection').style.display='none'; }
if(!invitation.galleryEnabled){ document.getElementById('gallerySection').style.display='none'; }
if(!invitation.rsvpEnabled){ document.getElementById('rsvpSection').style.display='none'; }
if(!invitation.wishesEnabled){ document.getElementById('wishesSection').style.display='none'; }
if(!invitation.musicEnabled){ document.getElementById('music-btn').style.display='none'; }

/* ---------------------------------------------------------
   Düğün bilgi kartlarını oluşturma (Takvim çevirisi içerir)
--------------------------------------------------------- */
function calendarLinks(ev){
  const iso = (dstr, tstr) => {
    const months = {
      'Ocak': 'Jan', 'Şubat': 'Feb', 'Mart': 'Mar', 'Nisan': 'Apr',
      'Mayıs': 'May', 'Haziran': 'Jun', 'Temmuz': 'Jul', 'Ağustos': 'Aug',
      'Eylül': 'Sep', 'Ekim': 'Oct', 'Kasım': 'Nov', 'Aralık': 'Dec'
    };
    let engDstr = dstr;
    for (const [tr, en] of Object.entries(months)) {
      engDstr = engDstr.replace(tr, en);
    }
    const d = new Date(`${engDstr} ${tstr}`);
    return isNaN(d) ? new Date() : d;
  };
  
  const s = iso(ev.date, ev.time);
  const e = new Date(s.getTime() + 2*60*60*1000);
  const fmt = d => d.toISOString().replace(/[-:]/g,'').split('.')[0]+'Z';
  const title = encodeURIComponent(ev.label + ' \u2014 ' + invitation.brideName + ' & ' + invitation.groomName);
  const loc = encodeURIComponent(ev.venue + ', ' + ev.location);
  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(s)}/${fmt(e)}&location=${loc}`;
  const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${s.toISOString()}&enddt=${e.toISOString()}&location=${loc}`;
  const icsData = `BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:${title}%0ADTSTART:${fmt(s)}%0ADTEND:${fmt(e)}%0ALOCATION:${loc}%0AEND:VEVENT%0AEND:VCALENDAR`;
  const apple = `data:text/calendar;charset=utf8,${icsData}`;
  return { google, outlook, apple };
}

function infoCard(ev, key){
  const cal = calendarLinks(ev);
  return `
  <div class="info-card reveal">
    <div class="event-name">${ev.label}</div>
    <div class="event-date">${ev.day.toUpperCase()} &middot; ${ev.date}</div>
    <div class="event-time">${ev.time}</div>
    <div class="event-venue">${ev.venue}</div>
    <div class="event-loc">${ev.location}</div>
    <div class="info-actions">
      <a class="btn solid" target="_blank" rel="noopener" href="${ev.mapsUrl}">Haritalarda Aç</a>
      <div class="cal-wrap" data-cal="${key}">
        <button type="button" class="btn cal-toggle">Takvime Ekle</button>
        <div class="cal-menu">
          <a href="${cal.google}" target="_blank" rel="noopener">Google Takvim</a>
          <a href="${cal.outlook}" target="_blank" rel="noopener">Outlook Takvimi</a>
          <a href="${cal.apple}" download="${ev.label}.ics">Apple Takvim (.ics)</a>
        </div>
      </div>
    </div>
  </div>`;
}

const ornamentSVG = `<div class="center-ornament reveal"><svg viewBox="0 0 60 100" fill="none" stroke="var(--primary)" stroke-width="1.2" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 6C16 6 6 20 6 40c0 18 12 32 24 36l0 2 0-2c12-4 24-18 24-36C60 20 44 6 30 6Z"/>
  <path d="M24 78c0 3 3 6 6 6s6-3 6-6" /><path d="M27 85h6v6c0 2-1 3-3 3s-3-1-3-3v-6Z"/>
</svg></div>`;

document.getElementById('infoGrid').innerHTML =
  infoCard(invitation.henna, 'henna') + ornamentSVG + infoCard(invitation.wedding, 'wedding');

document.querySelectorAll('.cal-toggle').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const wrap = btn.closest('.cal-wrap');
    document.querySelectorAll('.cal-wrap.open').forEach(w=>{ if(w!==wrap) w.classList.remove('open'); });
    wrap.classList.toggle('open');
    e.stopPropagation();
  });
});
document.addEventListener('click', ()=> document.querySelectorAll('.cal-wrap.open').forEach(w=>w.classList.remove('open')));

/* ---------------------------------------------------------
   Galeri + Lightbox
--------------------------------------------------------- */
const galleryGrid = document.getElementById('galleryGrid');
invitation.gallery.forEach((src, i)=>{
  const div = document.createElement('div');
  div.className = 'gallery-item';
  div.dataset.index = i;
  div.innerHTML = `<img loading="lazy" src="${src}" alt="Düğün anısı ${i+1}">`;
  galleryGrid.appendChild(div);
});

const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
let lbIndex = 0;
function openLightbox(i){
  lbIndex = i;
  lbImg.src = invitation.gallery[i];
  lightbox.classList.add('open');
}
galleryGrid.addEventListener('click', e=>{
  const item = e.target.closest('.gallery-item');
  if(item) openLightbox(parseInt(item.dataset.index));
});
document.getElementById('lbClose').addEventListener('click', ()=> lightbox.classList.remove('open'));
lightbox.addEventListener('click', e=>{ if(e.target===lightbox) lightbox.classList.remove('open'); });
document.getElementById('lbPrev').addEventListener('click', ()=> openLightbox((lbIndex-1+invitation.gallery.length)%invitation.gallery.length));
document.getElementById('lbNext').addEventListener('click', ()=> openLightbox((lbIndex+1)%invitation.gallery.length));

let touchX=null;
lightbox.addEventListener('touchstart', e=> touchX = e.touches[0].clientX);
lightbox.addEventListener('touchend', e=>{
  if(touchX===null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if(dx>40) document.getElementById('lbPrev').click();
  else if(dx<-40) document.getElementById('lbNext').click();
  touchX=null;
});

/* ---------------------------------------------------------
   Geri Sayım
--------------------------------------------------------- */
function tickCountdown(){
  const target = new Date(invitation.weddingDate).getTime();
  const now = Date.now();
  const diff = target - now;
  if(diff <= 0){
    document.getElementById('countdown').style.display='none';
    document.getElementById('todayBanner').classList.add('show');
    clearInterval(countdownTimer);
    return;
  }
  const d = Math.floor(diff/86400000);
  const h = Math.floor((diff%86400000)/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  const pad = n=> String(n).padStart(2,'0');
  setText('cd-days', pad(d)); setText('cd-hours', pad(h));
  setText('cd-mins', pad(m)); setText('cd-secs', pad(s));
}
let countdownTimer;
if(invitation.countdown){ tickCountdown(); countdownTimer = setInterval(tickCountdown, 1000); }

/* ---------------------------------------------------------
   Giriş (Intro) / Balon animasyonu
--------------------------------------------------------- */
const introHearts = document.getElementById('introHearts');
function spawnHearts(){
  for(let i=0;i<10;i++){
    const h = document.createElement('div');
    h.className='intro-heart';
    h.style.left = (44 + Math.random()*12) + '%';
    h.style.animationDelay = (Math.random()*.5)+'s';
    h.innerHTML = `<svg viewBox="0 0 24 24" fill="#F8F5EF"><path d="M12 21s-7.5-4.7-10-9.3C.4 8 2.6 4 6.5 4 9 4 11 5.7 12 7.6 13 5.7 15 4 17.5 4 21.4 4 23.6 8 22 11.7 19.5 16.3 12 21 12 21Z"/></svg>`;
    introHearts.appendChild(h);
  }
}

let opened = false;
function openInvitation(){
  if(opened) return;
  opened = true;
  const wrap = document.getElementById('balloonWrap');
  wrap.classList.add('launch');
  spawnHearts();
  setTimeout(()=>{
    document.getElementById('intro').classList.add('opened');
    document.body.style.overflow='';
  }, 550);
}
document.getElementById('balloonWrap').addEventListener('click', openInvitation);
document.getElementById('balloonWrap').addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') openInvitation(); });

/* ---------------------------------------------------------
   Müzik açma/kapama
--------------------------------------------------------- */
const musicBtn = document.getElementById('music-btn');
const bgAudio = document.getElementById('bgAudio');
if(invitation.musicFile) bgAudio.src = invitation.musicFile;
let playing = false;
musicBtn.addEventListener('click', ()=>{
  if(!invitation.musicFile){ return; }
  playing = !playing;
  if(playing){ bgAudio.play().catch(()=>{}); musicBtn.classList.add('playing'); }
  else{ bgAudio.pause(); musicBtn.classList.remove('playing'); }
  musicBtn.setAttribute('aria-pressed', playing);
});

/* ---------------------------------------------------------
   LCV (RSVP)
--------------------------------------------------------- */
document.querySelectorAll('.rsvp-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.rsvp-btn').forEach(b=>b.classList.remove('selected'));
    btn.classList.add('selected');
    const map = { 
      accept:'Harika — sizinle kutlamak için sabırsızlanıyoruz!', 
      maybe:'Teşekkürler — en kısa zamanda bize haber verin.', 
      decline:'Sizi özleyeceğiz, ancak haber verdiğiniz için teşekkür ederiz.' 
    };
    const el = document.getElementById('rsvpConfirm');
    el.textContent = map[btn.dataset.rsvp];
    el.classList.add('show');
  });
});

/* ---------------------------------------------------------
   Misafir Dilekleri
--------------------------------------------------------- */
const wishesList = document.getElementById('wishesList');
document.getElementById('wishesForm').addEventListener('submit', e=>{
  e.preventDefault();
  const name = document.getElementById('wishName').value.trim();
  const msg = document.getElementById('wishMsg').value.trim();
  if(!name || !msg) return;
  const item = document.createElement('div');
  item.className='wish-item reveal in';
  item.innerHTML = `<div class="wname">${name}</div><div class="wmsg">${msg}</div>`;
  wishesList.prepend(item);
  e.target.reset();
});

/* ---------------------------------------------------------
   Reveal-on-scroll
--------------------------------------------------------- */
const io = new IntersectionObserver(entries=>{
  entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
}, { threshold:.15 });
document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

document.body.style.overflow = 'hidden';