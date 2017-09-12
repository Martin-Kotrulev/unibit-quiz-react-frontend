import { EventEmitter } from 'events'
import Dispatcher from '../Dispatcher'
import groupActions from '../actions/GroupActions'
import GroupData from '../data/GroupData'

class GroupStore extends EventEmitter {
  registerUser (user) {
    GroupData.registerUser(user)
      .then(data => this.emit(this.eventTypes.USER_REGISTERED, data))
  }

  loginUser (user) {
    GroupData.loginUser(user)
      .then(data => this.emit(this.eventTypes.USER_LOGGED_IN, data))
  }

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

  allQuizzes ({ quizId, page }) {
    GroupData.allQuizzes(quizId, page)
      .then(data => this.emit(this.eventTypes.ALL_QUIZZES_FETCHED, data))
  }

  mineGroups (page) {
    GroupData.mineGroups(page)
      .then(data => this.emit(this.eventTypes.MINE_FETCHED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case groupActions.types.ADD:
        this.add(action.payload)
        break
      case groupActions.types.ALL:
        this.delete(action.payload)
        break
      case groupActions.types.ALL_QUIZZES:
        this.all(action.payload)
        break
      case groupActions.types.DELETE:
        this.allQuizzes(action.payload)
        break
      case groupActions.types.MINE:
        this.mineGroups(action.payload)
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
  MINE_FETCHED: 'MINE_FETCHED'
}

Dispatcher.register(groupStore.handleAction.bind(groupStore))

export default groupStore
