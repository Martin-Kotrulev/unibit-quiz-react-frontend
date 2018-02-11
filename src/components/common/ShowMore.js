import React from 'react'
import { Col } from 'react-bootstrap'

export default props => {
  if (props.hasMore) {
    return (
      <Col xs={12}>
        <a
          href='more'
          onClick={e => { e.preventDefault(); props.onShowMore() }}
          className='show-more'>
          Show More
        </a>
      </Col>
    )
  }
  return null
}
