import React from 'react'
import Input from '../common/Input'
import { Button, Form, Col, Label, FormGroup } from 'react-bootstrap'

const CreateQuizForm = (props) => (
  <Form horizontal onSubmit={props.onSubmit}>
    {props.error ? <h4><Label bsStyle='danger'>{props.error}</Label></h4> : null}
    <Col xs={12} sm={5} smOffset={3}>
      <Input
        inline
        className='form-control'
        name='name'
        type='text'
        value={props.quiz.name}
        onChange={props.onChange}
        placeholder='Enter Quiz Name' />
    </Col>
    <Col xs={12} sm={5} smOffset={3}>
      <Input
        inline
        className='form-control'
        name='tags'
        type='text'
        value={props.quiz.tags}
        onChange={props.onChange}
        placeholder='Add Tags With The "#" symbol.' />
    </Col>
    <Col xs={6} sm={5} smOffset={3}>
      <Input
        inline
        name='locked'
        type='checkbox'
        value={props.quiz.locked}
        onChange={props.onChange}
        label='Locked' />
    </Col>
    <Col xs={6} sm={5} smOffset={3}>
      <Input
        inline
        name='once'
        type='checkbox'
        value={props.quiz.once}
        onChange={props.onChange}
        label='One time quiz' />
    </Col>
    <Col xs={8} smOffset={3} hidden={!props.quiz.locked}>
      <Input
        inline
        className='form-control'
        name='password'
        type='text'
        value={props.quiz.password}
        onChange={props.onChange}
        placeholder='Password' />
    </Col>
    <Col xs={2} xsPush={props.quiz.locked ? 0 : 8}>
      <Button
        bsStyle='primary'
        type='submit'>Create</Button>
    </Col>
  </Form>
)

export default CreateQuizForm
