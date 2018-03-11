import React from 'react'
import styled from 'styled-components'
import Chess, * as Engine from '../chess_engine'
import {connect} from 'react-redux'
import * as actions from '../actions'
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

const Board = props => {
    const gameTileClick = () => {
    }

    const demoTileClick = position => {
        if(props.pieceSelected) {
            if(props.validMoves.find(pos => pos === position)) {
                const piece = Chess.getPosition(props.pieceSelected)
                Chess.movePiece(piece, position)
                props.updatePieceSelected(null)
                props.updateValidMoves([])
            }else {
                props.updatePieceSelected(null)
                props.updateValidMoves([])
            }
        }else {
            const piece = Chess.getPosition(position)
            if(piece) {
                const validMoves = piece.findValidMoves(Chess)
                props.updatePieceSelected(piece.position)
                props.updateValidMoves(validMoves)
            }
        }
    }

    const handleTileClick = props.demo ? demoTileClick : gameTileClick
    //Map each tile from the board
    //pass information to the tile
    return (
        <StyledBoard>
            {Chess.board.map((row, r) => {
                return (row.map((col, c) => {
                    const position = props.reversed ? Engine.Board.convertPosition(`${r}${c}`, {reversed: props.reversed, toString: true}) : `${r}${c}`
                    const tile = Chess.getPosition(position)
                    const name = tile ? tile.name : null
                    const img = (() => {
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
                    })()

                        const tileConfig = {
                            handleTileClick: handleTileClick,
                            position: position,
                        tile: tile,
                        highlight: props.validMoves.find(pos => pos === position) ? true : false,
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

export default connect(stateToProps, dispatchToProps)(Board)


/*

const img = (() => {

    }
})()
*/
