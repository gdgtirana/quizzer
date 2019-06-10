import Vuex from 'vuex'
const createStore = () => {
  return new Vuex.Store({
    state: {
      allQuizzes: [],
      quiz: {
        questionNr: '',
        quizName: '',
        topics: '',
        subtopics: '',
        question: '',
        correctAnswer: '',
        secondAnswer: '',
        thirdAnswer: '',
        fourthAnswer: '',
        difficulty: '',
        questions: []
      }
    },
    mutations: {
      setQuizzes (state, quizzes) {
        state.allQuizzes = quizzes
      },

      setQuiz(state, quiz) {
        state.quiz = quiz
      },

      setQuizId (state, quiz_id) {
        state.quiz.quiz_id = quiz_id
      },

      setQuestion (state, {question, number}) {
        const questionExists = state.quiz.questions.filter(item => {
          if(item.hasOwnProperty('number') && item.number === number)
            return item
        });
        question.number = number;
        if (questionExists.length === 0) {
          state.quiz.questions.push(question)
        } else {
          state.quiz.questions = state.quiz.questions.filter(item => item.number !== number)
          state.quiz.questions.push(question)
        }
      }
    },
    getters: {
      quizzes: state =>  state.allQuizzes,
      quiz: state => state.quiz,
      questions: (state) => state.quiz.questions,
      getUserName: state => state.quiz.quizName,
      getUserTopic: state => state.quiz.topic,
      getUserSubTopic: state => state.quiz.subtopic,
      getUserQuestion(state) {
        return state.quiz.question
      },
      getUserCorrectAnswer (state) {
        return state.quiz.correctAnswer
      },
      getUserSecondAnswer (state) {
        return state.quiz.secondAnswer
      },
      getUserThirdAnswer (state) {
        return state.quiz.thirdAnswer
      },
      getUserFourthAnswer (state) {
        return state.quiz.fourthAnswer
      },
      getUserDifficulty (state) {
        return state.quiz.difficulty
      },
      quizById: state => state.quiz
    }
  })
}
export default createStore
