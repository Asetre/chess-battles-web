import React from 'react'
import styled from 'styled-components'
import Chess, * as Engine from '../chessEngine/chess_engine'
import {connect} from 'react-redux'
import * as actions from '../redux/actions'
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
width: 816px;
border: 1px solid red;
display: flex;
flex-wrap: wrap;

> div {
  margin: 0;
}
`

class Board extends React.Component {
  constructor(props) {
    super()
    this.gameTileClick = this.gameTileClick.bind(this)
    this.demoTileClick = this.demoTileClick.bind(this)

    this.handleTileClick = props.demo ? this.demoTileClick : this.gameTileClick
  }

  gameTileClick() {
  }


  demoTileClick(position) {
    if(this.props.pieceSelected) {
      if(this.props.validMoves.find(pos => pos === position)) {
        const piece = Chess.getPosition(this.props.pieceSelected)
        Chess.movePiece(piece, position)
        this.props.updatePieceSelected(null)
        this.props.updateValidMoves([])
      }else {
        this.props.updatePieceSelected(null)
        this.props.updateValidMoves([])
      }
    }else {
      const piece = Chess.getPosition(position)
      if(piece) {
        const validMoves = piece.findValidMoves(Chess)
        console.log('react',validMoves)
        this.props.updatePieceSelected(piece.position)
        this.props.updateValidMoves(validMoves)
      }
    }
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
              highlight: this.props.validMoves.find(pos => pos === position) ? true : false,
              img: img
            }
            return(
              <Tile key={parseInt(position)} {...tileConfig}></Tile>
            )
          }))
        })}
      </StyledBoard>
    )
  }
}

const stateToProps = state => {
  return {
    pieceSelected: state.pieceSelected,
    validMoves: state.validMoves
  }
}

const dispatchToProps = dispatch => {
  return {
    updatePieceSelected: pos => dispatch(actions.updatePieceSelected(pos)),
    updateValidMoves: arr =>  dispatch(actions.updateValidMoves(arr))
  }
}

const getPieceImageFromName = (name) => {
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

export default connect(stateToProps, dispatchToProps)(Board)
