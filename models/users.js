const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: {type: Number, default: 1}
})

module.exports = mongoose.model('Users', userSchema, 'users')