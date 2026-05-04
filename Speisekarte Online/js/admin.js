
// ─── CREDENTIALS ───────────────────────────────────────────
const CREDENTIALS = { user: 'cengiz', pass: 'menu2024' };

// ─── MENU DATA ─────────────────────────────────────────────
const menuData = {
  sections: [
    {
      id: 'burger',
      title: 'Burger & Hauptgerichte',
      items: [
        { id: 1, name: 'Crispy Chicken-Burger', desc: 'Mit Tomate, Gurke, Zwiebeln & Pommes', descFr: 'Chicken Burger avec des frites', price: '15,90', tag: '' },
        { id: 2, name: 'Beef-Burger', desc: 'Mit Tomate, Gurke, Käse, Zwiebeln & Pommes', descFr: 'Beef-Burger avec des frites', price: '15,90', tag: '' },
        { id: 3, name: 'Bacon-Beef Burger', desc: 'Mit Bacon, Tomate, Gurke, Käse, Zwiebeln, BBQ-Sauce & Pommes', descFr: 'Beef-Burger avec bacon & frites', price: '16,90', tag: '' },
        { id: 4, name: 'Green-Oat Burger', desc: 'Mit Tomate, Gurke, Zwiebeln, Mango Relish & Pommes', descFr: 'Green Oat Burger avec des frites', price: '14,90', tag: 'V' },
        { id: 5, name: 'Cordon Bleu', desc: 'Mit Pommes & Salatbouquet', descFr: 'Cordon Bleu avec frites et bouquet de salade', price: '17,90', tag: '' },
        { id: 6, name: 'Putenschnitzel', desc: 'Paniert mit Pommes', descFr: "L'escalope de dinde panée & frites", price: '14,90', tag: '' },
      ]
    },
    {
      id: 'snacks',
      title: 'Snacks & Kleinigkeiten',
      items: [
        { id: 7, name: 'Baguette', desc: 'Mit Schinken oder Salami, überbacken mit Käse', descFr: 'Baguette chaud avec jambon ou salami, gratiné avec fromage', price: '7,50', tag: '' },
        { id: 8, name: 'Pommes Frites', desc: 'Mit Ketchup oder Mayo', descFr: 'Frites avec Ketchup / Mayo', price: '4,00', tag: 'VG' },
        { id: 9, name: 'Extra Mayo / Ketchup', desc: '', descFr: '', price: '0,50', tag: '' },
        { id: 10, name: 'Currywurst mit Brötchen', desc: '', descFr: 'Saucisse au curry avec petit pain', price: '5,00', tag: '' },
        { id: 11, name: 'Currywurst mit Pommes', desc: '', descFr: 'Saucisse au curry avec des frites', price: '8,90', tag: '' },
        { id: 12, name: 'Bratwurst mit Pommes', desc: '', descFr: 'Saucisse knack grillée & frites', price: '8,50', tag: '' },
        { id: 13, name: '6 Chicken-Nuggets', desc: '', descFr: '', price: '5,50', tag: '' },
        { id: 14, name: '6 Chicken-Nuggets mit Pommes', desc: '', descFr: '6-Chicken-Nuggets avec des frites', price: '9,50', tag: '' },
      ]
    },
    {
      id: 'flammkuchen',
      title: 'Flammkuchen',
      items: [
        { id: 15, name: 'Flammkuchen Klassisch', desc: 'Mit Zwiebeln, Speck, Käse', descFr: 'Tarte flambée, oignon, bacon, fromage', price: '10,50', tag: '' },
        { id: 16, name: 'Flammkuchen Gemüse', desc: 'Mit Gemüse, Käse', descFr: 'Tarte flambée, des légumes, fromage', price: '10,50', tag: 'V' },
        { id: 17, name: 'Flammkuchen Lachs', desc: 'Mit Lachs, Scampi und Lauch', descFr: 'Tarte flambée, saumon, scampi, poireau', price: '11,50', tag: '' },
      ]
    },
    {
      id: 'salate',
      title: 'Salate',
      items: [
        { id: 18, name: 'Blattsalate', desc: 'Mit Tomaten, Karotte, Gurke', descFr: 'Salade mixte avec tomates, carotte, concombre', price: '12,50', tag: 'VG' },
        { id: 19, name: '+ Thunfisch und Zwiebeln', desc: '', descFr: '+ thon & oignons', price: '13,90', tag: '' },
        { id: 20, name: '+ Hirtenkäse', desc: '', descFr: '+ Fromage du berger', price: '13,90', tag: 'V' },
        { id: 21, name: '+ Äpfel und Walnüsse', desc: '', descFr: '+ pommes & noix', price: '13,90', tag: 'VG' },
        { id: 22, name: '+ Hähnchenstreifen', desc: '', descFr: '+ poulet', price: '15,50', tag: '' },
        { id: 23, name: 'Toskana Salat', desc: 'Blattsalate, Karotte, Gurke, verschiedene Antipasti', descFr: 'Salade Toskana avec tomates, carotte, concombre, Antipasti', price: '14,90', tag: '' },
        { id: 24, name: 'Strassburger Wurstsalat', desc: 'Mit Brötchen', descFr: 'Salade de servelas et fromage, avec petit pain', price: '10,50', tag: '' },
      ]
    },
    {
      id: 'bowls',
      title: 'Bowls',
      items: [
        { id: 25, name: 'Buddha Bowl', desc: 'Mit Quinoa, Edamame, rote Beete, schwarzem Sesam, Limette, Blattsalate', descFr: 'Buddha Bowl avec quinoa, edamame, betteraves', price: '14,90', tag: 'VG' },
        { id: 26, name: 'Buddha Bowl Spicy Chicken', desc: 'Mit Quinoa, Edamame, rote Beete, schwarzem Sesam, Limette, Blattsalate, knusprige Hähnchenstreifen', descFr: 'Buddha Bowl avec poulet croustillant et épicé', price: '16,90', tag: '' },
        { id: 27, name: 'Bali Bowl', desc: 'Mit Avocado, Mango, Paprika, rote Zwiebeln, Tomate, Gurke, Mais, Blattsalate, Avocado-Kräuter Dressing', descFr: 'Bali Bowl avec avocat, mangue, poivron, oignons rouges, tomate, concombre, maïs, laitue', price: '14,90', tag: 'VG' },
      ]
    },
    {
      id: 'loadedfries',
      title: 'Loaded Fries',
      items: [
        { id: 28, name: 'Pulled Turkey & BBQ-Sauce', desc: '', descFr: 'avec pulled turkey et sauce BBQ', price: '10,50', tag: '' },
        { id: 29, name: '„Tijuana Style"', desc: 'Mit Guacamole, Sour Cream und Tomatensalsa', descFr: 'avec guacamole, sour cream et salsa de tomates', price: '8,50', tag: 'V' },
        { id: 30, name: 'Parmesan & Schnittlauch', desc: 'Mit frisch geriebenem Parmesan', descFr: 'avec parmesan fraîchement râpé et ciboulette', price: '7,50', tag: 'V' },
        { id: 31, name: 'Chili Cheese & Jalapeños', desc: '', descFr: 'avec sauce chili cheese et jalapeños', price: '7,50', tag: 'V' },
        { id: 32, name: 'Tomatensalsa', desc: '', descFr: 'avec salsa de tomates', price: '7,50', tag: 'VG' },
        { id: 33, name: 'Guacamole', desc: '', descFr: 'avec guacamole', price: '7,50', tag: 'VG' },
        { id: 34, name: 'Sour Cream & Schnittlauch', desc: '', descFr: 'avec sour cream et ciboulette', price: '7,50', tag: 'V' },
      ]
    },
    {
      id: 'getraenke',
      title: 'Getränke',
      items: [
        { id: 35, name: 'Mineralwasser / Stilles Wasser 0,5l', desc: '', descFr: 'Eau minérale / naturelle', price: '3,30', tag: 'VG' },
        { id: 36, name: 'Apfel- / Johannisbeerschorle 0,5l', desc: '', descFr: "Jus de pommes ou groseille eau minérale", price: '3,50', tag: 'VG' },
        { id: 37, name: 'Top Fit 0,5l', desc: 'Limonade isotonique', descFr: '', price: '3,50', tag: 'VG' },
        { id: 38, name: 'Coca-Cola / Coca-Cola Zero 0,5l', desc: '', descFr: '', price: '4,00', tag: '' },
        { id: 39, name: 'Sprite / Fanta / Cola-Mix 0,5l', desc: '', descFr: '', price: '4,00', tag: '' },
        { id: 40, name: 'Fuze Eistee 0,4l', desc: '', descFr: 'Fuze thé glacé', price: '4,00', tag: '' },
        { id: 41, name: 'Red Bull 0,25l', desc: 'Verschiedene Sorten', descFr: '', price: '3,50', tag: '' },
        { id: 42, name: 'Fine Spritz – Wild Virgins 0,3l', desc: 'Alkoholfrei', descFr: 'Apéritif orange sans alcool', price: '6,00', tag: '' },
        { id: 43, name: 'Erdinger Hefeweizen Alkoholfrei 0,5l', desc: '', descFr: "Bière de blé sans alcool", price: '4,50', tag: '' },
        { id: 44, name: 'Erdinger Helles / Weizenradler Alkoholfrei 0,33l', desc: '', descFr: 'Panaché de blé sans alcool', price: '3,50', tag: '' },
        { id: 45, name: 'Pils 0,3l', desc: '', descFr: 'Bière', price: '3,90', tag: '' },
        { id: 46, name: 'Hefeweizen 0,5l', desc: '', descFr: 'Bière blanche', price: '4,90', tag: '' },
        { id: 47, name: 'Lager Bier 0,5l', desc: '', descFr: 'Bière blonde', price: '4,90', tag: '' },
        { id: 48, name: 'Radler 0,3l', desc: '', descFr: 'Bière panachée', price: '3,90', tag: '' },
        { id: 49, name: 'Desperados 0,33l', desc: '', descFr: '', price: '4,00', tag: '' },
        { id: 50, name: 'Rieslingschorle 0,25l', desc: '', descFr: 'Vin blanc avec eau minérale', price: '4,50', tag: '' },
        { id: 51, name: 'Prosecco – Scavy & Ray 0,2l', desc: '', descFr: '', price: '5,50', tag: '' },
        { id: 52, name: 'Maracuja Sprizz 0,3l', desc: '', descFr: '', price: '6,90', tag: '' },
        { id: 53, name: 'Aperol Sprizz 0,3l', desc: '', descFr: '', price: '7,50', tag: '' },
        { id: 54, name: 'Rosé Sommerschorle 0,3l', desc: '', descFr: 'Vin rosé avec eau minérale & menthe', price: '6,90', tag: '' },
        { id: 55, name: 'Lillet Wild Berry 0,3l', desc: '', descFr: '', price: '8,50', tag: '' },
        { id: 56, name: 'Caipirinha / Mojito / Cuba Libre 0,3l', desc: '', descFr: '', price: '8,90', tag: '' },
      ]
    },
    {
      id: 'kaffee',
      title: 'Kaffee & Heißgetränke',
      items: [
        { id: 57, name: 'Espresso', desc: '', descFr: 'Expresso', price: '2,50', tag: 'V' },
        { id: 58, name: 'Espresso Macchiato', desc: '', descFr: '', price: '3,00', tag: 'V' },
        { id: 59, name: 'Kaffee', desc: '', descFr: 'Tasse de Café', price: '3,00', tag: 'V' },
        { id: 60, name: 'Milchkaffee / Cappuccino', desc: '', descFr: 'Café au lait / Cappuccino', price: '3,90', tag: 'V' },
        { id: 61, name: 'Latte Macchiato', desc: '', descFr: '', price: '4,10', tag: 'V' },
        { id: 62, name: 'Heiße Schokolade mit Sahne', desc: '', descFr: 'Chocolat chaud crémeux', price: '3,90', tag: 'V' },
        { id: 63, name: 'Tee', desc: 'Verschiedene Sorten', descFr: 'Différentes sortes de thé', price: '3,00', tag: 'VG' },
        { id: 64, name: 'Eiskaffee 0,3l', desc: 'Mit Vanilleeis und Sahne', descFr: 'Café glacé', price: '6,50', tag: 'V' },
        { id: 65, name: 'Eisschokolade 0,3l', desc: 'Mit Vanilleeis und Sahne', descFr: 'Chocolat glacé', price: '6,50', tag: 'V' },
      ]
    },
    {
      id: 'suesses',
      title: 'Süßes & Desserts',
      items: [
        { id: 66, name: 'Kuchen', desc: 'Wechselnde Auswahl', descFr: 'Changer la sélection de gâteaux', price: '3,50', tag: 'V' },
        { id: 67, name: 'Muffins (Milka® / Oreo®)', desc: 'Mit kakaohaltiger Fettglasur', descFr: 'avec glaçage à base de cacao', price: '3,00', tag: 'V' },
        { id: 68, name: 'Donuts (Milka® / Oreo® / Pink)', desc: 'Mit kakaohaltiger Fettglasur', descFr: 'avec glaçage à base de cacao', price: '3,00', tag: 'V' },
        { id: 69, name: 'Joghurtbecher', desc: 'Mit saisonalen Früchten', descFr: 'Coupes de yaourt aux fruits de saison', price: '4,50', tag: 'V' },
      ]
    },
  ]
};

