import React, { Component } from 'react'
import ShowMore from '../common/ShowMore'
import { Col } from 'react-bootstrap'
import toastr from 'toastr'
import queryString from 'query-string'

import quizActions from '../../actions/QuizActions'
import quizStore from '../../stores/QuizStore'
import groupActions from '../../actions/GroupActions'
import groupStore from '../../stores/GroupStore'
import CreateQuizForm from './CreateQuizForm'
import QuizzesList from './QuizzesList'
import FormHelper from '../common/FormHelper'
import ResponseHelper from '../common/ResponseHelper'
import SearchForm from '../common/SearchForm'
import Auth from '../../Auth'

export default class Quizzes extends Component {
  constructor (props) {
    super(props)
    let groupId = parseInt(props.match.params.groupId, 10)
    let mine = props.match.path.endsWith('mine')
    let all = !mine

    this.state = {
      quiz: {
        name: '',
        tags: '',
        starts: '',
        ends: '',
        once: false,
        password: '',
        locked: false
      },
      group: {},
      groupId,
      all,
      mine,
      search: '',
      quizzes: [],
      page: 2,
      hasMore: false,
      fetchMore: true,
      error: ''
    }

    this.handleFetchedQuizzes = this.handleFetchedQuizzes.bind(this)
    this.handleQuizAdding = this.handleQuizAdding.bind(this)
    this.handleQuizDeletion = this.handleQuizDeletion.bind(this)
    this.handleQuizEntrance = this.handleQuizEntrance.bind(this)

    quizStore.on(
      quizStore.eventTypes.QUIZ_ADDED,
      this.handleQuizAdding
    )

    quizStore.on(
      quizStore.eventTypes.ALL_FETCHED,
      this.handleFetchedQuizzes
    )

    quizStore.on(
      quizStore.eventTypes.DELETED,
      this.handleQuizDeletion
    )

    quizStore.on(
      quizStore.eventTypes.MINE_FETCHED,
      this.handleFetchedQuizzes
    )

    groupStore.on(
      groupStore.eventTypes.ALL_QUIZZES_FETCHED,
      this.handleFetchedQuizzes
    )

    quizStore.on(
      quizStore.eventTypes.ENTERED,
      this.handleQuizEntrance
    )
  }

  componentWillReceiveProps (nextProps) {
    console.log('props', nextProps)
    let groupId = nextProps.match.params.groupId
    let mine = nextProps.match.path.endsWith('mine')
    let all = !mine
    let query = queryString.parse(nextProps.location.search)

    console.log('mine', mine)

    this.setState({
      groupId,
      mine,
      all,
      query
    })
  }

  componentWillUnmount () {
    quizStore.removeListener(
      quizStore.eventTypes.QUIZ_ADDED,
      this.handleQuizAdding
    )

    quizStore.removeListener(
      quizStore.eventTypes.ALL_FETCHED,
      this.handleFetchedQuizzes
    )

    quizStore.removeListener(
      quizStore.eventTypes.DELETED,
      this.handleQuizDeletion
    )

    quizStore.removeListener(
      quizStore.eventTypes.MINE_FETCHED,
      this.handleFetchedQuizzes
    )

    groupStore.removeListener(
      groupStore.eventTypes.ALL_QUIZZES_FETCHED,
      this.handleFetchedQuizzes
    )

    quizStore.removeListener(
      quizStore.eventTypes.ENTERED,
      this.handleQuizEntrance
    )
  }

  componentWillMount () {
    if (this.state.groupId) {
      groupActions.allQuizzes(this.state.groupId)
    } else if (this.state.mine) {
      quizActions.mine()
    } else {
      quizActions.all(this.state.search)
    }
  }

  handleQuizEntrance (response) {
    console.log(response)
    if (response.success) {
      toastr.success(response.message)
    } else {
      toastr.error(response.message)
    }
  }

  handleQuizDeletion (response) {
    if (response.success) {
      toastr.success(response.message)
    }
  }

  handleQuizAdding (response) {
    ResponseHelper.handleResponse.call(this, response)

    if (response.success) {
      this.setState(prevState => {
        return {
          quiz: {
            name: '',
            tags: '',
            starts: null,
            ends: null,
            once: false,
            password: null,
            locked: false
          },
          page: 2,
          error: '',
          fetchMore: false,
          quizzes: [response.result, ...prevState.quizzes]
        }
      })
    }
  }

