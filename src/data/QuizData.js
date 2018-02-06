import Http from '../Http'

const baseUrl = '/quizzes'

class QuizData {
  static add (quiz) {
    return Http.post(`${baseUrl}`, quiz, true)
  }

  static addQuestionToQuiz (quizId, question) {
    return Http.post(`${baseUrl}/${quizId}/questions/add`, question, true)
  }

  static delete (quizId) {
    return Http.delete(`${baseUrl}/${quizId}`, null, true)
  }

  static enterQuiz (quizId) {
    return Http.post(`${baseUrl}/${quizId}/enter`, null, true)
  }

  static addProgress (quizId, questionId, progress) {
    return Http.post(`${baseUrl}/${quizId}/${questionId}`, progress, true)
  }

  static all (search, page) {
    page = page || 1
    return Http.get(`${baseUrl}/all?page=${page}&search=${search}`)
  }

  static updateQuizQuestions (quizId, questions) {
    return Http.post(`${baseUrl}/${quizId}questions`, questions, true)
  }

  static allQuestionsForQuiz (quizId) {
    return Http.get(`${baseUrl}/${quizId}/questions/all`, true)
  }

  static mine (page) {
    page = page || 1
    return Http.get(`${baseUrl}/mine?page=${page}`, true)
  }
}

export default QuizData
