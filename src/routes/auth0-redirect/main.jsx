import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import Auth from '../../auth0.js'

const auth = new Auth()

const HandleAuth = (props) => {
  return authenticationHandler(props)
}

const authenticationHandler = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
    return auth.getProfile()
    .then(profile => {
      if(profile && auth.isAuthenticated()) {
        //grab userprofile from db
        return <Redirect to='/' />
      }
    })
    .catch(err => {
      console.log(err)
      return <Redirect to ='/' />
    })
  }else {
    return <Redirect to ='/' />
  }
}

const stateToProps = state => {
  return {}
}

const dispatchToProps = dispatch => {
  return {}
}
export default connect(stateToProps, dispatchToProps)(HandleAuth)
