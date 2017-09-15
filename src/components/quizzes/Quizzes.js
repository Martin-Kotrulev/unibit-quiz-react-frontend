import React, { Component } from 'react'
import ShowMore from '../common/ShowMore'
import { Col } from 'react-bootstrap'
import quizActions from '../../actions/QuizActions'
import quizStore from '../../stores/QuizStore'
import groupActions from '../../actions/GroupActions'
import groupStore from '../../stores/GroupStore'
import CreateQuizForm from './CreateQuizForm'
import QuizzesList from './QuizzesList'
import FormHelper from '../common/FormHelper'
import ResponseHelper from '../common/ResponseHelper'
import toastr from 'toastr'
import SearchForm from '../common/SearchForm'
import Auth from '../../Auth'
import queryString from 'query-string'

export default class UserQuizzes extends Component {
  constructor (props) {
    super(props)
    let groupId = props.match.params.groupId
    let mine = props.match.params.which === 'mine'
    let all = !mine
    let query = queryString.parse(props.location.search)
    let groupName = query.gn

    this.state = {
      quiz: {
        title: '',
        tags: ''
      },
      groupId,
      groupName,
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
  }

  componentWillReceiveProps (nextProps) {
    let groupId = nextProps.match.params.groupId
    let mine = nextProps.match.params.which === 'mine'
    let all = !mine
    let query = queryString.parse(nextProps.location.search)
    let groupName = query.gn

    this.setState({
      groupId,
      mine,
      all,
      query,
      groupName
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
            title: '',
            tags: '',
            page: 2,
            fetchMore: false,
            error: ''
          },
          quizzes: [response.result, ...prevState.quizzes]
        }
      })
    }
  }

  handleFetchedQuizzes (response) {
    let hasMore
    let fetchedQuizzes = response.quizzes || response
    let mine = response.creatorId === Auth.getUserId() || this.state.mine

    this.setState({ mine, all: !mine })

    if (fetchedQuizzes) {
      hasMore = true

      if (this.state.fetchMore) {
        this.setState(prevState => {
          return { quizzes: [...prevState.quizzes, ...fetchedQuizzes] }
        })
      } else {
        this.setState({ quizzes: fetchedQuizzes })
      }
    }

    if (!fetchedQuizzes || fetchedQuizzes.length < 10) {
      hasMore = false
    }

    this.setState({ hasMore })
  }

  createQuiz (event) {
    event.preventDefault()
    let quiz = this.state.quiz
    let tags = quiz.tags.match(/#\w+/g) || []

    tags = tags
      .filter(tag => tag.startsWith('#'))
      .map(tag => tag.substring(1))

    quiz = { title: quiz.title, tags: tags }

    if (this.state.groupId) {
      quiz.groupId = this.state.groupId
    }

    quizActions.addQuiz(quiz)
  }

  onCreateQuizChange (event) {
    FormHelper.handleFormChange.call(this, event, 'quiz')
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
        this.props.history.push(`/quizzes/${quiz.id}/${quiz.title}`)
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
    this.props.history.push(`/quizzes/${quiz.id}/${quiz.title}`)
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
        <h2 className='center-h'>{this.state.groupName ? `Quizzes for Group: '${this.state.groupName}'` : mainLabel}</h2>
        {this.state.mine
          ? <CreateQuizForm
            quiz={this.state.quiz}
            onChange={this.onCreateQuizChange.bind(this)}
            onSubmit={this.createQuiz.bind(this)}
            error={this.state.error} />
          : null
        }
        {this.state.all
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
