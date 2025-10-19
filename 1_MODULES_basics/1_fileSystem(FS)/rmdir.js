const fs = require('fs');

// fs.rmdir մեթոդը ջնջում է թղթապանակը եթե այն  դատարկ է!
fs.rmdir('lesson', (e) => {
  if (e) {
    console.log('թղթապանակը դատարկ չէ');
  } else {
    console.log('delete');
  }
});
