const AnswerController = require('../controllers/answer')
//const AnswerCreateValidator = require('../validators/answer-validator')
const authenticate = require('../middleware/authenticate')

module.exports = (route) => {
  route.post('/api/v1/answers', new AnswerController().create)
}