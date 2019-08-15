const mongoose = require('mongoose');
const Quiz = require('../models/quiz')(mongoose)
const Questions = require('../models/question')(mongoose)
const Answer = require('../models/answer')(mongoose)
const httpStatus = require('../enums/http-status')
const quizStatus = require('../enums/quiz-status')

class AnswersController{
  async create (req,res) {
    
    try {
      const quiz = await Quiz.findOne({
        $or: [
          {slug: req.body.quiz_slug},
          {_id: req.body.quiz_id},
          {name: req.body.quiz_name}
        ],
        status: quizStatus.active
      })
      
      if(!quiz)
        return res.status(httpStatus.unprocessable_entity).send({error: 'Quiz with the provided name does not exists or is not active'})
      //TODO Eni Authentificate this
      const existingAnswer = await Answer.findOne({
        quizId: req.body.quiz_id,
        // userId: req.user.id
      }) 

      if(existingAnswer)
        return res.status(httpStatus.unprocessable_entity).send({error: 'You have already answer this quiz'})

      const questions = await Questions.find(
        {
          'quizId': quiz._id
        }
      )

      let correctCounter = 0
      let answers = []

      for(let i = 0; i < questions.length; i++) {
        const question = questions[i]
        let result = false
        const questionId = question._id
        const answer = req.body[questionId] && req.body[questionId].answer  ? 
          await Questions.findOne({
            answers: req.body[questionId].answer,
            _id: questionId
          })
          : null

        if(!answer)
          return res.status(httpStatus.unprocessable_entity).send({error: 'All questions should have one answer'})

        if(req.body[questionId].answer == question.correctAnswer) {
          correctCounter ++
          result = true
        }

        answers.push({
          questionId: question._id,
          answer: req.body[questionId].answer,
          result: result
        })
      }

      const wrongCounter = questions.length - correctCounter
      const points = correctCounter / questions.length * 100

      let savedAnswer = new Answer({
        //userId: req.user.id,
        quizId: quiz._id,
        choices: answers,
        points: points,
        wrong: wrongCounter,
        right: correctCounter
      })

      savedAnswer = await savedAnswer.save()

      return res.send({answer: savedAnswer})

    } catch (error) {
      console.log(error.message)
      return res.status(httpStatus.internal_server_error).send({error: error.message})
    }
  }
}  


module.exports = AnswersController;