const Validator = require('../base/validator')

class AnswerValidator extends Validator {
  data(joi) {
    return {
      quiz_id: joi.string().min(3).trim().required(),
      quiz_name: joi.string().min(3).trim()
    }
  }
}
module.exports = AnswerValidator