import { state } from '../state.js';
import { refresh } from './editor-refresh.js';
import { markPending } from './save.js';

export function moveArrayEntry(arr, from, to) {
  if (!Array.isArray(arr) || from === to || from < 0 || to < 0 || from >= arr.length || to >= arr.length) return false;
  const [entry] = arr.splice(from, 1);
  arr.splice(to, 0, entry);
  return true;
}

export function moveSection(secId, direction) {
  const sections = state.currentMenuData.sections || [];
  const index = sections.findIndex(s => s.id === secId);
  if (index === -1) return;
  const target = index + direction;
  if (target < 0 || target >= sections.length) return;
  const [section] = sections.splice(index, 1);
  sections.splice(target, 0, section);
  refresh();
  markPending();
}

export function moveItem(secId, itemId, direction) {
  const sec = (state.currentMenuData.sections || []).find(s => s.id === secId);
  if (!sec) return;
  const index = sec.items.findIndex(i => i.id === itemId);
  if (index === -1) return;
  const target = index + direction;
  if (target < 0 || target >= sec.items.length) return;
  const [item] = sec.items.splice(index, 1);
  sec.items.splice(target, 0, item);
  refresh();
  markPending();
}

export function destroySortables() {
  if (state.sectionSortable) { state.sectionSortable.destroy(); state.sectionSortable = null; }
  state.itemSortables.forEach(s => s.destroy());
  state.itemSortables = [];
}

export function initSortables() {
  const SortableLib = window.Sortable;
  if (!SortableLib) return;
  const editor = document.getElementById('menu-editor');
  if (!editor) return;

  const sortableOpts = {
    animation: 150,
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    forceFallback: true,
    delayOnTouchOnly: true,
    delay: 180,
    touchStartThreshold: 5,
    fallbackTolerance: 5,
  };

  state.sectionSortable = new SortableLib(editor, {
    ...sortableOpts,
    draggable: '.cat-block',
    handle: '.cat-title-row .move-btn',
    onEnd: evt => {
      if (evt.oldIndex === evt.newIndex) return;
      if (moveArrayEntry(state.currentMenuData.sections, evt.oldIndex, evt.newIndex)) {
        refresh(); markPending();
      }
    }
  });

  editor.querySelectorAll('tbody[data-sec-id]').forEach(tbody => {
    const sec = (state.currentMenuData.sections || []).find(s => s.id === tbody.dataset.secId);
    if (!sec) return;
    const sortable = new SortableLib(tbody, {
      ...sortableOpts,
      draggable: 'tr',
      handle: '.row-actions .move-btn',
      onEnd: evt => {
        if (evt.oldIndex === evt.newIndex) return;
        if (moveArrayEntry(sec.items, evt.oldIndex, evt.newIndex)) {
          refresh(); markPending();
        }
      }
    });
    state.itemSortables.push(sortable);
  });
}
