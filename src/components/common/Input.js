import React from 'react'
import { FormControl, FormGroup, Radio, Checkbox, Col, ControlLabel } from 'react-bootstrap'

const Input = (props) => {
  let type = props.type || 'text'
  let isRadioOrCheck = props.type === 'radio' || props.type === 'checkbox'
  let isRadio = props.type === 'radio'
  let component

  if (!isRadioOrCheck) {
    component = (
      <FormControl
        className={props.className}
        disabled={props.disabled}
        type={type}
        name={props.name}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={props.onChange} />
    )
  } else {
    component = isRadio ? (
      <Radio
        defaultChecked={props.checked}
        disabled={props.disabled}
        type={type}
        name={props.name}
        inline={props.inline}
        id={props.id}
        onClick={props.onClick} >{props.label}</Radio>)
      : (
        <Checkbox
          defaultChecked={props.checked}
          disabled={props.disabled}
          type={type}
          name={props.name}
          id={props.id}
          onClick={props.onClick} >{props.label}</Checkbox>)
  }

  if (props.inlineLabel) {
    component = <Col xs={10}>{component}</Col>
  }

  let label = <label htmlFor={props.name}>{props.label}</label>

  if (props.inlineLabel) {
    label = <Col xs={2}><ControlLabel>{props.label}</ControlLabel></Col>
  }

  return (
    <FormGroup>
      {props.label && !isRadioOrCheck
      ? label
      : null}
      {component}
    </FormGroup>
  )
}

export default Input
