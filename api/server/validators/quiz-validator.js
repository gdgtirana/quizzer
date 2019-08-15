const Validator = require('../base/validator')

class QuizCreateValidator extends Validator {
  data(joi) {
    return {
      quiz_name: joi.string().min(3),
      topics: joi.array().strict().items(joi.string()),
      subtopics: joi.array().strict().items(joi.string()),
      difficulty: joi.number().min(1).max(5),
    }
  }
}

module.exports = QuizCreateValidator