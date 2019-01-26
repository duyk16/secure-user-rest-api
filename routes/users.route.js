const express = require('express')
const route = express.Router()

const userController = require('../controllers/users.controller')
const authorizationController = require('../controllers/authorization.controller')

const verifyUserMiddleware = require('../middlewares/verify.user.middlerware')
const authVerifyMiddleware = require('../middlewares/auth.validation.middleware')



route.post('/', userController.createUser)
route.get('/', [
  authVerifyMiddleware.validJWTNeeded,
  authVerifyMiddleware.minLevelRequired(2), // 2 = Mod
  userController.getListUsers,
])
route.get('/:id', [
  authVerifyMiddleware.validJWTNeeded, 
  authVerifyMiddleware.minLevelRequired(1), // 1 = User
  authVerifyMiddleware.sameId,
  userController.getById
])
route.patch('/:id', [
  authVerifyMiddleware.validJWTNeeded,
  authVerifyMiddleware.minLevelRequired(1), 
  userController.patchById,
])
route.delete('/:id', [
  authVerifyMiddleware.validJWTNeeded,
  authVerifyMiddleware.minLevelRequired(3), // 3 = Admin
  authVerifyMiddleware.sameId,
  userController.removeById
])

route.post('/auth', [
  verifyUserMiddleware.hasAuthFields ,
  verifyUserMiddleware.isPasswordAndUserMatch,
  authorizationController.login
])

module.exports = route