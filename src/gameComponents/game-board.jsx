import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Chess, * as Engine from '../chessEngine/chess_engine'
import firebase from 'firebase'

import Board from './board'

const StyledGameBoard = styled.div`
`

const database = firebase.database()

class GameBoard extends React.Component {
  constructor(props) {
    super()

    this.setupEventListeners = this.setupEventListeners.bind(this)
    this.handleBoardChange = this.handleBoardChange.bind(this)

    this.config = {
      reversed: false,
      demo: false
    }

    this.state = {
      gameID: props.gameID,
      boardState: Chess.board,
      turn: 1,
      totalMoves: 0,
    }

    Chess.resetBoard()
    Chess.setUpGame('Mercenary', 'Crusader')

    this.setupEventListeners()
    this.handleBoardChange()
  }

  setupEventListeners() {
    this.gameRef = database.ref(`/game/${this.state.gameID}`)
    this.gameRef.on('value', (snap) => {
      let {boardState, turn, totalMoves} = snap.val()

      Chess.updateBoard(boardState)
    })
  }

  handleBoardChange() {
    let boardState = Chess.boardToJSON()
    this.gameRef.child('boardState').set(boardState)
  }

  removeEventListeners() {
    this.gameRef.off()
  }

  identifyUserColor(gameData) {
  }

  render() {
    return (
      <StyledGameBoard>
        <Board {...this.config} />
      </StyledGameBoard>
    )
  }
}

const stateToProps = (state) => {
  return {
    user: state.user
  }
}

const dispatchToProps = (dispatch) => {
  return {}
}

export default connect(stateToProps, dispatchToProps)(GameBoard)
