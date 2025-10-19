const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* Для предоставления статических файлов, например,
 изображений, файлов CSS и JavaScript в
 Express используется функция промежуточной
 обработки express.static.
 public papki neji exacy arden hasanelia ira anunov aysinqn
 http://localhost:3003/style.css ktpi css fayly vonc ka */
app.use(express.static('public'));
/* Теперь можно загрузить файлы, находящиеся в каталоге public, указанного в префиксе пути /static.
http://localhost:3003/static/style.css */
app.use('/static', express.static(`${__dirname}/public`));

app.listen(3003, () => {
  console.log('Example app listening on port 3003!');
});
