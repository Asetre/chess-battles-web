import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const isAuthenticated = (user) => {
  //add error handling for json parse
  const expiresAt = localStorage.getItem('expiresAt')
  const accessToken = localStorage.getItem('accessToken')

  const tokenNotExpired =  new Date().getTime() < expiresAt
  const accessTokenAvailable = accessToken

  if(tokenNotExpired && accessTokenAvailable) {
    return true
  }
  return false
}

const ProtectedRoute = ({component: Component, ...rest}) => {
  if(isAuthenticated(rest.user)) {
    return(
      <Route {...rest} render={props => {
        return(
          <Component {...props} />
        )
      }}/>
    )
  }else {
    return <Redirect to='/'/>
  }
}

const stateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(stateToProps)(ProtectedRoute)
