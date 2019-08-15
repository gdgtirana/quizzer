const AuthController = require('../controllers/auth')

module.exports = (route) => {
  route.post('/api/v1/login', new AuthController().login)
}