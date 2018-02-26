import React from 'react'
import { ListGroup, ListGroupItem, Col, Button } from 'react-bootstrap'
import Auth from '../../Auth'

export default props => {
  let userId = Auth.getUserId()
  if (!props.quizzes || props.quizzes.length === 0) {
    return <h3 className='center-h'>No available quizzes</h3>
  } else {
    const renderQuizzes = props.quizzes.map((q, i) => {
      let tags = q.tags.map(t => '#'.concat(t)).join(' ')
      let id = q.id
      let name = q.name
      let own = q.creatorId === userId
      let itemCols = own ? 8 : 12
      let smItemCols = itemCols - 4

      return (
        <Col key={id} className='group-item'>
          {props.quizName ? <h4 className='center-h'>quizName</h4> : null}
          <Col xs={itemCols} xsOffset={0} sm={own ? itemCols - 2 : smItemCols} smOffset={2}>
            <ListGroupItem
              header={name}
              onClick={e => props.onQuizClick(q)}>
                Created: <span className='created'>{new Date(q.createdOn).toDateString()} </span>
                By:<span className='by'> {q.creatorName}</span><br />
                Tags: <span className='tags'>{tags}</span>
            </ListGroupItem>
          </Col>
          {own
            ? <Col xs={3}>
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
          {own
          ? <Col xs={3}>
            <Button
              bsStyle='success'
              className='group-delete'
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                props.onEditClick(q)
              }}>Edit</Button>
          </Col>
          : null}
        </Col>
      )
    })

    return (
      <ListGroup>
        {renderQuizzes}
      </ListGroup>
    )
  }
}
