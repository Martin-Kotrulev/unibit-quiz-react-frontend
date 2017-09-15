import Dispatcher from '../Dispatcher'

const groupActions = {
  types: {
    ADD: 'ADD',
    DELETE: 'DELETE',
    ALL: 'ALL',
    ALL_QUIZZES: 'ALL_QUIZZES',
    MINE: 'MINE'
  },
  add (group) {
    Dispatcher.dispatch({
      type: this.types.ADD,
      payload: group
    })
  },
  delete (groupId) {
    Dispatcher.dispatch({
      type: this.types.DELETE,
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
  }
}

export default groupActions
