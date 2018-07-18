import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Chess, * as Engine from '../chessEngine/chess_engine'
import firebase from 'firebase'
import io from 'socket.io-client'

import Board from './board'
import { access } from 'fs'
import { callbackify } from 'util'

const database = firebase.database()

const StyledGameBoard = styled.div`
`

class GameBoard extends React.PureComponent {
  constructor(props) {
    super()
    this.state = {
      gameID: props.gameID,
      turn: 1,
      totalMoves: 0,
      userGameInfo: {
        color: null,
        type: null
      },
      opponentGameInfo: {
        color: null,
        type: null
      },
      reversed: false,
      gameInitialized: false,
      userConnected: false,
      opponentConnected: false
    }

    this.gameRef = database.ref(`/games/${this.state.gameID}`)
    this.setupEventListeners = this.setupEventListeners.bind(this)
    this.initializeGame = this.initializeGame.bind(this)
    this.identifyUserColorsAndClass = this.identifyUserColorsAndClass.bind(this)
    this.handlePieceMove = this.handlePieceMove.bind(this)
    this.handleGameOver = this.handleGameOver.bind(this)

    this.config = {
      demo: false,
      handlePieceMove: this.handlePieceMove,
      handleGameOver: this.handleGameOver
    }
  }

  componentDidMount() {
    this.setupEventListeners()
    this.initializeGame()
  }

  componentWillUnmount() {
    this.removeEventListeners()
  }

  initializeGame() {
    Chess.resetBoard()
    this.gameRef.once('value', (snap) => {

      let gameData = snap.val(),
        users = gameData.users,
        boardState = gameData.boardState,
        turn = gameData.turn

      this.identifyUserColorsAndClass(users)
      this.config.reversed = this.state.userGameInfo.color === 1 ? false : true

      if (boardState) {
        Chess.jsonToBoard(boardState)
        this.setState((prevState) => {
          return { ...prevState, turn: turn }
        })
      } else {
        let { userGameInfo, opponentGameInfo } = this.state
        Chess.setUpGame(userGameInfo, opponentGameInfo)
      }
      this.setState({gameInitialized: true})
      this.child.checkKings()
    })
  }

  setupEventListeners() {
    this.socket = io('http://localhost:8080')
    this.opponentSocketIDRef = database.ref(`/games/${this.state.gameID}/users`)
    this.socket.on('connect', () => {
      this.socket.emit('join room', this.state.gameID)
    })

    this.socket.on('opponent connection status', (status) => {
      this.setState({
        opponentConnected: status
      })
    })

    this.checkSocketConnection = setInterval(() => {
      if (this.socket) {
        this.socket.emit('check opponent connection', this.state.gameID)
        this.setState({
          userConnected: this.socket.connected
        })
      } else {
        this.setState(() => {
          false
        })
      }
    }, 150)

    this.socket.on('piece move', (pieceMove) => {
      if(pieceMove.playerColor !== this.state.userGameInfo.color) {
        Chess.movePositions(pieceMove.oldPosition, pieceMove.newPosition)
        this.child.checkKings()
        let updatedTurn = pieceMove.playerColor === 1 ? 0 : 1
        this.setState((prevState) => {
          return {...prevState, turn: updatedTurn}
        })
      }
    })
  }

  handlePieceMove(oldPosition, newPosition, sendToServer) {
    let state = this.state
    let pieceMove = {
      oldPosition,
      newPosition,
      playerColor: state.userGameInfo.color,
      gameID: state.gameID
    }

    let jsonBoard = Chess.boardToJSON()
    let updatedTurn = pieceMove.playerColor === 1 ? 0 : 1
    let updates = {
      turn: updatedTurn,
      boardState: jsonBoard
    }

    this.setState((prevState) => {
      return {...prevState, turn: updatedTurn}
    })

    this.socket.emit('piece move', pieceMove)
    this.gameRef.update(updates)
  }

  handleGameOver(winner) {
    console.log('game over')
    console.log(winner)
  }

  removeEventListeners() {
    this.gameRef.off()
    this.opponentSocketIDRef.off()
    this.socket.off()
  }

  identifyUserColorsAndClass(users) {
    const setPlayerColorsAndClass = (playerOne, playerTwo) => {
      let userID = this.props.user._id,
        userGameInfo = playerOne.id === userID ? playerOne : playerTwo,
        opponentGameInfo = playerTwo.id === userID ? playerTwo : playerOne


      this.setState((prevState) => {
        return { ...prevState, userGameInfo, opponentGameInfo}
      })
    }

    users = users.reduce((acc, curr, index) => {
      let user = curr.user,
        formatedUser = {
          id: user.id,
          color: index,
          type: user.type
        }
      acc.push(formatedUser)
      return acc
    }, [])

    setPlayerColorsAndClass(...users)
  }

  render() {

    let state = this.state
    return (
      <Board ref={(instance) => this.child = instance} {...this.config} gameInitialized={state.gameInitialized} turn={state.turn} userTeam={state.userGameInfo.color} />
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
