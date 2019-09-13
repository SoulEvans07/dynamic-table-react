import React, { Component } from 'react'
import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.props.store.subscribe(() => this.forceUpdate())

    // this.props.store.dispatch(fetch())
  }

  state = {}

  render() {
    return (
      <div className="app">
        <div className="header">
          <h1>Dynamic Table</h1>
        </div>
        <div className="content">
         
        </div>
      </div>
    )
  }
}

export default App;
