import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Btn from './button'
import Auth0Lock from 'auth0-lock'
import axios from 'axios'
import {serverUrl} from '../config'

const lock = new Auth0Lock(
  'M1pfmr2L43kkkgA4wo7R1y26EsPhahAd',
  'paul-asetre.auth0.com'
)

lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function(err, profile) {
    if (err) {
      console.log(err)
      return;
    }

    if (profile.sub) {
      axios.get(`${serverUrl}/users/login/${profile.sub}/${profile.nickname}`)
      .then((res) => {
        if(res.status !== 200) throw 'Failed to get user profile'

        console.log(res)

        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('profile', JSON.stringify(profile));
      })
    }

  });
});

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
  }

  handleLogin() {
    lock.show()
  }

  handleSignup() {
    lock.show()
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
