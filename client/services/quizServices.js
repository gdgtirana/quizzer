import axios from 'axios'

export default {
   patchQuiz (body, id) {
     return axios.patch(`${process.env.baseUrl}/quizzes/${id}`, body)
   },

  postAnswer (body) {
    return axios.post(`${process.env.baseUrl}/questions`, body)
  },

  publish (body) {
    return axios.post(`${process.env.baseUrl}/questions?publish=true`, body)
  },

  postAllAnswers(body) {
    return axios.post(`${process.env.baseUrl}/answers`, body)
  },

  getQuizzes () {
     return axios.get(`${process.env.baseUrl}/quizzes`)
  }
}
