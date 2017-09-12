import Http from '../Http'

const baseUrl = '/quizzes'

class QuizData {
  static add (quiz) {
    return Http.post(`${baseUrl}/add`, quiz, true)
  }

  static addQuestionToQuiz (quizId, question) {
    return Http.post(`${baseUrl}/${quizId}/questions/add`, question, true)
  }

  static delete (quizId) {
    return Http.post(`${baseUrl}/${quizId}/delete`, null, true)
  }

  static enterQuiz (quizId) {
    return Http.post(`${baseUrl}/${quizId}/enter`, null, true)
  }

  static addProgress (progress) {
    return Http.post(`${baseUrl}/progress`, progress, true)
  }

  static all (search, page) {
    page = page || 1
    return Http.get(`${baseUrl}/all`)
  }

  static allQuestionsForQuiz (quizId) {
    return Http.get(`${baseUrl}/${quizId}/questions/all`, true)
  }
}

export default QuizData
