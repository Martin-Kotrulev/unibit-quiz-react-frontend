import React, { Component } from 'react'
import { Col, Button, Label, Form, FormGroup, Glyphicon } from 'react-bootstrap'

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
    if (!this.state.answer.weight) {
      this.state.answer.weight = 1
    }

    if (!this.state.answer.value) {
      this.setState({ error: 'Answer cannot be empty'})
      return
    }

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
    if (event.target.name === 'weight') {
      FormHelper.handleNumericFormChange.call(this, event, 'answer', 1, 10)
    } else {
      FormHelper.handleFormChange.call(this, event, 'answer')
    }
  }

  render () {
    return (
      <Form horizontal>
        {this.state.error ? <h4><Label bsStyle='danger'> {this.state.error} </Label></h4> : null}
        <FormGroup>
          <Col xs={9}>
            <Input
              placeholder='Add Answer For The Question'
              type='text'
              name='value'
              value={this.state.answer.value}
              onChange={this.onAnswerChange.bind(this)} />
          </Col>
          <Col xs={1}>
          <label className='weight-label'>Weight</label>
            <Input
              className='answer-weight-input'
              name='weight'
              value={this.state.answer.weight}
              onChange={this.onAnswerChange.bind(this)}/>
          </Col>
          <Col xs={1}>
            <Button
              bsStyle='primary'
              onClick={this.onAddAnswer.bind(this)}><Glyphicon glyph="plus" /></Button>
          </Col>
        </FormGroup>
      </Form>
    )
  }
}