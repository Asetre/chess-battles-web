import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import Chess, * as Engine from '../chessEngine/chess_engine'
import * as actions from '../redux/actions'

//components
import Board from './board'
import DemoInfo from './demo_info'


const StyledDemo = styled.div`
`
const Demo = props => {
  //Initialize chess board
  Chess.setUpGame('Mercenary', 'Crusader')

  const config = {
    reversed: false,
    demo: true
  }
  return(
    <StyledDemo>
      <Board {...config}/>
      <DemoInfo></DemoInfo>
    </StyledDemo>
  )
}

const stateToProps = state => {
  return {
  }
}

const dispatchToProps = dispatch => {
  return {
  }
}

export default connect(stateToProps, dispatchToProps)(Demo)
