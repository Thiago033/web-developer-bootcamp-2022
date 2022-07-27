const fs = require('fs');

const folderName = process.argv[2] || 'Project';

//mkdir - Async 
//
// fs.mkdir('Dogs', { recursive: true}, (err) => {
//     if (err) throw err;
// });

//mkdir - Sync
fs.mkdirSync(folderName);

fs.writeFileSync(`${folderName}/index.html`, '');
fs.writeFileSync(`${folderName}/app.js`, '');
fs.writeFileSync(`${folderName}/style.css`, '');
