import React from 'react'
import { Col, Button, Label, Glyphicon } from 'react-bootstrap'

import Input from '../common/Input'
import AnswerForm from '../answers/AnswerForm'

import 'react-datepicker/dist/react-datepicker-cssmodules.css'

export default props => {
  const questions = props.questions.map((q, qi) => {
    const answers = q.answers.map((a, ai) => (
      <div key={a.id || ai}>
        {props.userOwnQuiz
        ? <Col xs={1}>
          <a className='remove-button answer-remove' onClick={() => props.onDeleteAnswer(qi, ai)}>
            <Glyphicon glyph='remove' />
          </a>
        </Col>
        : null}
        <Col xs={11}>
          <Input
            className='answer-input'
            name={props.userOwnQuiz ? 'isRight' : 'isChecked'}
            type={q.isMultiselect ? 'checkbox' : 'radio'}
            checked={props.userOwnQuiz ? a.isRight : a.isChecked}
            label={`${a.letter}) ${a.value}`}
            onClick={(e) => props.onAnswerChange(qi, ai, e)} />
        </Col>
      </div>
    ))

    return (
      <Col xs={10} xsOffset={1} key={q.id || qi}>
        {props.userOwnQuiz
        ? <a className='remove-button' onClick={() => props.onDeleteQuestion(qi)}>
          <Glyphicon glyph='remove' />
        </a>
        : null}
        <h3 className='question-h' key={q.id || qi}>{qi + 1}. {q.value}</h3>
        {answers}
        {props.userOwnQuiz
        ? <AnswerForm onAddAnswer={props.onAddAnswer} questionIndex={qi} />
        : null}
      </Col>
    )
  })

  return (
    <Col xs={12} sm={8} smOffset={2}>
      {props.error ? <h4><Label bsStyle='danger'> {props.error} </Label></h4> : null}
      {!props.quiz.published && props.userOwnQuiz
      ? <div>
        <Col xs={6}>
          <Button
            className='pull-right'
            bsStyle='primary'
            onClick={props.onSave}>Save Questions</Button>
        </Col>
        <Col xs={6}>
          <Button bsStyle='success' onClick={props.onPublish}>
            Publish Quiz
          </Button>
        </Col>
      </div>
      : null}
      {!props.userOwnQuiz && !props.score
        ? <div className='text-center'>
          <Button
            bsStyle='primary'
            onClick={props.onFinishQuiz}>Finish Quiz</Button>
        </div>
        : null}
      {props.userOwnQuiz || !props.score ? questions : null}
      {props.userOwnQuiz
      ? <div>
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
            checked={props.newQuestion.isMultiselect}
            onChange={props.onNewQuestionChange}
            name='isMultiselect'
            type='checkbox'
            label='Multiselect' />
        </Col>
      </div>
      : null}
      {!props.userOwnQuiz && !props.score
      ? <div className='text-center'>
        <Button
          bsStyle='primary'
          onClick={() => props.onFinishQuiz()}>Finish Quiz</Button>
      </div>
      : null}
      {props.score
      ? <Col className='score-labels'>
        <h2 className='center-h'>Quiz Finished!</h2>
        <h1 className='center-h'>Your Score: <span className='score'>{props.score.value}</span></h1>
      </Col>
      : null}
    </Col>
  )
}
