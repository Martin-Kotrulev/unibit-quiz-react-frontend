import Http from '../Http'

const baseUrl = '/groups'

class GroupData {
  static add (group) {
    return Http.post(`${baseUrl}`, group, true)
  }

  static delete (groupId) {
    return Http.delete(`${baseUrl}/${groupId}`, null, true)
  }

  static addQuizToGroup (groupId, quiz) {
    return Http.post(`${baseUrl}/${groupId}/quizzes`, quiz, true)
  }

  static all (search, page) {
    page = page || 1
    return Http.get(`${baseUrl}/all?page=${page}&search=${search}`, true)
  }

  static allQuizzes (groupId, page) {
    page = page || 1
    return Http.get(`${baseUrl}/${groupId}/quizzes`)
  }

  static mineGroups (page) {
    page = page || 1
    return Http.get(`${baseUrl}/mine?page=${page}`, true)
  }
}

export default GroupData
