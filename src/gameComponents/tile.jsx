import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import Chess from '../chessEngine/chess_engine'

const checkeredColor = 'palevioletred'

const StyledTile = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid green;
    background-color: ${props => {
        if(props.highlight) return 'red'
        const position = props.position.split('').map(str => parseInt(str, 10))
        const row = position[0], column = position[1]
        //first row
        if(row === 0) {
            if(column === 0) return null
            return column % 2 !== 0 ? checkeredColor : null
        }else {
            //all other rows
            if(row % 2 === 0) {
                if(column === 0) return null
                return column % 2 !== 0 ? checkeredColor : null
            }else {
                if(column === 0) return checkeredColor
                return column % 2 !== 0 ? null : checkeredColor
            }
        }

        }}
`

export const Tile =  props => {
    return(
        <StyledTile {...props} onClick={() => props.handleTileClick(props.position)}>
            {props.img ? <img src={props.img} alt=""/> :
            props.position
        }
        </StyledTile>
    )
}

const stateToProps = state => {
    return {}
}

const dispatchToProps = dispatch => {
    return {}
}

export default connect(stateToProps, dispatchToProps)(Tile)
