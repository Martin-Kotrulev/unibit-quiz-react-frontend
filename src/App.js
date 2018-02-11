import React, { Component } from 'react'
import './App.css'
import './Datetime.css'
import Navbar from './components/common/Navbar'
import Routes from './components/common/Routes'
import toastr from 'toastr'

toastr.options.positionClass = 'toast-bottom-center'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

export default App
