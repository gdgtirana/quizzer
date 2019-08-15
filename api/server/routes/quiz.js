const QuizController = require('../controllers/quiz')
const QuizCreateValidator = require('../validators/quiz-validator')
const authenticate = require('../middleware/authenticate')

module.exports = (route) => {
  route.patch('/api/v1/quizzes/:id', [
    
    new QuizCreateValidator().middleware
  ], new QuizController().update)
  route.get('/api/v1/quizzes', new QuizController().index)
  route.get('/api/v1/quizzes/:property', new QuizController().show)
  route.get('/api/v1/quizzes/publish/:property', authenticate, new QuizController().publishQuiz)
  route.post('/api/v1/quizzes', new QuizController().create)
}