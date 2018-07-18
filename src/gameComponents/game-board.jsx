import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Chess, * as Engine from '../chessEngine/chess_engine'
import firebase from 'firebase'
import io from 'socket.io-client'

import Board from './board'

const database = firebase.database()

const StyledGameBoard = styled.div`
`

class GameBoard extends React.Component {
    constructor(props) {
        super()

        this.state = {
            gameID: props.gameID,
            turn: 1,
            currentPlayerTurn: 1,
            userColor: null,
            totalMoves: 0,
            userClass: null,
            opponentClass: null,
            opponentColor: null,
            opponentSocketID: null,
            reversed: false,
            gameInitialized: false
        }

        this.gameRef = database.ref(`/games/${this.state.gameID}`)
        this.setupEventListeners = this.setupEventListeners.bind(this)
        this.initializeGame = this.initializeGame.bind(this)
        this.identifyUserColorsAndClass = this.identifyUserColorsAndClass.bind(this)
        this.handlePieceMove = this.handlePieceMove.bind(this)
        this.updateSocketID = this.updateSocketID.bind(this)
        this.identifyOpponentSocketID = this.identifyOpponentSocketID.bind(this)
        this.handleGameOver = this.handleGameOver.bind(this)

        this.config = {
            demo: false,
            handlePieceMove: this.handlePieceMove,
            handleGameOver: this.handleGameOver
        }
        this.initializeGame()
    }

    componentDidMount() {
        this.setupEventListeners()
    }

    componentWillUnmount() {
        this.removeEventListeners()
    }

    initializeGame() {
        Chess.resetBoard()

        this.gameRef.once('value', (snap) => {
            let state = this.state
            let data = snap.val()
            let users = data.users
            let boardState = data.boardState
            let turn = data.turn
            let userClass = state.userClass
            let opponentClass = state.opponentClass

            this.identifyUserColorsAndClass(users)
            this.updateSocketID()
            this.config.reversed = this.state.userColor === 1 ? false : true
            let p1Class = null
            let p2Class = null

            if (this.state.userColor === 1) {
                p1Class = userClass
                p2Class = opponentClass
            } else {
                p1Class = opponentClass
                p2Class = userClass
            }

            if (boardState) {
                Chess.jsonToBoard(boardState)
                this.setState({currentPlayerTurn: turn})
            } else {
                Chess.setUpGame(p1Class, p2Class)
            }

            this.setState({
                gameInitialized: true
            })
        })
    }

    identifyOpponentSocketID(snap) {
        let users = snap.val()

        if(this.state.opponentSocketID) {
            return
        }

        users.forEach((user, index) => {
            if (index === this.state.opponentColor) {
                this.setState({
                    opponentSocketID: user.socketID
                })
            }
        })
    }

    updateSocketID() {
        this.gameRef.child(`users/${this.state.userColor}`)
            .update({socketID: this.socket.id})
    }

    setupEventListeners() {
        this.socket = io('http://localhost:8080')
        this.opponentSocketIDRef = database.ref(`/games/${this.state.gameID}/users`)
        this.socket.on('connect', () => {
            this.socket.emit('join room', this.state.gameID)
        })

        this.socket.on('opponent piece move', (pieceMove) => {
            Chess.movePositions(pieceMove.oldPosition, pieceMove.newPosition)
            let updatedTurn = pieceMove.playerColor === 1 ? 0 : 1
            this.setState({
                currentPlayerTurn: updatedTurn
            })
        })
    
        this.opponentSocketIDRef.on('value', this.identifyOpponentSocketID)
    }

    handlePieceMove(oldPosition, newPosition) {
        let pieceMove = {
            oldPosition,
            newPosition,
            playerColor: this.state.userColor,
            opponentSocketID: this.state.opponentSocketID
        }

        let jsonBoard = Chess.boardToJSON()

        this.socket.emit('piece move', pieceMove)
        let updatedTurn = pieceMove.playerColor === 1 ? 0 : 1
        this.gameRef.child('turn').set(updatedTurn)
        this.gameRef.child('boardState').set(jsonBoard)
        this.setState({currentPlayerTurn: updatedTurn})
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
            <Board {...this.config} gameInitialized={state.gameInitialized} turn={state.currentPlayerTurn} userTeam={this.state.userColor}/>
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
