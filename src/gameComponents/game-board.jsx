import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Chess, * as Engine from '../chessEngine/chess_engine'
import firebase from 'firebase'

import Board from './board'

const database = firebase.database()

//goals
//---------------

class GameBoard extends React.Component {
  constructor(props) {
    super()

    this.state = {
      gameID: props.gameID,
      turn: 1,
      currentPlayerTurn: 1,
      userColor: null,
      totalMoves: 0,
      userColor: null,
      userClass: null,
      opponentClass: null,
      opponentColor: null,
      reversed: false,
      updateCount: 0
    }

    this.setupEventListeners = this.setupEventListeners.bind(this)
    this.initializeGame = this.initializeGame.bind(this)
    this.identifyUserColorsAndClass = this.identifyUserColorsAndClass.bind(this)
    this.handlePieceMove = this.handlePieceMove.bind(this)
    this.gameRef = database.ref(`/games/${this.state.gameID}`)

    this.config = {
      demo: false,
      handlePieceMove: this.handlePieceMove,
      gameInitialized: false,
      userTeam: null,
      updateCount: 0
    }

    this.initializeGame()

    this.setupEventListeners()
  }

  initializeGame() {
    this.gameRef.once('value', (snap) => {
      let { users } = snap.val()

      this.identifyUserColorsAndClass(users)
      this.config.reversed = this.state.userColor === 1 ? false : true

      Chess.resetBoard()
      let p1Class = null
      let p2Class = null

      let { userClass, opponentClass } = this.state

      if (this.state.userColor === 1) {
        p1Class = userClass
        p2Class = opponentClass
      } else {
        p1Class = opponentClass
        p2Class = userClass
      }

      Chess.setUpGame(p1Class, p2Class)
      this.config.gameInitialized = true
    })
  }

  setupEventListeners() {
    this.gameRef.on('value', (snap) => {
      try {
        let {turn, totalMoves, users, pieceMove, boardState} = snap.val()

        this.setState({
          currentPlayerTurn: turn
        })

        if(boardState && turn == this.state.userColor) {
          Chess.updateBoard(boardState)
          let newUpdateCount = this.state.updateCount++
          this.setState({newUpdateCount})
          console.log(this.state)
          return
        }

        if(pieceMove && pieceMove.playerColor !== this.state.userColor) {
          let piece = Chess.getPosition(pieceMove.oldPosition)
          Chess.movePiece(piece, pieceMove.newPosition)
        }

      } catch (err) {
        console.log(err)
      }
    })
  }

  handlePieceMove(oldPosition, newPosition) {
    let pieceMove = {
      oldPosition,
      newPosition,
      playerColor: this.state.userColor,
    }

    let jsonBoard = Chess.boardToJSON()

    this.gameRef.child('boardState').set(jsonBoard)
    this.gameRef.child('pieceMove').set(pieceMove)
    let playerTurn = this.state.userColor === 1 ? 0 : 1
    this.gameRef.child('turn').set(playerTurn)
  }

  removeEventListeners() {
    this.gameRef.off()
  }

  identifyUserColorsAndClass(users) {
    users.forEach((user, index) => {
      if (user) {
        let currentUser = user.user
        if (currentUser.id == this.props.user._id) {
          let stateToUpdate = {
            userColor: index,
            userClass: currentUser.selectedClass
          }

          this.setState(stateToUpdate)
        } else {
          let stateToUpdate = {
            opponentColor: index,
            opponentClass: currentUser.selectedClass
          }
          this.setState(stateToUpdate)
        }

      } else {
        //abort game
      }
    })
  }

  render() {
    let state = this.state
    this.config.userTeam = this.state.userColor
    return (
      <Board {...this.config} turn={this.state.currentPlayerTurn} updateCount={this.state.updateCount}/>
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
