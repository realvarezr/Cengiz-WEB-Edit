import { state } from '../state.js';
import { esc, slugify } from '../utils/text.js';
import { refresh } from '../features/editor-refresh.js';
import { markPending, saveNow } from '../features/save.js';
import { fetchMenu, createMenu, deleteMenu, updateMenuName } from '../services/firebase-menus.js';
import { DEFAULT_SECTIONS } from '../data/default-sections.js';
import { showToast } from './toast.js';
import { showHome } from './screens.js';

// ─── CREAR MENÚ ───────────────────────────────────────────────────────────────
export function showCreateModal(type) {
  state.pendingCreateType = type;
  document.getElementById('create-modal-title').textContent =
    type === 'branch' ? 'Neue Filiale' : 'Neues Event';
  document.getElementById('create-name').value = '';

  document.getElementById('create-source').innerHTML = [
    '<option value="demo">Standard-Menü (aktuelles Cengiz-Menü)</option>',
    '<option value="empty">Leer beginnen</option>',
    ...state.allMenus.map(m => `<option value="${m.id}">Kopie von: ${esc(m.name)}</option>`)
  ].join('');

  document.getElementById('create-modal').style.display = 'flex';
  setTimeout(() => document.getElementById('create-name').focus(), 50);
}

export function closeCreateModal() {
  document.getElementById('create-modal').style.display = 'none';
}

export async function confirmCreate() {
  const name   = document.getElementById('create-name').value.trim();
  const source = document.getElementById('create-source').value;
  if (!name) { showToast('⚠️ Bitte einen Namen eingeben'); return; }

  const id = slugify(name);
  let sections = [];
  if (source === 'demo') {
    sections = JSON.parse(JSON.stringify(DEFAULT_SECTIONS));
  } else if (source !== 'empty') {
    const snap = await fetchMenu(source);
    if (snap.exists()) sections = JSON.parse(JSON.stringify(snap.data().sections || []));
  }

  await createMenu(id, { name, type: state.pendingCreateType, active: true, sections });
  closeCreateModal();
  showToast(`✅ "${name}" erstellt`);
}

// ─── BORRAR MENÚ ──────────────────────────────────────────────────────────────
export function askDeleteMenu(menuId, name) {
  state.pendingDeleteMenuId = menuId;
  document.getElementById('delete-menu-modal-text').textContent =
    `„${name}" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`;
  document.getElementById('delete-menu-modal').style.display = 'flex';
}

export function closeDeleteMenuModal() {
  document.getElementById('delete-menu-modal').style.display = 'none';
  state.pendingDeleteMenuId = null;
}

export async function confirmDeleteMenu() {
  if (!state.pendingDeleteMenuId) return;
  await deleteMenu(state.pendingDeleteMenuId);
  closeDeleteMenuModal();
  showToast('🗑 Menü gelöscht');
}

// ─── BORRAR GERICHT ───────────────────────────────────────────────────────────
export function askDelete(id, name, secId) {
  state.pendingDeleteItem    = id;
  state.pendingDeleteSection = secId;
  document.getElementById('delete-modal-text').textContent = `„${name}" wirklich löschen?`;
  document.getElementById('delete-modal').style.display = 'flex';
}

export function closeDeleteModal() {
  document.getElementById('delete-modal').style.display = 'none';
  state.pendingDeleteItem = null;
}

export function confirmDelete() {
  if (state.pendingDeleteItem === null) return;
  const sec = state.currentMenuData.sections.find(s => s.id === state.pendingDeleteSection);
  sec.items = sec.items.filter(i => i.id !== state.pendingDeleteItem);
  closeDeleteModal();
  refresh();
  markPending();
  showToast('🗑 Gericht gelöscht');
}

// ─── NUEVO UNTERMENÜ ──────────────────────────────────────────────────────────
export function showAddSectionModal() {
  document.getElementById('add-section-name').value = '';
  const orderInput = document.getElementById('add-section-order');
  const count = (state.currentMenuData.sections || []).length;
  orderInput.value = count + 1;
  orderInput.max   = count + 1;
  document.getElementById('add-section-modal').style.display = 'flex';
  setTimeout(() => document.getElementById('add-section-name').focus(), 50);
}

