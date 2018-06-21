import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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

    this.state = {
      gameID: props.gameID,
      boardState: Chess.board,
      turn: 1,
      currentPlayerTurn: 1,
      userColor: null,
      totalMoves: 0,
      userColor: null
    }

    this.setupEventListeners = this.setupEventListeners.bind(this)
    this.handleBoardChange = this.handleBoardChange.bind(this)
    this.initializeGame = this.initializeGame.bind(this)
    this.gameRef = database.ref(`/games/${this.state.gameID}`)

    this.config = {
      reversed: false,
      demo: false
    }


    this.initializeGame()

    this.setupEventListeners()
    this.handleBoardChange()
  }

  initializeGame() {
    this.gameRef.once('value', (snap) => {
      let { users } = snap.val()

      this.identifyUserColor(users)

      Chess.resetBoard()
      Chess.setUpGame('Mercenary', 'Crusader')
    })
  }

  setupEventListeners() {
    this.gameRef.on('value', (snap) => {
      let { boardState, turn, totalMoves, users } = snap.val()

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

  identifyUserColor(users) {
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
