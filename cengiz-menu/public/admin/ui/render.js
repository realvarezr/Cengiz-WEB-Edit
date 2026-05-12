import { state } from '../state.js';
import { esc, fixTitle } from '../utils/text.js';

export function renderAll() {
  const editor = document.getElementById('menu-editor');
  editor.innerHTML = '';
  let total = 0;
  (state.currentMenuData.sections || []).forEach((sec, secIndex, arr) => {
    total += sec.items.length;
    editor.appendChild(renderSection(sec, secIndex, arr.length));
  });
  document.getElementById('item-count').textContent = total;
}

export function renderSection(sec, secIndex, secCount) {
  const block = document.createElement('div');
  block.className   = 'cat-block';
  block.id          = 'block-' + sec.id;
  block.dataset.secId = sec.id;
  block.innerHTML = `
    <div class="cat-title-row">
      <input class="cat-title-input" value="${esc(fixTitle(sec.title))}" onchange="updateSectionTitle('${sec.id}', this.value)">
      <div class="cat-actions">
        <button class="move-btn" onclick="moveSection('${sec.id}', -1)" ${secIndex === 0 ? 'disabled' : ''} title="Nach oben">↑</button>
        <button class="move-btn" onclick="moveSection('${sec.id}', 1)" ${secIndex === secCount - 1 ? 'disabled' : ''} title="Nach unten">↓</button>
        <button class="add-item-btn" onclick="addItem('${sec.id}')">＋ Gericht hinzufügen</button>
      </div>
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
      <tbody id="tbody-${sec.id}" data-sec-id="${sec.id}"></tbody>
    </table>`;
  const tbody = block.querySelector(`#tbody-${sec.id}`);
  sec.items.forEach((item, i) => tbody.appendChild(renderRow(item, sec.id, i, sec.items.length)));
  return block;
}

export function renderRow(item, secId, itemIndex, itemCount) {
  const tr = document.createElement('tr');
  tr.id = 'row-' + item.id;
  tr.dataset.itemId = String(item.id);
  tr.innerHTML = `
    <td><input class="editable" value="${esc(item.name)}" onchange="updateField(${item.id},'name',this.value)"></td>
    <td><input class="editable desc-field" value="${esc(item.desc)}" onchange="updateField(${item.id},'desc',this.value)"></td>
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
    <td>
      <div class="row-actions">
        <button class="move-btn" onclick="moveItem('${secId}', ${item.id}, -1)" ${itemIndex === 0 ? 'disabled' : ''} title="Nach oben">↑</button>
        <button class="move-btn" onclick="moveItem('${secId}', ${item.id}, 1)" ${itemIndex === itemCount - 1 ? 'disabled' : ''} title="Nach unten">↓</button>
        <button class="delete-btn" onclick="askDelete(${item.id},'${esc(item.name)}','${secId}')" title="Löschen">🗑</button>
      </div>
    </td>`;
  return tr;
}

export function renderMenusList(allMenus) {
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
