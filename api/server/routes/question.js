const QuestionController = require('../controllers/question')
const QuestionCreateValidator = require('../validators/question-validator')
const authenticate = require('../middleware/authenticate')

module.exports = (route) => {
  route.post('/api/v1/questions', [
    
    new QuestionCreateValidator().middleware
  ], new QuestionController().create)
}