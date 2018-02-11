import Dispatcher from '../Dispatcher'

const groupActions = {
  types: {
    ADD: 'ADD',
    DELETE_GROUP: 'DELETE_GROUP',
    ALL: 'ALL',
    ALL_QUIZZES: 'ALL_QUIZZES',
    MINE: 'MINE',
    ADD_GROUP_QUIZ: 'ADD_GROUP_QUIZ'
  },
  add (group) {
    Dispatcher.dispatch({
      type: this.types.ADD,
      payload: group
    })
  },
  delete (groupId) {
    Dispatcher.dispatch({
      type: this.types.DELETE_GROUP,
      payload: groupId
    })
  },
  all (search, page) {
    Dispatcher.dispatch({
      type: this.types.ALL,
      payload: { search, page }
    })
  },
  allQuizzes (groupId, page) {
    Dispatcher.dispatch({
      type: this.types.ALL_QUIZZES,
      payload: { groupId, page }
    })
  },
  mineGroups (page) {
    Dispatcher.dispatch({
      type: this.types.MINE,
      payload: page
    })
  },
  addQuizToGroup (groupId, quiz) {
    Dispatcher.dispatch({
      type: this.types.ADD_GROUP_QUIZ,
      payload: quiz
    })
  }
}

export default groupActions