export function closeAddSectionModal() {
  document.getElementById('add-section-modal').style.display = 'none';
}

export function confirmAddSection() {
  const name  = document.getElementById('add-section-name').value.trim();
  const order = parseInt(document.getElementById('add-section-order').value, 10);
  if (!name) { showToast('⚠️ Bitte einen Namen eingeben'); return; }

  const id = slugify(name);
  if ((state.currentMenuData.sections || []).find(s => s.id === id)) {
    showToast('⚠️ Ein Untermenü mit diesem Namen existiert bereits');
    return;
  }

  const newSection = { id, title: name, items: [] };
  const pos = Math.max(0, Math.min(order - 1, state.currentMenuData.sections.length));
  state.currentMenuData.sections.splice(pos, 0, newSection);

  closeAddSectionModal();
  refresh();
  markPending();
  showToast('✅ Untermenü hinzugefügt');
}

// ─── RENOMBRAR MENÚ ───────────────────────────────────────────────────────────
export function showRenameModal(menuId, currentName) {
  state.pendingRenameMenuId = menuId;
  document.getElementById('rename-menu-input').value = currentName;
  document.getElementById('rename-menu-modal').style.display = 'flex';
  setTimeout(() => {
    const input = document.getElementById('rename-menu-input');
    input.focus();
    input.select();
  }, 50);
}

export function closeRenameModal() {
  document.getElementById('rename-menu-modal').style.display = 'none';
  state.pendingRenameMenuId = null;
}

export async function confirmRename() {
  const name = document.getElementById('rename-menu-input').value.trim();
  if (!name) { showToast('⚠️ Bitte einen Namen eingeben'); return; }
  if (!state.pendingRenameMenuId) return;
  await updateMenuName(state.pendingRenameMenuId, name);
  closeRenameModal();
  showToast('✅ Name aktualisiert');
}

// ─── BORRAR UNTERMENÜ ─────────────────────────────────────────────────────────
export function askDeleteSection(secId, name) {
  state.pendingDeleteSectionId = secId;
  document.getElementById('delete-section-modal-text').textContent =
    `„${name}" und alle Gerichte darin wirklich löschen?`;
  document.getElementById('delete-section-modal').style.display = 'flex';
}

export function closeDeleteSectionModal() {
  document.getElementById('delete-section-modal').style.display = 'none';
  state.pendingDeleteSectionId = null;
}

export function confirmDeleteSection() {
  if (!state.pendingDeleteSectionId) return;
  state.currentMenuData.sections = state.currentMenuData.sections.filter(
    s => s.id !== state.pendingDeleteSectionId
  );
  closeDeleteSectionModal();
  refresh();
  markPending();
  showToast('🗑 Untermenü gelöscht');
}

// ─── COPIAR MENÚ ──────────────────────────────────────────────────────────────
export function showCopyModal() {
  const others = state.allMenus.filter(m => m.id !== state.currentMenuId);
  if (!others.length) { showToast('Keine anderen Menüs vorhanden'); return; }
  document.getElementById('copy-source').innerHTML = others
    .map(m => `<option value="${m.id}">${esc(m.name)} (${m.type === 'branch' ? 'Filiale' : 'Event'})</option>`)
    .join('');
  document.getElementById('copy-modal').style.display = 'flex';
}

export function closeCopyModal() {
  document.getElementById('copy-modal').style.display = 'none';
}

export async function confirmCopy() {
  const sourceId = document.getElementById('copy-source').value;
  const snap     = await fetchMenu(sourceId);
  if (!snap.exists()) { showToast('Fehler: Quelle nicht gefunden'); return; }
  state.currentMenuData.sections = JSON.parse(JSON.stringify(snap.data().sections || []));
  closeCopyModal();
  refresh();
  markPending();
  showToast('✅ Menü kopiert');
}

// ─── CAMBIOS SIN GUARDAR ──────────────────────────────────────────────────────
export function closeUnsavedModal() {
  document.getElementById('unsaved-modal').style.display = 'none';
}

export async function unsavedSaveAndLeave() {
  closeUnsavedModal();
  const ok = await saveNow();
  if (ok) showHome();
}

export function unsavedDiscardAndLeave() {
  closeUnsavedModal();
  showHome();
}
