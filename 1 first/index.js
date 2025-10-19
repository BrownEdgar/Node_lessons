const fs = require('fs');

fs.rename('newName.txt', 'newName.js', (err, data) => {
  if (err) {
    console.log('erevi fayli anuny sxal e');
    return;
  }
  console.log('changeed!');
});
