import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import styled from 'styled-components'

//components
import GameBoard from '../../gameComponents/game-board'

const StyledBoard = styled.div`
`
class Game extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    //add listeners
  }

  componentWillUnmount() {
    //remove listeners
  }

  render() {
    return (
      <GameBoard />
    )
  }
}

const stateToProps = state => {
  return {
    user: state.user
  }
}

const dispatchToProps = dispatch => {
  return {
  }
}

export default connect(stateToProps, dispatchToProps)(Game)
