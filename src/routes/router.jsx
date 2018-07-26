//Router
import { BrowserRouter as Router, Route, Switch, IndexRoute} from 'react-router-dom'
import React, { Component } from 'react'

//Global components
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import ProtectedRoute from '../components/protectedRoute'

//routes
import Dashboard from './dashboard/main'
import Game from './game/main'
import LandingPage from './landing/main'

export default function AppRouter() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path='/' component={LandingPage} />
        <ProtectedRoute path='/dashboard' component={Dashboard}></ProtectedRoute>
        <ProtectedRoute path='/game/:gameID' component={Game}></ProtectedRoute>
        <Footer />
      </div>
    </Router>
  )
}
