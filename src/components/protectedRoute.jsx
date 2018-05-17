import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import Auth from '../auth0'

const auth = new Auth()

const ProtectedRoute = ({component: Component, ...rest}) => {
  if(isAuthenticated) {
    return(
      <Route {...rest} render={props => {
        return(
          <Component {...props} />
        )
      }}/>
    )
  }else {
    <Redirect to='/'/>
  }
}

export default ProtectedRoute
