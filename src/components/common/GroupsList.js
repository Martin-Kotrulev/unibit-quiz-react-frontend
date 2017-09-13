import React from 'react'
import { ListGroup, ListGroupItem, Col } from 'react-bootstrap'

export default props => {
  console.log(props)
  if (props.groups.length === 0) {
    return <h3>Currently you don't have your own groups</h3>
  } else {
    const groups = props.groups.map(g => {
      let tags = ''

      for (let t of tags) {
        tags += ' #' + t
      }
      return (
        <ListGroupItem
          header={g.name} key={g.id}>
          <h5 className='group-info'>Created: {new Date(g.createdOn).toDateString()}</h5>
          <h5 className='group-info'>Tags: {tags}</h5>
        </ListGroupItem>
      )
    })

    return (
      <Col sm={8} smOffset={2} xs={12} >
        <ListGroup>
          {groups}
        </ListGroup>
      </Col>
    )
  }
}
