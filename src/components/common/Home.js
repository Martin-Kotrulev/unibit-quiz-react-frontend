import React, { Component } from 'react'
import { Col } from 'react-bootstrap'

export default class Home extends Component {
  render () {
    return (
      <div className='home'>
        <Col xs={12} sm={8} smOffset={2}>
          <h2>Welcome to</h2>
          <h1>UniQuizBit!</h1>
        </Col>
        <Col xs={8} xsOffset={2}>
          <h3>Author: Martin Kotrulev, 2017</h3>
          <p>This is a simple app that aims to expand your knowledge in a fun way.</p>
        </Col>
      </div>
    )
  }
}
