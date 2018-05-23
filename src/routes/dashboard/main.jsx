import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'

import Btn from '../../components/button'
import GameSearchModal from './components/game-search-modal'

const StyledDashboard = styled.div`
`

class Dashboard extends React.Component {
  constructor(){
    super()
  }

  render() {
    return(
      <StyledDashboard>
        <h1>Dashboard</h1>
        <Btn text='Play' size='meduim'></Btn>
        <GameSearchModal></GameSearchModal>
      </StyledDashboard>
    )
  }
}

const stateToProps = (state) => {
  return{}
}

const dispatchToProps = (dispatch) => {
  return{}
}

export default connect(stateToProps, dispatchToProps)(Dashboard)
