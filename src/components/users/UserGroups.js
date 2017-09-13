import React, { Component } from 'react'
import GroupsList from '../common/GroupsList'
import { Col } from 'react-bootstrap'
import Pager from '../common/Pager'
import queryString from 'query-string'
import groupActions from '../../actions/GroupActions'
import groupStore from '../../stores/GroupStore'

export default class UserGroups extends Component {
  constructor (props) {
    super(props)
    const query = queryString.parse(this.props.location.search)
    const page = parseInt(query.page)

    this.state = {
      groups: [],
      page
    }

    this.handleFetchedGroups = this.handleFetchedGroups.bind(this)
    this.fetchUserGroups = this.fetchUserGroups.bind(this)

    groupStore.on(
      groupStore.eventTypes.MINE_FETCHED,
      this.handleFetchedGroups
    )
  }

  componentWillUnmount () {
    groupStore.removeListener(
      groupStore.eventTypes.MINE_FETCHED,
      this.handleFetchedGroups
    )
  }

  componentWillMount () {
    groupActions.mineGroups()
  }

  handleFetchedGroups (groups) {
    this.setState({ groups })
  }

  fetchUserGroups () {
    groupActions.mineGroups()
  }

  onPreviousPage () {

  }

  onNextPage () {

  }

  render () {
    return (
      <Col sm={6} smOffset={3} xs={8} xsOffset={2}>
        <Pager
          listSize={this.state.groups.length}
          page={this.state.page}
          onPrevious={this.onPreviousPage.bind(this)}
          onNext={this.onNextPage.bind(this)} />
        <GroupsList groups={this.state.groups} />
      </Col>
    )
  }
}
