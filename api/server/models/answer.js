module.exports = (mongoose) => {
  let model = mongoose.models.answers

  if(!model) {
    const ObjectId = mongoose.Schema.Types.ObjectId

    const choicesSchema = {
      questionId: {type: ObjectId, required: true},
      answer: {type: String, required: true},
      result: {type: Boolean, required: true}
    }

    const schema = new mongoose.Schema({
    userId: {type: ObjectId, /*required: true*/},
      quizId: {type: ObjectId, required: true},
      choices: {type: [choicesSchema], required: true},
      points: {type: String},
      wrong: {type: String},
      right: {type: String},
      createdAt: {type: Date}
    });

    model = mongoose.model('answers', schema);
  }

  return model
}