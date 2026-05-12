import { state } from '../state.js';
import { refresh } from './editor-refresh.js';
import { markPending } from './save.js';
import { updateMenuActive } from '../services/firebase-menus.js';
import { showToast } from '../ui/toast.js';

export function addItem(secId) {
  const sec     = state.currentMenuData.sections.find(s => s.id === secId);
  const newItem = { id: state.nextId++, name: 'Neues Gericht', desc: '', descFr: '', price: '0,00', tag: '' };
  sec.items.push(newItem);
  refresh();
  const row = document.getElementById('row-' + newItem.id);
  if (row) { row.querySelector('input').focus(); row.querySelector('input').select(); }
  markPending();
  showToast('✅ Gericht hinzugefügt');
}

export function updateField(id, field, value) {
  (state.currentMenuData.sections || []).forEach(sec => {
    const item = sec.items.find(i => i.id === id);
    if (item) item[field] = value;
  });
  markPending();
}

export function updateSectionTitle(secId, newTitle) {
  const sec = state.currentMenuData.sections.find(s => s.id === secId);
  if (sec) sec.title = newTitle;
  markPending();
}

export async function toggleActive(menuId, active) {
  await updateMenuActive(menuId, active);
  showToast(active ? '✅ Menü aktiviert' : '⏸ Menü deaktiviert');
}
