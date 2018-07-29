import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { NavBtnPrimary, NavBtnSecondary } from './button'
import * as actions from '../redux/actions'
import { withRouter, Link} from 'react-router-dom'
import { lock } from '../repository/user-repository'

const StyledBtnContainer = styled.div`
display: flex;
padding: 0 20px;
>div {
  margin: 0 20px;
}
`

const StyledNavbar = styled.div`
position: absolute;
z-index: 1000;
display: flex;
align-items: center;
justify-content: space-between;
height: 100px;
width: 100%;

@media (max-width: 950px) {
  ${StyledBtnContainer} {
    display: none;
  }
}
`


const Logo = styled.a`
color: white;
font-size: 200%;
margin: 0 20px;
font-family: 'Bad Script'
`

class Navbar extends React.Component {

  constructor() {
    super()
    this.handleLogin = this.handleLogin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleDashboard = this.handleDashboard.bind(this)

    this.state = {
      loggedIn: false
    }

  }

  handleLogin() {
    lock.show()
  }

  handleSignup() {
    lock.show()
  }

  handleLogout() {
    this.props.updateUserProfile(null)
  }

  handleDashboard() {
    this.props.history.push('/dashboard')
  }

  render() {
    let user = this.props.user

    return (
      <StyledNavbar>
        <Link to='/'>
          <Logo>
          Chess Battles
          </Logo>
        </Link>

        {!user
          ? <StyledBtnContainer>
            <NavBtnSecondary onClick={this.handleLogin}>Login</NavBtnSecondary>
            <NavBtnPrimary onClick={() => console.log('sign up')}>Sign up</NavBtnPrimary>
          </StyledBtnContainer>
          : <StyledBtnContainer>
            <NavBtnPrimary onClick={this.handleDashboard}>Dashboard</NavBtnPrimary>
            <NavBtnSecondary onClick={this.handleLogout}>Logout</NavBtnSecondary>
          </StyledBtnContainer>
        }

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

export default withRouter(connect(stateToProps, dispatchToProps)(Navbar))
