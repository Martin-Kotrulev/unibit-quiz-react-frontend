import React from 'react'
import { Form, Button, Col, FormGroup } from 'react-bootstrap'
import Input from './Input'

export default props => (
  <Form horizontal onSubmit={e => { e.preventDefault(); props.onSubmit() }}>
    <FormGroup>
      <Col xs={8} xsOffset={1} sm={5} smOffset={3}>
        <Input
          inline
          className='form-control'
          name='search'
          type='text'
          value={props.search}
          onChange={props.onChange}
          placeholder={props.placeholder} />
      </Col>
      <Col xs={2} xsOffset={0}>
        <Button bsStyle='primary' type='submit'>Search</Button>
      </Col>
    </FormGroup>
  </Form>
)
