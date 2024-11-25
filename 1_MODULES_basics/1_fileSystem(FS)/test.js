const fs = require('fs');
const path = require('path');


fs.readdir('lesson/test', "utf-8", function (err, data) {
  if (err) {
    throw err
  }
  console.log(data)
})
