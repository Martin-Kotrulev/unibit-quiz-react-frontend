import { EventEmitter } from 'events'
import Dispatcher from '../Dispatcher'
import quizActions from '../actions/QuizActions'
import QuizData from '../data/QuizData'

class QuizStore extends EventEmitter {
  addQuiz (quiz) {
    QuizData.add(quiz)
      .then(data => this.emit(this.eventTypes.QUIZ_ADDED, data))
  }

  delete (quizId) {
    QuizData.delete(quizId)
      .then(data => this.emit(this.eventTypes.DELETED, data))
  }

  enterQuiz (quizId) {
    QuizData.enterQuiz(quizId)
      .then(data => this.emit(this.eventTypes.ENTERED, data))
  }

  addProgress ({ quizId, questionId, progressAnswer }) {
    QuizData.addProgress(quizId, questionId, progressAnswer)
      .then(data => this.emit(this.eventTypes.PROGRESS_ADDED, data))
  }

  all ({ search, page }) {
    QuizData.all(search, page)
      .then(data => this.emit(this.eventTypes.ALL_FETCHED, data))
  }

  allQuestionsForQuiz (quizId) {
    QuizData.allQuestionsForQuiz(quizId)
      .then(data => this.emit(this.eventTypes.ALL_QUESTIONS_FOR_QUIZ_FETCHED, data))
  }

  mine (page) {
    QuizData.mine(page)
      .then(data => this.emit(this.eventTypes.MINE_FETCHED, data))
  }

  updateQuizQuestions ({ quizId, questions }) {
    QuizData.updateQuizQuestions(quizId, questions)
      .then(data => this.emit(this.eventTypes.QUESTIONS_UPDATED, data))
  }

  scoreUser (quizId) {
    QuizData.scoreUser(quizId)
      .then(data => this.emit(this.eventTypes.USER_SCORED, data))
  }

  handleAction (action) {
    switch (action.type) {
      case quizActions.types.ADD_QUIZ:
        this.addQuiz(action.payload)
        break
      case quizActions.types.DELETE_QUIZ:
        this.delete(action.payload)
        break
      case quizActions.types.ENTER:
        this.enterQuiz(action.payload)
        break
      case quizActions.types.ADD_PROGRESS:
        this.addProgress(action.payload)
        break
      case quizActions.types.ALL:
        this.all(action.payload)
        break
      case quizActions.types.ALL_QUESTIONS_FOR_QUIZ:
        this.allQuestionsForQuiz(action.payload)
        break
      case quizActions.types.MINE:
        this.mine(action.payload)
        break
      case quizActions.types.UPDATE_QUIZ_QUESTIONS:
        this.updateQuizQuestions(action.payload)
        break
      case quizActions.types.SCORE_USER:
        this.scoreUser(action.payload)
        break
      default:
        break
    }
  }
}

let quizStore = new QuizStore()

quizStore.eventTypes = {
  QUIZ_ADDED: 'QUIZ_ADDED',
  DELETED: 'DELETED',
  ENTERED: 'ENTERED',
  PROGRESS_ADDED: 'PROGRESS_ADDED',
  ALL_FETCHED: 'ALL_FETCHED',
  MINE_FETCHED: 'MINE_FETCHED',
  ALL_QUESTIONS_FOR_QUIZ_FETCHED: 'ALL_QUESTIONS_FOR_QUIZ_FETCHED',
  QUESTIONS_UPDATED: 'QUESTIONS_UPDATED',
  USER_SCORED: 'USER_SCORED'
}

Dispatcher.register(quizStore.handleAction.bind(quizStore))

export default quizStore
