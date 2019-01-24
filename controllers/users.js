const mongoose = require('mongoose')

const UserModel = require('../models/users')

module.exports = {
  createUser: (req, res) => {
    let { firstName, lastName, email, password } = req.body
    console.log(req.body)
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({
        error: "All field are required"
      })
    }
    return res.status(200).send({firstName, lastName, email, password})
  }
}