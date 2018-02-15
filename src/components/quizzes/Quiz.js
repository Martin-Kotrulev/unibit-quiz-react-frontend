import React, { Component } from 'react'
import toastr from 'toastr'

import QuizForm from '../quizzes/QuizForm'
import quizActions from '../../actions/QuizActions'
import quizStore from '../../stores/QuizStore'
import FormHelper from '../common/FormHelper'

export default class Quiz extends Component {
  constructor (props) {
    super(props)
    let quizId = parseInt(props.match.params.quizId)
    let quiz = props.location.state && props.location.state.quiz

    this.state = {
      questions: [],
      quizId,
      quiz,
      error: '',
      questionError: '',
      answerError: '',
      startMoment: null,
      endMoment: null,
      newQuestion: {
        value: '',
        isMultiselect: 'false',
        quizId: '',
        answers: []
      }
    }
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
    }
  }

  componentWillUnmount () {

  }

  publishQuiz () {
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

  saveQuestions () {

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
          isMultiselect: 'false',
          quizId: '',
          answers: []
        }
      }
    })
  }

  onAnswerChange (questionId, answerId, event) {
    console.log(questionId)
    console.log(answerId)
    console.log(event)
  }

  onAddAnswer (answer, questionIndex) {
    console.log(answer)
    console.log(questionIndex)
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
            questionError={this.state.questionError}
            answerError={this.state.questionError}
            quiz={this.state.quiz}
            newQuestion={this.state.newQuestion}
            questions={this.state.questions}
            onAddQuestion={this.onAddQuestion.bind(this)}
            onNewQuestionChange={this.onNewQuestionChange.bind(this)}
            onAnswerChange={this.onAnswerChange.bind(this)}
            onAddAnswer={this.onAddAnswer.bind(this)}
            onChange={this.onQuizChange.bind(this)}
            onPublish={this.publishQuiz.bind(this)}
            onSave={this.saveQuestions.bind(this)}
            onStartDateChange={this.onStartDateChange.bind(this)}
            onEndDateChange={this.onEndDateChange.bind(this)} />
          : null }
      </div>
    )
  }
}
