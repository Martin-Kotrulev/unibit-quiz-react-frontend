import Dispatcher from '../Dispatcher'

const quizActions = {
  types: {
    ADD_QUIZ: 'ADD_QUIZ',
    DELETE_QUIZ: 'DELETE_QUIZ',
    ENTER: 'ENTER',
    ADD_PROGRESS: 'ADD_PROGRESS',
    ALL: 'ALL',
    ALL_QUESTIONS_FOR_QUIZ: 'ALL_QUESTIONS_FOR_QUIZ',
    MINE: 'MINE',
    UPDATE_QUIZ_QUESTIONS: 'UPDATE_QUIZ_QUESTIONS',
    SCORE_USER: 'SCORE_USER'
  },
  addQuiz (quiz) {
    Dispatcher.dispatch({
      type: this.types.ADD_QUIZ,
      payload: quiz
    })
  },
  delete (quizId) {
    Dispatcher.dispatch({
      type: this.types.DELETE_QUIZ,
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
  addProgress (quizId, questionId, progressAnswer) {
    Dispatcher.dispatch({
      type: this.types.ADD_PROGRESS,
      payload: { quizId, questionId, progressAnswer }
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
  },
  updateQuizQuestions (quizId, questions) {
    Dispatcher.dispatch({
      type: this.types.UPDATE_QUIZ_QUESTIONS,
      payload: { quizId, questions }
    })
  },
  scoreUser (quizId) {
    Dispatcher.dispatch({
      type: this.types.SCORE_USER,
      payload: quizId
    })
  }
}

export default quizActions
