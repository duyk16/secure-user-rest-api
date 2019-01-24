const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number
})

module.exports = mongoose.model('Users', userSchema, 'users')