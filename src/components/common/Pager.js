import React from 'react'
import { Button, Col, Glyphicon } from 'react-bootstrap'

export default props => {
  const hasNext = props.listSize !== 0
  const hasPrevious = props.page > 1

  console.log(hasNext, hasPrevious)
  return (
    <Col xs={12} className='custom-pager'>
      <Col xs={6} xsOffset={0} sm={2} smOffset={4}>
        <Button
          disabled={!hasPrevious}
          onClick={props.onPrevious}><Glyphicon glyph='circle-arrow-left' /> Prev Page</Button>
      </Col>
      <Col xs={6} xsOffset={0} sm={2} smOffset={0}>
        <Button
          disabled={!hasNext}
          onClick={props.onNext}>Next Page <Glyphicon glyph='circle-arrow-right' /></Button>
      </Col>
    </Col>
  )
}
