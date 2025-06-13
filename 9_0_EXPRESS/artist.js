var express = require('express')
var app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const friends = ['Rachel Green', 'Monica Geller', 'Phoebe Buffay', 'Joey Tribbiani', 'Chandler Bing', 'Ross Geller']

app.get('/', function (req, res) {
  res.send('hello Api')
})

app.get('/friends', function (req, res) {
  res.json(friends)
})

app.get('/friends/:id', function (req, res) {
  console.log(req.params)
  let friend = friends.find((friend) => {
    return friend.id === Number(req.params.id)
  })
  res.send(friend)
})

//simple add
app.post('/friends', function (req, res) {
  console.log(req.body)
  friends.push(req.body)

  res.end('succsess')
})

//simple update
app.put('/friends/:id', function (req, res) {
  console.log('req.body', req.body)
  const friend = friends.find((elem) => {
    return elem.id === Number(req.params.id)
  })
  friend.name = req.body.name
  res.send(friend) //kam status
})

app.delete('/friends/:id', function (req, res) {
  const friend = friends.find((c) => c.id === parseInt(req.params.id))
  if (!friend) return res.status(404).send('The course with the given ID was not found.')

  const index = friends.indexOf(friend)
  friends.splice(index, 1)

  res.send(friend)
})
app.listen(3000)
/*Если запрос адресован корневому каталогу приложения, приложение выводит на экран системное время запроса в браузере.*/
