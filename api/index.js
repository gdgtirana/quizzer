const app = require('express')();
const mongoose = require('mongoose')
const errorMiddleware = require('./server/middleware/error')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const mongooseConfig = require('./config/mongoose')
const swagger = require('swagger-ui-express')
const yaml = require('yamljs')
const docs = yaml.load('./docs/swagger.yaml')

const userRoute = require('./server/routes/user')
const answerRoute = require('./server/routes/answer')
const authRoute = require('./server/routes/auth')
const questionRoute =require('./server/routes/question')
const quizRoute =require('./server/routes/quiz')

require('dotenv').config()

mongoose.connect(`mongodb://${mongooseConfig.host}:${mongooseConfig.port}/${mongooseConfig.database}`, {
  user: mongooseConfig.username,
  pass: mongooseConfig.password
})

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(bodyParser.json())
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(errorMiddleware)
app.use('/api/v1/docs', swagger.serve, swagger.setup(docs))

userRoute(app)
answerRoute(app)
authRoute(app)
questionRoute(app)
quizRoute(app)

try {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port :${process.env.PORT}`)
  })
} catch (error) {
  throw new Error(err)
}
