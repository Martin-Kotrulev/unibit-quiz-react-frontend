import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Login from '../users/Login'
import Register from '../users/Register'
import PrivateRoute from './PrivateRoute'
import Logout from '../users/Logout'
import Groups from '../groups/Groups'
import Quizzes from '../quizzes/Quizzes'
import Quiz from '../quizzes/Quiz'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/users/login' component={Login} />
    <Route path='/users/register' component={Register} />
    <Route path='/groups/all' exact component={Groups} />
    <Route path='/groups/:groupId/quizzes' exact component={Quizzes} />
    <Route path='/quizzes/all' exact component={Quizzes} />
    <PrivateRoute path='/users/logout' component={Logout} />
    <PrivateRoute path='/groups/:which' exact component={Groups} />
    <PrivateRoute path='/quizzes/:which' exact component={Quizzes} />
    <PrivateRoute path='/quizzes/:id/:quizName' exact component={Quiz} />
  </Switch>
)

export default Routes
