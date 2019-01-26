const crypto = require('crypto')

const UserModel = require('../models/users.model')

exports.hasAuthFields = (req, res, next) => {
  if (
    req.body.email &&
    req.body.password
  ) {
    return next()
  } else return res.status(400).send({errors: 'Email and password are required'})
}

exports.isPasswordAndUserMatch = async (req, res, next) => {
  try {
    let user = await UserModel.findOne({email: req.body.email})
    if (!user) return res.status(404).send({error: 'Email not found'})
    let passwordDB = user.password.split('$')
    let saltDB = passwordDB[0]
    let hash = crypto.createHmac('sha512', saltDB).update(req.body.password).digest('base64')
    if (hash == passwordDB[1]) {
      req.body = {
        id: user._id,
        email: user.email,
        permissionLevel: user.permissionLevel,
        provider: 'email',
        name: user.firstName + ' ' + user.lastName,
      }
      return next()
    } else return res.status(400).send({error: 'Password does not match'})
  } catch (e) {
    return res.status(403).send({error: 'Error does not define'})
  }
}