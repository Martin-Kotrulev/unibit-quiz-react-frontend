import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import Login from '../users/Login'
import Register from '../users/Register'
import PrivateRoute from './PrivateRoute'
import Logout from '../users/Logout'
import UserGroups from '../groups/UserGroups'

const Routes = () => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/users/login' component={Login} />
    <Route path='/users/register' component={Register} />
    <PrivateRoute path='/users/logout' component={Logout} />
    <PrivateRoute path='/groups/mine' component={UserGroups} />
  </Switch>
)

export default Routes
