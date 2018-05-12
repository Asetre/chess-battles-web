import React, { Component } from 'react'
import './App.css'
import styled, {injectGlobal} from 'styled-components'

//Redux
import reducer from './redux/reducers'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

//routes
import AppRouter from './routes/router'

var store = createStore(reducer)

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
    );
  }
}
export default App;
