import { EventEmitter } from 'events'
import Dispatcher from '../Dispatcher'
import quizActions from '../actions/UserActions'
import QuizData from '../data/QuizData'

class QuizStore extends EventEmitter {
  addQuiz (quiz) {
    QuizData.addQuiz(quiz)
      .then(data => this.emit(this.eventTypes.QUIZ_ADDED, data))
  }

  addQuestionToQuiz ({ quizId, question }) {
    QuizData.addQuestionToQuiz(quizId, question)
      .then(data => this.emit(this.eventTypes.QUESTION_TO_QUIZ_ADDED, data))
  }

  delete (quizId) {
    QuizData.delete(quizId)
      .then(data => this.emit(this.eventTypes.DELETED, data))
  }

  enterQuiz (quizId) {
    QuizData.enterQuiz(quizId)
      .then(data => this.emit(this.eventTypes.ENTERED, data))
  }

  addProgress (progress) {
    QuizData.addProgress(progress)
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

  handleAction (action) {
    switch (action.type) {
      case quizActions.types.ADD_QUIZ:
        this.addQuiz(action.payload)
        break
      case quizActions.types.ADD_QUESTION_TO_QUIZ:
        this.addQuestionToQuiz(action.payload)
        break
      case quizActions.types.DELETE:
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
      default:
        break
    }
  }
}

let userStore = new QuizStore()

userStore.eventTypes = {
  QUIZ_ADDED: 'QUIZ_ADDED',
  QUESTION_TO_QUIZ_ADDED: 'QUESTION_TO_QUIZ_ADDED',
  DELETED: 'DELETED',
  ENTERED: 'ENTERED',
  PROGRESS_ADDED: 'PROGRESS_ADDED',
  ALL_FETCHED: 'ALL_FETCHED',
  ALL_QUESTIONS_FOR_QUIZ_FETCHED: 'ALL_QUESTIONS_FOR_QUIZ_FETCHED'
}

Dispatcher.register(userStore.handleAction.bind(userStore))

export default userStore
