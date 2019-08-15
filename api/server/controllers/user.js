const mongoose = require('mongoose');
const User = require('../models/user')(mongoose)
const httpStatus = require('../enums/http-status')
const slugify = require('slugify')
const uniqueSlug = require('../helpers/unique-slag')
const argon2 = require('argon2')

class UserController {

  async create(req, res) {
    try {
      let {
        first_name,
        last_name,
        email,
        username,
        password
      } = req.body

      email = email.toLowerCase()

      let slug = slugify(`${first_name} ${last_name}`, {lower: true})

      let user = await User.findOne({slug: slug})

      if (user)
        slug = await uniqueSlug(slug, User)

      const existing = await User.findOne({
        email: email
      }) 

      if (existing)
        return res.status(httpStatus.unprocessable_entity).send({error: 'User with the provided email already exists'})

      password = await argon2.hash(password)

      let savedUser = new User({
        firstName: first_name,
        lastName: last_name,
        email: email,
        username: username,
        password: password,
        slug: slug
      })

      savedUser = await savedUser.save()

      const transformedUser = {
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
        username: savedUser.username,
        slug: savedUser.slug
      }

      return res.send({user: transformedUser})

    } catch (error) {
      console.log(error.message)
      return res.status(httpStatus.internal_server_error).send({error: error.message})
    }
  }

}
    module.exports = UserController;