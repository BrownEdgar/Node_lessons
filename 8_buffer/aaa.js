const fs = require('fs');

fs.unlink('info.txt', (err) => {
  if (err && err.code === 'ENOENT') {
    console.log('chka tenc fayl');
  } else {
    console.log('File deleted!');
  }
});
