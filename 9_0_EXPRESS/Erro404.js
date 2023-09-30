// Как обрабатывать ошибки 404 ?
// 	В Express код 404 не является результатом ошибки.Обработчик ошибок не фиксирует их, потому что код ответа 404 указывает лишь на факт отсутствия дополнительной работы.Другими словами, Express выполнил все функции промежуточной обработки и маршруты и обнаружил, что ни один из них не отвечает.Все, что вам нужно сделать, - добавить промежуточный обработчик в конец стека(после всех остальных функций) для обработки кода 404:


const express = require('express');
const app = express();
const port = 3003;

app.get("/", function (req, res) {
	res.send("Home page")
})
app.get("/about", function (req, res) {
	res.send('about page');
})

//-------------------------------------
app.use(function (req, res, next) {
	res.status(404).send('Sorry cant find that!');
});
//-------------------------------------

app.listen(port, function () {
	console.log('Example app listening on port 3003!');
});

