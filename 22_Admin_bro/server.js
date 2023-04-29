require('dotenv').config()
const express = require('express')
require('express-async-errors')
const mongoose = require('mongoose')

const usersRouter = require('./src/routers/users.router')
const placesRouter = require('./src/routers/places.router')
const adminRouter = require('./src/routers/admin.router')

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/aaa'
const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())

app.use('/users', usersRouter)
app.use('/users/:userId/places', placesRouter)
app.use('/admin', adminRouter)

app.get('/', (req, res) => res.send('Hello World!'))
const run = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
  })
}
run()
