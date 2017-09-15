import React, { Component } from 'react'

export default class Group extends Component {
  constructor (props) {
    super(props)

    const name = parseInt(this.props.match.params.id, 10)
    const id = this.props.match.params.name

    this.state = {
      name,
      id
    }
  }

  render () {
    return (
      <div>Group</div>
    )
  }
}
