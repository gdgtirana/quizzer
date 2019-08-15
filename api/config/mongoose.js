const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  MONGO_USER,
  MONGO_PASS
} = process.env;

module.exports = {
  'host': MONGO_HOST || 'localhost',
  'port': MONGO_PORT || 27017,
  'database': MONGO_DATABASE || 'quizzer',
  'username': MONGO_USER || null,
  'password': MONGO_PASS || null
};