  handleFetchedQuizzes (response) {
    let hasMore = false
    let fetchedQuizzes = response.result || response
    let mine = (response.group &&
      response.group.creatorId === Auth.getUserId()) ||
      this.state.mine

    this.setState({ mine, all: !mine, group: response.group })

    if (fetchedQuizzes) {
      if (fetchedQuizzes.length === 10) {
        hasMore = true
      }

      if (this.state.fetchMore) {
        this.setState(prevState => {
          return { quizzes: [...prevState.quizzes, ...fetchedQuizzes], hasMore }
        })
      } else {
        this.setState({ quizzes: fetchedQuizzes, hasMore })
      }
    }
  }

  createQuiz (event) {
    event.preventDefault()
    let quiz = this.state.quiz
    let tags = quiz.tags.match(/#\w+/g) || []

    if (!quiz.name) {
      this.setState({error: 'Quiz name is required'})
      return
    }

    tags = tags
      .filter(tag => tag.startsWith('#'))
      .map(tag => tag.substring(1))

    quiz = { name: quiz.name, tags: tags }

    if (this.state.groupId) {
      groupActions.addQuizToGroup(this.state.groupId, quiz)
    } else {
      quizActions.addQuiz(quiz)
    }
  }

  onCreateQuizChange (event) {
    FormHelper.handleFormChange.call(this, event, 'quiz')
    console.log(this.state.quiz.locked)
  }

  showMoreResults () {
    let page = this.state.page

    if (this.state.quizId) {
      groupActions.allQuizzes(this.state.quizId, page++)
    } else if (this.state.mine) {
      quizActions.mine(page++)
    } else {
      quizActions.all(this.state.search, page++)
    }
    this.setState({ fetchMore: true, page })
  }

  handleQuizClick (quiz) {
    // Add validation
    if (quiz.creatorId === Auth.getUserId()) {
      window.alert('You can\'t enter your own quiz.')
    } else {
      let enter = window.confirm('Enter this quiz?')

      if (enter) {
        quizActions.enterQuiz(quiz.id)
      }
    }
  }

  handleDeleteClick (quizId) {
    quizActions.delete(quizId)
    this.setState(prevState => {
      return {
        quizzes: prevState.quizzes.filter(q => q.id !== quizId)
      }
    })
  }

  handleEditClick (quiz) {
    this.props.history.push({
      pathname: `/quizzes/${quiz.id}`,
      state: { quiz }
    })
  }

  searchQuizzes () {
    let search = this.state.search
    if (this.state.search.indexOf('#') > -1) {
      search = this.state.search.replace(/#/g, '*')
    }

    quizActions.all(search)
    this.setState({
      quizzes: [],
      page: 2,
      hasMore: true
    })
  }

  handleSearchChange (event) {
    FormHelper.handleFormChange.call(this, event, 'search')
  }

  render () {
    let mainLabel = this.state.mine ? 'My quizzes' : 'All Quizzes'
    return (
      <Col xs={12}>
        <h2 className='center-h'>{this.state.groupId ? `Quizzes for Group: '${this.state.group.name || ''}'` : mainLabel}</h2>
        {this.state.mine
          ? <CreateQuizForm
            quiz={this.state.quiz}
            onChange={this.onCreateQuizChange.bind(this)}
            onSubmit={this.createQuiz.bind(this)}
            error={this.state.error} />
          : null
        }
        {this.state.all && !this.state.groupId
          ? <SearchForm
            placeholder={'Search By Title/Tag'}
            search={this.state.search}
            onSubmit={this.searchQuizzes.bind(this)}
            onChange={this.handleSearchChange.bind(this)} />
          : null
        }
        <Col xs={12} className='quizzes-list'>
          <QuizzesList
            onEditClick={this.handleEditClick.bind(this)}
            quizzes={this.state.quizzes}
            onQuizClick={this.handleQuizClick.bind(this)}
            onDeleteClick={this.handleDeleteClick.bind(this)} />
        </Col>
        <ShowMore
          hasMore={this.state.hasMore}
          onShowMore={this.showMoreResults.bind(this)} />
      </Col>
    )
  }
}
