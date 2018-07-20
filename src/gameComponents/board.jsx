import React from 'react'
import styled from 'styled-components'
import Chess, * as Engine from '../chessEngine/chess_engine'

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

import Tile from './tile'

const StyledBoard = styled.div`
width: 80%;
border: 1px solid red;
display: flex;
flex-wrap: wrap;

> div {
  margin: 0;
}
`

class Board extends React.PureComponent {
  constructor(props) {
    super()
    this.gameTileClick = this.gameTileClick.bind(this)
    this.demoTileClick = this.demoTileClick.bind(this)
    this.updatePieceSelected = this.updatePieceSelected.bind(this)
    this.updateValidMoves = this.updateValidMoves.bind(this)
    this.checkKings = this.checkKings.bind(this)
    this.handleTileClick = props.demo ? this.demoTileClick : this.gameTileClick

    this.state = {
      selectedPiece: null,
      validMoves: [],
      kingsInCheck: []
    }
  }

  componentDidMount() {
    this.setState({
      kingsInCheck: Chess.kingsInCheck()
    })
  }

  checkKings() {
    let kingsPositions = Chess.getKingsPositions(),
      kingsInCheck = Chess.kingsInCheck(kingsPositions) 

    if(kingsInCheck.length !== 0) {
      this.setState({kingsInCheck})
    }else {
      this.setState({kingsInCheck: []})
    }

    if(kingsPositions && kingsPositions.length < 2 && kingsPositions.length >0) {
      let winner = Chess.getPosition(kingsPositions[0]).team
      this.props.handleGameOver(winner)
    }
  }

  gameTileClick(newPosition) {
    let selectedPiece = this.state.selectedPiece
    if(this.props.gameOver) return
    if (selectedPiece) {
      if (this.state.validMoves.find(pos => pos === newPosition)) {
        const piece = Chess.getPosition(this.state.selectedPiece)

        Chess.movePiece(piece, newPosition)
        this.props.handlePieceMove(this.state.selectedPiece, newPosition)
        this.updatePieceSelected(null)
        this.updateValidMoves([])
        this.checkKings()
      } else {
        this.updatePieceSelected(null)
        this.updateValidMoves([])
      }
    } else {
      const piece = Chess.getPosition(newPosition)
      if (piece && piece.team === this.props.userTeam && this.props.turn === piece.team) {
        const validMoves = piece.findValidMoves(Chess)
        this.updatePieceSelected(piece.position)
        this.updateValidMoves(validMoves)
      }
    }
  }

  demoTileClick(position) {
    if (this.state.selectedPiece) {
      if (this.state.validMoves.find(pos => pos === position)) {
        const piece = Chess.getPosition(this.state.selectedPiece)
        Chess.movePiece(piece, position)
        this.updatePieceSelected(null)
        this.updateValidMoves([])
      } else {
        this.updatePieceSelected(null)
        this.updateValidMoves([])
      }
    }else {
      const piece = Chess.getPosition(position)
      if(piece) {
        const validMoves = piece.findValidMoves(Chess)
        this.updatePieceSelected(piece.position)
        this.updateValidMoves(validMoves)
      }
    }
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

  render() {
    let props = this.props

    return (
      <StyledBoard>
        {Chess.board.map((row, r) => {
          return (row.map((col, c) => {
            const position = props.reversed ? Engine.Board.convertPosition(`${r}${c}`, {reversed: props.reversed, toString: true}) : `${r}${c}`
            const tile = Chess.getPosition(position)
            const name = tile ? tile.name : null
            const img = getPieceImageFromName(name)

            const tileConfig = {
              handleTileClick: this.handleTileClick,
              position: position,
              tile: tile,
              highlight: this.state.validMoves.find(pos => pos === position) ? true : false,
              img: img,
              inCheck: this.state.kingsInCheck.find((pos) => pos === position)
            }

            return <Tile key={parseInt(position)} {...tileConfig}></Tile>
          }))
        })}
      </StyledBoard>
    )
  }
}

function getPieceImageFromName(name) {
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


export default Board
