import React from 'react'
import { Pager, Col } from 'react-bootstrap'

export default props => {
  const hasNext = props.listSize !== 0
  const hasPrevious = props.page > 1

  console.log(hasNext, hasPrevious)
  return (
    <Pager>
      <Pager.Item
        disabled={!hasPrevious}
        previous
        onClick={props.onPrevious}>&larr; Previous</Pager.Item>
      {' '}
      <Pager.Item
        disabled={!hasNext}
        next
        onClick={props.onNext}>Next &rarr;</Pager.Item>
    </Pager>
  )
}
