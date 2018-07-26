import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'

import GameSearchModal from './components/game-search-modal'

const StyledDashboard = styled.div`
box-sizing: border-box;
display: grid;
width: 100%;
height: 100vh;
background: linear-gradient(#555555, #222222);
padding: 100px 50px;

h2 {
  color: white;
  font-family: Butler;
  font-weight: lighter;
}
`

class Dashboard extends React.Component {

  render() {
    return(
      <StyledDashboard>
        <h2>{this.props.user ? this.props.user.username : null}</h2>
      </StyledDashboard>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.user
  }
}

const dispatchToProps = (dispatch) => {
  return{}
}

export default connect(stateToProps, dispatchToProps)(Dashboard)
