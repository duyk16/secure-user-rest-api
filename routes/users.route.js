const express = require('express')
const route = express.Router()

const userController = require('../controllers/users.controller')
const authorizationController = require('../controllers/authorization.controller')

const verifyUserMiddleware = require('../middlewares/verify.user.middlerware')
const authUserMiddleware = require('../middlewares/auth.user.middleware')


route.post('/', [
  verifyUserMiddleware.hasRegiterFields,
  verifyUserMiddleware.hasUserExist,
  userController.createUser
])
route.get('/', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(2), // 2 = Mod
  userController.getListUsers,
])
route.get('/:id', [
  authUserMiddleware.validJWTNeeded, 
  authUserMiddleware.minLevelRequired(1), // 1 = User
  authUserMiddleware.sameId,
  userController.getById
])
route.patch('/:id', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(1), 
  userController.patchById,
])
route.delete('/:id', [
  authUserMiddleware.validJWTNeeded,
  authUserMiddleware.minLevelRequired(3), // 3 = Admin
  authUserMiddleware.sameId,
  userController.removeById
])

route.post('/auth', [
  verifyUserMiddleware.hasAuthFields ,
  verifyUserMiddleware.isPasswordAndUserMatch,
  authorizationController.login
])

module.exports = route