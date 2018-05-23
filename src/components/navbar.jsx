import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Auth from '../auth0.js'
import Btn from './button'

const StyledNavbar = styled.div`
display: flex;
align-items: center;
`

const Logo = styled.a`
color: red;
font-size: 200%;
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

        <Btn text='test' size='nav' onClick={this.handleLogin}></Btn>
      </StyledNavbar>
    )
  }
}

const stateToProps = state => {
  return {
    user: state.user
  }
}

const dispatchToProps = dispatch => {
  return {}
}

export default connect(stateToProps, dispatchToProps)(Navbar)
