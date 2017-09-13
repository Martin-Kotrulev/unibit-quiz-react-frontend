import React from 'react'
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap'

export default props => {
  console.log(props)
  if (props.groups.length === 0) {
    return <h3>Currently you don't have your own groups</h3>
  }

  const groups = props.groups.map(g => {
    let tags = ''

    for (let t of tags) {
      tags += ' #' + t
    }
    return (
      <ListGroupItem
        label='' key={g.id}>Created: {g.createdOn} Tags: {tags}
      </ListGroupItem>
    )
  })

  return (
    <Col sm={8} smOffset={2} xs={8} xsOffset={2}>
      <ListGroup>
        {groups}
      </ListGroup>
    </Col>
  )
}
