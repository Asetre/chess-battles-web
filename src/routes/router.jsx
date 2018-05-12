//Router
import { BrowserRouter as Router, Route, Switch, IndexRoute} from 'react-router-dom'
import React, { Component } from 'react'

//Global components
import Navbar from '../components/navbar'

//routes
import LandingPage from './landing/main'

export default function AppRouter() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={LandingPage} />
      </div>
    </Router>
  )
}
