import { db } from '../firebase-config.js';
import { doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const menuId = params.get('id');

if (!menuId) {
  showError();
} else {
  onSnapshot(doc(db, 'menus', menuId), snap => {
    if (!snap.exists() || snap.data().active === false) {
      showError();
    } else {
      renderMenu(snap.data());
    }
  }, () => showError());
}

function showError() {
  document.getElementById('loading-state').style.display = 'none';
  document.getElementById('error-state').style.display   = 'flex';
  document.getElementById('menu-app').style.display      = 'none';
}

function renderMenu(data) {
  document.title = `Cengiz – ${data.name} · Speisekarte`;
  document.getElementById('header-location').textContent = data.name;

  const navTabs  = document.getElementById('nav-tabs');
  const sections = document.getElementById('menu-sections');
  navTabs.innerHTML  = '';
  sections.innerHTML = '';

  (data.sections || []).forEach((sec, i) => {
    // Nav tab
    const tab = document.createElement('div');
    tab.className = `nav-tab${i === 0 ? ' active' : ''}`;
    tab.textContent = sec.title.split('&')[0].trim();
    tab.addEventListener('click', () => showSection(sec.id, tab));
    navTabs.appendChild(tab);

    // Sección
    const section = document.createElement('div');
    section.className = `section${i === 0 ? ' active' : ''}`;
    section.id = sec.id;
    section.innerHTML = `
      <div class="cat-header">
        <h2>${sec.title}</h2>
        <div class="cat-line"></div>
      </div>
      <div class="items-list">
        ${(sec.items || []).map(item => `
          <div class="menu-item">
            <div class="item-left">
              <div class="item-name-row">
                <span class="item-name">${item.name}</span>
                ${tagBadge(item.tag)}
              </div>
              ${item.desc   ? `<div class="item-desc">${item.desc}</div>`       : ''}
              ${item.descFr ? `<div class="item-desc-fr">${item.descFr}</div>` : ''}
            </div>
            <div class="item-price">${item.price} €</div>
          </div>
        `).join('')}
      </div>`;
    sections.appendChild(section);
  });

  document.getElementById('loading-state').style.display = 'none';
  document.getElementById('menu-app').style.display      = 'block';
}

function tagBadge(tag) {
  if (!tag) return '';
  const colors = { V: '#80BA27', VG: '#4caf50', GF: '#ff9800' };
  return `<span style="background:${colors[tag]};color:white;display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;font-size:9px;font-weight:700;">${tag}</span>`;
}

function showSection(id, tab) {
  document.querySelectorAll('.section').forEach(s  => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t  => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  tab.classList.add('active');
  tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}
