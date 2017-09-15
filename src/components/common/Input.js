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
        disabled={props.disabled}
        className={props.className}
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
        disabled={props.disabled}
        type={type}
        name={props.name}
        inline={props.inline}
        value={props.value}
        id={props.id}
        onChange={props.onChange} >{props.label}</Radio>)
      : (
        <Checkbox
          disabled={props.disabled}
          type={type}
          name={props.name}
          inline={props.inline}
          value={props.value}
          id={props.id}
          onChange={props.onChange} >{props.label}</Checkbox>)
  }

  if (props.inlineLabel) {
    component = <Col sm={10}>{component}</Col>
  }

  let label = <label htmlFor={props.name}>{props.label}:</label>

  if (props.inlineLabel) {
    label = <Col sm={2}>{label}</Col>
  }

  return (
    <FormGroup>
      {props.label && !isRadioOrCheck
      ? <ControlLabel>{props.label}</ControlLabel>
      : null}
      {component}
      
    </FormGroup>
  )
}

export default Input
