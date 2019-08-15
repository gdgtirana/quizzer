const UserController = require('../controllers/user')
const UserValidator = require('../validators/user-validator')

module.exports = route => {
  route.post('/api/v1/users',new UserValidator().middleware, new UserController().create)
  
}