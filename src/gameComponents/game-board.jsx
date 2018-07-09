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

//goals
//---------------
//identify the user color
//identify both users selected piece
//update firebase upon piece move
//prevent user from moving opponents pieces
//prevent user from moving when not their turn
//update the game board on opponent move

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
      userColor: null,
      userClass: null,
      opponentClass: null,
      opponentColor: null
    }

    this.setupEventListeners = this.setupEventListeners.bind(this)
    this.handleBoardChange = this.handleBoardChange.bind(this)
    this.handlePieceMove = this.handlePieceMove.bind(this)
    this.initializeGame = this.initializeGame.bind(this)
    this.identifyUserColorsAndClass = this.identifyUserColorsAndClass.bind(this)
    this.gameRef = database.ref(`/games/${this.state.gameID}`)

    this.config = {
      reversed: false,
      demo: false,
      handleBoardChange: this.handleBoardChange,
      handlePieceMove: this.handlePieceMove
    }


    this.initializeGame()

    this.setupEventListeners()
  }

  initializeGame() {
    this.gameRef.once('value', (snap) => {
      let { users } = snap.val()

      this.identifyUserColorsAndClass(users)

      Chess.resetBoard()
      let p1Class = null
      let p2Class = null

      let {userClass, opponentClass} = this.state

      if(this.state.userColor === 1) {
        p1Class = userClass
        p2Class = opponentClass
      }else {
        p1Class = opponentClass
        p2Class = userClass
      }

      Chess.setUpGame(p1Class, p2Class)
    })
  }

  setupEventListeners() {
    this.gameRef.on('value', (snap) => {
      try {
        let { boardState, turn, totalMoves, users } = snap.val()

        if(boardState) {
          Chess.updateBoard(boardState)
          this.config.updateBoard = true
        }

      }catch(err) {
        console.log(err)
      }

      //Chess.updateBoard(boardState)
    })
  }

  handleBoardChange(jsonBoard) {
    //this.gameRef.child('boardState').set(jsonBoard)
  }

  handlePieceMove(jsonBoard) {
    this.gameRef.child('boardState').set(jsonBoard)
  }

  removeEventListeners() {
    this.gameRef.off()
  }

  identifyUserColorsAndClass(users) {
    users.forEach((user, index) => {
      if(user) {
        let currentUser = user.user
        if(currentUser.id == this.props.user._id) {
          let stateToUpdate = {
            userColor: index,
            userClass: currentUser.selectedClass
          }

          this.setState(stateToUpdate)
        }else {
          let stateToUpdate = {
            opponentColor: index,
            opponentClass: currentUser.selectedClass
          }
          this.setState(stateToUpdate)
        }
      }else {
        //abort game
      }
    })
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