let nextId = 100;
let pendingDeleteRow = null;
let pendingDeleteSection = null;

// ─── LOGIN ──────────────────────────────────────────────────
function doLogin() {
  const u = document.getElementById('login-user').value.trim();
  const p = document.getElementById('login-pass').value.trim();
  if (u === CREDENTIALS.user && p === CREDENTIALS.pass) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    renderAll();
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
}
document.getElementById('login-pass').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

function doLogout() {
  document.getElementById('login-screen').style.display = 'flex';
  document.getElementById('app').style.display = 'none';
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
}

// ─── RENDER ─────────────────────────────────────────────────
function renderAll() {
  const editor = document.getElementById('menu-editor');
  editor.innerHTML = '';
  let total = 0;
  menuData.sections.forEach(sec => {
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
      <thead>
        <tr>
          <th style="width:22%">Name</th>
          <th style="width:28%">Beschreibung (DE)</th>
          <th style="width:22%">Beschreibung (FR)</th>
          <th style="width:10%">Label</th>
          <th style="width:10%">Preis €</th>
          <th style="width:8%"></th>
        </tr>
      </thead>
      <tbody id="tbody-${sec.id}"></tbody>
    </table>
  `;

  const tbody = block.querySelector(`#tbody-${sec.id}`);
  sec.items.forEach(item => tbody.appendChild(renderRow(item, sec.id)));
  return block;
}

function renderRow(item, secId) {
  const tr = document.createElement('tr');
  tr.id = 'row-' + item.id;
  tr.innerHTML = `
    <td><input class="editable" value="${esc(item.name)}" onchange="updateField(${item.id},'name',this.value)"></td>
    <td><input class="editable desc-field" value="${esc(item.desc)}" onchange="updateField(${item.id},'desc',this.value)"></td>
    <td><input class="editable desc-field" value="${esc(item.descFr)}" onchange="updateField(${item.id},'descFr',this.value)"></td>
    <td>
      <select class="tag-select" onchange="updateField(${item.id},'tag',this.value)">
        <option value="" ${item.tag===''?'selected':''}>—</option>
        <option value="V" ${item.tag==='V'?'selected':''}>🌿 V</option>
        <option value="VG" ${item.tag==='VG'?'selected':''}>🥦 VG</option>
        <option value="GF" ${item.tag==='GF'?'selected':''}>🌾 GF</option>
      </select>
    </td>
    <td><input class="editable price-field" value="${esc(item.price)}" onchange="updateField(${item.id},'price',this.value)"></td>
    <td><button class="delete-btn" onclick="askDelete(${item.id},'${esc(item.name)}','${secId}')" title="Löschen">🗑</button></td>
  `;
  return tr;
}

function esc(str) {
  return (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ─── CRUD ───────────────────────────────────────────────────
function updateField(id, field, value) {
  menuData.sections.forEach(sec => {
    const item = sec.items.find(i => i.id === id);
    if (item) item[field] = value;
  });
  updateCount();
}

function addItem(secId) {
  const sec = menuData.sections.find(s => s.id === secId);
  const newItem = { id: nextId++, name: 'Neues Gericht', desc: '', descFr: '', price: '0,00', tag: '' };
  sec.items.push(newItem);
  const tbody = document.getElementById('tbody-' + secId);
  tbody.appendChild(renderRow(newItem, secId));
  // focus name field
  const row = document.getElementById('row-' + newItem.id);
  row.querySelector('input').focus();
  row.querySelector('input').select();
  updateCount();
  showToast('✅ Gericht hinzugefügt');
}

function askDelete(id, name, secId) {
  pendingDeleteRow = id;
  pendingDeleteSection = secId;
  document.getElementById('modal-text').textContent = `„${name}" wirklich löschen?`;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
  pendingDeleteRow = null;
}

function confirmDelete() {
  if (pendingDeleteRow === null) return;
  const sec = menuData.sections.find(s => s.id === pendingDeleteSection);
  sec.items = sec.items.filter(i => i.id !== pendingDeleteRow);
  const row = document.getElementById('row-' + pendingDeleteRow);
  if (row) row.remove();
  closeModal();
  updateCount();
  showToast('🗑 Gericht gelöscht');
}

function updateCount() {
  let total = 0;
  menuData.sections.forEach(s => total += s.items.length);
  document.getElementById('item-count').textContent = total;
}

// ─── TOAST ──────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ─── EXPORT ─────────────────────────────────────────────────
function exportMenu() {
  // Sync all input values back to data first
  menuData.sections.forEach(sec => {
    sec.items.forEach(item => {
      const row = document.getElementById('row-' + item.id);
      if (!row) return;
      const inputs = row.querySelectorAll('input');
      item.name = inputs[0].value;
      item.desc = inputs[1].value;
      item.descFr = inputs[2].value;
      item.price = inputs[3].value;
      item.tag = row.querySelector('select').value;
    });
  });

  const html = generateMenuHTML();
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'cengiz-speisekarte.html';
  a.click();
  URL.revokeObjectURL(url);
  showToast('✅ Menü exportiert! Datei hochladen nicht vergessen.');
}

// ─── GENERATE HTML ──────────────────────────────────────────
function tagBadge(tag) {
  if (!tag) return '';
  const colors = { V: '#80BA27', VG: '#4caf50', GF: '#ff9800' };
  return `<span class="tag" style="background:${colors[tag]};color:white;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;font-size:9px;font-weight:700;">${tag}</span>`;
}

function generateMenuHTML() {
  const navTabs = menuData.sections.map((sec, i) =>
    `<div class="nav-tab${i===0?' active':''}" onclick="showSection('${sec.id}')">${sec.title.split('&')[0].trim()}</div>`
  ).join('\n  ');

  const sections = menuData.sections.map((sec, si) => {
    const items = sec.items.map(item => `
      <div class="menu-item">
        <div class="item-left">
          <div class="item-name-row">
            <span class="item-name">${item.name}</span>
            ${tagBadge(item.tag)}
          </div>
          ${item.desc ? `<div class="item-desc">${item.desc}</div>` : ''}
          ${item.descFr ? `<div class="item-desc-fr">${item.descFr}</div>` : ''}
        </div>
        <div class="item-price">${item.price} €</div>
      </div>`).join('');

    return `
  <div class="section${si===0?' active':''}" id="${sec.id}">
    <div class="cat-header"><h2>${sec.title}</h2><div class="cat-line"></div></div>
    <div class="items-list">${items}
    </div>
  </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cengiz – Speisekarte Offenburg</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  :root{--green:#80BA27;--green-dark:#6aa01f;--brown:#5A3217;--cream:#faf7f2;--cream-dark:#f0ebe0;--text:#2a1a0a;--text-muted:#7a6a55;--white:#ffffff;}
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'DM Sans',sans-serif;background:var(--cream);color:var(--text);min-height:100vh;}
  header{background:var(--brown);padding:32px 20px 24px;text-align:center;position:relative;overflow:hidden;}
  header::before{content:'';position:absolute;top:-40px;left:-40px;width:160px;height:160px;background:var(--green);opacity:.12;border-radius:50%;}
  header::after{content:'';position:absolute;bottom:-60px;right:-20px;width:200px;height:200px;background:var(--green);opacity:.08;border-radius:50%;}
  .header-label{font-size:11px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:var(--green);margin-bottom:8px;}
  header h1{font-family:'Playfair Display',serif;font-size:42px;color:#fff;letter-spacing:-1px;line-height:1;}
  .header-sub{font-size:13px;color:rgba(255,255,255,.55);margin-top:6px;letter-spacing:1px;}
  .legend{background:var(--cream-dark);border-bottom:1px solid rgba(90,50,23,.1);padding:10px 20px;display:flex;gap:16px;justify-content:center;flex-wrap:wrap;}
  .legend-item{display:flex;align-items:center;gap:5px;font-size:12px;color:var(--text-muted);font-weight:500;}
  .badge{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;font-size:10px;font-weight:700;}
  .nav-tabs{display:flex;overflow-x:auto;background:var(--brown);padding:0 12px;gap:2px;scrollbar-width:none;position:sticky;top:0;z-index:100;}
  .nav-tabs::-webkit-scrollbar{display:none;}
  .nav-tab{flex-shrink:0;padding:12px 16px;font-size:12px;font-weight:500;letter-spacing:.5px;color:rgba(255,255,255,.55);cursor:pointer;border-bottom:3px solid transparent;transition:all .2s;white-space:nowrap;text-transform:uppercase;}
  .nav-tab.active,.nav-tab:hover{color:var(--green);border-bottom-color:var(--green);}
  main{padding:0 0 60px;}
  .section{display:none;animation:fadeIn .3s ease;}
  .section.active{display:block;}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  .cat-header{padding:28px 20px 8px;display:flex;align-items:center;gap:12px;}
  .cat-header h2{font-family:'Playfair Display',serif;font-size:24px;color:var(--brown);line-height:1;}
  .cat-line{flex:1;height:1px;background:linear-gradient(to right,var(--green),transparent);opacity:.4;}
  .items-list{padding:4px 16px 8px;}
  .menu-item{background:var(--white);border-radius:14px;padding:14px 16px;margin-bottom:10px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;box-shadow:0 1px 4px rgba(90,50,23,.06);}
  .item-left{flex:1;min-width:0;}
  .item-name-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:3px;}
  .item-name{font-weight:500;font-size:15px;color:var(--text);line-height:1.2;}
  .item-desc{font-size:12.5px;color:var(--text-muted);line-height:1.4;margin-bottom:3px;}
  .item-desc-fr{font-size:11.5px;color:#bbb;font-style:italic;line-height:1.3;}
  .item-price{font-family:'Playfair Display',serif;font-size:16px;font-weight:700;color:var(--brown);white-space:nowrap;flex-shrink:0;padding-top:1px;}
  footer{text-align:center;padding:20px;font-size:11.5px;color:var(--text-muted);border-top:1px solid var(--cream-dark);margin-top:20px;line-height:1.6;}
  .footer-logo{font-family:'Playfair Display',serif;font-size:18px;color:var(--brown);margin-bottom:6px;}
</style>
</head>
<body>
<header>
  <div class="header-label">Offenburg</div>
  <h1>Cengiz</h1>
  <div class="header-sub">Gastronomie · Speisekarte</div>
</header>
<div class="legend">
  <div class="legend-item"><span class="badge" style="background:#80BA27;color:white;">V</span> Vegetarisch</div>
  <div class="legend-item"><span class="badge" style="background:#4caf50;color:white;">VG</span> Vegan</div>
  <div class="legend-item"><span class="badge" style="background:#ff9800;color:white;">GF</span> Glutenfrei</div>
</div>
<nav class="nav-tabs">
  ${navTabs}
</nav>
<main>
${sections}
</main>
<footer>
  <div class="footer-logo">Cengiz</div>
  <div>Alle Preise inkl. Service und MwSt.</div>
  <div>Zu deklarationspflichtigen Allergenen und Zusatzstoffen geben wir Ihnen gerne Auskunft.</div>
  <div style="margin-top:6px;font-size:10.5px;">🍶 Pfand: Flaschen 0,50 € · Teller, Tassen, Gläser, Holzbretter 2,00 €</div>
</footer>
<script>
function showSection(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  event.target.classList.add('active');
  event.target.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
}
<\/script>
</body>
</html>`;
}
