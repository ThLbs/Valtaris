// Recalcule l'empreinte SHA-256 du script de finances.html et l'inscrit dans la CSP.
// Ainsi, seul CE script exact peut s'exécuter dans la page : tout code injecté ou modifié est bloqué.
// Usage : node outils/sceller.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const file = path.join(__dirname, '..', 'finances.html');
const html = fs.readFileSync(file, 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
if (scripts.length !== 1) throw new Error(`Exactement un <script> attendu, ${scripts.length} trouvé(s).`);
// Le navigateur normalise les fins de ligne (CRLF -> LF) avant de calculer l'empreinte.
const body = scripts[0][1].replace(/\r\n?/g, '\n');
const hash = crypto.createHash('sha256').update(body, 'utf8').digest('base64');
const out = html.replace(/script-src 'sha256-[^']*'/, `script-src 'sha256-${hash}'`);
if (out === html && !html.includes(hash)) throw new Error('Directive script-src introuvable.');
fs.writeFileSync(file, out);
console.log('CSP scellée : sha256-' + hash);
