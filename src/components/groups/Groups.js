import React, { Component } from 'react'
import ShowMore from '../common/ShowMore'
import GroupsList from './GroupsList'
import { Col } from 'react-bootstrap'
import groupActions from '../../actions/GroupActions'
import groupStore from '../../stores/GroupStore'
import CreateGroupForm from './CreateGroupForm'
import FormHelper from '../common/FormHelper'
import ResponseHelper from '../common/ResponseHelper'
import toastr from 'toastr'
import SearchForm from '../common/SearchForm'

export default class Groups extends Component {
  constructor (props) {
    super(props)
    let mine = props.match.params.which === 'mine'
    let all = !mine

    this.state = {
      group: {
        name: '',
        tags: '',
        ownerId: ''
      },
      mine,
      all,
      groups: [],
      page: 2,
      hasMore: true,
      fetchMore: true,
      search: '',
      error: ''
    }

    this.handleFetchedGroups = this.handleFetchedGroups.bind(this)
    this.handleGroupAdding = this.handleGroupAdding.bind(this)
    this.handleGroupDeletion = this.handleGroupDeletion.bind(this)

    groupStore.on(
      groupStore.eventTypes.MINE_FETCHED,
      this.handleFetchedGroups
    )

    groupStore.on(
      groupStore.eventTypes.ADDED,
      this.handleGroupAdding
    )

    groupStore.on(
      groupStore.eventTypes.DELETED,
      this.handleGroupDeletion
    )

    groupStore.on(
      groupStore.eventTypes.ALL_FETCHED,
      this.handleFetchedGroups
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

    groupStore.removeListener(
      groupStore.eventTypes.DELETED,
      this.handleGroupDeletion
    )

    groupStore.removeListener(
      groupStore.eventTypes.ALL_FETCHED,
      this.handleFetchedGroups
    )
  }

  componentDidMount () {
    if (this.state.mine) {
      groupActions.mineGroups()
    } else {
      groupActions.all(this.state.search)
    }
  }

  handleGroupDeletion (response) {
    if (response.success) {
      toastr.success(response.message)
    }
  }

  handleGroupAdding (response) {
    ResponseHelper.handleResponse.call(this, response)

    if (response.success) {
      this.setState(prevState => {
        return {
          group: {
            name: '',
            tags: '',
            page: 2,
            fetchMore: false,
            error: ''
          },
          groups: [response.result, ...prevState.groups]
        }
      })
    }
  }

  handleFetchedGroups (fetchedGroups) {
    let hasMore
    if (fetchedGroups) {
      hasMore = true
      if (this.state.fetchMore) {
        this.setState(prevState => {
          return { groups: [...prevState.groups, ...fetchedGroups] }
        })
      } else {
        this.setState({ groups: fetchedGroups })
      }
    }

    if (!fetchedGroups || fetchedGroups.length < 10) {
      hasMore = false
    }

    this.setState({ hasMore })
  }

  createGroup (event) {
    event.preventDefault()
    let group = this.state.group
    let tags = group.tags.match(/#\w+/g) || []

    tags = tags
      .filter(tag => tag.startsWith('#'))
      .map(tag => tag.substring(1))

    groupActions.add({ name: group.name, tags: tags })
  }

  onCreateGroupChange (event) {
    FormHelper.handleFormChange.call(this, event, 'group')
  }

  showMoreResults () {
    let page = this.state.page

    if (this.state.mine) {
      groupActions.mineGroups(page++)
    } else {
      groupActions.all(this.state.search, page++)
    }
    this.setState({ fetchMore: true, page })
  }

  handleGroupClick (groupId, groupName) {
    this.props.history.push(`/groups/${groupId}/quizzes?gn=${groupName}`)
  }

  handleDeleteClick (groupId) {
    groupActions.delete(groupId)
    this.setState(prevState => {
      return {
        groups: prevState.groups.filter(g => g.id !== groupId)
      }
    })
  }

  searchGroups () {
    let search = this.state.search
    if (this.state.search.indexOf('#') > -1) {
      search = this.state.search.replace(/#/g, '*')
    }

    groupActions.all(search)
    this.setState({
      groups: [],
      page: 2,
      hasMore: true
    })
  }

  handleSearchChange (event) {
    FormHelper.handleFormChange.call(this, event, 'search')
  }

  render () {
    return (
      <Col xs={12}>
        <h2 className='center-h'>{this.state.mine ? 'My Groups' : 'All Groups'}</h2>
        {this.state.mine
          ? <CreateGroupForm
            group={this.state.group}
            onChange={this.onCreateGroupChange.bind(this)}
            onSubmit={this.createGroup.bind(this)}
            error={this.state.error} />
          : null
         }
        {this.state.all
          ? <SearchForm
            placeholder={'Search By Name/Tag'}
            search={this.state.search}
            onSubmit={this.searchGroups.bind(this)}
            onChange={this.handleSearchChange.bind(this)} />
          : null
        }
        <Col className='groups-list'>
          <GroupsList
            all={this.state.all}
            groups={this.state.groups}
            onGroupClick={this.handleGroupClick.bind(this)}
            onDeleteClick={this.handleDeleteClick.bind(this)} />
        </Col>
        <Col xs={12}>
          <ShowMore
            hasMore={this.state.hasMore}
            onShowMore={this.showMoreResults.bind(this)} />
        </Col>
      </Col>
    )
  }
}
