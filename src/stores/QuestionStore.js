import { EventEmitter } from 'events'
import Dispatcher from '../Dispatcher'
import questionActions from '../actions/QuestionActions'
import QuestionData from '../data/QuestionData'

class QuestionStore extends EventEmitter {
  delete (questionId) {
    QuestionData.delete(questionId)
      .then(data => this.emit(this.eventTypes.DELETED, data))
  }

  addAnswer ({ questionId, answer }) {
    QuestionData.addAnswer(questionId, answer)
      .then(data => this.emit(this.eventTypes.ANSWER_ADDED, data))
  }

  deleteAnswerFromQuestion ({ questionId, answerId }) {
    QuestionData.deleteAnswerFromQuestion(questionId, answerId)
      .than(data => this.emit(this.eventTypes.ANSWER_DELETED))
  }

  handleAction (action) {
    switch (action.type) {
      case questionActions.types.DELETE:
        this.delete(action.payload)
        break
      case questionActions.types.ADD_ANSWER:
        this.addAnswer(action.payload)
        break
      case questionActions.types.DELETE_ANSWER:
        this.deleteAnswerFromQuestion(action.payload)
        break
      default:
        break
    }
  }
}

let questionStore = new QuestionStore()

questionStore.eventTypes = {
  DELETED: 'DELETED',
  ANSWER_ADDED: 'ANSWER_ADDED',
  ANSWER_DELETED: 'ANSWER_DELETED'
}

Dispatcher.register(questionStore.handleAction.bind(questionStore))

export default questionStore
