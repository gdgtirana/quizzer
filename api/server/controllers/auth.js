const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const User = require('../models/user')(mongoose)
const httpStatus = require('../enums/http-status')
const argon2 = require('argon2')

class AuthController { 
  async login (req,res) {
    try {
      let {email, password} = req.body

      email = email.toLowerCase()

      const user = await User.findOne({
        email: email
      })

      if (!user || !await argon2.verify(user.password, password))
        return res.status(httpStatus.not_found).send({error: 'Bad email or password combination'})

      const payload = { id: user.id }
      const token = jwt.sign(payload, process.env.SECRET)

      return res.header('token',token).send({ token: token })  
    } catch (error) {
      console.log(error.message)
      return res.status(httpStatus.internal_server_error).send({error: error.message})
    }
  }
}

module.exports = AuthController