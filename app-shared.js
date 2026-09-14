// ===== Nombre de la usuaria (persistido en este dispositivo) =====
function getUserName(){ try{ return localStorage.getItem('ai_user_name') || ''; }catch(e){ return ''; } }
function setUserName(name){ try{ localStorage.setItem('ai_user_name', name); }catch(e){} }

function initGreeting(){
  const name = getUserName();
  document.querySelectorAll('[data-greet]').forEach(el=>{
    el.textContent = name || 'crack';
  });
  if(!name) showNameModal();
}

function showNameModal(){
  const wrap = document.createElement('div');
  wrap.className = 'ai-modal-backdrop';
  wrap.innerHTML = `
    <div class="ai-modal">
      <div class="ai-modal-icon">👋</div>
      <h2>¡Bienvenida a tu Armario Inteligente!</h2>
      <p>¿Cómo te llamás? Así personalizamos tu experiencia.</p>
      <input type="text" id="aiNameInput" placeholder="Tu nombre" autocomplete="off" maxlength="30">
      <button class="btn big" id="aiNameBtn" style="width:100%;margin-top:14px" disabled>Continuar</button>
    </div>`;
  document.body.appendChild(wrap);
  const input = wrap.querySelector('#aiNameInput');
  const btn = wrap.querySelector('#aiNameBtn');
  setTimeout(()=>input.focus(), 50);
  input.oninput = ()=>{ btn.disabled = !input.value.trim(); };
  input.onkeydown = (e)=>{ if(e.key==='Enter' && input.value.trim()) btn.click(); };
  btn.onclick = ()=>{
    const name = input.value.trim();
    if(!name) return;
    setUserName(name);
    wrap.classList.add('closing');
    setTimeout(()=>wrap.remove(), 200);
    document.querySelectorAll('[data-greet]').forEach(el=>{ el.textContent = name; });
  };
}

// ===== Testimonios (pool compartido, con foco temático) =====
const TESTIMONIALS = [
  { name:'Camila R., 32', stars:5, tag:'general', text:'No podía creer lo simple que era. En una semana ya tenía looks armados para toda la semana sin pensar.' },
  { name:'Valentina S., 27', stars:5, tag:'looks', text:'El generador de looks es lo que más uso. Filtro por "trabajo" y listo, no pierdo más tiempo a la mañana.' },
  { name:'Marina G., 41', stars:4, tag:'prendas', text:'Compré las 15 prendas de a poco y ya siento que tengo un placard nuevo. Excelente selección.' },
  { name:'Antonella P., 35', stars:5, tag:'ajustes', text:'La guía de ajustes visuales me cambió la forma de elegir blazers. Ahora sé exactamente qué me favorece.' },
  { name:'Rocío M., 29', stars:5, tag:'colores', text:'Nunca supe combinar colores y esta guía lo hizo simple. La regla del "un solo color" es oro puro.' },
  { name:'Julieta F., 38', stars:4, tag:'general', text:'Al principio dudé, pero se paga sola: dejé de comprar ropa que no uso.' },
  { name:'Sofía A., 24', stars:5, tag:'looks', text:'Uso el filtro "salidas" todos los findes. Siempre tengo una opción distinta y no repito.' },
  { name:'Daniela C., 45', stars:5, tag:'prendas', text:'Los links de búsqueda me ahorraron horas. Encontré todo en un par de tardes.' },
  { name:'Florencia L., 31', stars:4, tag:'general', text:'Simple, práctico y con looks que realmente puedo usar en mi día a día real.' },
  { name:'Carolina B., 33', stars:5, tag:'ajustes', text:'Por primera vez entendí por qué cierta ropa no me quedaba bien. Ahora elijo con criterio.' },
  { name:'Micaela T., 28', stars:4, tag:'colores', text:'Las combinaciones "que nunca fallan" las uso literal todas las semanas.' },
  { name:'Agustina V., 26', stars:5, tag:'general', text:'No podía creer lo simple que era armar un look. La app me resolvió la vida.' },
  { name:'Lucía M., 30', stars:5, tag:'looks', text:'Genero un look nuevo cada mañana en segundos, ya no pienso qué ponerme.' },
  { name:'Renata O., 37', stars:4, tag:'prendas', text:'Con las 15 prendas armé un placard que realmente uso todo, nada quieto en el ropero.' },
  { name:'Paula Z., 40', stars:5, tag:'ajustes', text:'Los tips por tipo de cuerpo son tan prácticos que los aplico el mismo día.' },
  { name:'Emilia R., 35', stars:5, tag:'general', text:'Ahorro horas de pensar qué ponerme, la recomiendo a todo el mundo.' },
];

function initials(name){
  return name.split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
}
const AVATAR_COLORS = ['#1174E0','#E5342B','#1F9D3C','#8A5CF6','#F2994A','#0EA5A5'];
function avatarColor(name){
  let h=0; for(let i=0;i<name.length;i++) h = (h*31 + name.charCodeAt(i)) >>> 0;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}
function starRow(n){
  return '★★★★★'.slice(0,n) + '<span style="opacity:.25">' + '★★★★★'.slice(n) + '</span>';
}

function renderTestimonials(selector, opts){
  opts = opts || {};
  const tag = opts.tag;
  const count = opts.count || 3;
  const title = opts.title || 'Lo que dicen otras mujeres';
  let pool = tag ? TESTIMONIALS.filter(t=>t.tag===tag) : TESTIMONIALS.slice();
  if(pool.length < count){ pool = pool.concat(TESTIMONIALS.filter(t=>t.tag==='general')); }
  const items = shuffleArr(pool).slice(0, count);
  const host = document.querySelector(selector);
  if(!host) return;
  host.innerHTML = `
    <div class="section">
      <h2>${title.replace(/\*(.+?)\*/,'<span class="am">$1</span>')}</h2>
      <div class="tst-row">
        ${items.map(t => `
          <div class="tst-card">
            <div class="tst-stars">${starRow(t.stars)}</div>
            <p class="tst-text">"${t.text}"</p>
            <div class="tst-who">
              <span class="tst-avatar" style="background:${avatarColor(t.name)}">${initials(t.name)}</span>
              <span class="tst-name">${t.name}</span>
              <span class="tst-badge">✔ Compra verificada</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
}
function shuffleArr(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

document.addEventListener('DOMContentLoaded', initGreeting);
