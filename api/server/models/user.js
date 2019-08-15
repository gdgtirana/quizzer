module.exports = (mongoose) => {
  let userModel = mongoose.models.users

  if(!userModel) {
    const ObjectId = mongoose.Schema.Types.ObjectId

    const userSchema = mongoose.Schema({
      firstName: {type: String, required: true},
      lastName: {type: String, required: true},
      email: {type: String, required: true, unique: true},
      username: {type: String, required: true},
      password: {type: String, required: true},
      slug: {type: String, required:true, unique: true},
      createdAt: {type: Date}
    })

    userModel = mongoose.model('users', userSchema)
  }

  return userModel
}