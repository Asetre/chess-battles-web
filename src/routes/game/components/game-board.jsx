import React from 'react'
import { connect } from 'react-redux'
import Chess, * as Engine from '../../../chessEngine/chess_engine'
import * as GameRepository from '../../../repository/gameRepository'
import * as GameService from '../../../service/gameService'
import {StyledGameBoard} from '../styles'
import Board from '../../../gameComponents/board'


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
      opponentConnected: false,
      gameOver: false
    }

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

  async initializeGame() {
    let gameData = await GameRepository.getGameInfo()
    let users = gameData.users
    let turn = gameData.turn
    let boardState = gameData.boardState

    Chess.resetBoard()

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
  }

  setupEventListeners() {
    const socket = GameRepository.initializeListeners(this.state.gameID)
    socket.on('connect', () => {
      GameRepository.joinRoom(this.state.gameID)
    })

    socket.on('piece move', (pieceMove) => {
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

  handlePieceMove(oldPosition, newPosition) {
    let {pieceMove, updatedTurn, updates} = GameService.pieceMove(oldPosition, newPosition, this.state)

    this.setState((prevState) => {
      return {...prevState, turn: updatedTurn}
    })

    GameRepository.emitPieceMove(pieceMove, updates)
  }

  handleGameOver(winner) {
    let loser = winner === 1 ? 0 : 1
    let updates = {
      winner,
      loser
    }
    GameRepository.gameOver()
    GameRepository.updateGameInfo(updates)
    this.setState((prevState) => {
      return {...prevState, gameOver: true}
    })
    this.removeEventListeners()
  }

  removeEventListeners() {
    GameRepository.removeListeners()
  }

  identifyUserColorsAndClass(users) {
    let identifiedUsers = GameService.identifyUserColorAndClass(users, this.props.user._id)
    this.setState((prevState) => {
      return {...prevState, ...identifiedUsers}
    })
  }

  render() {
    let state = this.state
    return (
      <Board ref={(instance) => this.child = instance} {...this.config} gameInitialized={state.gameInitialized} turn={state.turn} userTeam={state.userGameInfo.color} gameOver={state.gameOver}/>
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
