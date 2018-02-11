import React from 'react'
import { Form, Col, Button } from 'react-bootstrap'
import Datetime from 'react-datetime'

import Input from '../common/Input'

export default props => (
  <Form horizontal onSubmit={(e) => {
    e.preventDefault()
    props.onSubmit()
  }}>
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
      <Col xs={12}>
        {!props.quiz.published
        ? <Button
          bsStyle='primary'
          type='submit'
          >Publish</Button>
        : null}
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
        <Datetime
          inputProps={{
            placeholder: 'Enter Starting Date Time',
            name: 'starts',
            value: props.quiz.starts
          }}
          onChange={props.onStartDateChange}
          value={props.quiz.starts} />
      </Col>
      <Col xs={6} smPush={3} hidden={!props.quiz.once}>
        <Datetime
          inputProps={{
            placeholder: 'Enter Ending Date Time',
            name: 'ends',
            value: props.quiz.ends
          }}
          onChange={props.onEndDateChange} />
      </Col>
    </Col>
  </Form>
)
