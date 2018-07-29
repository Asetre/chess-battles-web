import React from 'react'
import {connect} from 'react-redux'

// components
import GameBoard from './components/game-board'

class Game extends React.Component {
  constructor ({match}) {
    super()

    this.gameID = match.params.gameID
  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <div className="board-container">
        <GameBoard gameID={this.gameID}/>
      </div>
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
