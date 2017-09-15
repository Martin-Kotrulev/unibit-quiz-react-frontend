import React, { Component } from 'react'
import Auth from '../../Auth'
import { Navbar, Nav, NavDropdown, Glyphicon } from 'react-bootstrap'
import RouteNavItem from './RouteNavItem'
import BrandLink from './BrandLink'

export default class AppNavbar extends Component {
  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <BrandLink to='/'>UniQuizBit</BrandLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <RouteNavItem to='/'>Home</RouteNavItem>
          </Nav>
          {Auth.isAuthenticated() ? (
            <Nav>
              <RouteNavItem to='/groups/all'>Groups</RouteNavItem>
              <RouteNavItem to='/quizzes/all'>Quizzes</RouteNavItem>
            </Nav>
              ) : (
                null
              )}
          {Auth.isAuthenticated() ? (
            <Nav pullRight>
              <NavDropdown id='user-drop' title={Auth.getUser()} >
                <RouteNavItem to='/groups/mine'>
                  My Groups
                </RouteNavItem>
                <RouteNavItem to='/quizzes/mine'>
                  My Quizzes
                </RouteNavItem>
              </NavDropdown>
              <RouteNavItem to='/users/logout'><Glyphicon glyph='log-in' /> Logout</RouteNavItem>
            </Nav>
            ) : (
              <Nav pullRight>
                <RouteNavItem to='/users/login'><Glyphicon glyph='user' /> Login</RouteNavItem>
                <RouteNavItem to='/users/register'><Glyphicon glyph='log-in' /> Register</RouteNavItem>
              </Nav>
            )}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
