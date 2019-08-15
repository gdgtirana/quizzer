const httpStatus = require('../enums/http-status')

module.exports = (err, req, res, next) => {
  console.log(err);
  return res.status(httpStatus.internal_server_error).send({ error: err.message })
}
