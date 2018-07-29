//Router
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import React from 'react'
import {connect} from 'react-redux'
import * as actions from '../redux/actions'
import * as UserRepository from '../repository/user-repository'

//Global components
import Navbar from '../components/navbar'
import Footer from '../components/footer'

//routes
import Dashboard from './dashboard/main'
import Game from './game/main'
import LandingPage from './landing/main'

class AppRouter extends React.PureComponent {
  constructor() {
    super()
    this.protectedRoute = this.protectedRoute.bind(this)
  }

  componentDidMount() {
    const updateUserProfile = this.props.updateUserProfile
    UserRepository.initAuthListener(updateUserProfile)

    if(!this.props.user) {
      UserRepository.persistUserSession(updateUserProfile)
    }
  }

  protectedRoute(Component, props) {
    let user = this.props.user
    return user
      ? <Component {...props} />
      : <Redirect to='/' />
  }

  render() {
    const ProtectedRoute = this.protectedRoute

    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/dashboard' render={(props) => ProtectedRoute(Dashboard, props)} />
          <Route exact path='/game/:gameID' render={(props) => ProtectedRoute(Game, props)} />
          <Footer />
        </div>
      </Router>
    )
  }
}

const stateToProps = (state) => {
  return {user: state.user}
}

const dispatchToProps = (dispatch) => {
  return {
    updateUserProfile: (data) => {
      dispatch(actions.updateUserProfile(data))
    }
  }
}

export default connect(stateToProps, dispatchToProps)(AppRouter)