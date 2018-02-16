import React from 'react'
import { Col, Button, Label } from 'react-bootstrap'

import Input from '../common/Input'
import AnswerForm from '../answers/AnswerForm'

import 'react-datepicker/dist/react-datepicker-cssmodules.css'

export default props => {
  const questions = props.questions.map((q, qi) => {
    const answers = q.answers.map((a, ai) => (
      <div key={a.id || ai}>
        <span className='answer-letter'>{a.letter}. </span>
        <Input
          name={props.userOwnQuiz ? 'isRight' : 'isChecked'}
          type={q.isMultiselect ? 'checkbox' : 'radio'}
          value={props.userOwnQuiz ? a.isChecked : a.isRight}
          label={a.value}
          onChange={(e) => props.onAnswerChange(qi, ai, e)} />
      </div>
    ))

    return (
      <Col xs={10} xsOffset={1} key={q.id || qi}>
        <h3 className='question-h' key={q.id || qi}>{qi + 1}. {q.value}</h3>
        {answers}
        <AnswerForm onAddAnswer={props.onAddAnswer} questionIndex={qi} />
      </Col>
    )
  })

  return (
    <Col xs={12} sm={8} smOffset={2}>
      {props.error ? <h4><Label bsStyle='danger'> {props.error} </Label></h4> : null}
      <Col xs={6}>
        <Button
          className='pull-right'
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
      <Col xs={6}>
        <Button
          className='pull-right'
          bsStyle='primary'
          onClick={props.onAddQuestion}>Add Question</Button>
      </Col>
      <Col xs={6}>
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
