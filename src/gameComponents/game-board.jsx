import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Chess, * as Engine from '../chessEngine/chess_engine'
import firebase from 'firebase'
import Tile from './tile'

//Images
import bK from '../assets/bK.png'
import bR from '../assets/bR.png'
import bQ from '../assets/bQ.png'
import bKn from '../assets/bKn.png'
import bB from '../assets/bB.png'
import bP from '../assets/bP.png'
import wK from '../assets/wK.png'
import wQ from '../assets/wQ.png'
import wR from '../assets/wR.png'
import wKn from '../assets/wKn.png'
import wB from '../assets/wB.png'
import wP from '../assets/wP.png'

const StyledBoard = styled.div`
width: 80%;
border: 1px solid red;
display: flex;
flex-wrap: wrap;

> div {
  margin: 0;
}
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
      selectedPiece: null,
      validMoves: [],
      gameID: props.gameID,
      turn: 1,
      currentPlayerTurn: 1,
      userColor: null,
      totalMoves: 0,
      userColor: null,
      userClass: null,
      opponentClass: null,
      opponentColor: null,
      reversed: false
    }

    this.setupEventListeners = this.setupEventListeners.bind(this)
    this.handleBoardChange = this.handleBoardChange.bind(this)
    this.handlePieceMove = this.handlePieceMove.bind(this)
    this.handleTileClick = this.handleTileClick.bind(this)
    this.initializeGame = this.initializeGame.bind(this)
    this.identifyUserColorsAndClass = this.identifyUserColorsAndClass.bind(this)
    this.gameRef = database.ref(`/games/${this.state.gameID}`)

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

      let { userClass, opponentClass } = this.state

      if (this.state.userColor === 1) {
        p1Class = userClass
        p2Class = opponentClass
      } else {
        p1Class = opponentClass
        p2Class = userClass
      }

      Chess.setUpGame(p1Class, p2Class)
    })
  }

  getPieceImageFromName(name) {
    switch (name) {
      case 'White King':
        return wK

      case 'White Queen':
        return wQ

      case 'White Rook':
        return wR

      case 'White Knight':
        return wKn

      case 'White Bishop':
        return wB

      case 'White Pawn':
        return wP

      case 'Black King':
        return bK

      case 'Black Queen':
        return bQ

      case 'Black Rook':
        return bR

      case 'Black Knight':
        return bKn

      case 'Black Bishop':
        return bB

      case 'Black Pawn':
        return bP

      default:
        return null
    }
  }

  setupEventListeners() {
    this.gameRef.on('value', (snap) => {
      try {
        let { boardState, turn, totalMoves, users } = snap.val()

        if (boardState) {
          Chess.updateBoard(boardState)
          this.forceUpdate()
        }

      } catch (err) {
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

  updatePieceSelected(position) {
    this.setState({
      selectedPiece: position
    })
  }

  updateValidMoves(validMoves) {
    this.setState({
      validMoves: validMoves
    })
  }

  handleTileClick(position) {
    if (this.state.selectedPiece) {
      if (this.state.validMoves.find(pos => pos === position)) {
        const piece = Chess.getPosition(this.state.selectedPiece)
        Chess.movePiece(piece, position)
        this.updatePieceSelected(null)
        this.updateValidMoves([])
        this.handlePieceMove(Chess.boardToJSON())
      } else {
        this.updatePieceSelected(null)
        this.updateValidMoves([])
      }
    } else {
      const piece = Chess.getPosition(position)
      if (piece) {
        const validMoves = piece.findValidMoves(Chess)
        this.updatePieceSelected(piece.position)
        this.updateValidMoves(validMoves)
      }
    }
  }



  render() {
    let state = this.state
    return (
      <StyledBoard>
        {Chess.board.map((row, r) => {
          return (row.map((col, c) => {
            const position = state.reversed ? Engine.Board.convertPosition(`${r}${c}`, { reversed: state.reversed, toString: true }) : `${r}${c}`
            const tile = Chess.getPosition(position)
            const name = tile ? tile.name : null
            const img = this.getPieceImageFromName(name)

            const tileConfig = {
              handleTileClick: this.handleTileClick,
              position: position,
              tile: tile,
              highlight: this.state.validMoves.find(pos => pos === position) ? true : false,
              img: img
            }

            return <Tile key={parseInt(position)} {...tileConfig}></Tile>
          }))
        })}
      </StyledBoard>
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
