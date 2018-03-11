import React, { Component } from 'react'
import './App.css'
import styled, {injectGlobal} from 'styled-components'

//Router
import { BrowserRouter as Router, Route, Switch, IndexRoute} from 'react-router-dom'

//Components
import Navbar from './components/navbar'
import LandingPage from './components/landing'

//Redux
import reducer from './reducers'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

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
                <Router>
                    <div className="App">
                        <Navbar />
                        <Route exact path='/' component={LandingPage} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
