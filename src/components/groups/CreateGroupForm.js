import React from 'react'
import Input from '../common/Input'
import { Button, Form, Col, Label, FormGroup } from 'react-bootstrap'

const CreateGroupForm = (props) => (
  <Form horizontal onSubmit={props.onSubmit}>
    {props.error ? <h4><Label bsStyle='danger'>{props.error}</Label></h4> : null}
    <FormGroup>
      <Col xs={7} xsOffset={1} sm={5} smOffset={3}>
        <Input
          inline
          name='name'
          type='text'
          value={props.group.name}
          onChange={props.onChange}
          placeholder='Enter Group Name' />
      </Col>
      <Col xs={7} xsOffset={1} sm={5} smOffset={3}>
        <Input
          inline
          name='tags'
          type='text'
          value={props.group.tags}
          onChange={props.onChange}
          placeholder='Add Tags With The "#" symbol.' />
      </Col>
      <Col xs={2} xsOffset={0}>
        <Button
          bsStyle='primary'
          className='create-btn'
          type='submit'>Create</Button>
      </Col>
    </FormGroup>
  </Form>
)

export default CreateGroupForm
