import { state } from '../state.js';
import { saveMenuSections } from '../services/firebase-menus.js';
import { showToast } from '../ui/toast.js';

export function markPending() {
  state.hasPendingChanges = true;
  const indicator = document.getElementById('save-indicator');
  indicator.textContent = '· Ungespeicherte Änderungen';
  indicator.className   = 'save-indicator save-pending';
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) saveBtn.disabled = false;
}

export async function saveNow() {
  if (!state.hasPendingChanges || !state.currentMenuId) return true;
  const indicator = document.getElementById('save-indicator');
  const saveBtn   = document.getElementById('save-btn');
  indicator.textContent = '· Speichern...';
  indicator.className   = 'save-indicator';
  if (saveBtn) saveBtn.disabled = true;
  try {
    await saveMenuSections(state.currentMenuId, state.currentMenuData.sections);
    state.hasPendingChanges = false;
    indicator.textContent = '✓ Gespeichert';
    setTimeout(() => { if (!state.hasPendingChanges) indicator.textContent = ''; }, 2000);
    showToast('✅ Gespeichert');
    return true;
  } catch {
    indicator.textContent = '⚠️ Fehler beim Speichern';
    indicator.className   = 'save-indicator save-error';
    if (saveBtn) saveBtn.disabled = false;
    return false;
  }
}
