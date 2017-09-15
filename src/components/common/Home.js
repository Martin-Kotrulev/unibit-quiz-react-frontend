import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class Home extends Component {
  render () {
    return (
      <Col sm={8} smOffset={2} xs={8} className='home'>
        <h1>Welcome to UniQuizBit!</h1>
        <h3>Author: Martin Kotrulev, 2017</h3>
        <p>This is a simple app that aims to expand your knowledge in a fun way.</p>
      </Col>
    )
  }
}
