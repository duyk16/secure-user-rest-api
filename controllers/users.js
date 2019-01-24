const mongoose = require('mongoose')
const crypto = require('crypto')

const UserModel = require('../models/users')

module.exports = {
  createUser: async (req, res) => {
    let {firstName, lastName, email, password} = req.body

    // Check empty
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({
        error: "All field are required"
      })
    }

    // Check existed email?
    let findEmail = await UserModel.findOne({email})
    if (findEmail) return res.status(400).send({
      error: 'Email was registed before'
    })

    // Create salt + hash
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(password).digest("base64");
    password = salt + "$" + hash;
    
    // Create new user
    let user = new UserModel({
      firstName, lastName, email, password
    })
    let data = await user.save()
    return res.status(200).send({
      status: "success",
      email: data.email,
      firstName: data.firstName,
      id: data._id
    })

  },

}