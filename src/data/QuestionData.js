import Http from '../Http'

const baseUrl = '/questions'

class QuestionsData {
  static delete (questionId) {
    return Http.post(`${baseUrl}/${questionId}/delete`, null, true)
  }

  static addAnswer (questionId, answer) {
    return Http.post(`${baseUrl}/${questionId}/answers/add`, answer, true)
  }

  static deleteAnswerFromQuestion (questionId, answerId) {
    return Http.post(`${baseUrl}/${questionId}/answers/${answerId}/delete`, null, true)
  }
}

export default QuestionsData
