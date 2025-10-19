const fs = require('fs');

fs.rename('mynewfile1.txt', 'RenameFile.txt', (err) => {
  if (err.code == 'ENOENT') {
    console.log('Edpisi fayl chka');
  }
  console.log('File Renamed!');
});
