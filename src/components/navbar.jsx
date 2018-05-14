import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Auth from '../auth0.js'

const StyledNavbar = styled.div`
color: red;
font-size: 200%;
`

const Logo = styled.a`
`

const Button = styled.button`
width: 145px;
height: 30px;
`

class Navbar extends React.Component {
  constructor() {
    super()
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.auth = new Auth()
  }

  handleLogin() {
    this.auth.login()
  }

  handleSignup() {
    this.auth.login()
  }

  render() {
    return(
      <StyledNavbar>
      <Logo>
      Chess Battles
      </Logo>

      <Button onClick={this.handleSignup}>Signup</Button>
      <Button onClick={this.handleLogin}>Login</Button>
      </StyledNavbar>
    )
  }
}

var stateToProps = state => {
  return {}
}

var dispatchToProps = dispatch => {
  return {}
}

export default connect(stateToProps, dispatchToProps)(Navbar)
