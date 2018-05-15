import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const Auth = (props) => {
  return(
    <h1>auth0 redirect</h1>
  )
}

const stateToProps = state => {
  return {}
}

const dispatchToProps = dispatch => {
  return {}
}
export default connect(stateToProps, dispatchToProps)(Auth)
