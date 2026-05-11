import { db, auth } from '../firebase-config.js';
import {
  collection, doc, getDoc, setDoc, updateDoc, deleteDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  onAuthStateChanged, signInWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ─── MENÚ BASE (plantilla para nuevas filiales) ───────────────────────────────
const DEFAULT_SECTIONS = [
  {
    id: 'speisen', title: 'Speisen',
    items: [
      { id: 1,  name: 'Crispy Chicken-Burger',       desc: 'Mit Tomate, Gurke, Zwiebeln & Pommes',                                  descFr: 'Chicken Burger avec des frites',                              price: '15,90', tag: ''   },
      { id: 2,  name: 'Beef-Burger',                  desc: 'Mit Tomate, Gurke, Käse, Zwiebeln & Pommes',                             descFr: 'Beef-Burger avec des frites',                                 price: '15,90', tag: ''   },
      { id: 3,  name: 'Bacon-Beef Burger',            desc: 'Mit Bacon, Tomate, Gurke, Käse, Zwiebeln, BBQ-Sauce & Pommes',          descFr: 'Beef-Burger avec bacon & frites',                             price: '16,90', tag: ''   },
      { id: 4,  name: 'Green-Oat Burger',             desc: 'Mit Tomate, Gurke, Zwiebeln, Mango Relish & Pommes',                    descFr: 'Green Oat Burger avec des frites',                            price: '14,90', tag: 'V'  },
      { id: 5,  name: 'Cordon Bleu',                  desc: 'Mit Pommes & Salatbouquet',                                             descFr: 'Cordon Bleu avec frites et bouquet de salade',                price: '17,90', tag: ''   },
      { id: 6,  name: 'Putenschnitzel',               desc: 'Paniert mit Pommes',                                                    descFr: "L'escalope de dinde panée & frites",                          price: '14,90', tag: ''   },
      { id: 7,  name: 'Baguette',                     desc: 'Mit Schinken oder Salami, überbacken mit Käse',                         descFr: 'Baguette chaud avec jambon ou salami, gratiné avec fromage',  price: '7,50',  tag: ''   },
      { id: 8,  name: 'Pommes Frites',                desc: 'Mit Ketchup oder Mayo',                                                 descFr: 'Frites avec Ketchup / Mayo',                                  price: '4,00',  tag: 'VG' },
      { id: 9,  name: 'Extra Mayo / Ketchup',         desc: '',                                                                      descFr: '',                                                            price: '0,50',  tag: ''   },
      { id: 10, name: 'Currywurst mit Brötchen',      desc: '',                                                                      descFr: 'Saucisse au curry avec petit pain',                            price: '5,00',  tag: ''   },
      { id: 11, name: 'Currywurst mit Pommes',        desc: '',                                                                      descFr: 'Saucisse au curry avec des frites',                            price: '8,90',  tag: ''   },
      { id: 12, name: 'Bratwurst mit Pommes',         desc: '',                                                                      descFr: 'Saucisse knack grillée & frites',                              price: '8,50',  tag: ''   },
      { id: 13, name: '6 Chicken-Nuggets',            desc: '',                                                                      descFr: '',                                                            price: '5,50',  tag: ''   },
      { id: 14, name: '6 Chicken-Nuggets mit Pommes', desc: '',                                                                      descFr: '6-Chicken-Nuggets avec des frites',                           price: '9,50',  tag: ''   },
    ]
  },
  {
    id: 'flammkuchen', title: 'Flammkuchen',
    items: [
      { id: 15, name: 'Flammkuchen Klassisch', desc: 'Mit Zwiebeln, Speck, Käse',           descFr: 'Tarte flambée, oignon, bacon, fromage',          price: '10,50', tag: ''  },
      { id: 16, name: 'Flammkuchen Gemüse',    desc: 'Mit Gemüse, Käse',                    descFr: 'Tarte flambée, des légumes, fromage',             price: '10,50', tag: 'V' },
      { id: 17, name: 'Flammkuchen Lachs',     desc: 'Mit Lachs, Scampi und Lauch',         descFr: 'Tarte flambée, saumon, scampi, poireau',          price: '11,50', tag: ''  },
    ]
  },
  {
    id: 'salate', title: 'Salate',
    items: [
      { id: 18, name: 'Blattsalate',              desc: 'Mit Tomaten, Karotte, Gurke',                                 descFr: 'Salade mixte avec tomates, carotte, concombre',                                    price: '12,50', tag: 'VG' },
      { id: 19, name: '+ Thunfisch und Zwiebeln', desc: '',                                                            descFr: '+ thon & oignons',                                                                 price: '13,90', tag: ''   },
      { id: 20, name: '+ Hirtenkäse',             desc: '',                                                            descFr: '+ Fromage du berger',                                                              price: '13,90', tag: 'V'  },
      { id: 21, name: '+ Äpfel und Walnüsse',     desc: '',                                                            descFr: '+ pommes & noix',                                                                  price: '13,90', tag: 'VG' },
      { id: 22, name: '+ Hähnchenstreifen',       desc: '',                                                            descFr: '+ poulet',                                                                         price: '15,50', tag: ''   },
      { id: 23, name: 'Toskana Salat',            desc: 'Blattsalate, Karotte, Gurke, verschiedene Antipasti',         descFr: 'Salade Toskana avec tomates, carotte, concombre, Antipasti',                       price: '14,90', tag: ''   },
      { id: 24, name: 'Strassburger Wurstsalat',  desc: 'Mit Brötchen',                                               descFr: 'Salade de servelas et fromage, avec petit pain',                                    price: '10,50', tag: ''   },
    ]
  },
  {
    id: 'bowls', title: 'Bowls',
    items: [
      { id: 25, name: 'Buddha Bowl',               desc: 'Mit Quinoa, Edamame, rote Beete, schwarzem Sesam, Limette, Blattsalate',                    descFr: 'Buddha Bowl avec quinoa, edamame, betteraves',              price: '14,90', tag: 'VG' },
      { id: 26, name: 'Buddha Bowl Spicy Chicken', desc: 'Mit Quinoa, Edamame, rote Beete, schwarzem Sesam, Limette, Blattsalate, knusprige Hähnchenstreifen', descFr: 'Buddha Bowl avec poulet croustillant et épicé',       price: '16,90', tag: ''   },
      { id: 27, name: 'Bali Bowl',                 desc: 'Mit Avocado, Mango, Paprika, rote Zwiebeln, Tomate, Gurke, Mais, Blattsalate, Avocado-Kräuter Dressing', descFr: 'Bali Bowl avec avocat, mangue, poivron, oignons rouges, tomate, concombre, maïs, laitue', price: '14,90', tag: 'VG' },
    ]
  },
  {
    id: 'loadedfries', title: 'Loaded Fries',
    items: [
      { id: 28, name: 'Pulled Turkey & BBQ-Sauce',  desc: '',                                              descFr: 'avec pulled turkey et sauce BBQ',                   price: '10,50', tag: ''  },
      { id: 29, name: '„Tijuana Style"',             desc: 'Mit Guacamole, Sour Cream und Tomatensalsa',   descFr: 'avec guacamole, sour cream et salsa de tomates',    price: '8,50',  tag: 'V' },
      { id: 30, name: 'Parmesan & Schnittlauch',     desc: 'Mit frisch geriebenem Parmesan',               descFr: 'avec parmesan fraîchement râpé et ciboulette',      price: '7,50',  tag: 'V' },
      { id: 31, name: 'Chili Cheese & Jalapeños',   desc: '',                                              descFr: 'avec sauce chili cheese et jalapeños',              price: '7,50',  tag: 'V' },
      { id: 32, name: 'Tomatensalsa',               desc: '',                                              descFr: 'avec salsa de tomates',                             price: '7,50',  tag: 'VG'},
      { id: 33, name: 'Guacamole',                  desc: '',                                              descFr: 'avec guacamole',                                    price: '7,50',  tag: 'VG'},
      { id: 34, name: 'Sour Cream & Schnittlauch',  desc: '',                                              descFr: 'avec sour cream et ciboulette',                     price: '7,50',  tag: 'V' },
    ]
  },
  {
    id: 'getraenke', title: 'Getränke',
    items: [
      { id: 35, name: 'Mineralwasser / Stilles Wasser 0,5l',         desc: '',                      descFr: 'Eau minérale / naturelle',             price: '3,30', tag: 'VG' },
      { id: 36, name: 'Apfel- / Johannisbeerschorle 0,5l',           desc: '',                      descFr: "Jus de pommes ou groseille eau minérale", price: '3,50', tag: 'VG' },
      { id: 37, name: 'Top Fit 0,5l',                                desc: 'Limonade isotonique',   descFr: '',                                    price: '3,50', tag: 'VG' },
      { id: 38, name: 'Coca-Cola / Coca-Cola Zero 0,5l',             desc: '',                      descFr: '',                                    price: '4,00', tag: ''   },
      { id: 39, name: 'Sprite / Fanta / Cola-Mix 0,5l',              desc: '',                      descFr: '',                                    price: '4,00', tag: ''   },
      { id: 40, name: 'Fuze Eistee 0,4l',                            desc: '',                      descFr: 'Fuze thé glacé',                      price: '4,00', tag: ''   },
      { id: 41, name: 'Red Bull 0,25l',                              desc: 'Verschiedene Sorten',   descFr: '',                                    price: '3,50', tag: ''   },
      { id: 42, name: 'Fine Spritz – Wild Virgins 0,3l',             desc: 'Alkoholfrei',           descFr: 'Apéritif orange sans alcool',          price: '6,00', tag: ''   },
      { id: 43, name: 'Erdinger Hefeweizen Alkoholfrei 0,5l',        desc: '',                      descFr: "Bière de blé sans alcool",             price: '4,50', tag: ''   },
      { id: 44, name: 'Erdinger Helles / Weizenradler Alkoholfrei 0,33l', desc: '',                 descFr: 'Panaché de blé sans alcool',           price: '3,50', tag: ''   },
      { id: 45, name: 'Pils 0,3l',                                   desc: '',                      descFr: 'Bière',                               price: '3,90', tag: ''   },
      { id: 46, name: 'Hefeweizen 0,5l',                             desc: '',                      descFr: 'Bière blanche',                       price: '4,90', tag: ''   },
      { id: 47, name: 'Lager Bier 0,5l',                             desc: '',                      descFr: 'Bière blonde',                        price: '4,90', tag: ''   },
      { id: 48, name: 'Radler 0,3l',                                 desc: '',                      descFr: 'Bière panachée',                      price: '3,90', tag: ''   },
      { id: 49, name: 'Desperados 0,33l',                            desc: '',                      descFr: '',                                    price: '4,00', tag: ''   },
      { id: 50, name: 'Rieslingschorle 0,25l',                       desc: '',                      descFr: 'Vin blanc avec eau minérale',          price: '4,50', tag: ''   },
      { id: 51, name: 'Prosecco – Scavy & Ray 0,2l',                 desc: '',                      descFr: '',                                    price: '5,50', tag: ''   },
      { id: 52, name: 'Maracuja Sprizz 0,3l',                        desc: '',                      descFr: '',                                    price: '6,90', tag: ''   },
      { id: 53, name: 'Aperol Sprizz 0,3l',                          desc: '',                      descFr: '',                                    price: '7,50', tag: ''   },
      { id: 54, name: 'Rosé Sommerschorle 0,3l',                     desc: '',                      descFr: 'Vin rosé avec eau minérale & menthe',  price: '6,90', tag: ''   },
      { id: 55, name: 'Lillet Wild Berry 0,3l',                      desc: '',                      descFr: '',                                    price: '8,50', tag: ''   },
      { id: 56, name: 'Caipirinha / Mojito / Cuba Libre 0,3l',       desc: '',                      descFr: '',                                    price: '8,90', tag: ''   },
    ]
  },
  {
    id: 'kaffee', title: 'Kaffee & Heißgetränke',
    items: [
      { id: 57, name: 'Espresso',                    desc: '', descFr: 'Expresso',                      price: '2,50', tag: 'V' },
      { id: 58, name: 'Espresso Macchiato',          desc: '', descFr: '',                              price: '3,00', tag: 'V' },
      { id: 59, name: 'Kaffee',                      desc: '', descFr: 'Tasse de Café',                 price: '3,00', tag: 'V' },
      { id: 60, name: 'Milchkaffee / Cappuccino',    desc: '', descFr: 'Café au lait / Cappuccino',     price: '3,90', tag: 'V' },
      { id: 61, name: 'Latte Macchiato',             desc: '', descFr: '',                              price: '4,10', tag: 'V' },
      { id: 62, name: 'Heiße Schokolade mit Sahne',  desc: '', descFr: 'Chocolat chaud crémeux',        price: '3,90', tag: 'V' },
      { id: 63, name: 'Tee',                         desc: 'Verschiedene Sorten', descFr: 'Différentes sortes de thé', price: '3,00', tag: 'VG'},
      { id: 64, name: 'Eiskaffee 0,3l',             desc: 'Mit Vanilleeis und Sahne', descFr: 'Café glacé',          price: '6,50', tag: 'V' },
      { id: 65, name: 'Eisschokolade 0,3l',         desc: 'Mit Vanilleeis und Sahne', descFr: 'Chocolat glacé',      price: '6,50', tag: 'V' },
    ]
  },
  {
    id: 'suesses', title: 'Süßes & Desserts',
    items: [
      { id: 66, name: 'Kuchen',                        desc: 'Wechselnde Auswahl',            descFr: 'Changer la sélection de gâteaux', price: '3,50', tag: 'V' },
      { id: 67, name: 'Muffins (Milka® / Oreo®)',      desc: 'Mit kakaohaltiger Fettglasur',  descFr: 'avec glaçage à base de cacao',    price: '3,00', tag: 'V' },
      { id: 68, name: 'Donuts (Milka® / Oreo® / Pink)',desc: 'Mit kakaohaltiger Fettglasur',  descFr: 'avec glaçage à base de cacao',    price: '3,00', tag: 'V' },
      { id: 69, name: 'Joghurtbecher',                 desc: 'Mit saisonalen Früchten',       descFr: 'Coupes de yaourt aux fruits de saison', price: '4,50', tag: 'V' },
    ]
  },
];

// ─── STATE ────────────────────────────────────────────────────────────────────
let currentMenuId   = null;
let currentMenuData = null;
let allMenus        = [];
let pendingDeleteItem    = null;
let pendingDeleteSection = null;
let pendingDeleteMenuId  = null;
let pendingCreateType    = null;
let nextId      = 100;
let saveTimeout = null;

// ─── AUTH ─────────────────────────────────────────────────────────────────────
onAuthStateChanged(auth, user => {
  if (user) {
    showScreen('home-screen');
    loadMenusList();
  } else {
    showScreen('login-screen');
  }
});

async function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value.trim();
  const btn   = document.getElementById('login-btn');
  const err   = document.getElementById('login-error');
  err.textContent  = '';
  btn.textContent  = '...';
  btn.disabled     = true;
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch {
    err.textContent = 'E-Mail oder Passwort falsch.';
    btn.textContent = 'Anmelden';
    btn.disabled    = false;
  }
}

