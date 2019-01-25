const express = require('express')
const route = express.Router()

const userController = require('../controllers/users.controller')

route.get('/', userController.getListUsers)
route.post('/', userController.createUser)
route.get('/:id', userController.getById)
route.patch('/:id', userController.patchById)
route.delete('/:id', userController.removeById)
module.exports = route