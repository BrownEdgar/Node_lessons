const fs = require('fs');
const path = require('path');

// fs.mkdir մեթոդը ստեղծում է թղթապանակ նշված անունով
fs.mkdir(path.join(__dirname, 'newFolder'), (e) => {
  if (e && e.code === 'EEXIST') {
    console.log(e);
  } else {
    console.log('Folder is create');
  }
});
