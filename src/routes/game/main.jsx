import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'
import firebase from 'firebase'

// components
import GameBoard from '../../gameComponents/game-board'

const StyledBoard = styled.div`
`
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
      <GameBoard gameID={this.gameID}/>
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
