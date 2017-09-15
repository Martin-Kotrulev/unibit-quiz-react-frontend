import React from 'react'
import Input from '../common/Input'
import { Button, Form, Col, Label } from 'react-bootstrap'

const LoginForm = (props) => (
  <Col sm={6} smOffset={3} xs={12}>
    <h1>Login in to your account</h1>
    <Form onSubmit={props.onSubmit}>
      {props.error ? <h4><Label bsStyle='danger'>{props.error}</Label></h4> : null}
      <Input
        className='form-control'
        name='username'
        value={props.user.username}
        onChange={props.onChange}
        label='User Name' />
      <Input
        className='form-control'
        name='password'
        type='password'
        value={props.user.password}
        onChange={props.onChange}
        label='Password' />
      <Button bsStyle='primary' type='submit'>Login</Button>
    </Form>
  </Col>
)

export default LoginForm
