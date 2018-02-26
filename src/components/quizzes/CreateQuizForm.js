import React from 'react'
import Input from '../common/Input'
import { Button, Form, FormGroup, Col, Label } from 'react-bootstrap'

export default props => (
  <Form horizontal onSubmit={props.onSubmit}>
    {props.error ? <h4><Label bsStyle='danger'>{props.error}</Label></h4> : null}
    <FormGroup>
      <Col xs={7} xsOffset={1} sm={5} smOffset={3}>
        <Input
          inline
          name='name'
          type='text'
          value={props.quiz.name}
          onChange={props.onChange}
          placeholder='Enter Quiz Name' />
      </Col>
      <Col xs={7} xsOffset={1} sm={5} smOffset={3}>
        <Input
          inline
          name='tags'
          type='text'
          value={props.quiz.tags}
          onChange={props.onChange}
          placeholder='Add Tags With The "#" symbol.' />
      </Col>
      <Col xs={2}>
        <Button
          bsStyle='primary'
          className='create-btn'
          type='submit'>Create</Button>
      </Col>
    </FormGroup>
  </Form>
)
