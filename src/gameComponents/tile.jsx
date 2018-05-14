import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import Chess from '../chessEngine/chess_engine'

const checkeredColor = 'palevioletred'

const StyledTile = styled.div`
width: 12.5%;
height: 0;
padding-bottom: 12.5%;
display: flex;
align-items: center;
justify-content: center;
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
    }else {4
      if(column === 0) return checkeredColor
      return column % 2 !== 0 ? null : checkeredColor
    }
  }
}};
`

const StyledPieceImg = styled.div`
width: 85%;
margin: 0;
margin-top: 85%;
padding-bottom: 85%;
background-image: url(${props => props.src});
background-position: center;
background-size: contain;
background-repeat: no-repeat;
`

const Tile =  props => {
  return(
    <StyledTile {...props} onClick={() => props.handleTileClick(props.position)}>
    {props.img ? <StyledPieceImg src={props.img}></StyledPieceImg> : null}
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
