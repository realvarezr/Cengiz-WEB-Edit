import { state } from './state.js';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, auth, subscribeToMenus, fetchMenu } from './services/firebase-menus.js';
import { setRefresh } from './features/editor-refresh.js';
import { renderAll, renderMenusList } from './ui/render.js';
import { markPending, saveNow } from './features/save.js';
import { initSortables, destroySortables, moveSection, moveItem } from './features/reorder.js';
import { addItem, updateField, updateSectionTitle, toggleActive, copyMenuUrl } from './features/menu-crud.js';
import { showScreen, showHome, askGoHome } from './ui/screens.js';
import {
  showRenameModal, closeRenameModal, confirmRename,
  showCreateModal, closeCreateModal, confirmCreate,
  askDeleteMenu, closeDeleteMenuModal, confirmDeleteMenu,
  askDelete, closeDeleteModal, confirmDelete,
  askDeleteSection, closeDeleteSectionModal, confirmDeleteSection,
  showAddSectionModal, closeAddSectionModal, confirmAddSection,
  showCopyModal, closeCopyModal, confirmCopy,
  closeUnsavedModal, unsavedSaveAndLeave, unsavedDiscardAndLeave,
} from './ui/modals.js';
import { showToast } from './ui/toast.js';

// ─── REGISTRAR FUNCIÓN DE REFRESCO ───────────────────────────────────────────
setRefresh(() => {
  destroySortables();
  renderAll();
  initSortables();
});

// ─── AUTH ─────────────────────────────────────────────────────────────────────
onAuthStateChanged(auth, user => {
  if (user) { showScreen('home-screen'); loadMenusList(); }
  else      { showScreen('login-screen'); }
});

async function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value.trim();
  const btn   = document.getElementById('login-btn');
  const err   = document.getElementById('login-error');
  err.textContent = ''; btn.textContent = '...'; btn.disabled = true;
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch {
    err.textContent = 'E-Mail oder Passwort falsch.';
    btn.textContent = 'Anmelden';
    btn.disabled    = false;
  }
}

async function doLogout() { await signOut(auth); }

// ─── HOME ─────────────────────────────────────────────────────────────────────
function loadMenusList() {
  subscribeToMenus(snapshot => {
    state.allMenus = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    state.allMenus.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'branch' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
    renderMenusList(state.allMenus);
  });
}

// ─── EDITOR ───────────────────────────────────────────────────────────────────
async function showEditor(menuId) {
  state.currentMenuId = menuId;
  showScreen('editor-screen');
  await loadEditor(menuId);
}

async function loadEditor(menuId) {
  document.getElementById('menu-editor').innerHTML =
    '<div class="empty-state"><div class="empty-state-text">Laden...</div></div>';
  const snap = await fetchMenu(menuId);
  if (!snap.exists()) { showHome(); return; }

  state.currentMenuData   = snap.data();
  state.hasPendingChanges = false;
  state.nextId = 100;
  (state.currentMenuData.sections || []).forEach(sec =>
    sec.items.forEach(item => { if ((item.id || 0) >= state.nextId) state.nextId = item.id + 1; })
  );

  const badge = document.getElementById('editor-type-badge');
  document.getElementById('editor-title').textContent = state.currentMenuData.name;
  badge.textContent = state.currentMenuData.type === 'branch' ? 'Filiale' : 'Event';
  badge.className   = `type-badge ${state.currentMenuData.type === 'branch' ? 'badge-branch' : 'badge-event'}`;

  const indicator = document.getElementById('save-indicator');
  indicator.textContent = ''; indicator.className = 'save-indicator';
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) saveBtn.disabled = true;

  destroySortables();
  renderAll();
  initSortables();
}

// ─── KEY LISTENERS ────────────────────────────────────────────────────────────
document.getElementById('login-pass').addEventListener('keydown', e => {
  if (e.key === 'Enter') doLogin();
});
document.getElementById('login-email').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('login-pass').focus();
});

// ─── WINDOW BINDINGS (onclick= en HTML) ──────────────────────────────────────
Object.assign(window, {
  doLogin, doLogout,
  showHome, showEditor, askGoHome,
  closeUnsavedModal, unsavedSaveAndLeave, unsavedDiscardAndLeave,
  showRenameModal, closeRenameModal, confirmRename,
  showCreateModal, closeCreateModal, confirmCreate,
  showCopyModal, closeCopyModal, confirmCopy,
  toggleActive, copyMenuUrl,
  addItem, updateField, updateSectionTitle, saveNow,
  moveSection, moveItem,
  askDelete, closeDeleteModal, confirmDelete,
  askDeleteSection, closeDeleteSectionModal, confirmDeleteSection,
  askDeleteMenu, closeDeleteMenuModal, confirmDeleteMenu,
  showAddSectionModal, closeAddSectionModal, confirmAddSection,
});