async function doLogout() {
  await signOut(auth);
}

// ─── SCREENS ──────────────────────────────────────────────────────────────────
function showScreen(id) {
  document.getElementById('login-screen').style.display  = id === 'login-screen'  ? 'flex'  : 'none';
  document.getElementById('home-screen').style.display   = id === 'home-screen'   ? 'block' : 'none';
  document.getElementById('editor-screen').style.display = id === 'editor-screen' ? 'block' : 'none';
}

function showHome() {
  currentMenuId   = null;
  currentMenuData = null;
  showScreen('home-screen');
}

function showEditor(menuId) {
  currentMenuId = menuId;
  showScreen('editor-screen');
  loadEditor(menuId);
}

// ─── HOME: LISTA DE MENÚS ─────────────────────────────────────────────────────
function loadMenusList() {
  onSnapshot(collection(db, 'menus'), snapshot => {
    allMenus = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    allMenus.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'branch' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    renderMenusList();
  });
}

function renderMenusList() {
  const list = document.getElementById('menus-list');
  if (allMenus.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📋</div>
        <div class="empty-state-text">Noch keine Menüs vorhanden.<br>Erstelle deine erste Filiale.</div>
      </div>`;
    return;
  }
  list.innerHTML = allMenus.map(m => `
    <div class="menu-card">
      <div class="menu-card-info">
        <span class="menu-card-name">${esc(m.name)}</span>
        <span class="type-badge ${m.type === 'branch' ? 'badge-branch' : 'badge-event'}">
          ${m.type === 'branch' ? 'Filiale' : 'Event'}
        </span>
      </div>
      <div class="menu-card-actions">
        <label class="toggle" title="${m.active ? 'Aktiv – klicken zum Deaktivieren' : 'Inaktiv – klicken zum Aktivieren'}">
          <input type="checkbox" ${m.active ? 'checked' : ''} onchange="toggleActive('${m.id}', this.checked)">
          <div class="toggle-track"></div>
          <div class="toggle-thumb"></div>
        </label>
        <button class="btn-secondary btn-sm" onclick="showEditor('${m.id}')">Bearbeiten</button>
        <button class="btn-icon" onclick="askDeleteMenu('${m.id}','${esc(m.name)}')" title="Menü löschen">🗑</button>
      </div>
    </div>
  `).join('');
}

async function toggleActive(menuId, active) {
  await updateDoc(doc(db, 'menus', menuId), { active });
  showToast(active ? '✅ Menü aktiviert' : '⏸ Menü deaktiviert');
}

// ─── CREAR MENÚ ───────────────────────────────────────────────────────────────
function showCreateModal(type) {
  pendingCreateType = type;
  document.getElementById('create-modal-title').textContent =
    type === 'branch' ? 'Neue Filiale' : 'Neues Event';
  document.getElementById('create-name').value = '';

  const select = document.getElementById('create-source');
  select.innerHTML = [
    '<option value="demo">Standard-Menü (aktuelles Cengiz-Menü)</option>',
    '<option value="empty">Leer beginnen</option>',
    ...allMenus.map(m =>
      `<option value="${m.id}">Kopie von: ${esc(m.name)}</option>`
    )
  ].join('');

  document.getElementById('create-modal').style.display = 'flex';
  setTimeout(() => document.getElementById('create-name').focus(), 50);
}

function closeCreateModal() {
  document.getElementById('create-modal').style.display = 'none';
}

async function confirmCreate() {
  const name   = document.getElementById('create-name').value.trim();
  const source = document.getElementById('create-source').value;
  if (!name) { showToast('⚠️ Bitte einen Namen eingeben'); return; }

  const id = name.toLowerCase()
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');

  let sections = [];
  if (source === 'demo') {
    sections = JSON.parse(JSON.stringify(DEFAULT_SECTIONS));
  } else if (source !== 'empty') {
    const snap = await getDoc(doc(db, 'menus', source));
    if (snap.exists()) sections = JSON.parse(JSON.stringify(snap.data().sections || []));
  }

  await setDoc(doc(db, 'menus', id), { name, type: pendingCreateType, active: true, sections });
  closeCreateModal();
  showToast(`✅ "${name}" erstellt`);
}

// ─── BORRAR MENÚ ──────────────────────────────────────────────────────────────
function askDeleteMenu(menuId, name) {
  pendingDeleteMenuId = menuId;
  document.getElementById('delete-menu-modal-text').textContent =
    `„${name}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`;
  document.getElementById('delete-menu-modal').style.display = 'flex';
}

function closeDeleteMenuModal() {
  document.getElementById('delete-menu-modal').style.display = 'none';
  pendingDeleteMenuId = null;
}

async function confirmDeleteMenu() {
  if (!pendingDeleteMenuId) return;
  await deleteDoc(doc(db, 'menus', pendingDeleteMenuId));
  closeDeleteMenuModal();
  showToast('🗑 Menü gelöscht');
}

// ─── EDITOR: CARGAR ───────────────────────────────────────────────────────────
async function loadEditor(menuId) {
  document.getElementById('menu-editor').innerHTML = '<div class="empty-state"><div class="empty-state-text">Laden...</div></div>';
  const snap = await getDoc(doc(db, 'menus', menuId));
  if (!snap.exists()) { showHome(); return; }

  currentMenuData = snap.data();
  nextId = 100;
  (currentMenuData.sections || []).forEach(sec =>
    sec.items.forEach(item => { if ((item.id || 0) >= nextId) nextId = item.id + 1; })
  );

  const badge = document.getElementById('editor-type-badge');
  document.getElementById('editor-title').textContent = currentMenuData.name;
  badge.textContent  = currentMenuData.type === 'branch' ? 'Filiale' : 'Event';
  badge.className    = `type-badge ${currentMenuData.type === 'branch' ? 'badge-branch' : 'badge-event'}`;
  document.getElementById('save-indicator').textContent = '';
  renderAll();
}

// ─── EDITOR: RENDER ───────────────────────────────────────────────────────────
function renderAll() {
  const editor = document.getElementById('menu-editor');
  editor.innerHTML = '';
  let total = 0;
  (currentMenuData.sections || []).forEach(sec => {
    total += sec.items.length;
    editor.appendChild(renderSection(sec));
  });
  document.getElementById('item-count').textContent = total;
}

function renderSection(sec) {
  const block = document.createElement('div');
  block.className = 'cat-block';
  block.id = 'block-' + sec.id;
  block.innerHTML = `
    <div class="cat-title-row">
      <div class="cat-title">${sec.title}</div>
      <button class="add-item-btn" onclick="addItem('${sec.id}')">＋ Gericht hinzufügen</button>
    </div>
    <table class="menu-table">
      <thead><tr>
        <th style="width:22%">Name</th>
        <th style="width:28%">Beschreibung (DE)</th>
        <th style="width:22%">Beschreibung (FR)</th>
        <th style="width:10%">Label</th>
        <th style="width:10%">Preis €</th>
        <th style="width:8%"></th>
      </tr></thead>
      <tbody id="tbody-${sec.id}"></tbody>
    </table>`;
  const tbody = block.querySelector(`#tbody-${sec.id}`);
  sec.items.forEach(item => tbody.appendChild(renderRow(item, sec.id)));
  return block;
}

function renderRow(item, secId) {
  const tr = document.createElement('tr');
  tr.id = 'row-' + item.id;
  tr.innerHTML = `
    <td><input class="editable" value="${esc(item.name)}"   onchange="updateField(${item.id},'name',this.value)"></td>
    <td><input class="editable desc-field" value="${esc(item.desc)}"   onchange="updateField(${item.id},'desc',this.value)"></td>
    <td><input class="editable desc-field" value="${esc(item.descFr)}" onchange="updateField(${item.id},'descFr',this.value)"></td>
    <td>
      <select class="tag-select" onchange="updateField(${item.id},'tag',this.value)">
        <option value=""   ${item.tag===''   ?'selected':''}>—</option>
        <option value="V"  ${item.tag==='V'  ?'selected':''}>🌿 V</option>
        <option value="VG" ${item.tag==='VG' ?'selected':''}>🥦 VG</option>
        <option value="GF" ${item.tag==='GF' ?'selected':''}>🌾 GF</option>
      </select>
    </td>
    <td><input class="editable price-field" value="${esc(item.price)}" onchange="updateField(${item.id},'price',this.value)"></td>
    <td><button class="delete-btn" onclick="askDelete(${item.id},'${esc(item.name)}','${secId}')" title="Löschen">🗑</button></td>`;
  return tr;
}

function esc(str) {
  return (str || '').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

// ─── CRUD ─────────────────────────────────────────────────────────────────────
function updateField(id, field, value) {
  (currentMenuData.sections || []).forEach(sec => {
    const item = sec.items.find(i => i.id === id);
    if (item) item[field] = value;
  });
  scheduleSave();
  updateCount();
}

function addItem(secId) {
  const sec     = currentMenuData.sections.find(s => s.id === secId);
  const newItem = { id: nextId++, name: 'Neues Gericht', desc: '', descFr: '', price: '0,00', tag: '' };
  sec.items.push(newItem);
  document.getElementById('tbody-' + secId).appendChild(renderRow(newItem, secId));
  const row = document.getElementById('row-' + newItem.id);
  row.querySelector('input').focus();
  row.querySelector('input').select();
  scheduleSave();
  updateCount();
  showToast('✅ Gericht hinzugefügt');
}

function askDelete(id, name, secId) {
  pendingDeleteItem    = id;
  pendingDeleteSection = secId;
  document.getElementById('delete-modal-text').textContent = `„${name}" wirklich löschen?`;
  document.getElementById('delete-modal').style.display = 'flex';
}

function closeDeleteModal() {
  document.getElementById('delete-modal').style.display = 'none';
  pendingDeleteItem = null;
}

function confirmDelete() {
  if (pendingDeleteItem === null) return;
  const sec = currentMenuData.sections.find(s => s.id === pendingDeleteSection);
  sec.items = sec.items.filter(i => i.id !== pendingDeleteItem);
  document.getElementById('row-' + pendingDeleteItem)?.remove();
  closeDeleteModal();
  scheduleSave();
  updateCount();
  showToast('🗑 Gericht gelöscht');
}

function updateCount() {
  let total = 0;
  (currentMenuData.sections || []).forEach(s => total += s.items.length);
  document.getElementById('item-count').textContent = total;
}

// ─── GUARDAR EN FIRESTORE (debounced) ─────────────────────────────────────────
function scheduleSave() {
  const indicator = document.getElementById('save-indicator');
  indicator.textContent = '· Speichern...';
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(async () => {
    try {
      await updateDoc(doc(db, 'menus', currentMenuId), { sections: currentMenuData.sections });
      indicator.textContent = '✓ Gespeichert';
      setTimeout(() => { indicator.textContent = ''; }, 2000);
    } catch {
      indicator.textContent = '⚠️ Fehler';
    }
  }, 800);
}

// ─── COPIAR DE OTRA FILIAL ────────────────────────────────────────────────────
function showCopyModal() {
  const select = document.getElementById('copy-source');
  const others = allMenus.filter(m => m.id !== currentMenuId);
  if (!others.length) { showToast('Keine anderen Menüs vorhanden'); return; }
  select.innerHTML = others
    .map(m => `<option value="${m.id}">${esc(m.name)} (${m.type === 'branch' ? 'Filiale' : 'Event'})</option>`)
    .join('');
  document.getElementById('copy-modal').style.display = 'flex';
}

function closeCopyModal() {
  document.getElementById('copy-modal').style.display = 'none';
}

async function confirmCopy() {
  const sourceId = document.getElementById('copy-source').value;
  const snap     = await getDoc(doc(db, 'menus', sourceId));
  if (!snap.exists()) { showToast('Fehler: Quelle nicht gefunden'); return; }
  currentMenuData.sections = JSON.parse(JSON.stringify(snap.data().sections || []));
  closeCopyModal();
  renderAll();
  scheduleSave();
  showToast('✅ Menü kopiert');
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ─── EXPONER AL SCOPE GLOBAL (requerido por onclick= en HTML) ─────────────────
Object.assign(window, {
  doLogin, doLogout,
  showHome, showEditor,
  showCreateModal, closeCreateModal, confirmCreate,
  showCopyModal, closeCopyModal, confirmCopy,
  toggleActive,
  addItem, updateField,
  askDelete, closeDeleteModal, confirmDelete,
  askDeleteMenu, closeDeleteMenuModal, confirmDeleteMenu,
});

// ─── KEY LISTENERS ────────────────────────────────────────────────────────────
document.getElementById('login-pass').addEventListener('keydown', e => {
  if (e.key === 'Enter') doLogin();
});
document.getElementById('login-email').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('login-pass').focus();
});
