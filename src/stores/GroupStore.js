import { EventEmitter } from 'events'
import Dispatcher from '../Dispatcher'
import groupActions from '../actions/GroupActions'
import GroupData from '../data/GroupData'

class GroupStore extends EventEmitter {
  add (group) {
    GroupData.add(group)
      .then(data => this.emit(this.eventTypes.ADDED, data))
  }

  delete (groupId) {
    GroupData.delete(groupId)
      .then(data => this.emit(this.eventTypes.DELETED, data))
  }

  all ({ search, page }) {
    GroupData.all(search, page)
      .then(data => this.emit(this.eventTypes.ALL_FETCHED, data))
  }

  allQuizzes ({ groupId, page }) {
    GroupData.allQuizzes(groupId, page)
      .then(data => this.emit(this.eventTypes.ALL_QUIZZES_FETCHED, data))
  }

  mineGroups (page) {
    GroupData.mineGroups(page)
      .then(data => this.emit(this.eventTypes.MINE_FETCHED, data))
  }

  addQuizToGroup ({ groupId, quiz }) {
    GroupData.addQuizToGroup(groupId, quiz)
      .then(data => this.emit(this.eventTypes.QUIZ_ADDED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case groupActions.types.ADD:
        this.add(action.payload)
        break
      case groupActions.types.ALL:
        this.all(action.payload)
        break
      case groupActions.types.ALL_QUIZZES:
        this.allQuizzes(action.payload)
        break
      case groupActions.types.DELETE:
        this.delete(action.payload)
        break
      case groupActions.types.MINE:
        this.mineGroups(action.payload)
        break
      case groupActions.types.ADD_QUIZ:
        this.addQuizToGroup(action.payload)
        break
      default:
        break
    }
  }
}

let groupStore = new GroupStore()

groupStore.eventTypes = {
  ADDED: 'ADDED',
  DELETED: 'DELETED',
  ALL_FETCHED: 'ALL_FETCHED',
  ALL_QUIZZES_FETCHED: 'ALL_QUIZZES_FETCHED',
  MINE_FETCHED: 'MINE_FETCHED',
  QUIZ_ADDED: 'QUIZ_ADDED'
}

Dispatcher.register(groupStore.handleAction.bind(groupStore))

export default groupStore
