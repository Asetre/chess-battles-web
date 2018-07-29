import React from 'react'
import {connect} from 'react-redux'
import {StyledGameBoard} from './styles'

// components
import GameBoard from './components/game-board'

class Game extends React.Component {
  constructor ({match}) {
    super()

    this.gameID = match.params.gameID
  }


  render () {
    return (
      <StyledGameBoard>
        <div className="board-container">
          <GameBoard gameID={this.gameID}/>
        </div>
      </StyledGameBoard>
    )
  }
}

const stateToProps = state => {
  return {}
}

const dispatchToProps = dispatch => {
  return {
  }
}

export default connect(stateToProps, dispatchToProps)(Game)
