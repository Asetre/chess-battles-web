import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Btn from './button'
import Auth0Lock from 'auth0-lock'
import axios from 'axios'
import { serverUrl } from '../config'
import * as actions from '../redux/actions'

const lockOptions = {
  autoclose: true,
  auth: {
    redirect: false
  }
}

const StyledNavbar = styled.div`
display: flex;
align-items: center;
`

const Logo = styled.a`
color: red;
font-size: 200%;
`

const lock = new Auth0Lock(
  'M1pfmr2L43kkkgA4wo7R1y26EsPhahAd',
  'paul-asetre.auth0.com',
  lockOptions
)
class Navbar extends React.Component {

  constructor(props) {
    super()
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.persistUserSession = this.persistUserSession.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)

    if(this.persistUserSession()) return

    let self = this

    lock.on("authenticated", function (authResult) {
      self.getUserInfo(authResult.accessToken, authResult.expiresIn)
    });
  }

  persistUserSession() {
    let accessToken = localStorage.getItem('accessToken')
    let expiresAt = JSON.parse(localStorage.getItem('expiresAt'))

    if(expiresAt > new Date().getTime()) {
      this.getUserInfo(accessToken, expiresAt)
      return true
    }
    return false
  }

  getUserInfo(accessToken, expiresIn) {
    // Use the token in authResult to getUserInfo() and save it to localStorage
    let self = this
    lock.getUserInfo(accessToken, function (err, profile) {
      if (err) {
        console.log(err)
        return;
      }

      if (profile.sub) {
        axios.get(`${serverUrl}/users/login/${profile.sub}/${profile.nickname}`)
          .then((res) => {
            if (res.status !== 200) throw 'Failed to get user profile'
            const userProfile = res.data

            if(expiresIn) {
            var expiresAt = JSON.stringify((expiresIn * 1000) + new Date().getTime());
            }else {
              var expiresAt = expiresIn
            }

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('expiresAt', expiresAt)

            self.props.updateUserProfile(userProfile)
          })
          .catch((err) => {
            console.log(err)
          })
      }

    });
  }

  handleLogin() {
    lock.show()
  }

  handleSignup() {
    lock.show()
  }

  render() {
    return (
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

const dispatchToProps = (dispatch) => {
  return {
    updateUserProfile: (data) => {
      dispatch(actions.updateUserProfile(data))
    }
  }
}

export default connect(stateToProps, dispatchToProps)(Navbar)
