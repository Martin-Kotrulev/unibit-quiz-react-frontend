import React, { Component } from 'react'
import toastr from 'toastr'

import QuizPublishForm from '../quizzes/QuizPublishForm'
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
      quiz
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

    console.log(this.state.quiz)
  }

  componentWillUnmount () {

  }

  publishQuiz () {

  }

  onQuizChange (event) {
    FormHelper.handleFormChange.call(this, event, 'quiz')
  }

  render () {
    return (
      <div>
        <h1 className='center-h'>{this.state.quiz.name}</h1>
        {this.state.quiz
          ? <QuizPublishForm
            quiz={this.state.quiz}
            onChange={this.onQuizChange.bind(this)}
            onSubmit={this.publishQuiz.bind(this)} />
          : null }
      </div>
    )
  }
}
