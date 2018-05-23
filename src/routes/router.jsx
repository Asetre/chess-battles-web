//Router
import { BrowserRouter as Router, Route, Switch, IndexRoute} from 'react-router-dom'
import React, { Component } from 'react'

//Global components
import Navbar from '../components/navbar'
import ProtectedRoute from '../components/protectedRoute'

//routes
import Dashboard from './dashboard/main'
import Game from './game/main'
import HandleAuth from './auth0-redirect/main'
import LandingPage from './landing/main'

export default function AppRouter() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={LandingPage} />
        <Route path='/callback' component={HandleAuth} />
        <ProtectedRoute path='/dashboard' component={Dashboard}></ProtectedRoute>
        <ProtectedRoute path='/game/:gameID' component={Game}></ProtectedRoute>
      </div>
    </Router>
  )
}
