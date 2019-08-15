const Validator = require('../base/validator')

class QuestionValidator extends Validator {
  data(joi) {
    return {
      question: joi.string().min(3),
      answers: joi.array().strict().items(joi.string().trim().min(3)),
      correct_answer: joi.string().min(3).trim(),
      quiz_id: joi.string().alphanum().min(3).max(30),
      questions: joi.alternatives(joi.array(), joi.object())
    }
  }
}

module.exports = QuestionValidator