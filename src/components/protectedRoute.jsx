import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

const isAuthenticated = (user) => {
  //add error handling for json parse
  let expiresAt = localStorage.getItem('expiresAt')
  let accessToken = localStorage.getItem('accessToken')

  let tokenNotExpired =  new Date().getTime() < expiresAt
  let accessTokenAvailable = accessToken

  if(tokenNotExpired && accessTokenAvailable && user) return true
  else return false
}

const ProtectedRoute = (props) => {
  if(props.component) {
    return(
      React.cloneElement(props.component)
    )
  }else return null
}

/*
const ProtectedRoute = ({component: Component, ...rest}) => {
  if(rest.user) {
    return(
      <Route {...rest} render={(props) => {
        return(
          isAuthenticated(rest.user)
            ? <Component {...props}/>
            : <Redirect to='/' />
        )
      }}/>
    )
  }else return null
}
*/

const stateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(stateToProps)(ProtectedRoute)
