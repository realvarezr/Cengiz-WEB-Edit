import { db, auth } from '../../firebase-config.js';
import {
  collection, doc, getDoc, setDoc, updateDoc, deleteDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {
  onAuthStateChanged, signInWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

export { auth, onAuthStateChanged, signInWithEmailAndPassword, signOut };

export function subscribeToMenus(callback) {
  return onSnapshot(collection(db, 'menus'), callback);
}

export function fetchMenu(menuId) {
  return getDoc(doc(db, 'menus', menuId));
}

export function saveMenuSections(menuId, sections) {
  return updateDoc(doc(db, 'menus', menuId), { sections });
}

export function updateMenuActive(menuId, active) {
  return updateDoc(doc(db, 'menus', menuId), { active });
}

export function createMenu(id, payload) {
  return setDoc(doc(db, 'menus', id), payload);
}

export function deleteMenu(menuId) {
  return deleteDoc(doc(db, 'menus', menuId));
}

export function updateMenuName(menuId, name) {
  return updateDoc(doc(db, 'menus', menuId), { name });
}
