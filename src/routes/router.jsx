//Router
import { BrowserRouter as Router, Route, Switch, IndexRoute} from 'react-router-dom'
import React, { Component } from 'react'

//Global components
import Navbar from '../components/navbar'
import ProtectedRoute from '../components/protectedRoute'

//routes
import LandingPage from './landing/main'
import HandleAuth from './auth0-redirect/main'

const TestComponent = () => {
  return(
    <h1>Test Component</h1>
  )
}

export default function AppRouter() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={LandingPage} />
        <Route path='/callback' component={HandleAuth} />
        <ProtectedRoute path='/test' component={LandingPage} />
      </div>
    </Router>
  )
}
