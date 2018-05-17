import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Auth from '../../auth0.js'

const auth = new Auth()

const HandleAuth = (props) => {
  return authenticationHandler(props)
}

const authenticationHandler = (nextState, replace) => {
  console.log(nextState)
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }

  if(auth.isAuthenticated()) {
    return <Redirect to='/' />
  }else {
    return(
      <h1>Failed auth</h1>
    )
  }
}

const stateToProps = state => {
  return {}
}

const dispatchToProps = dispatch => {
  return {}
}
export default connect(stateToProps, dispatchToProps)(HandleAuth)
