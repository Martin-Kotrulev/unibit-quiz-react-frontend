import React from 'react'
import { ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap'
import Auth from '../../Auth'

export default props => {
  let userId = Auth.getUserId()
  if (!props.groups || props.groups.length === 0) {
    return <h3 className='center-h'>No available groups</h3>
  } else {
    const renderGroups = props.groups.map((g, i) => {
      let tags = g.tags.map(t => '#'.concat(t)).join(' ')
      let id = g.id
      let name = g.name
      let showDelete = g.creatorId === userId
      let itemCols = showDelete ? 8 : 10

      return (
        <Col key={id} className='group-item'>
          <Col xs={itemCols} xsOffset={0} smOffset={1}>
            <ListGroupItem
              header={g.name}
              onClick={e => props.onGroupClick(id, name)}>
              <p className='group-info'>
                Created: <span className='created'>{new Date(g.createdOn).toDateString()} </span>
                By:<span className='by'> {g.creatorName}</span></p>
              <p className='group-info'>Tags: <span className='tags'>{tags}</span></p>
            </ListGroupItem>
          </Col>
          {showDelete
            ? <Col xs={2} smPull={0}>
              <Button
                bsStyle='danger'
                className='group-delete'
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (window.confirm('Are you sure?')) {
                    props.onDeleteClick(id)
                  }
                }}>Delete</Button>
            </Col>
            : null
          }
        </Col>
      )
    })

    return (
      <ListGroup>
        {renderGroups}
      </ListGroup>
    )
  }
}
