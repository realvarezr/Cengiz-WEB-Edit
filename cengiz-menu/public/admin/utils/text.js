export function esc(str) {
  return (str || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function fixTitle(title) {
  return (title || '').replace(/Süsses/g, 'Süßes');
}

export function slugify(name) {
  return name.toLowerCase()
    .replace(/ä/g,'ae').replace(/ö/g,'oe').replace(/ü/g,'ue').replace(/ß/g,'ss')
    .replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');
}
