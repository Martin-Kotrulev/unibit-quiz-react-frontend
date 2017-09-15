import React from 'react'
import Input from '../common/Input'
import { Form, Button, Col, Label } from 'react-bootstrap'

const RegisterForm = (props) => (
  <Col sm={6} smOffset={3} xs={8} xsOffset={2}>
    <h1>Register User</h1>
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
        name='email'
        value={props.user.email}
        onChange={props.onChange}
        label='E-mail' />
      <Input
        className='form-control'
        name='password'
        type='password'
        value={props.user.password}
        onChange={props.onChange}
        label='Password' />
      <Input
        className='form-control'
        type='password'
        name='confirmPassword'
        value={props.user.confirmPassword}
        onChange={props.onChange}
        label='Confirm password' />
      <Button
        bsStyle='primary'
        type='submit'>Register</Button>
    </Form>
  </Col>
)

export default RegisterForm
