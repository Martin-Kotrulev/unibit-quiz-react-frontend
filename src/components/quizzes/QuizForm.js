import React from 'react'
import { Col, Button, Label } from 'react-bootstrap'

import Input from '../common/Input'

import 'react-datepicker/dist/react-datepicker-cssmodules.css'

export default props => {
  const questions = props.questions.map((q, i) => (
    <h3 className='question-h' key={i}>{i + 1}. {q.value}</h3>
  ))

  return (
    <Col xs={12} sm={8} smOffset={2}>
      {props.error ? <h4><Label bsStyle='danger'> {props.error} </Label></h4> : null}
      <Col xs={6} xsPush={2}>
        <Button
          bsStyle='primary'
          onClick={props.onSave}>Save Questions</Button>
      </Col>
      <Col xs={6}>
        {!props.quiz.published
       ? <Button bsStyle='success' onClick={props.onPublish}>
           Publish Quiz
         </Button>
       : null}
      </Col>
      {questions}
      <Col xs={12} className='question-input'>
        {props.questionError ? <h4><Label bsStyle='danger'> {props.questionError} </Label></h4> : null}
        <Input
          placeholder='Enter Your New Question'
          type='text'
          name='value'
          value={props.newQuestion.value}
          onChange={props.onNewQuestionChange} />
      </Col>
      <Col xs={4}>
        <Button
          bsStyle='primary'
          onClick={props.onAddQuestion}>Add Question</Button>
      </Col>
      <Col xs={4}>
        <Input
          inline
          onChange={props.onNewQuestionChange}
          value={props.newQuestion.isMultiselec}
          type='checkbox'
          label='Multiselect' />
      </Col>
    </Col>
  )
}
