const mongoose = require('mongoose');
const Quiz = require('../models/quiz')(mongoose)
const Question = require('../models/question')(mongoose)
const httpStatus = require('../enums/http-status')
const slugify = require('slugify')
const uniqueSlug = require('../helpers/unique-slag')
const quizStatus = require('../enums/quiz-status')
const minimumQuestionNumber = 4

//TODO difficulty is between 1-5
//TODO check quiz status
//TODO topics and subtopics are arrays
//TODO
class QuizController {

  async create (req, res) {
    try {
      const quiz = new Quiz({})

      const savedQuiz = await quiz.save()

      return res.send({quiz: savedQuiz})
    } catch (error) {
      console.log(error.message);
      return res.status(httpStatus.internal_server_error).send({error: error.message})
    }
  }

  async update (req, res) {
    try {
      const quiz = await Quiz.findOne({
        _id: req.params.id
      })

      if(!quiz)
        return res.status(404).send({error: 'Quiz not found'})


      const name = req.body.quiz_name
      const topics = req.body.topics
      const subtopics = req.body.subtopics
      const difficulty = req.body.difficulty
      const status = quizStatus.inactive

      let slug = slugify(name, { lower: true })

      const existing = await Quiz.findOne({slug: slug})

      if (existing)
        slug = await uniqueSlug(slug, Quiz)
      
        quiz.quizName = name,
        quiz.topics = topics,
        quiz.subtopics = subtopics,
        quiz.difficulty = difficulty,
        quiz.slug = slug,
        quiz.status = status,
        quiz.createdAt = new Date()
        //quiz.userId = req.user.id
      

      const savedQuiz = await quiz.save()
      
      return res.send(savedQuiz)
    } catch (error) {
      console.log(error.message);
      return res.status(httpStatus.internal_server_error).send({error: error.message})
    }
  }

  async index (req, res) {
    try {
      const status = quizStatus.active

      const query = {
        status: status
      }  

      if (req.query.name)
        query['quizName'] = `/.*${req.query.name}.*/`

      if (req.query.subtopic)
        query['subtopics'] = req.query.subtopic
        
      const quizzes = await Quiz.find(query)
      
      return res.send({quizzes: quizzes})

    } catch (error) {
      console.log(error.message);
      return res.status(httpStatus.internal_server_error).send({error: error.message})
    }
  }

  async show (req, res) {
    try {
      let quiz = await Quiz.findOne({
        $or: [
          {slug: req.params.property},
          {_id: req.params.property}
        ]
      })

      if(!quiz)
        return res.status(httpStatus.not_found).send({error: 'Quiz not found'})
  
      let questions = []  

      questions = await Question.find({
        'quizId': quiz._id
      })
      .sort('-date')
      .exec()

      quiz = quiz.toObject()

      quiz['questions'] = questions

      return res.send({quiz: quiz})
    } catch (error) {
      console.log(error.message);
      return res.status(httpStatus.internal_server_error).send({error: error.message})
    }
  }

  async publishQuiz(req,res) {
    try {
      const quiz = await Quiz.findOne({
        $or: [
          {slug: req.params.property},
          {_id: req.params.property}
        ]
      })

      if (!quiz)
        return res.status(httpStatus.not_found).send({error: 'This quiz does not exists'})

      if(!quiz.quizName || quiz.quizName.trim().length === 0)
        return res.status(httpStatus.unprocessable_entity).send({error: 'Quizz need a name to be published'})
        
      const questions = await Question.find({
        'quizId': quiz._id
      })  

      if (questions && questions.length < minimumQuestionNumber)
        return res.status(httpStatus.unprocessable_entity).send({error: `Quiz should have ${minimumQuestionNumber} or more questions to be published`})

      quiz.status = quizStatus.active
      
      const savedQuiz = await quiz.save()

      return res.send({quiz: savedQuiz})
    } catch (error) {
      console.log(error.message)
      return res.status(httpStatus.internal_server_error).send(error.message)
    }
  }
}

module.exports = QuizController;