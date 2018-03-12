import Http from '../Http'

const baseUrl = '/quizzes'

class QuizData {
  static add (quiz) {
    return Http.post(`${baseUrl}`, quiz, true)
  }

  static delete (quizId) {
    return Http.delete(`${baseUrl}/${quizId}`, true)
  }

  static enterQuiz (quizId) {
    return Http.post(`${baseUrl}/${quizId}/enter`, null, true)
  }

  static addProgress (quizId, questionId, progressAnswer) {
    console.log(quizId, questionId, progressAnswer)
    return Http.post(`${baseUrl}/${quizId}/questions/${questionId}`, progressAnswer, true)
  }

  static all (search, page) {
    page = page || 1
    return Http.get(`${baseUrl}?page=${page}&search=${search}`)
  }

  static updateQuizQuestions (quizId, questions) {
    return Http.post(`${baseUrl}/${quizId}/questions`, questions, true)
  }

  static allQuestionsForQuiz (quizId) {
    return Http.get(`${baseUrl}/${quizId}/questions`, true)
  }

  static mine (page) {
    page = page || 1
    return Http.get(`${baseUrl}/mine?page=${page}`, true)
  }

  static scoreUser (quizId) {
    console.log('scoreUser', quizId)
    return Http.post(`${baseUrl}/${quizId}/score`, null, true)
  }
}

export default QuizData
