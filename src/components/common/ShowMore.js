import React from 'react'

export default props => {
  if (props.hasMore) {
    return (<a
      href='more'
      onClick={e => { e.preventDefault(); props.onShowMore() }}>
      <h4>Show More</h4>
    </a>)
  }
  return null
}
