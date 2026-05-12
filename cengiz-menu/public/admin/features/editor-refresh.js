let _fn = null;
export function setRefresh(fn) { _fn = fn; }
export function refresh() { if (_fn) _fn(); }
