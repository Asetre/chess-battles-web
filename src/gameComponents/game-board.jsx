import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Chess, * as Engine from '../chessEngine/chess_engine'

import Board from './board'

const StyledGameBoard = styled.div`
`

class GameBoard extends React.Component {
  constructor(props) {
    super()
    this.config = {
      reversed: false,
      demo: false
    }

    Chess.resetBoard()
    Chess.setUpGame('Mercenary', 'Crusader')
  }

  render() {
    return (
      <StyledGameBoard>
        <Board {...this.config}/>
      </StyledGameBoard>
    )
  }
}

export default connect()(GameBoard)
