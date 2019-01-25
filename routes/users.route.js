const express = require('express')
const route = express.Router()

const userController = require('../controllers/users.controller')

route.post('/', userController.createUser)
route.get('/:id', userController.getById)

module.exports = route