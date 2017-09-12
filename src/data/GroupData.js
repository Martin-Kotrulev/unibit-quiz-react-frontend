import Http from '../Http'

const baseUrl = '/groups'

class GroupData {
  static add (group) {
    return Http.post(`${baseUrl}/add`, group, true)
  }

  static delete (groupId) {
    return Http.post(`${baseUrl}/${groupId}/delete`, null, true)
  }

  static all (search, page) {
    page = page || 1
    return Http.get(`${baseUrl}/all`, true)
  }

  static allQuizzes (quizId, page) {
    page = page || 1
    return Http.get(`${baseUrl}/${quizId}/all`)
  }

  static mineGroups (page) {
    page = page || 1
    return Http.get(`${baseUrl}/mine`, true)
  }
}

export default GroupData
