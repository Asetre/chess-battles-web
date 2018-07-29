import React, { Component } from 'react'
import './App.css'
import styled, {injectGlobal} from 'styled-components'
import {store} from './redux/store'
import {Provider} from 'react-redux'
import AppRouter from './routes/router'

//Global styles
injectGlobal`
@font-face {
  font-family: 'Butler';
  src: url('./assets/Butler/Butler_Black.otf');
}
`
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
