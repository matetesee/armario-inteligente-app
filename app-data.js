// ===== Las 15 prendas del armario cápsula =====
// formality: 1 = casual, 2 = trabajo/versátil, 3 = elegante/salidas
// color: para el "swatch" visual (no usamos fotos de stock para no inventar producto real)
const PIECES = [
  { id:'top1',  cat:'top',       name:'Remera blanca básica',      formality:1, color:'#FFFFFF', border:true,  icon:'👕' },
  { id:'top2',  cat:'top',       name:'Remera negra básica',       formality:1, color:'#1A1A1A', icon:'👕' },
  { id:'top3',  cat:'top',       name:'Camisa blanca',             formality:2, color:'#FBFBFB', border:true,  icon:'👔' },
  { id:'top4',  cat:'top',       name:'Sweater beige',             formality:2, color:'#D8C3A5', icon:'🧶' },
  { id:'bot1',  cat:'bottom',    name:'Jean recto azul',           formality:1, color:'#4A6FA5', icon:'👖' },
  { id:'bot2',  cat:'bottom',    name:'Pantalón negro de vestir',  formality:3, color:'#1A1A1A', icon:'👖' },
  { id:'bot3',  cat:'bottom',    name:'Falda midi camel',          formality:2, color:'#C8A46E', icon:'👗' },
  { id:'out1',  cat:'outerwear', name:'Blazer beige',              formality:3, color:'#D8C3A5', icon:'🧥' },
  { id:'out2',  cat:'outerwear', name:'Blazer negro',              formality:3, color:'#1A1A1A', icon:'🧥' },
  { id:'out3',  cat:'outerwear', name:'Campera de cuero negra',    formality:1, color:'#222222', icon:'🧥' },
  { id:'out4',  cat:'outerwear', name:'Trench beige',              formality:2, color:'#C8A46E', icon:'🧥' },
  { id:'dress1',cat:'dress',     name:'Vestido negro (LBD)',       formality:3, color:'#1A1A1A', icon:'👗' },
  { id:'shoe1', cat:'shoes',     name:'Zapatos negros',            formality:3, color:'#1A1A1A', icon:'👠' },
  { id:'shoe2', cat:'shoes',     name:'Zapatillas blancas',        formality:1, color:'#FBFBFB', border:true,  icon:'👟' },
  { id:'bag1',  cat:'bag',       name:'Bolso camel',               formality:2, color:'#C8A46E', icon:'👜' },
];

const PIECE_TIPS = {
  top1:'La base de cualquier look casual. Combina con todo.',
  top2:'Ideal debajo de un blazer para un look de trabajo con actitud.',
  top3:'El comodín elegante: sola, con blazer, o remangada con jean.',
  top4:'Suma calidez y textura sin perder neutralidad.',
  bot1:'El jean recto es el más versátil: de casual a semi-formal.',
  bot2:'Tu opción segura para reuniones o eventos de trabajo.',
  bot3:'Le da un toque femenino y romántico a cualquier top.',
  out1:'El blazer que transforma un jean y remera en un look de oficina.',
  out2:'Infalible para looks de noche o reuniones importantes.',
  out3:'Le suma actitud rockera a lo más básico.',
  out4:'La gabardina que resuelve looks de entretiempo con elegancia.',
  dress1:'El vestido que nunca falla: solo, con blazer, o con campera.',
  shoe1:'Estiliza cualquier look y sube el nivel de formalidad.',
  shoe2:'La comodidad que no resigna estilo en el día a día.',
  bag1:'El accesorio neutro que combina con el 100% del armario.',
};

// Link de compra: no inventamos URLs de producto reales — apuntamos a una
// búsqueda que la usuaria puede refinar según su marca/talle preferido.
function buyLink(name){
  return 'https://www.google.com/search?tbm=shop&q=' + encodeURIComponent(name);
}

// ===== Generador de looks =====
// Combina: (top x bottom) o (dress) + outerwear opcional + shoes, y siempre el bolso.
function pieceById(id){ return PIECES.find(p=>p.id===id); }
function byCat(cat){ return PIECES.filter(p=>p.cat===cat); }

function buildCombos(){
  const tops = byCat('top'), bottoms = byCat('bottom'), outers = byCat('outerwear'),
        dresses = byCat('dress'), shoes = byCat('shoes'), bag = byCat('bag')[0];
  const outerOptions = [null, ...outers]; // "sin capa" cuenta como opción
  const combos = [];

  tops.forEach(top=>{
    bottoms.forEach(bottom=>{
      outerOptions.forEach(outer=>{
        shoes.forEach(shoe=>{
          combos.push(makeCombo([top,bottom,outer,shoe,bag]));
        });
      });
    });
  });
  dresses.forEach(dress=>{
    outerOptions.forEach(outer=>{
      shoes.forEach(shoe=>{
        combos.push(makeCombo([dress,outer,shoe,bag]));
      });
    });
  });
  return combos;
}

function makeCombo(pieces){
  const list = pieces.filter(Boolean);
  const avg = list.reduce((s,p)=>s+p.formality,0)/list.length;
  const occasion = avg>=2.4 ? 'salidas' : avg>=1.6 ? 'trabajo' : 'casual';
  return { pieces:list, occasion };
}

const ALL_COMBOS = buildCombos();
const TOTAL_COMBOS = ALL_COMBOS.length;
