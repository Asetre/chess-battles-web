//Router
import { BrowserRouter as Router, Route, Switch, IndexRoute} from 'react-router-dom'
import React, { Component } from 'react'

//Global components
import Navbar from '../components/navbar'

//routes
import LandingPage from './landing/main'
import auth0Redirect from './auth0-redirect/main'

export default function AppRouter() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/callback' component={auth0Redirect}
      </div>
    </Router>
  )
}
