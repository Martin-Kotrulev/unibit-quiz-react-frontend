import React from 'react'
import Input from '../common/Input'
import { Button, Form, Col, Label } from 'react-bootstrap'

const LoginForm = (props) => (
  <Col sm={6} smOffset={3} xs={12}>
    <h1>Login in to your account</h1>
    <Form onSubmit={props.onSubmit}>
      {props.error ? <h3><Label bsStyle='danger'>{props.error}</Label></h3> : null}
      <Input
        className='form-control'
        name='email'
        value={props.user.email}
        onChange={props.onChange}
        label='User E-mail' />
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
