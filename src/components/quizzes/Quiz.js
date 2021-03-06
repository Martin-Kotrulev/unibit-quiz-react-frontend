import React, { Component } from 'react'

import QuizForm from '../quizzes/QuizForm'
import quizActions from '../../actions/QuizActions'
import quizStore from '../../stores/QuizStore'
import FormHelper from '../common/FormHelper'
import ResponseHelper from '../common/ResponseHelper'
import Auth from '../../Auth'

export default class Quiz extends Component {
  constructor (props) {
    super(props)
    let quizId = parseInt(props.match.params.quizId)
    let quiz = props.location.state && props.location.state.quiz

    this.state = {
      questions: [],
      quizId,
      quiz,
      userOwnQuiz: Auth.getUserId() === quiz.creatorId,
      error: '',
      questionError: '',
      answerError: '',
      startMoment: null,
      endMoment: null,
      newQuestion: {
        value: '',
        isMultiselect: false,
        quizId: '',
        answers: []
      },
      score: null
    }

    this.handleUpdatedQuestions = this.handleUpdatedQuestions.bind(this)
    this.handleFetchedQuestions = this.handleFetchedQuestions.bind(this)
    this.handleUserScore = this.handleUserScore.bind(this)

    quizStore.on(
      quizStore.eventTypes.QUESTIONS_UPDATED,
      this.handleUpdatedQuestions
    )

    quizStore.on(
      quizStore.eventTypes.ALL_QUESTIONS_FOR_QUIZ_FETCHED,
      this.handleFetchedQuestions
    )

    quizStore.on(
      quizStore.eventTypes.USER_SCORED,
      this.handleUserScore
    )
  }

  componentWillMount () {
    if (isNaN(this.state.quizId) || !this.state.quiz) {
      this.props.history.replace('/quizzes/all')
    } else {
      // Set null properties of quiz to empty string
      let quiz = this.state.quiz
      for (let quizProp in quiz) {
        if (quiz[quizProp] === null) {
          quiz[quizProp] = ''
        }
      }

      quizActions.allQuestionsForQuiz(quiz.id)
    }
  }

  componentWillUnmount () {
    quizStore.removeListener(
      quizStore.eventTypes.QUESTIONS_UPDATED,
      this.handleUpdatedQuestions
    )

    quizStore.removeListener(
      quizStore.eventTypes.ALL_QUESTIONS_FOR_QUIZ_FETCHED,
      this.handleFetchedQuestions
    )

    quizStore.removeListener(
      quizStore.eventTypes.USER_SCORED,
      this.handleUserScore
    )
  }

  handleUpdatedQuestions (response) {
    ResponseHelper.handleResponse.call(this, response)
    if (response.success) {
      this.setState({questions: response.result})
    }
  }

  handleFetchedQuestions ({quiz, questions}) {
    this.setState({quiz, questions})
  }

  handleUserScore (score) {
    console.log(score)
    this.setState({score})
  }

  onPublishQuiz () {
    console.log('publish')
    let {error, quiz, startMoment, endMoment} = this.state

    error = ''
    if (quiz.locked && !quiz.password) {
      error = 'Password cannot be empty'
    } else if (quiz.once && (!startMoment || !endMoment)) {
      error = 'Start and End Dates are required'
    } else if (quiz.once && startMoment.isAfter(endMoment)) {
      error = 'End date must be after Start date'
    }

    if (error) {

    } else {

    }

    this.setState({error})
  }

  onSaveQuestions () {
    quizActions.updateQuizQuestions(this.state.quizId, this.state.questions)
  }

  onQuizChange (event) {
    FormHelper.handleFormChange.call(this, event, 'quiz')
  }

  onNewQuestionChange (event) {
    FormHelper.handleFormChange.call(this, event, 'newQuestion')
  }

  onAddQuestion () {
    let questionError = ''

    if (!this.state.newQuestion.value) {
      questionError = 'You must enter question text'
      this.setState({questionError})
      return
    }

    this.state.newQuestion.quizId = this.state.quizId
    console.log(this.state.newQuestion.quizId)

    this.setState(prevState => {
      return {
        questions: [...prevState.questions, this.state.newQuestion],
        questionError,
        newQuestion: {
          value: '',
          isMultiselect: false,
          quizId: '',
          answers: []
        }
      }
    })
  }

  onDeleteQuestion (questionIndex) {
    let {questions} = this.state
    questions.splice(questionIndex, 1)
    this.setState({questions})
  }

  changeAnswerState (answer, boolState) {
    if (this.state.userOwnQuiz) {
      answer.isRight = boolState
    } else {
      answer.isChecked = boolState
    }
  }

  onAnswerChange (questionIndex, answerIndex, event) {
    let question = this.state.questions[questionIndex]

    if (!question.isMultiselect) {
      question.answers.forEach(a => {
        this.changeAnswerState(a, false)
      })
    }

    this.changeAnswerState(question.answers[answerIndex],
      event.target.checked)

    if (!this.state.userOwnQuiz) {
      let questionId = question.id
      let answerId = this.state.questions[questionIndex].answers[answerIndex].id
      let progressAnswer = {
        answerId,
        isChecked: event.target.checked
      }

      quizActions.addProgress(this.state.quizId, questionId, progressAnswer)
    }

    console.log('check', this.state.questions[questionIndex].answers)
  }

  onFinishQuiz () {
    quizActions.scoreUser(this.state.quizId)
  }

  onAddAnswer (answer, questionIndex) {
    let {questions} = this.state

    let letter = 'a'.charCodeAt(0) + questions[questionIndex].answers.length
    answer.letter = String.fromCharCode(letter)

    questions[questionIndex].answers.push(answer)

    this.setState({questions})
  }

  onDeleteAnswer (questionIndex, answerIndex) {
    let {questions} = this.state
    questions[questionIndex].answers.splice(answerIndex, 1)
    this.setState({questions})
  }

  onStartDateChange (startMoment) {
    if (typeof momentObject !== 'string') {
      let { quiz } = this.state
      quiz.starts = startMoment.toString()

      this.setState({ startMoment, quiz })
    }
  }

  onEndDateChange (endMoment) {
    if (typeof momentObject !== 'string') {
      let { quiz } = this.state
      quiz.ends = endMoment.toString()

      this.setState({ endMoment, quiz })
    }
  }

  render () {
    return (
      <div>
        <h1 className='center-h'>{this.state.quiz.name}</h1>
        {this.state.quiz
          ? <QuizForm
            error={this.state.error}
            userOwnQuiz={this.state.userOwnQuiz}
            questionError={this.state.questionError}
            answerError={this.state.questionError}
            quiz={this.state.quiz}
            newQuestion={this.state.newQuestion}
            questions={this.state.questions}
            onAddQuestion={this.onAddQuestion.bind(this)}
            onDeleteQuestion={this.onDeleteQuestion.bind(this)}
            onNewQuestionChange={this.onNewQuestionChange.bind(this)}
            onAnswerChange={this.onAnswerChange.bind(this)}
            onAddAnswer={this.onAddAnswer.bind(this)}
            onDeleteAnswer={this.onDeleteAnswer.bind(this)}
            onFinishQuiz={this.onFinishQuiz.bind(this)}
            onChange={this.onQuizChange.bind(this)}
            onPublish={this.onPublishQuiz.bind(this)}
            onSave={this.onSaveQuestions.bind(this)}
            onStartDateChange={this.onStartDateChange.bind(this)}
            onEndDateChange={this.onEndDateChange.bind(this)}
            score={this.state.score} />
          : null }
      </div>
    )
  }
}
