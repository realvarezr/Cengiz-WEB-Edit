import { state } from '../state.js';
import { destroySortables } from '../features/reorder.js';

export function showScreen(id) {
  document.getElementById('login-screen').style.display  = id === 'login-screen'  ? 'flex'  : 'none';
  document.getElementById('home-screen').style.display   = id === 'home-screen'   ? 'block' : 'none';
  document.getElementById('editor-screen').style.display = id === 'editor-screen' ? 'block' : 'none';
}

export function showHome() {
  destroySortables();
  state.hasPendingChanges = false;
  state.currentMenuId     = null;
  state.currentMenuData   = null;
  showScreen('home-screen');
}

export function askGoHome() {
  if (state.hasPendingChanges) {
    document.getElementById('unsaved-modal').style.display = 'flex';
  } else {
    showHome();
  }
}
