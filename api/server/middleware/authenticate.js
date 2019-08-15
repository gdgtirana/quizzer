const httpStatus = require('../enums/http-status')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/user')(mongoose)
//TODO check if jwt is not in correct format
module.exports =async (req, res, next) => {
  try {
    if (!req.headers['authorization'])
      return res.status(httpStatus.unauthorized).send({error: 'Unauthorized'})

    const token = req.headers['authorization'].substring(req.headers['authorization'].indexOf(' ') + 1)
    const decoded = jwt.verify(token, process.env.SECRET)

    if(!decoded)
      return res.status(httpStatus.forbidden).send({error: 'Bad Secret NOOB'})

    const user = await User.findOne({
      _id: decoded.id
    })

    if(!user)
      return res.status(httpStatus.unauthorized).send({error: 'Unauthorized'})

    req.user = user
     
    next()  

  } catch (error) {
    return res.status(httpStatus.unauthorized).send({error: error.message})
  }
}