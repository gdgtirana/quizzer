const Joi = require('joi')
const httpStatus = require('../enums/http-status')

class Validator {
  constructor() {
    this.middleware = this.middleware.bind(this)
  }

  async middleware(req, res, next) {
    const data = await this.data(Joi)
    const schema = Joi.object().keys(data)
    const result = Joi.validate(req.body, schema)

    if (result.error)
      return res.status(httpStatus.unprocessable_entity).send(result.error.details[0].message)

    next()
  }
}

module.exports = Validator
