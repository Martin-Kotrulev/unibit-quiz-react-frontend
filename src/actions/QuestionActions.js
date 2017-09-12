import Dispatcher from '../Dispatcher'

const questionActions = {
  types: {
    DELETE: 'DELETE',
    ADD_ANSWER: 'ADD_ANSWER',
    DELETE_ANSWER: 'DELETE_ANSWER'
  },
  delete (questionId) {
    Dispatcher.dispatch({
      type: this.types.DELETE,
      payload: questionId
    })
  },
  addAnswer (questionId, answer) {
    Dispatcher.dispatch({
      type: this.types.ADD_ANSWER,
      payload: { questionId, answer }
    })
  },
  deleteAnswerFromQuestion (questionId, answerId) {
    Dispatcher.dispatch({
      type: this.types.DELETE_ANSWER,
      payload: { questionId, answerId }
    })
  }
}

export default questionActions
