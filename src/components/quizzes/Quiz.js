import React, { Component } from 'react'
import { Col, Panel } from 'react-bootstrap'
import quizActions from '../../actions/QuizActions'

export default class Quiz extends Component {
  constructor (props) {
    super(props)

    let quizId = props.match.params.quizId
    this.state = {
      questions: []
    }

  }

  componentWillMount () {
    
  }

  render () {
    return (
      <Col xs={10} xsOffset={1}>
        <Panel header='Panel heading without title'>
          Panel content
        </Panel>
      </Col>
    )
  }
}