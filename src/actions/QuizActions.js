import Dispatcher from '../Dispatcher'

const quizActions = {
  types: {
    ADD_QUIZ: 'ADD_QUIZ',
    ADD_QUESTION_TO_QUIZ: 'ADD_QUESTION_TO_QUIZ',
    DELETE: 'DELETE',
    ENTER: 'ENTER',
    ADD_PROGRESS: 'ADD_PROGRESS',
    ALL: 'ALL',
    ALL_QUESTIONS_FOR_QUIZ: 'ALL_QUESTIONS_FOR_QUIZ',
    MINE: 'MINE'
  },
  addQuiz (quiz) {
    Dispatcher.dispatch({
      type: this.types.ADD_QUIZ,
      payload: quiz
    })
  },
  addQuestionToQuiz (quizId, question) {
    Dispatcher.dispatch({
      type: this.types.ADD_QUESTION_TO_QUIZ,
      payload: { quizId, question }
    })
  },
  delete (quizId) {
    Dispatcher.dispatch({
      type: this.types.DELETE,
      payload: quizId
    })
  },
  mine (page) {
    Dispatcher.dispatch({
      type: this.types.MINE,
      payload: page
    })
  },
  enterQuiz (quizId) {
    Dispatcher.dispatch({
      type: this.types.ENTER,
      payload: quizId
    })
  },
  addProgress (progress) {
    Dispatcher.dispatch({
      type: this.types.ADD_PROGRESS,
      payload: progress
    })
  },
  all (search, page) {
    Dispatcher.dispatch({
      type: this.types.ALL,
      payload: { search, page }
    })
  },
  allQuestionsForQuiz (quizId) {
    Dispatcher.dispatch({
      type: this.types.ALL_QUESTIONS_FOR_QUIZ,
      payload: quizId
    })
  }
}

export default quizActions
