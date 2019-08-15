const mongoose = require('mongoose')
const Question = require('../models/question')(mongoose)
const Quiz = require('../models/quiz')(mongoose)
const httpStatus = require('../enums/http-status')
const QuizzController = require("./quiz")

class QuestionController {

  async create (req,res) {
    let quizzId = null
    let active = false

    const questionCreate = async (data) => {
      if(Array.isArray(data)){
        quizzId = data[0].quiz_id
        for (let i = 0; i < data.length; i++)
          await questionSave(data[i])
      }
      else {
        quizzId = data.quiz_id
        await questionSave (data)
      }
    }

    const questionSave = async (questionData) => { 
      //TODO answers length should be more than 3
      try {
        const question = questionData.question
        const answers = questionData.answers
        const correctAnswer = questionData.correct_answer
        const quiz_id = questionData.quiz_id

      const quiz = await Quiz.findOne({
        _id: quiz_id,
      })

      if (!quiz) {
        active = true
        return res.status(httpStatus.unprocessable_entity).send({error: 'This quiz does not exists'})
      }
        
      // if(quiz.userId != req.user.id) 
      //   return res.status(httpStatus.forbidden).send({error: 'You cant add questions for this quiz'})
        
      const existingQuestion = await Question.findOne({
        question: question,
        quizId: quiz_id
      })

      if (existingQuestion) {
        active = true
        return res.status(httpStatus.unprocessable_entity).send({error: 'This question already exists in this quiz'})
      }
        
      let savedQuestion = new Question({
        question: question,
        answers: answers,
        correctAnswer: correctAnswer,
        quizId: quiz_id,
        createdAt: new Date()
      })  

      savedQuestion = await savedQuestion.save()

      } catch (error) {
        console.log(error.message)
        active = true
        return res.status(httpStatus.internal_server_error).send({error: error.message})
      }
    }
  
    await questionCreate (req.body.questions)

    req.params.property = quizzId

    if(req.query.publish)
      return await new QuizzController().publishQuiz(req, res)

    if(!active)
      return await new QuizzController().show(req, res)


  }
}

module.exports = QuestionController