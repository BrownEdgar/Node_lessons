require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')

app.use(express.json())

const posts = [
  {
    username: 'Karen',
    title: 'Post 1'
  },
  {
    username: 'Levon',
    title: 'Post 2'
  }
]

app.get('/posts', authenticateToken, (req, res) => {
	console.log(posts)
  res.json(posts.filter(post => post.username === req.user.name))
})


// middleWare 
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
	console.log({ token: process.env.ACCESS_TOKEN_SECRET, token2: authHeader})
  if (token == null) return res.sendStatus(401)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

app.listen(3000)