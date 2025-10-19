const fs = require('fs');
const http = require('http');

const buffer = fs.createReadStream(`${__dirname}/text.txt`, 'utf8');
const buffer2 = fs.createWriteStream(`${__dirname}/writeME.txt`);

buffer.pipe(buffer2);

const server = http.createServer((req, res) => {
  console.log('Начало обработки запроса');

  res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
  //--------------------------------
  const buffer3 = fs.createReadStream(`${__dirname}/index.html`, 'utf8');
  buffer3.pipe(res);
  //--------------------------------
});

server.listen(3000, () => {
  console.log('Сервер запущен');
});

/* Karox enq naev kardal
"text/plain" - "txt" ֆայլերի համար
"text/html"  - "html" ֆայլերի համար
"application/json" - "json" ֆայլերի համար
13-rd toxum poxel patasxani tipy
15-um fayly
 */
