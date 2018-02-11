import React from 'react'
import { Form, Col } from 'react-bootstrap'
import Datetime from 'react-datetime'

import Input from '../common/Input'

export default props => (
  <Form horizontal onSubmit={props.onSubmit}>
    <Col
      xs={10}
      xsOffset={1}
      sm={6}
      smOffset={3}>
      <Col xs={4}>
        <Input
          inline
          name='locked'
          type='checkbox'
          value={props.quiz.locked}
          onChange={props.onChange}
          label='Locked' />
      </Col>
      <Col xs={8} hidden={!props.quiz.locked}>
        <Input
          inline
          name='password'
          type='text'
          value={props.quiz.password}
          onChange={props.onChange}
          placeholder='Password' />
      </Col>
    </Col>
    <Col
      xs={10}
      xsOffset={1}
      sm={6}
      smOffset={3}>
      <Col xs={4}>
        <Input
          inline
          name='once'
          type='checkbox'
          value={props.quiz.once}
          onChange={props.onChange}
          label='One time quiz' />
      </Col>
      <Col xs={6} smPush={3} hidden={!props.quiz.once}>
        <Datetime />
      </Col>
      <Col xs={6} smPush={3} hidden={!props.quiz.once}>
        <Datetime />
      </Col>
    </Col>
  </Form>
)
