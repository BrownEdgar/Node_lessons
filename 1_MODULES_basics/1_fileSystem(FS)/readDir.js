var fs = require('fs');

/*կարդում է նշված ուղին, */
fs.readdir("./test", function (err, files) {
  console.log(files);

  files.forEach(file => {
    //  fs.readFile(`./test/${file}`,function (err,data) {
    // 	 if (err && err.code === "ENOENT") {
    // 		 console.log("wrong address")
    // 	 }else{
    // 		 console.log(data.toString())
    // 	 }
    //  })

    fs.unlink(`./test/${file}`, function (err) {
      if (err && err.code === "ENOENT") {
        console.log("chka tenc fayl");
      } else {
        console.log('File deleted!');
      }
    });
  });
});
