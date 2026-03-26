// Cursor
        const cur = document.getElementById('cur');
        const ring = document.getElementById('ring');
        let mx = 0, my = 0, rx = 0, ry = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX; my = e.clientY;
            cur.style.left = mx + 'px'; cur.style.top = my + 'px';
        });

        function animRing() {
            rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
            ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
            requestAnimationFrame(animRing);
        }
        animRing();

        document.querySelectorAll('a,button,.svc,.plan,.testi,.step').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cur.style.transform = 'translate(-50%,-50%) scale(2.5)';
                ring.style.width = '56px'; ring.style.height = '56px';
            });
            el.addEventListener('mouseleave', () => {
                cur.style.transform = 'translate(-50%,-50%) scale(1)';
                ring.style.width = '36px'; ring.style.height = '36px';
            });
        });

        // Reveal on scroll
        const obs = new IntersectionObserver(entries => {
            entries.forEach((e, i) => {
                if (e.isIntersecting) {
                    setTimeout(() => e.target.classList.add('on'), i * 70);
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08 });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

        // ── PORTFOLIO DATA ──
// Para agregar un proyecto: copia un objeto del array y edita sus campos.
// url: enlace del demo (puede ser tu propio sitio o cualquier URL pública)
// status: 'live' | 'dev' | 'soon'
// category: 'landing' | 'app' | 'ecommerce'
const PROJECTS = [
  {
    id:1,
    title:'Nutrición Integral',
    desc:'Landing page para consultorio local con menú interactivo, para agendar planes nutricionales',
    url:'https://demo-web-nutricion.netlify.app/',
    tags:['HTML','CSS','JS'],
    category:'landing',
    status:'dev',
  },
  {
    id:2,
    title:'Sistema para una cafeteria',
    desc:'La App va permite visualizar el menú completo de la cafetería, promociones, cada proucto cuenta con descripción e imagen',
    url:'https://appdemocafe.netlify.app/',
    tags:['React','Tailwind','Node.js','PHP','MySql'],
    category:'app',
    status:'dev',
  },
  {
    id:3,
    title:'App Para gestión de citas',
    desc:'App web para gestion de citas, calendarizadas, con interfaz moderna',
    url:'https://demo-app-agenda.netlify.app/',
    tags:['HTML','CSS','Js','PHP','MySql'],
    category:'app',
    status:'dev',
  },
  /*{
    id:4,
    title:'Clínica Dental Plus',
    desc:'Sitio web con sistema de citas en línea, perfiles de doctores y sección de tratamientos.',
    url:'https://example.com',
    tags:['HTML','PHP','MySQL'],
    category:'landing',
    status:'live',
  },*/
 /* {
    id:5,
    title:'CRM Inmobiliario',
    desc:'Plataforma web para gestión de propiedades, clientes y seguimiento de ventas con dashboard.',
    url:'https://example.com',
    tags:['Vue.js','Laravel','MySQL'],
    category:'app',
    status:'soon',
  },*/
  /*{
    id:6,
    title:'Marketplace Artesanal',
    desc:'Plataforma de venta para artesanos locales de Yucatán con perfiles de vendedor y pagos.',
    url:'https://example.com',
    tags:['React','Stripe','Firebase'],
    category:'ecommerce',
    status:'soon',
  },*/
];
 
const STATUS_LABELS = {live:'En desarrollo',dev:'En desarrollo',soon:'Próximamente'};
const STATUS_CLASS  = {live:'status-live',dev:'status-dev',soon:'status-soon'};
 
function buildCard(p){
  return `
  <div class="port-card" data-category="${p.category}" data-url="${p.url}" data-title="${p.title}" onclick="openModal('${p.url}','${p.title}')">
    <div class="port-preview">
      <iframe src="${p.url}" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>
      <div class="port-preview-overlay">
        <button class="port-open-btn">Ver demo →</button>
      </div>
      <div class="port-status ${STATUS_CLASS[p.status]}">${STATUS_LABELS[p.status]}</div>
    </div>
    <div class="port-body">
      <div class="port-tags">${p.tags.map(t=>`<span class="port-tag">${t}</span>`).join('')}</div>
      <div class="port-title">${p.title}</div>
      <div class="port-desc">${p.desc}</div>
      <div class="port-footer">
        <span class="port-link" onclick="event.stopPropagation();openModal('${p.url}','${p.title}')">Interactuar →</span>
      </div>
    </div>
  </div>`;
}
 
function renderGrid(filter){
  const grid = document.getElementById('port-grid');
  const list = filter==='all' ? PROJECTS : PROJECTS.filter(p=>p.category===filter);
  grid.innerHTML = list.map(buildCard).join('');
  // re-attach cursor to new cards
  grid.querySelectorAll('.port-card').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(2.5)';ring.style.width='56px';ring.style.height='56px'});
    el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';ring.style.width='36px';ring.style.height='36px'});
  });
}
 
renderGrid('all');
 
document.getElementById('port-filters').addEventListener('click',e=>{
  if(!e.target.classList.contains('pf-btn')) return;
  document.querySelectorAll('.pf-btn').forEach(b=>b.classList.remove('active'));
  e.target.classList.add('active');
  renderGrid(e.target.dataset.filter);
});
 
// ── MODAL ──
function openModal(url,title){
  const bg     = document.getElementById('modal-bg');
  const iframe = document.getElementById('modal-iframe');
  const load   = document.getElementById('modal-loading');
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-url').textContent   = url;
  document.getElementById('modal-ext').href          = url;
  iframe.src = '';
  load.style.display = 'flex';
  iframe.style.opacity = '0';
  bg.classList.add('open');
  document.body.style.overflow = 'hidden';
  setTimeout(()=>{ iframe.src = url; }, 80);
}
 
function iframeLoaded(){
  document.getElementById('modal-loading').style.display = 'none';
  document.getElementById('modal-iframe').style.opacity  = '1';
}
 
function closeModal(){
  const bg = document.getElementById('modal-bg');
  bg.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(()=>{ document.getElementById('modal-iframe').src = ''; },250);
}
 
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-bg').addEventListener('click', e=>{
  if(e.target === document.getElementById('modal-bg')) closeModal();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

        // Form
        function handleForm(e) {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            btn.textContent = '¡Mensaje enviado! ✓';
            btn.style.background = '#15803d';
            setTimeout(() => {
                btn.textContent = 'Enviar mensaje →';
                btn.style.background = '';
                e.target.reset();
            }, 3000);
        }

