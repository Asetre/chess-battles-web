import React, { Component } from 'react'
import './App.css'
import {store} from './redux/store'
import {Provider} from 'react-redux'
import AppRouter from './routes/router'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    )
  }
}
export default App
