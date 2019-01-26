const crypto = require('crypto')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  try {
    let jwtSecret = process.env.JWT_SECRET
    let refreshId = req.body.userId + jwtSecret
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64")
    
    req.body.refreshKey = salt

    console.log(req.body)

    let token = jwt.sign(req.body, jwtSecret)
    let b = new Buffer(hash);
    let refreshToken = b.toString('base64')

    return res.status(201).send({
      accessToken: token,
      refreshToken: refreshToken
    })

  } catch (e) {
    return res.status(500).send({errors: 'This error'})
  }
}