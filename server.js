const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const usersRoute = require('./routes/users.route')

// Connect DB
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, (err) => {
  if (err) return console.error(err);
  console.log('Mongo was connected.')
})

// Aplly middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/v1/users', usersRoute)

app.listen(port, () => {console.log(`Listening on port ${port}...`)})