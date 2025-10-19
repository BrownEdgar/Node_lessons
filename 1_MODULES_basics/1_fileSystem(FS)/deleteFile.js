const fs = require('fs');

// Ջնջում է փոխանցած ֆայլը
fs.unlink('mynewfile2.txt', (err) => {
  if (err && err.code === 'ENOENT') {
    console.log('chka tenc fayl');
  } else {
    console.log('File deleted!');
  }
});
