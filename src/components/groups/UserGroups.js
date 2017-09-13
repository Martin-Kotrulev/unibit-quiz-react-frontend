import React, { Component } from 'react'
import ShowMore from '../common/ShowMore'
import GroupsList from '../common/GroupsList'
import { Col } from 'react-bootstrap'
import queryString from 'query-string'
import groupActions from '../../actions/GroupActions'
import groupStore from '../../stores/GroupStore'
import CreateGroupForm from './CreateGroupForm'
import FormHelper from '../common/FormHelper'
import ResponseHelper from '../common/ResponseHelper'

export default class UserGroups extends Component {
  constructor (props) {
    super(props)
    const query = queryString.parse(this.props.location.search)
    const page = parseInt(query.page) || 1

    this.state = {
      group: {
        name: ''
      },
      groups: [],
      page,
      hasMore: true,
      error: ''
    }

    this.handleFetchedGroups = this.handleFetchedGroups.bind(this)
    this.fetchUserGroups = this.fetchUserGroups.bind(this)
    this.handleGroupAdding = this.handleGroupAdding.bind(this)

    groupStore.on(
      groupStore.eventTypes.MINE_FETCHED,
      this.handleFetchedGroups
    )

    groupStore.on(
      groupStore.eventTypes.ADDED,
      this.handleGroupAdding
    )
  }

  componentWillUnmount () {
    groupStore.removeListener(
      groupStore.eventTypes.MINE_FETCHED,
      this.handleFetchedGroups
    )

    groupStore.removeListener(
      groupStore.eventTypes.ADDED,
      this.handleGroupAdding
    )
  }

  componentWillMount () {
    groupActions.mineGroups()
  }

  handleGroupAdding (data) {
    ResponseHelper.handleResponse.call(this, data)

    if (data.success) {
      groupActions.all()
      this.setState({
        group: { name: '' }
      })
    }
  }

  handleFetchedGroups (groups) {
    this.setState({ groups })
    this.props.history.push(`?page=${this.state.page}`)
  }

  fetchUserGroups () {
    groupActions.mineGroups()
  }

  onPreviousPage () {

  }

  onNextPage () {

  }

  createGroup (event) {
    event.preventDefault()
    groupActions.add(this.state.group)
  }

  onCreateGroupChange (event) {
    FormHelper.handleFormChange.call(this, event, 'group')
  }

  showMoreResults () {
    console.log('show more')
  }

  render () {
    return (
      <Col xs={12}>
        <CreateGroupForm
          group={this.state.group}
          onChange={this.onCreateGroupChange.bind(this)}
          onSubmit={this.createGroup.bind(this)}
          error={this.state.error} />
        <Col xs={12}>
          <GroupsList groups={this.state.groups} />
        </Col>
        <ShowMore
          hasMore={this.state.hasMore}
          onShowMore={this.showMoreResults.bind(this)} />
      </Col>
    )
  }
}
