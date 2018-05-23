import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'
import firebase from 'firebase'

//components
import GameBoard from '../../gameComponents/game-board'

const StyledBoard = styled.div`
`
class Game extends React.Component {
  constructor({match}) {
    super()
    this.gameID = match.params.gameID
    console.log(this.gameID)
  }

  componentDidMount() {
    this.database = firebase.database()
    this.gameRef = this.database.ref()
  }

  componentWillUnmount() {
    //remove listeners
  }

  render() {
    return (
      <GameBoard />
    )
  }
}

const stateToProps = state => {
  return {
    user: state.user
  }
}

const dispatchToProps = dispatch => {
  return {
  }
}

export default connect(stateToProps, dispatchToProps)(Game)
