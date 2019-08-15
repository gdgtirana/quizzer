module.exports = (mongoose) => {
  let questionModel = mongoose.models.questions

  if(!questionModel) {
    const ObjectId = mongoose.Schema.Types.ObjectId

    const questionSchema = mongoose.Schema({
      question: {type: String, required: true},
      answers: {type: [String], required: true},
      correctAnswer: {type: String, required: true},
      quizId: {type: ObjectId, required: true},
      createdAt: {type: Date}
    })

    questionModel = mongoose.model('questions', questionSchema)
  }

  return questionModel
}