const Validator = require('../base/validator')

class UserValidator extends Validator {
  data(joi) {
    return {
      first_name: joi.string().min(3).max(30).required(),
      last_name: joi.string().min(3).max(30).required(),
      email: joi.string().email().required().min(6).trim(),
      username: joi.string().alphanum().min(3).max(30).required(),
      password: joi.string().min(3).max(30).required(),
    }
  }
}

module.exports = UserValidator