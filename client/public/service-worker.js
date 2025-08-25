const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'worker.js');
const dest = path.join(__dirname, 'client', 'public', 'service-worker.js');

fs.mkdirSync(path.dirname(dest), { recursive: true }); // Ensure target folder exists
fs.renameSync(src, dest); // Move the file
console.log(`✅ Moved: ${src} → ${dest}`);
