import React, { Component } from 'react'
import { Col, Button, Label } from 'react-bootstrap'

import Input from '../common/Input'
import FormHelper from '../common/FormHelper'

export default class AnswerForm extends Component {
  state = {
    answer: {
      isRight: false,
      value: '',
      weight: 1
    },
    error: ''
  }

  onAddAnswer () {
    // validateion
    this.props.onAddAnswer(this.state.answer, this.props.questionIndex);

    this.setState({
      answer: {
        isRight: false,
        value: '',
        weight: 1
      },
      error: ''
    })
  }

  onAnswerChange (event) {
    FormHelper.handleFormChange.call(this, event, 'answer')
  }

  render () {
    return (
      <div>
        <Col xs={12} className='question-input'>
          {this.state.error ? <h4><Label bsStyle='danger'> {this.state.error} </Label></h4> : null}
          <Input
            placeholder='Add Answer For The Question'
            type='text'
            name='value'
            value={this.state.answer.value}
            onChange={this.onAnswerChange.bind(this)} />
        </Col>
        <Col xs={6}>
          <Button
            className='pull-right'
            bsStyle='primary'
            onClick={this.onAddAnswer.bind(this)}>Add Answer</Button>
        </Col>
      </div>
    )
  }
}